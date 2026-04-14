import { useState, useMemo } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { GitMerge, ChevronDown, ChevronUp } from "lucide-react";
import { cn } from "@/lib/utils";
import { FEATURE_CATEGORIES, matchesCategory, type CategoryId } from "./FilterPanel";
import type { Version } from "@shared/schema";

interface EvolutionChain {
  id: string;
  title: string;
  features: Array<{
    id: string;
    title: string;
    description: string;
    version: string;
    releaseDate: string;
    isMajor: boolean;
  }>;
  versions: string[];
  categoryId: CategoryId | "other";
  maturity: "introduced" | "growing" | "mature-active" | "stable";
  featureCount: number;
  firstVersion: string;
  lastVersion: string;
  firstSeq: number;
  lastSeq: number;
}

const STOP_WORDS = new Set([
  "the", "a", "an", "and", "or", "but", "in", "on", "at", "to", "for",
  "of", "with", "by", "from", "as", "is", "was", "are", "been", "be",
  "have", "has", "had", "do", "does", "did", "will", "would", "could",
  "should", "may", "might", "can", "new", "now", "also", "that", "this",
  "which", "when", "where", "who", "what", "how", "all", "each", "every",
  "features", "feature", "improvements", "improvements", "enhancements",
  "updates", "support", "continued", "using", "allows", "provides", "adds",
]);

function tokenize(s: string): string[] {
  return s.toLowerCase()
    .split(/[^a-z0-9]+/)
    .filter(w => w.length > 2 && !STOP_WORDS.has(w));
}

function jaccard(a: string, b: string): number {
  const wordsA = tokenize(a);
  const wordsB = tokenize(b);
  const setA = new Set(wordsA);
  const setB = new Set(wordsB);
  if (setA.size === 0 || setB.size === 0) return 0;
  const intersection = wordsA.filter(w => setB.has(w)).length;
  const unionSet = new Set(wordsA.concat(wordsB));
  return intersection / unionSet.size;
}

const MAJOR_VERSIONS = new Set(["2027.0", "2026.3", "2024.0", "2023.0", "10.5", "10.0", "5.0", "3.0", "1.5"]);

function detectChains(versions: Version[]): EvolutionChain[] {
  const sorted = [...versions].sort(
    (a, b) => new Date(a.releaseDate).getTime() - new Date(b.releaseDate).getTime()
  );

  // Flatten all features with seq info
  type FlatFeature = {
    id: string;
    title: string;
    description: string;
    category: string;
    version: string;
    versionId: string;
    releaseDate: string;
    seq: number;
    isMajor: boolean;
  };

  const allFeatures: FlatFeature[] = sorted.flatMap((v, idx) =>
    v.features.map(f => ({
      ...f,
      version: v.version,
      versionId: v.id,
      releaseDate: v.releaseDate,
      seq: idx,
      isMajor: MAJOR_VERSIONS.has(v.version),
    }))
  );

  const assigned = new Set<string>();
  const chains: EvolutionChain[] = [];

  // Title similarity clustering
  allFeatures.forEach(anchor => {
    if (assigned.has(anchor.id)) return;

    const cluster: FlatFeature[] = [anchor];
    assigned.add(anchor.id);

    allFeatures.forEach(candidate => {
      if (assigned.has(candidate.id)) return;
      if (candidate.versionId === anchor.versionId) return;

      const sim = jaccard(anchor.title, candidate.title);
      if (sim >= 0.5) {
        cluster.push(candidate);
        assigned.add(candidate.id);
      }
    });

    if (cluster.length < 2) return;

    // Sort chronologically
    cluster.sort((a, b) => a.seq - b.seq);

    const versionIds = Array.from(new Set(cluster.map(f => f.versionId)));
    const seqs = cluster.map(f => f.seq);
    const firstSeq = Math.min(...seqs);
    const lastSeq = Math.max(...seqs);
    const totalVersions = sorted.length;

    // Determine maturity
    const isStillActive = lastSeq >= totalVersions - 4;
    let maturity: EvolutionChain["maturity"];
    if (cluster.length === 1) maturity = "introduced";
    else if (cluster.length <= 3 && isStillActive) maturity = "growing";
    else if (cluster.length > 3 && isStillActive) maturity = "mature-active";
    else maturity = "stable";

    // Primary category
    const catCounts: Partial<Record<CategoryId, number>> = {};
    cluster.forEach(f => {
      FEATURE_CATEGORIES.forEach(cat => {
        if (matchesCategory(f, cat.id)) {
          catCounts[cat.id] = (catCounts[cat.id] || 0) + 1;
        }
      });
    });
    const primaryCat = (Object.entries(catCounts).sort((a, b) => (b[1] as number) - (a[1] as number))[0]?.[0] as CategoryId) || "other";

    // Title: strip common suffixes from first feature's title
    const chainTitle = cluster[0].title
      .replace(/\s*(Enhancements?|Improvements?|Updates?|Continued|Phase\s*\d+)\s*$/i, "")
      .trim();

    chains.push({
      id: `chain-${anchor.id}`,
      title: chainTitle,
      features: cluster.map(f => ({
        id: f.id,
        title: f.title,
        description: f.description,
        version: f.version,
        releaseDate: f.releaseDate,
        isMajor: f.isMajor,
      })),
      versions: versionIds,
      categoryId: primaryCat,
      maturity,
      featureCount: cluster.length,
      firstVersion: cluster[0].version,
      lastVersion: cluster[cluster.length - 1].version,
      firstSeq,
      lastSeq,
    });
  });

  return chains.sort((a, b) => b.featureCount - a.featureCount);
}

const MATURITY_CONFIG = {
  introduced: { label: "Just Introduced", color: "bg-blue-500/20 text-blue-700 dark:text-blue-300" },
  growing: { label: "Growing", color: "bg-green-500/20 text-green-700 dark:text-green-300" },
  "mature-active": { label: "Mature & Active", color: "bg-primary/20 text-primary" },
  stable: { label: "Stable", color: "bg-muted text-muted-foreground" },
} as const;

const CHANGE_WORDS = ["enhanced", "improved", "expanded", "extended", "updated", "upgraded"];

function detectChangeLabel(prev: string, curr: string): string {
  const lc = curr.toLowerCase();
  if (lc.includes("continued")) return "continued";
  if (CHANGE_WORDS.some(w => lc.includes(w))) return "enhanced";
  if (jaccard(prev, curr) > 0.6) return "iterated";
  return "evolved";
}

function ChainCard({
  chain,
  totalVersions,
  onScrollToFeature,
}: {
  chain: EvolutionChain;
  totalVersions: number;
  onScrollToFeature?: (featureId: string) => void;
}) {
  const [open, setOpen] = useState(false);
  const cat = chain.categoryId !== "other" ? FEATURE_CATEGORIES.find(c => c.id === chain.categoryId) : null;
  const maturity = MATURITY_CONFIG[chain.maturity];
  const Icon = cat?.icon;

  const leftPct = ((chain.firstSeq / totalVersions) * 100).toFixed(1);
  const widthPct = (((chain.lastSeq - chain.firstSeq) / totalVersions) * 100).toFixed(1);

  return (
    <div className={cn("border rounded-lg overflow-hidden transition-colors", open && "border-primary/40")}>
      <button
        className="w-full text-left px-4 py-3 flex items-center justify-between gap-4 hover-elevate"
        onClick={() => setOpen(o => !o)}
        data-testid={`chain-card-${chain.id}`}
      >
        <div className="flex items-center gap-3 min-w-0">
          {Icon && <Icon className={cn("h-4 w-4 flex-shrink-0", cat?.color)} />}
          <div className="min-w-0">
            <p className="font-medium text-sm truncate">{chain.title}</p>
            <p className="text-xs text-muted-foreground">
              {chain.featureCount} features · {chain.versions.length} versions · v{chain.firstVersion} → v{chain.lastVersion}
            </p>
          </div>
        </div>
        <div className="flex items-center gap-3 flex-shrink-0">
          <Badge variant="secondary" className={cn("text-xs hidden sm:flex", maturity.color)}>
            {maturity.label}
          </Badge>
          {/* Mini timeline bar */}
          <div className="w-24 hidden md:block">
            <div className="relative h-2 bg-muted rounded-full overflow-visible">
              {chain.features.map((f, i) => {
                const pos = ((chain.firstSeq + i) / totalVersions * 100).toFixed(1);
                return (
                  <div
                    key={i}
                    className={cn("absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full z-10", cat?.color?.includes("text-") ? "bg-primary" : "bg-primary")}
                    style={{ left: `${pos}%` }}
                  />
                );
              })}
              <div
                className="absolute top-0.5 h-1 rounded-full bg-primary/20"
                style={{ left: `${leftPct}%`, width: `${Math.max(parseFloat(widthPct), 2)}%` }}
              />
            </div>
          </div>
          {open ? <ChevronUp className="h-4 w-4 text-muted-foreground" /> : <ChevronDown className="h-4 w-4 text-muted-foreground" />}
        </div>
      </button>

      {open && (
        <div className="border-t px-4 pb-4 pt-3">
          <div className="relative pl-4 border-l-2 border-primary/20 space-y-3">
            {chain.features.map((f, i) => {
              const changeLabel = i > 0 ? detectChangeLabel(chain.features[i - 1].title, f.title) : "introduced";
              return (
                <div key={f.id} className="relative">
                  {i > 0 && (
                    <div className="text-xs text-muted-foreground italic mb-1 pl-1">
                      → {changeLabel}
                    </div>
                  )}
                  <div className="bg-muted/40 rounded-md p-3 border">
                    <div className="flex items-center justify-between gap-2 mb-1">
                      <span className="text-xs font-semibold text-primary">v{f.version}</span>
                      {f.isMajor && (
                        <Badge variant="outline" className="text-xs border-yellow-500/50 text-yellow-600 dark:text-yellow-400 h-4 px-1">
                          Major
                        </Badge>
                      )}
                    </div>
                    <p className="font-medium text-sm">{f.title}</p>
                    <p className="text-xs text-muted-foreground mt-1 line-clamp-2">{f.description}</p>
                    {onScrollToFeature && (
                      <button
                        className="text-xs text-primary hover:underline mt-1.5"
                        onClick={(e) => { e.stopPropagation(); onScrollToFeature(f.id); }}
                      >
                        View in timeline →
                      </button>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}

interface EvolutionChainsDialogProps {
  versions: Version[];
  onScrollToFeature?: (featureId: string) => void;
}

export default function EvolutionChainsDialog({ versions, onScrollToFeature }: EvolutionChainsDialogProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [sortBy, setSortBy] = useState<"length" | "recent" | "category">("length");
  const [filterMaturity, setFilterMaturity] = useState<string>("all");
  const [filterCategory, setFilterCategory] = useState<string>("all");

  const chains = useMemo(() => versions.length > 0 ? detectChains(versions) : [], [versions]);

  const filtered = useMemo(() => {
    let result = [...chains];
    if (filterMaturity !== "all") result = result.filter(c => c.maturity === filterMaturity);
    if (filterCategory !== "all") result = result.filter(c => c.categoryId === filterCategory);
    if (sortBy === "recent") result.sort((a, b) => b.lastSeq - a.lastSeq);
    if (sortBy === "category") result.sort((a, b) => a.categoryId.localeCompare(b.categoryId));
    return result;
  }, [chains, sortBy, filterMaturity, filterCategory]);

  const totalVersions = versions.length;

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm" className="gap-2" data-testid="button-evolution-chains">
          <GitMerge className="h-4 w-4" />
          <span className="hidden sm:inline">Evolution Chains</span>
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-3xl max-h-[90vh] flex flex-col p-0 gap-0">
        <DialogHeader className="px-6 pt-6 pb-4 border-b flex-shrink-0">
          <DialogTitle className="flex items-center gap-2">
            <GitMerge className="h-5 w-5" />
            Feature Evolution Chains
          </DialogTitle>
          <p className="text-sm text-muted-foreground">
            {chains.length} capability arcs detected across {totalVersions} versions — features that evolved across multiple releases
          </p>
        </DialogHeader>

        <div className="px-6 py-3 border-b flex-shrink-0 flex flex-wrap items-center gap-3">
          <Select value={sortBy} onValueChange={(v) => setSortBy(v as typeof sortBy)}>
            <SelectTrigger className="w-44" data-testid="select-chain-sort">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="length">Longest chains first</SelectItem>
              <SelectItem value="recent">Most recently active</SelectItem>
              <SelectItem value="category">By category</SelectItem>
            </SelectContent>
          </Select>

          <Select value={filterMaturity} onValueChange={setFilterMaturity}>
            <SelectTrigger className="w-44" data-testid="select-chain-maturity">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All maturity stages</SelectItem>
              <SelectItem value="growing">Growing</SelectItem>
              <SelectItem value="mature-active">Mature & Active</SelectItem>
              <SelectItem value="stable">Stable</SelectItem>
              <SelectItem value="introduced">Just Introduced</SelectItem>
            </SelectContent>
          </Select>

          <Select value={filterCategory} onValueChange={setFilterCategory}>
            <SelectTrigger className="w-44" data-testid="select-chain-category">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All categories</SelectItem>
              {FEATURE_CATEGORIES.map(cat => (
                <SelectItem key={cat.id} value={cat.id}>{cat.label}</SelectItem>
              ))}
            </SelectContent>
          </Select>

          <span className="text-xs text-muted-foreground ml-auto">{filtered.length} chains</span>
        </div>

        <ScrollArea className="flex-1">
          <div className="px-6 py-4 space-y-2">
            {filtered.length === 0 ? (
              <div className="text-center py-12 text-muted-foreground">
                No chains match the selected filters
              </div>
            ) : (
              filtered.map(chain => (
                <ChainCard
                  key={chain.id}
                  chain={chain}
                  totalVersions={totalVersions}
                  onScrollToFeature={(featureId) => {
                    onScrollToFeature?.(featureId);
                    setIsOpen(false);
                  }}
                />
              ))
            )}
          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
}
