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
import { GitCompare, ArrowRightLeft, Copy, Star, ChevronRight, BarChart2, AlignJustify, Layers } from "lucide-react";
import { cn } from "@/lib/utils";
import { useToast } from "@/hooks/use-toast";
import { FEATURE_CATEGORIES, matchesCategory, type CategoryId } from "./FilterPanel";
import type { Version } from "@shared/schema";
import { format } from "date-fns";

interface CompareVersionsDialogProps {
  versions: Version[];
}

const MAJOR_VERSIONS = new Set(["2027.0", "2026.3", "2024.0", "2023.0", "10.5", "10.0", "5.0", "3.0", "1.5"]);

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

  // Versions strictly between from (exclusive) and to (inclusive)
  const spannedVersions = sorted.slice(lowerIdx + 1, upperIdx + 1);

  const allFeatures = spannedVersions.flatMap(v =>
    v.features.map(f => ({
      ...f,
      version: v.version,
      versionId: v.id,
      releaseDate: v.releaseDate,
      isMajorVersion: MAJOR_VERSIONS.has(v.version),
    }))
  );

  const byVersion = spannedVersions.map(v => ({
    version: v,
    features: v.features,
  }));

  const categoryBreakdown: Partial<Record<CategoryId, typeof allFeatures>> = {};
  FEATURE_CATEGORIES.forEach(cat => {
    const matches = allFeatures.filter(f => matchesCategory(f, cat.id));
    if (matches.length > 0) categoryBreakdown[cat.id] = matches;
  });

  const majorReleases = spannedVersions.filter(v => MAJOR_VERSIONS.has(v.version));

  return {
    from,
    to,
    spannedVersions,
    allFeatures,
    byVersion,
    categoryBreakdown,
    totalFeatures: allFeatures.length,
    versionsCount: spannedVersions.length,
    majorReleasesCount: majorReleases.length,
    avgPerVersion: spannedVersions.length > 0
      ? (allFeatures.length / spannedVersions.length).toFixed(1)
      : "0",
    topCategories: Object.entries(categoryBreakdown)
      .map(([id, feats]) => ({ id: id as CategoryId, count: (feats as typeof allFeatures).length }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 4),
  };
}

function SummaryBanner({ path }: { path: ReturnType<typeof computeUpgradePath> }) {
  if (!path) return null;
  return (
    <div className="rounded-lg border bg-primary/5 border-primary/20 p-4 mb-4">
      <div className="flex flex-wrap items-center gap-3 mb-3">
        <span className="text-xl font-bold text-muted-foreground">v{path.from.version}</span>
        <ChevronRight className="h-4 w-4 text-muted-foreground" />
        <span className="text-sm text-muted-foreground">{path.versionsCount} versions</span>
        <ChevronRight className="h-4 w-4 text-muted-foreground" />
        <span className="text-xl font-bold text-primary">v{path.to.version}</span>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-3">
        {[
          { label: "New Features", value: path.totalFeatures },
          { label: "Versions", value: path.versionsCount },
          { label: "Major Releases", value: path.majorReleasesCount },
          { label: "Avg / Release", value: path.avgPerVersion },
        ].map(stat => (
          <div key={stat.label} className="text-center">
            <div className="text-2xl font-bold">{stat.value}</div>
            <div className="text-xs text-muted-foreground uppercase tracking-wide">{stat.label}</div>
          </div>
        ))}
      </div>
      <div className="flex flex-wrap gap-1.5">
        {path.topCategories.map(({ id, count }) => {
          const cat = FEATURE_CATEGORIES.find(c => c.id === id);
          if (!cat) return null;
          const Icon = cat.icon;
          return (
            <Badge key={id} variant="secondary" className={cn("gap-1 text-xs", cat.color)}>
              <Icon className="h-2.5 w-2.5" />
              {cat.label}: {count}
            </Badge>
          );
        })}
      </div>
    </div>
  );
}

export default function CompareVersionsDialog({ versions }: CompareVersionsDialogProps) {
  const { toast } = useToast();
  const [isOpen, setIsOpen] = useState(false);
  const [fromId, setFromId] = useState<string>("");
  const [toId, setToId] = useState<string>("");
  const [viewMode, setViewMode] = useState<"by-version" | "by-category">("by-version");

  const upgradePath = useMemo(() => {
    if (!fromId || !toId || fromId === toId) return null;
    return computeUpgradePath(versions, fromId, toId);
  }, [versions, fromId, toId]);

  const swap = () => {
    const tmp = fromId;
    setFromId(toId);
    setToId(tmp);
  };

  const exportMarkdown = () => {
    if (!upgradePath) return;
    const p = upgradePath;
    let md = `# ICM InfoWorks Upgrade Path: v${p.from.version} → v${p.to.version}\n\n`;
    md += `**${p.totalFeatures} new features** across ${p.versionsCount} versions (${p.majorReleasesCount} major releases)\n\n`;
    md += `## Top Categories\n\n`;
    p.topCategories.forEach(({ id, count }) => {
      const cat = FEATURE_CATEGORIES.find(c => c.id === id);
      if (cat) md += `- **${cat.label}**: ${count} features\n`;
    });
    md += `\n## Features by Version\n\n`;
    p.byVersion.forEach(({ version: v, features }) => {
      if (features.length === 0) return;
      md += `### Version ${v.version}`;
      if (MAJOR_VERSIONS.has(v.version)) md += " ★ Major Release";
      md += ` (${format(new Date(v.releaseDate), "MMM yyyy")})\n\n`;
      features.forEach(f => {
        md += `- **${f.title}** — ${f.description.slice(0, 120)}...\n`;
      });
      md += "\n";
    });
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

        {!upgradePath && (
          <div className="flex-1 flex items-center justify-center text-muted-foreground p-12">
            <div className="text-center">
              <GitCompare className="h-12 w-12 mx-auto mb-3 opacity-20" />
              <p>Select two different versions to see the upgrade path between them</p>
            </div>
          </div>
        )}

        {upgradePath && (
          <div className="flex-1 overflow-hidden flex flex-col">
            <Tabs value={viewMode} onValueChange={(v) => setViewMode(v as typeof viewMode)} className="flex-1 flex flex-col overflow-hidden">
              <div className="px-6 pt-3 pb-0 flex-shrink-0">
                <SummaryBanner path={upgradePath} />
                <TabsList className="w-full">
                  <TabsTrigger value="by-version" className="flex-1 gap-2" data-testid="tab-compare-by-version">
                    <AlignJustify className="h-3.5 w-3.5" />
                    By Version
                  </TabsTrigger>
                  <TabsTrigger value="by-category" className="flex-1 gap-2" data-testid="tab-compare-by-category">
                    <Layers className="h-3.5 w-3.5" />
                    By Category
                  </TabsTrigger>
                </TabsList>
              </div>

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
                              <Badge variant="outline" className="text-xs border-yellow-500/50 text-yellow-600 dark:text-yellow-400">
                                Major Release
                              </Badge>
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
            </Tabs>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
