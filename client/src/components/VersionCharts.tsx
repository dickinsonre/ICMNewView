import { useMemo, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea } from "@/components/ui/scroll-area";
import { ChevronDown, ChevronUp, BarChart3, TrendingUp, PieChart, Grid3X3 } from "lucide-react";
import { cn } from "@/lib/utils";
import type { Version } from "@shared/schema";
import { FEATURE_CATEGORIES, matchesCategory, type CategoryId } from "./FilterPanel";

interface VersionChartsProps {
  versions: Version[];
}

export default function VersionCharts({ versions }: VersionChartsProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [activeTab, setActiveTab] = useState<"charts" | "heatmap">("charts");

  const stats = useMemo(() => {
    const sortedByDate = [...versions].sort((a, b) =>
      new Date(a.releaseDate).getTime() - new Date(b.releaseDate).getTime()
    );

    const featuresByYear: Record<string, number> = {};
    const categoryTotals: Record<string, number> = {};

    versions.forEach(v => {
      const year = new Date(v.releaseDate).getFullYear().toString();
      featuresByYear[year] = (featuresByYear[year] || 0) + v.features.length;

      v.features.forEach(f => {
        categoryTotals[f.category] = (categoryTotals[f.category] || 0) + 1;
      });
    });

    const categoryBreakdown: Record<CategoryId, number> = {
      cloud: 0, ui: 0, "2d": 0, data: 0, scripting: 0, admin: 0, analysis: 0,
    };

    versions.forEach(v => {
      v.features.forEach(f => {
        FEATURE_CATEGORIES.forEach(cat => {
          if (matchesCategory(f, cat.id)) {
            categoryBreakdown[cat.id]++;
          }
        });
      });
    });

    const recentVersions = sortedByDate.slice(-10);
    const maxFeatures = Math.max(...versions.map(v => v.features.length), 1);
    const totalFeatures = versions.reduce((sum, v) => sum + v.features.length, 0);
    const topCategories = Object.entries(categoryTotals).sort((a, b) => b[1] - a[1]).slice(0, 5);

    return {
      featuresByYear,
      categoryTotals,
      categoryBreakdown,
      recentVersions,
      maxFeatures,
      totalFeatures,
      topCategories,
      yearsRange: Object.keys(featuresByYear).sort(),
      sortedByDate,
    };
  }, [versions]);

  // Heatmap matrix: category × version
  const heatmapData = useMemo(() => {
    const sorted = [...versions].sort(
      (a, b) => new Date(a.releaseDate).getTime() - new Date(b.releaseDate).getTime()
    );

    const matrix = FEATURE_CATEGORIES.map(cat => ({
      cat,
      counts: sorted.map(v => ({
        version: v.version,
        versionId: v.id,
        count: v.features.filter(f => matchesCategory(f, cat.id)).length,
      })),
    }));

    const globalMax = Math.max(
      ...matrix.flatMap(r => r.counts.map(c => c.count)),
      1
    );

    return { sorted, matrix, globalMax };
  }, [versions]);

  if (!isExpanded) {
    return (
      <Button
        variant="outline"
        size="sm"
        onClick={() => setIsExpanded(true)}
        className="gap-2"
        data-testid="button-show-charts"
      >
        <BarChart3 className="h-4 w-4" />
        <span className="hidden sm:inline">Analytics</span>
        <ChevronDown className="h-4 w-4" />
      </Button>
    );
  }

  const maxYearFeatures = Math.max(...Object.values(stats.featuresByYear), 1);
  const maxCategoryCount = Math.max(...Object.values(stats.categoryBreakdown), 1);

  return (
    <Card className="mt-4 w-full">
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between gap-2 flex-wrap">
          <CardTitle className="text-lg flex items-center gap-2">
            <BarChart3 className="h-5 w-5" />
            Release Analytics
          </CardTitle>
          <Button variant="ghost" size="icon" onClick={() => setIsExpanded(false)} data-testid="button-hide-charts">
            <ChevronUp className="h-4 w-4" />
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <Tabs value={activeTab} onValueChange={(v) => setActiveTab(v as typeof activeTab)}>
          <TabsList className="mb-4 w-full">
            <TabsTrigger value="charts" className="flex-1 gap-2">
              <TrendingUp className="h-3.5 w-3.5" />
              Charts
            </TabsTrigger>
            <TabsTrigger value="heatmap" className="flex-1 gap-2" data-testid="tab-heatmap">
              <Grid3X3 className="h-3.5 w-3.5" />
              Category Heatmap
            </TabsTrigger>
          </TabsList>

          <TabsContent value="charts" className="space-y-6 mt-0">
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <div className="flex items-center gap-2 mb-3">
                  <TrendingUp className="h-4 w-4 text-primary" />
                  <span className="font-medium text-sm">Features by Year</span>
                </div>
                <div className="space-y-2">
                  {stats.yearsRange.map(year => {
                    const count = stats.featuresByYear[year];
                    const percentage = (count / maxYearFeatures) * 100;
                    return (
                      <div key={year} className="flex items-center gap-3">
                        <span className="text-xs font-mono w-10 text-muted-foreground">{year}</span>
                        <div className="flex-1 h-5 bg-muted rounded-sm overflow-hidden">
                          <div className="h-full bg-primary/70 transition-all" style={{ width: `${percentage}%` }} />
                        </div>
                        <span className="text-xs font-mono w-8 text-right">{count}</span>
                      </div>
                    );
                  })}
                </div>
              </div>

              <div>
                <div className="flex items-center gap-2 mb-3">
                  <PieChart className="h-4 w-4 text-primary" />
                  <span className="font-medium text-sm">Development Focus Areas</span>
                </div>
                <div className="space-y-2">
                  {FEATURE_CATEGORIES.map(cat => {
                    const count = stats.categoryBreakdown[cat.id];
                    const percentage = (count / maxCategoryCount) * 100;
                    const Icon = cat.icon;
                    return (
                      <div key={cat.id} className="flex items-center gap-2">
                        <Icon className="h-3 w-3 text-muted-foreground" />
                        <span className="text-xs w-24 truncate">{cat.label}</span>
                        <div className="flex-1 h-4 bg-muted rounded-sm overflow-hidden">
                          <div
                            className={cn("h-full transition-all", cat.color.replace("text-", "bg-").split(" ")[0])}
                            style={{ width: `${percentage}%` }}
                          />
                        </div>
                        <span className="text-xs font-mono w-8 text-right">{count}</span>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>

            <div className="border-t pt-4">
              <div className="flex items-center gap-2 mb-3">
                <BarChart3 className="h-4 w-4 text-primary" />
                <span className="font-medium text-sm">Recent Releases (Last 10)</span>
              </div>
              <div className="flex items-end gap-1 h-24">
                {stats.recentVersions.map(v => {
                  const height = (v.features.length / stats.maxFeatures) * 100;
                  return (
                    <div key={v.id} className="flex-1 flex flex-col items-center gap-1">
                      <span className="text-xs font-mono">{v.features.length}</span>
                      <div
                        className="w-full bg-primary/70 rounded-t transition-all hover:bg-primary"
                        style={{ height: `${Math.max(height, 5)}%` }}
                        title={`v${v.version}: ${v.features.length} features`}
                      />
                      <span className="text-xs text-muted-foreground rotate-45 origin-left translate-y-2 whitespace-nowrap">
                        {v.version}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="border-t pt-4">
              <div className="text-sm text-muted-foreground">
                <span className="font-medium text-foreground">{stats.totalFeatures}</span> features across{" "}
                <span className="font-medium text-foreground">{versions.length}</span> versions from{" "}
                <span className="font-medium text-foreground">{stats.yearsRange[0]}</span> to{" "}
                <span className="font-medium text-foreground">{stats.yearsRange[stats.yearsRange.length - 1]}</span>
              </div>
              <div className="flex flex-wrap gap-2 mt-2">
                {stats.topCategories.map(([cat, count]) => (
                  <Badge key={cat} variant="secondary" className="text-xs">
                    {cat}: {count}
                  </Badge>
                ))}
              </div>
            </div>
          </TabsContent>

          <TabsContent value="heatmap" className="mt-0">
            <div className="mb-3">
              <p className="text-sm text-muted-foreground">
                Feature density per category across all {heatmapData.sorted.length} versions.
                Darker cells = more features.
              </p>
            </div>
            <ScrollArea className="w-full" data-testid="heatmap-container">
              <div className="min-w-max">
                {/* Column headers: versions (grouped/abbreviated) */}
                <div className="flex">
                  <div className="w-32 flex-shrink-0" />
                  <div className="flex gap-px">
                    {heatmapData.sorted.map(v => (
                      <div
                        key={v.id}
                        className="w-5 text-center"
                        title={`v${v.version}`}
                      >
                        <span
                          className="text-[8px] text-muted-foreground writing-mode-vertical"
                          style={{ writingMode: "vertical-rl", textOrientation: "mixed", transform: "rotate(180deg)", display: "block", height: 36 }}
                        >
                          {v.version}
                        </span>
                      </div>
                    ))}
                  </div>
                  <div className="w-8 flex-shrink-0 text-[9px] text-muted-foreground text-right self-end pb-1">Total</div>
                </div>

                {/* Rows: categories */}
                {heatmapData.matrix.map(({ cat, counts }) => {
                  const rowTotal = counts.reduce((s, c) => s + c.count, 0);
                  const Icon = cat.icon;
                  return (
                    <div key={cat.id} className="flex items-center mt-px">
                      <div className="w-32 flex-shrink-0 flex items-center gap-1.5 pr-2">
                        <Icon className={cn("h-3 w-3 flex-shrink-0", cat.color)} />
                        <span className="text-xs truncate">{cat.label}</span>
                      </div>
                      <div className="flex gap-px">
                        {counts.map(({ versionId, version, count }) => {
                          const intensity = count === 0 ? 0 : Math.pow(count / heatmapData.globalMax, 0.6);
                          return (
                            <div
                              key={versionId}
                              className="w-5 h-5 rounded-[2px] flex items-center justify-center"
                              style={{
                                backgroundColor: count === 0
                                  ? "hsl(var(--muted))"
                                  : `hsl(var(--primary) / ${Math.max(intensity * 0.85, 0.08)})`,
                              }}
                              title={`v${version} · ${cat.label}: ${count}`}
                            >
                              {count > 0 && (
                                <span className="text-[7px] font-bold leading-none" style={{
                                  color: intensity > 0.5 ? "hsl(var(--primary-foreground))" : "hsl(var(--primary))"
                                }}>
                                  {count}
                                </span>
                              )}
                            </div>
                          );
                        })}
                      </div>
                      <div className="w-8 flex-shrink-0 text-xs text-muted-foreground text-right pl-1">
                        {rowTotal}
                      </div>
                    </div>
                  );
                })}

                {/* Column totals */}
                <div className="flex mt-2 border-t pt-1">
                  <div className="w-32 flex-shrink-0 text-xs text-muted-foreground">Total</div>
                  <div className="flex gap-px">
                    {heatmapData.sorted.map(v => (
                      <div key={v.id} className="w-5 text-center">
                        <span className="text-[8px] text-muted-foreground">{v.features.length}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </ScrollArea>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
}
