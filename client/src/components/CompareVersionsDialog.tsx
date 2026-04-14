import { useState, useMemo } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  GitCompare, ArrowRightLeft, Copy, Star, ChevronRight,
  AlignJustify, Layers, GitMerge, TrendingUp, TrendingDown,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useToast } from "@/hooks/use-toast";
import { FEATURE_CATEGORIES, matchesCategory, type CategoryId } from "./FilterPanel";
import type { Version } from "@shared/schema";
import { format } from "date-fns";

interface CompareVersionsDialogProps {
  versions: Version[];
}

const MAJOR_VERSIONS = new Set(["2027.0", "2026.3", "2024.0", "2023.0", "10.5", "10.0", "5.0", "3.0", "1.5"]);

// ─── Jaccard similarity (chain detection) ──────────────────────────
const STOP = new Set([
  "the","a","an","and","or","in","on","to","for","of","with","by","new",
  "now","also","features","improvements","enhancements","continued",
  "support","using","allows","provides","adds",
]);

function tokenize(s: string) {
  return s.toLowerCase().split(/[^a-z0-9]+/).filter(w => w.length > 2 && !STOP.has(w));
}

function jaccard(a: string, b: string) {
  const ta = tokenize(a);
  const tb = tokenize(b);
  const setA = new Set(ta);
  const setB = new Set(tb);
  if (!setA.size || !setB.size) return 0;
  const inter = ta.filter(w => setB.has(w)).length;
  const union = new Set(ta.concat(tb)).size;
  return inter / union;
}

interface CompactChain {
  title: string;
  catId: CategoryId | null;
  features: { id: string; title: string; version: string }[];
}

function detectChainsInRange(
  spannedVersions: Version[],
): CompactChain[] {
  type Flat = { id: string; title: string; description: string; category: string; version: string };
  const flat: Flat[] = spannedVersions.flatMap(v =>
    v.features.map(f => ({ ...f, version: v.version }))
  );

  const assigned = new Set<string>();
  const chains: CompactChain[] = [];

  flat.forEach(anchor => {
    if (assigned.has(anchor.id)) return;
    const cluster: Flat[] = [anchor];
    assigned.add(anchor.id);

    flat.forEach(cand => {
      if (assigned.has(cand.id) || cand.version === anchor.version) return;
      if (jaccard(anchor.title, cand.title) >= 0.5) {
        cluster.push(cand);
        assigned.add(cand.id);
      }
    });

    if (cluster.length < 2) return;

    const sorted = cluster.sort((a, b) => {
      const ia = spannedVersions.findIndex(v => v.version === a.version);
      const ib = spannedVersions.findIndex(v => v.version === b.version);
      return ia - ib;
    });

    const title = sorted[0].title
      .replace(/\s*(Enhancements?|Improvements?|Updates?|Continued)\s*$/i, "")
      .trim();

    let catId: CategoryId | null = null;
    let best = 0;
    FEATURE_CATEGORIES.forEach(cat => {
      const score = sorted.filter(f => matchesCategory(f, cat.id)).length;
      if (score > best) { best = score; catId = cat.id; }
    });

    chains.push({ title, catId, features: sorted.map(f => ({ id: f.id, title: f.title, version: f.version })) });
  });

  return chains.sort((a, b) => b.features.length - a.features.length);
}

// ─── Category shift (proportion near from vs near to) ──────────────
function computeCategoryShift(versions: Version[], fromId: string, toId: string) {
  const sorted = [...versions].sort(
    (a, b) => new Date(a.releaseDate).getTime() - new Date(b.releaseDate).getTime()
  );
  const fromIdx = sorted.findIndex(v => v.id === fromId);
  const toIdx = sorted.findIndex(v => v.id === toId);
  if (fromIdx === -1 || toIdx === -1) return [];

  const win = 3;
  const nearFrom = sorted.slice(Math.max(0, fromIdx - win), fromIdx + win + 1);
  const nearTo = sorted.slice(Math.max(0, toIdx - win), toIdx + win + 1);

  function proportions(vers: Version[]) {
    const total = vers.reduce((s, v) => s + v.features.length, 0) || 1;
    const counts: Partial<Record<CategoryId, number>> = {};
    vers.forEach(v => v.features.forEach(f => {
      FEATURE_CATEGORIES.forEach(cat => {
        if (matchesCategory(f, cat.id)) counts[cat.id] = (counts[cat.id] || 0) + 1;
      });
    }));
    const out: Partial<Record<CategoryId, number>> = {};
    FEATURE_CATEGORIES.forEach(cat => { out[cat.id] = (counts[cat.id] || 0) / total; });
    return out;
  }

  const pFrom = proportions(nearFrom);
  const pTo = proportions(nearTo);

  return FEATURE_CATEGORIES.map(cat => ({
    cat,
    before: pFrom[cat.id] ?? 0,
    after: pTo[cat.id] ?? 0,
    shift: (pTo[cat.id] ?? 0) - (pFrom[cat.id] ?? 0),
  }))
    .filter(c => Math.abs(c.shift) > 0.03)
    .sort((a, b) => Math.abs(b.shift) - Math.abs(a.shift))
    .slice(0, 4);
}

// ─── Core upgrade-path computation ─────────────────────────────────
function computeUpgradePath(versions: Version[], fromId: string, toId: string) {
  const sorted = [...versions].sort(
    (a, b) => new Date(a.releaseDate).getTime() - new Date(b.releaseDate).getTime()
  );
  const fromIdx = sorted.findIndex(v => v.id === fromId);
  const toIdx = sorted.findIndex(v => v.id === toId);
  if (fromIdx === -1 || toIdx === -1 || fromIdx === toIdx) return null;

  const [lowerIdx, upperIdx] = fromIdx < toIdx ? [fromIdx, toIdx] : [toIdx, fromIdx];
  const from = sorted[lowerIdx];
  const to = sorted[upperIdx];
  const spanned = sorted.slice(lowerIdx + 1, upperIdx + 1);
  const allFeatures = spanned.flatMap(v =>
    v.features.map(f => ({ ...f, version: v.version, versionId: v.id, releaseDate: v.releaseDate, isMajorVersion: MAJOR_VERSIONS.has(v.version) }))
  );

  const byVersion = spanned.map(v => ({ version: v, features: v.features }));

  const categoryBreakdown: Partial<Record<CategoryId, typeof allFeatures>> = {};
  FEATURE_CATEGORIES.forEach(cat => {
    const m = allFeatures.filter(f => matchesCategory(f, cat.id));
    if (m.length > 0) categoryBreakdown[cat.id] = m;
  });

  const topCategories = FEATURE_CATEGORIES.map(cat => ({
    cat, count: categoryBreakdown[cat.id]?.length ?? 0,
  })).filter(x => x.count > 0).sort((a, b) => b.count - a.count).slice(0, 4);

  const chains = detectChainsInRange(spanned);
  const categoryShift = computeCategoryShift(versions, fromId, toId);

  return {
    from, to, spanned, allFeatures, byVersion, categoryBreakdown, topCategories,
    totalFeatures: allFeatures.length,
    versionsCount: spanned.length,
    majorReleasesCount: spanned.filter(v => MAJOR_VERSIONS.has(v.version)).length,
    avgPerVersion: spanned.length > 0 ? (allFeatures.length / spanned.length).toFixed(1) : "0",
    chains,
    categoryShift,
  };
}

// ─── Summary banner ─────────────────────────────────────────────────
function SummaryBanner({ path }: { path: NonNullable<ReturnType<typeof computeUpgradePath>> }) {
  return (
    <div className="rounded-lg border bg-primary/5 border-primary/20 p-4 mb-4 space-y-3">
      {/* Versions + stats */}
      <div className="flex flex-wrap items-center gap-3">
        <span className="text-xl font-bold text-muted-foreground">v{path.from.version}</span>
        <ChevronRight className="h-4 w-4 text-muted-foreground" />
        <span className="text-sm text-muted-foreground">{path.versionsCount} versions</span>
        <ChevronRight className="h-4 w-4 text-muted-foreground" />
        <span className="text-xl font-bold text-primary">v{path.to.version}</span>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {[
          { label: "New Features", value: path.totalFeatures },
          { label: "Versions", value: path.versionsCount },
          { label: "Major Releases", value: path.majorReleasesCount },
          { label: "Avg / Release", value: path.avgPerVersion },
        ].map(s => (
          <div key={s.label} className="text-center">
            <div className="text-2xl font-bold">{s.value}</div>
            <div className="text-xs text-muted-foreground uppercase tracking-wide">{s.label}</div>
          </div>
        ))}
      </div>
      {/* Top categories */}
      <div className="flex flex-wrap gap-1.5">
        {path.topCategories.map(({ cat, count }) => {
          const Icon = cat.icon;
          return (
            <Badge key={cat.id} variant="secondary" className={cn("gap-1 text-xs", cat.color)}>
              <Icon className="h-2.5 w-2.5" />
              {cat.label}: {count}
            </Badge>
          );
        })}
      </div>
      {/* Category shift */}
      {path.categoryShift.length > 0 && (
        <div className="flex flex-wrap gap-2 pt-1 border-t">
          <span className="text-xs text-muted-foreground self-center">Development focus shifted:</span>
          {path.categoryShift.map(({ cat, shift }) => {
            const Icon = cat.icon;
            const up = shift > 0;
            return (
              <span key={cat.id} className={cn("flex items-center gap-1 text-xs font-medium", up ? "text-green-600 dark:text-green-400" : "text-red-600 dark:text-red-400")}>
                <Icon className="h-3 w-3" />
                {cat.label}
                {up ? <TrendingUp className="h-3 w-3" /> : <TrendingDown className="h-3 w-3" />}
                {Math.abs(shift * 100).toFixed(0)}%
              </span>
            );
          })}
        </div>
      )}
    </div>
  );
}

export default function CompareVersionsDialog({ versions }: CompareVersionsDialogProps) {
  const { toast } = useToast();
  const [isOpen, setIsOpen] = useState(false);
  const [fromId, setFromId] = useState<string>("");
  const [toId, setToId] = useState<string>("");
  const [viewMode, setViewMode] = useState<"by-version" | "by-category" | "chains">("by-version");

  const upgradePath = useMemo(() => {
    if (!fromId || !toId || fromId === toId) return null;
    return computeUpgradePath(versions, fromId, toId);
  }, [versions, fromId, toId]);

  const swap = () => { const t = fromId; setFromId(toId); setToId(t); };

  const exportMarkdown = () => {
    if (!upgradePath) return;
    const p = upgradePath;
    let md = `# ICM InfoWorks Upgrade Path: v${p.from.version} → v${p.to.version}\n\n`;
    md += `**${p.totalFeatures} new features** across ${p.versionsCount} versions (${p.majorReleasesCount} major releases)\n\n`;
    if (p.categoryShift.length > 0) {
      md += `## Development Focus Shift\n\n`;
      p.categoryShift.forEach(({ cat, shift }) => {
        md += `- **${cat.label}**: ${shift > 0 ? "↑" : "↓"}${Math.abs(shift * 100).toFixed(0)}%\n`;
      });
      md += "\n";
    }
    md += `## Top Categories\n\n`;
    p.topCategories.forEach(({ cat, count }) => { md += `- **${cat.label}**: ${count} features\n`; });
    md += `\n## Features by Version\n\n`;
    p.byVersion.forEach(({ version: v, features }) => {
      if (!features.length) return;
      md += `### Version ${v.version}`;
      if (MAJOR_VERSIONS.has(v.version)) md += " ★ Major Release";
      md += ` (${format(new Date(v.releaseDate), "MMM yyyy")})\n\n`;
      features.forEach(f => { md += `- **${f.title}** — ${f.description.slice(0, 120)}...\n`; });
      md += "\n";
    });
    if (p.chains.length > 0) {
      md += `## Evolution Chains in This Range\n\n`;
      p.chains.forEach(chain => {
        md += `**${chain.title}** (${chain.features.length} iterations)\n`;
        chain.features.forEach(f => { md += `  - v${f.version}: ${f.title}\n`; });
        md += "\n";
      });
    }
    navigator.clipboard.writeText(md).then(() => {
      toast({ title: "Copied to clipboard", description: "Upgrade report copied as Markdown" });
    });
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm" className="gap-2" data-testid="button-compare-versions">
          <GitCompare className="h-4 w-4" />
          <span className="hidden sm:inline">Compare Versions</span>
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-4xl max-h-[90vh] flex flex-col p-0 gap-0">
        <DialogHeader className="px-6 pt-6 pb-4 border-b flex-shrink-0">
          <DialogTitle className="flex items-center gap-2">
            <GitCompare className="h-5 w-5" />
            Upgrade Path Comparison
          </DialogTitle>
        </DialogHeader>

        {/* Version pickers */}
        <div className="px-6 py-4 border-b flex-shrink-0">
          <div className="flex items-end gap-3">
            <div className="flex-1">
              <label className="text-xs font-medium text-muted-foreground mb-1.5 block">From version (older)</label>
              <Select value={fromId} onValueChange={setFromId}>
                <SelectTrigger data-testid="select-compare-from">
                  <SelectValue placeholder="Select version" />
                </SelectTrigger>
                <SelectContent>
                  {[...versions].reverse().map(v => (
                    <SelectItem key={v.id} value={v.id} disabled={v.id === toId}>
                      <span className="flex items-center gap-2">
                        {MAJOR_VERSIONS.has(v.version) && <Star className="h-3 w-3 text-yellow-500" />}
                        v{v.version}
                        <span className="text-muted-foreground text-xs">({format(new Date(v.releaseDate), "MMM yyyy")})</span>
                      </span>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <Button variant="outline" size="icon" onClick={swap} disabled={!fromId || !toId} className="mb-0.5 flex-shrink-0" data-testid="button-swap-versions">
              <ArrowRightLeft className="h-4 w-4" />
            </Button>

            <div className="flex-1">
              <label className="text-xs font-medium text-muted-foreground mb-1.5 block">To version (newer)</label>
              <Select value={toId} onValueChange={setToId}>
                <SelectTrigger data-testid="select-compare-to">
                  <SelectValue placeholder="Select version" />
                </SelectTrigger>
                <SelectContent>
                  {versions.map(v => (
                    <SelectItem key={v.id} value={v.id} disabled={v.id === fromId}>
                      <span className="flex items-center gap-2">
                        {MAJOR_VERSIONS.has(v.version) && <Star className="h-3 w-3 text-yellow-500" />}
                        v{v.version}
                        <span className="text-muted-foreground text-xs">({format(new Date(v.releaseDate), "MMM yyyy")})</span>
                      </span>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {upgradePath && (
              <Button variant="outline" size="sm" onClick={exportMarkdown} className="gap-1.5 mb-0.5 flex-shrink-0">
                <Copy className="h-3.5 w-3.5" />
                <span className="hidden sm:inline">Export</span>
              </Button>
            )}
          </div>
        </div>

        {!upgradePath ? (
          <div className="flex-1 flex items-center justify-center text-muted-foreground p-12">
            <div className="text-center">
              <GitCompare className="h-12 w-12 mx-auto mb-3 opacity-20" />
              <p>Select two different versions to see the upgrade path between them</p>
            </div>
          </div>
        ) : (
          <div className="flex-1 overflow-hidden flex flex-col">
            <Tabs value={viewMode} onValueChange={(v) => setViewMode(v as typeof viewMode)} className="flex-1 flex flex-col overflow-hidden">
              <div className="px-6 pt-3 pb-0 flex-shrink-0">
                <SummaryBanner path={upgradePath} />
                <TabsList className="w-full">
                  <TabsTrigger value="by-version" className="flex-1 gap-1.5" data-testid="tab-compare-by-version">
                    <AlignJustify className="h-3.5 w-3.5" />
                    By Version
                  </TabsTrigger>
                  <TabsTrigger value="by-category" className="flex-1 gap-1.5" data-testid="tab-compare-by-category">
                    <Layers className="h-3.5 w-3.5" />
                    By Category
                  </TabsTrigger>
                  <TabsTrigger value="chains" className="flex-1 gap-1.5" data-testid="tab-compare-chains">
                    <GitMerge className="h-3.5 w-3.5" />
                    Chains
                    {upgradePath.chains.length > 0 && (
                      <Badge variant="secondary" className="text-xs ml-1 h-4 px-1">{upgradePath.chains.length}</Badge>
                    )}
                  </TabsTrigger>
                </TabsList>
              </div>

              {/* By Version tab */}
              <TabsContent value="by-version" className="flex-1 overflow-hidden m-0 p-0">
                <ScrollArea className="h-full px-6 pb-6">
                  <div className="space-y-4 pt-4">
                    {upgradePath.byVersion.filter(({ features }) => features.length > 0).map(({ version: v, features }) => (
                      <div key={v.id} className="border rounded-lg overflow-hidden">
                        <div className={cn(
                          "px-4 py-2.5 flex items-center justify-between gap-2",
                          MAJOR_VERSIONS.has(v.version) ? "bg-yellow-500/10 border-b border-yellow-500/20" : "bg-muted/40 border-b"
                        )}>
                          <div className="flex items-center gap-2">
                            {MAJOR_VERSIONS.has(v.version) && <Star className="h-3.5 w-3.5 text-yellow-500" />}
                            <span className="font-semibold">v{v.version}</span>
                            {MAJOR_VERSIONS.has(v.version) && (
                              <Badge variant="outline" className="text-xs border-yellow-500/50 text-yellow-600 dark:text-yellow-400">Major</Badge>
                            )}
                          </div>
                          <div className="flex items-center gap-3 flex-shrink-0">
                            <span className="text-xs text-muted-foreground">{format(new Date(v.releaseDate), "MMM d, yyyy")}</span>
                            <Badge variant="secondary" className="text-xs">{features.length} features</Badge>
                          </div>
                        </div>
                        <div className="divide-y">
                          {features.map((feature, idx) => (
                            <div key={idx} className="px-4 py-2.5">
                              <div className="flex items-start justify-between gap-2">
                                <span className="font-medium text-sm">{feature.title}</span>
                                <Badge variant="outline" className="text-xs flex-shrink-0">{feature.category}</Badge>
                              </div>
                              <p className="text-xs text-muted-foreground mt-0.5 line-clamp-2">{feature.description}</p>
                            </div>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </ScrollArea>
              </TabsContent>

              {/* By Category tab */}
              <TabsContent value="by-category" className="flex-1 overflow-hidden m-0 p-0">
                <ScrollArea className="h-full px-6 pb-6">
                  <div className="space-y-3 pt-4">
                    {FEATURE_CATEGORIES.map(cat => {
                      const features = upgradePath.categoryBreakdown[cat.id];
                      if (!features || features.length === 0) return null;
                      const Icon = cat.icon;
                      return (
                        <Card key={cat.id}>
                          <CardHeader className="pb-2 pt-3 px-4">
                            <CardTitle className="text-sm flex items-center justify-between gap-2">
                              <span className={cn("flex items-center gap-2", cat.color)}>
                                <Icon className="h-4 w-4" />
                                {cat.label}
                              </span>
                              <Badge variant="secondary" className="text-xs">{features.length}</Badge>
                            </CardTitle>
                          </CardHeader>
                          <CardContent className="px-4 pb-3">
                            <div className="space-y-2">
                              {features.map((f, idx) => (
                                <div key={idx} className="flex items-start justify-between gap-2 text-sm">
                                  <div>
                                    <span className="font-medium">{f.title}</span>
                                    <p className="text-xs text-muted-foreground line-clamp-1 mt-0.5">{f.description}</p>
                                  </div>
                                  <Badge variant="outline" className="text-xs flex-shrink-0">v{(f as any).version}</Badge>
                                </div>
                              ))}
                            </div>
                          </CardContent>
                        </Card>
                      );
                    })}
                  </div>
                </ScrollArea>
              </TabsContent>

              {/* Chains tab */}
              <TabsContent value="chains" className="flex-1 overflow-hidden m-0 p-0">
                <ScrollArea className="h-full px-6 pb-6">
                  <div className="pt-4">
                    {upgradePath.chains.length === 0 ? (
                      <div className="text-center py-12 text-muted-foreground">
                        <GitMerge className="h-10 w-10 mx-auto mb-3 opacity-20" />
                        <p>No repeated capability threads detected in this version range.</p>
                        <p className="text-xs mt-1">Try a wider version range for more chain detection.</p>
                      </div>
                    ) : (
                      <div className="space-y-3">
                        <p className="text-sm text-muted-foreground mb-4">
                          {upgradePath.chains.length} capability thread{upgradePath.chains.length !== 1 ? "s" : ""} detected across this upgrade path — features that recur and evolve across multiple releases.
                        </p>
                        {upgradePath.chains.map((chain, chainIdx) => {
                          const cat = chain.catId ? FEATURE_CATEGORIES.find(c => c.id === chain.catId) : null;
                          const Icon = cat?.icon;
                          return (
                            <div key={chainIdx} className="border rounded-lg overflow-hidden">
                              <div className="px-4 py-2.5 bg-muted/40 border-b flex items-center gap-2">
                                {Icon && <Icon className={cn("h-4 w-4 flex-shrink-0", cat?.color)} />}
                                <span className="font-medium text-sm">{chain.title}</span>
                                <Badge variant="secondary" className="text-xs ml-auto flex-shrink-0">
                                  {chain.features.length} versions
                                </Badge>
                              </div>
                              <div className="relative pl-6 py-3 border-l-2 border-primary/20 ml-4 space-y-2">
                                {chain.features.map((f, i) => (
                                  <div key={f.id} className="relative">
                                    {i > 0 && (
                                      <div className="text-xs text-muted-foreground italic mb-0.5 -ml-2">→ evolved</div>
                                    )}
                                    <div className="flex items-start gap-2">
                                      <Badge variant="outline" className={cn("text-xs flex-shrink-0", i === 0 ? "border-primary/50 text-primary" : "")}>
                                        v{f.version}
                                      </Badge>
                                      <span className="text-sm">{f.title}</span>
                                    </div>
                                  </div>
                                ))}
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    )}
                  </div>
                </ScrollArea>
              </TabsContent>
            </Tabs>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
