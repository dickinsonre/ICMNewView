import { useMemo, useState, useRef, useCallback } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ChevronDown, ChevronUp, BarChart3, TrendingUp, PieChart, Grid3X3 } from "lucide-react";
import { cn } from "@/lib/utils";
import type { Version } from "@shared/schema";
import { FEATURE_CATEGORIES, matchesCategory, type CategoryId } from "./FilterPanel";

interface VersionChartsProps {
  versions: Version[];
  onHeatmapCellClick?: (versionId: string, categoryId: string) => void;
}

// Extended heatmap categories with dedicated hex colors + keyword sets
export const HEATMAP_CATEGORIES = [
  {
    id: "cloud",
    label: "Cloud / SaaS",
    hexColor: "#38bdf8",
    keywords: ["cloud", "saas", "web", "online", "remote", "master database", "agent-based"],
  },
  {
    id: "2d",
    label: "2D Modelling",
    hexColor: "#3b82f6",
    keywords: ["2d", "mesh", "subgrid", "raster", "flood", "boundary zone", "surface", "terrain", "inundation"],
  },
  {
    id: "ui",
    label: "UI / UX",
    hexColor: "#a78bfa",
    keywords: ["interface", "ui", "dialog", "display", "geoplan", "icon", "toolbar", "window", "theme", "home tab", "context menu"],
  },
  {
    id: "data",
    label: "Data Management",
    hexColor: "#f97316",
    keywords: ["import", "export", "odic", "hec-ras", "csv", "gis", "esri", "geodatabase", "shapefile", "netcdf", "database", "tsdb"],
  },
  {
    id: "1d",
    label: "1D Hydraulics",
    hexColor: "#22c55e",
    keywords: ["1d", "river", "hydraulic", "reach", "channel", "node", "conduit", "manhole", "pipe", "weir", "orifice", "pump"],
  },
  {
    id: "gis",
    label: "GIS Integration",
    hexColor: "#eab308",
    keywords: ["gis", "esri", "arcgis", "shapefile", "projection", "coordinate", "raster", "spatial", "map", "geospatial"],
  },
  {
    id: "rainfall",
    label: "Rainfall",
    hexColor: "#64748b",
    keywords: ["rainfall", "rain", "feh", "noaa", "atlas 14", "euler", "idf", "precipitation", "storm", "design storm"],
  },
  {
    id: "wq",
    label: "Water Quality",
    hexColor: "#d946ef",
    keywords: ["water quality", "sediment", "pollutant", "contaminant", "diffusion", "estuary", "quality", "erosion", "wq"],
  },
  {
    id: "scripting",
    label: "Scripting / API",
    hexColor: "#78716c",
    keywords: ["ruby", "script", "automation", "icmexchange", "api", "batch", "custom action", "plugin"],
  },
  {
    id: "swmm",
    label: "SWMM",
    hexColor: "#6366f1",
    keywords: ["swmm", "suds", "lid", "dynamic wave", "climatology"],
  },
  {
    id: "analysis",
    label: "Analysis / Results",
    hexColor: "#14b8a6",
    keywords: ["result", "report", "analysis", "simulation", "output", "graph", "chart", "statistics", "profile"],
  },
] as const;

type HeatmapCatId = typeof HEATMAP_CATEGORIES[number]["id"];

function matchesHeatmapCategory(feature: { title: string; description: string; category: string }, catId: HeatmapCatId): boolean {
  const text = `${feature.title} ${feature.description} ${feature.category}`.toLowerCase();
  const cat = HEATMAP_CATEGORIES.find(c => c.id === catId);
  if (!cat) return false;
  return cat.keywords.some(kw => text.includes(kw));
}

function cellColor(intensity: number, hexColor: string, scheme: string): string {
  if (intensity === 0) return "transparent";
  const alpha = (0.15 + intensity * 0.8).toFixed(2);
  if (scheme === "category") {
    const r = parseInt(hexColor.slice(1, 3), 16);
    const g = parseInt(hexColor.slice(3, 5), 16);
    const b = parseInt(hexColor.slice(5, 7), 16);
    return `rgba(${r},${g},${b},${alpha})`;
  }
  if (scheme === "blue") return `rgba(59,130,246,${alpha})`;
  if (scheme === "heat") {
    const g = Math.round(255 * (1 - intensity * 0.8));
    return `rgba(255,${g},${Math.round(50 * (1 - intensity))},${alpha})`;
  }
  if (scheme === "viridis") {
    const t = intensity;
    return `rgba(${Math.round(68 + t * 185)},${Math.round(1 + t * 230)},${Math.round(84 - t * 47)},${alpha})`;
  }
  return `rgba(99,102,241,${alpha})`;
}

const MAJOR_VERSIONS = new Set(["2027.0", "2026.3", "2024.0", "2023.0", "10.5", "10.0", "5.0", "3.0", "1.5"]);

interface TooltipState {
  visible: boolean;
  x: number;
  y: number;
  catId: HeatmapCatId;
  versionId: string;
  count: number;
  features: string[];
}

export default function VersionCharts({ versions, onHeatmapCellClick }: VersionChartsProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [activeTab, setActiveTab] = useState<"charts" | "heatmap">("charts");
  const [colorScheme, setColorScheme] = useState<"category" | "blue" | "heat" | "viridis">("category");
  const [normalizeByRow, setNormalizeByRow] = useState(false);
  const [showValues, setShowValues] = useState(true);
  const [hoveredRow, setHoveredRow] = useState<HeatmapCatId | null>(null);
  const [hoveredCol, setHoveredCol] = useState<string | null>(null);
  const [tooltip, setTooltip] = useState<TooltipState | null>(null);
  const heatmapRef = useRef<HTMLDivElement>(null);

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
    const categoryBreakdown: Partial<Record<CategoryId, number>> = {};
    FEATURE_CATEGORIES.forEach(cat => {
      categoryBreakdown[cat.id] = 0;
      versions.forEach(v => v.features.forEach(f => {
        if (matchesCategory(f, cat.id)) categoryBreakdown[cat.id]!++;
      }));
    });
    const recentVersions = sortedByDate.slice(-10);
    const maxFeatures = Math.max(...versions.map(v => v.features.length), 1);
    const totalFeatures = versions.reduce((sum, v) => sum + v.features.length, 0);
    const topCategories = Object.entries(categoryTotals).sort((a, b) => b[1] - a[1]).slice(0, 5);
    return { featuresByYear, categoryBreakdown, recentVersions, maxFeatures, totalFeatures, topCategories, yearsRange: Object.keys(featuresByYear).sort() };
  }, [versions]);

  const heatmapData = useMemo(() => {
    const sorted = [...versions].sort(
      (a, b) => new Date(a.releaseDate).getTime() - new Date(b.releaseDate).getTime()
    );

    // Build matrix: row = heatmap category, col = version
    const matrix = HEATMAP_CATEGORIES.map(cat => {
      const counts = sorted.map(v => {
        const matching = v.features.filter(f => matchesHeatmapCategory(f, cat.id));
        return {
          version: v.version,
          versionId: v.id,
          count: matching.length,
          features: matching.slice(0, 5).map(f => f.title),
        };
      });
      const rowTotal = counts.reduce((s, c) => s + c.count, 0);
      return { cat, counts, rowTotal };
    });

    // Sort rows by total (descending)
    matrix.sort((a, b) => b.rowTotal - a.rowTotal);

    const globalMax = Math.max(...matrix.flatMap(r => r.counts.map(c => c.count)), 1);
    const colTotals = sorted.map(v => v.features.length);

    return { sorted, matrix, globalMax, colTotals };
  }, [versions]);

  const getCellIntensity = useCallback((count: number, rowMax: number, cat: typeof HEATMAP_CATEGORIES[number]) => {
    const refMax = normalizeByRow ? rowMax : heatmapData.globalMax;
    return refMax > 0 ? count / refMax : 0;
  }, [normalizeByRow, heatmapData.globalMax]);

  const handleCellMouseEnter = (
    e: React.MouseEvent,
    catId: HeatmapCatId,
    versionId: string,
    count: number,
    features: string[]
  ) => {
    const rect = (e.target as HTMLElement).getBoundingClientRect();
    const containerRect = heatmapRef.current?.getBoundingClientRect();
    setTooltip({
      visible: true,
      x: rect.right - (containerRect?.left ?? 0) + 8,
      y: rect.top - (containerRect?.top ?? 0) - 10,
      catId,
      versionId,
      count,
      features,
    });
  };

  const handleCellClick = (versionId: string, catId: string) => {
    onHeatmapCellClick?.(versionId, catId);
  };

  if (!isExpanded) {
    return (
      <Button variant="outline" size="sm" onClick={() => setIsExpanded(true)} className="gap-2" data-testid="button-show-charts">
        <BarChart3 className="h-4 w-4" />
        <span className="hidden sm:inline">Analytics</span>
        <ChevronDown className="h-4 w-4" />
      </Button>
    );
  }

  const maxYearFeatures = Math.max(...Object.values(stats.featuresByYear), 1);
  const maxCategoryCount = Math.max(...Object.values(stats.categoryBreakdown).map(v => v ?? 0), 1);

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
                    const pct = (count / maxYearFeatures) * 100;
                    return (
                      <div key={year} className="flex items-center gap-3">
                        <span className="text-xs font-mono w-10 text-muted-foreground">{year}</span>
                        <div className="flex-1 h-5 bg-muted rounded-sm overflow-hidden">
                          <div className="h-full bg-primary/70 transition-all" style={{ width: `${pct}%` }} />
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
                    const count = stats.categoryBreakdown[cat.id] ?? 0;
                    const pct = (count / maxCategoryCount) * 100;
                    const Icon = cat.icon;
                    return (
                      <div key={cat.id} className="flex items-center gap-2">
                        <Icon className="h-3 w-3 text-muted-foreground" />
                        <span className="text-xs w-24 truncate">{cat.label}</span>
                        <div className="flex-1 h-4 bg-muted rounded-sm overflow-hidden">
                          <div className={cn("h-full transition-all", cat.color.split(" ")[0].replace("bg-", "bg-").replace("/20", "/60"))} style={{ width: `${pct}%` }} />
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
                  <Badge key={cat} variant="secondary" className="text-xs">{cat}: {count}</Badge>
                ))}
              </div>
            </div>
          </TabsContent>

          <TabsContent value="heatmap" className="mt-0">
            {/* Controls */}
            <div className="flex flex-wrap items-center gap-4 mb-4 text-sm">
              <div className="flex items-center gap-2">
                <label className="text-xs text-muted-foreground">Color scheme:</label>
                <Select value={colorScheme} onValueChange={(v) => setColorScheme(v as typeof colorScheme)}>
                  <SelectTrigger className="h-7 text-xs w-36">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="category">Category colors</SelectItem>
                    <SelectItem value="blue">Blue scale</SelectItem>
                    <SelectItem value="heat">Heat (yellow→red)</SelectItem>
                    <SelectItem value="viridis">Viridis</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <label className="flex items-center gap-1.5 text-xs text-muted-foreground cursor-pointer">
                <input
                  type="checkbox"
                  checked={normalizeByRow}
                  onChange={e => setNormalizeByRow(e.target.checked)}
                  className="w-3 h-3"
                />
                Normalize by row
              </label>
              <label className="flex items-center gap-1.5 text-xs text-muted-foreground cursor-pointer">
                <input
                  type="checkbox"
                  checked={showValues}
                  onChange={e => setShowValues(e.target.checked)}
                  className="w-3 h-3"
                />
                Show values
              </label>
              <span className="text-xs text-muted-foreground ml-auto">
                {onHeatmapCellClick && "Click a cell to navigate timeline"}
              </span>
            </div>

            {/* Heatmap grid */}
            <div className="relative" ref={heatmapRef}>
              <ScrollArea className="w-full" data-testid="heatmap-container">
                <div className="min-w-max pb-2">
                  {/* Column headers */}
                  <div className="flex">
                    <div className="w-36 flex-shrink-0" />
                    {heatmapData.sorted.map(v => (
                      <div
                        key={v.id}
                        className={cn(
                          "w-7 flex-shrink-0 flex flex-col items-center cursor-pointer transition-colors",
                          hoveredCol === v.id && "bg-primary/5 rounded-t"
                        )}
                        onMouseEnter={() => setHoveredCol(v.id)}
                        onMouseLeave={() => setHoveredCol(null)}
                        title={`v${v.version}`}
                      >
                        <span
                          className={cn(
                            "text-[8px] leading-none",
                            MAJOR_VERSIONS.has(v.version) ? "text-yellow-600 dark:text-yellow-400 font-bold" : "text-muted-foreground"
                          )}
                          style={{
                            writingMode: "vertical-rl",
                            textOrientation: "mixed",
                            transform: "rotate(180deg)",
                            display: "block",
                            height: 40,
                            paddingTop: 4,
                          }}
                        >
                          {v.version}
                        </span>
                        {MAJOR_VERSIONS.has(v.version) && (
                          <span className="text-[7px] text-yellow-600 dark:text-yellow-400 leading-none">★</span>
                        )}
                      </div>
                    ))}
                    <div className="w-10 flex-shrink-0 text-[9px] text-muted-foreground text-right self-end pb-1 pr-1">Total</div>
                  </div>

                  {/* Rows */}
                  {heatmapData.matrix.map(({ cat, counts, rowTotal }) => {
                    const rowMax = Math.max(...counts.map(c => c.count), 1);
                    return (
                      <div
                        key={cat.id}
                        className={cn(
                          "flex items-center mt-px group cursor-pointer rounded-l",
                          hoveredRow === cat.id && "bg-primary/5"
                        )}
                        onMouseEnter={() => setHoveredRow(cat.id as HeatmapCatId)}
                        onMouseLeave={() => setHoveredRow(null)}
                      >
                        {/* Row header */}
                        <div
                          className="w-36 flex-shrink-0 flex items-center gap-1.5 pr-2 py-0.5"
                          style={{ borderLeft: `3px solid ${cat.hexColor}` }}
                        >
                          <span className="text-xs truncate pl-1.5" style={{ color: cat.hexColor }}>
                            {cat.label}
                          </span>
                        </div>

                        {/* Cells */}
                        {counts.map(({ versionId, version, count, features }) => {
                          const intensity = getCellIntensity(count, rowMax, cat);
                          const bg = cellColor(intensity, cat.hexColor, colorScheme);
                          const isHighlightedCell = hoveredRow === cat.id || hoveredCol === versionId;
                          return (
                            <div
                              key={versionId}
                              className={cn(
                                "w-7 h-6 flex-shrink-0 rounded-sm flex items-center justify-center transition-transform mx-px",
                                count > 0 && "cursor-pointer",
                                isHighlightedCell && count > 0 && "ring-1 ring-white/20",
                              )}
                              style={{
                                backgroundColor: bg,
                                opacity: (hoveredRow !== null && hoveredRow !== cat.id) ||
                                         (hoveredCol !== null && hoveredCol !== versionId)
                                  ? 0.45 : 1,
                              }}
                              onMouseEnter={count > 0 ? (e) => handleCellMouseEnter(e, cat.id as HeatmapCatId, versionId, count, features) : undefined}
                              onMouseLeave={() => setTooltip(null)}
                              onClick={count > 0 ? () => handleCellClick(versionId, cat.id) : undefined}
                              title={count === 0 ? undefined : `v${version} · ${cat.label}: ${count}`}
                              data-testid={count > 0 ? `heatmap-cell-${cat.id}-${versionId}` : undefined}
                            >
                              {count > 0 && showValues && (
                                <span
                                  className="text-[8px] font-bold leading-none select-none"
                                  style={{
                                    color: intensity > 0.5 ? "rgba(255,255,255,0.9)" : cat.hexColor,
                                  }}
                                >
                                  {count}
                                </span>
                              )}
                            </div>
                          );
                        })}

                        {/* Row total */}
                        <div className="w-10 flex-shrink-0 text-xs text-right pr-1 font-medium" style={{ color: cat.hexColor }}>
                          {rowTotal}
                        </div>
                      </div>
                    );
                  })}

                  {/* Column totals */}
                  <div className="flex mt-2 border-t pt-1">
                    <div className="w-36 flex-shrink-0 text-xs text-muted-foreground pl-2">Total</div>
                    {heatmapData.colTotals.map((total, i) => (
                      <div key={i} className="w-7 flex-shrink-0 text-center">
                        <span className="text-[8px] text-muted-foreground">{total}</span>
                      </div>
                    ))}
                    <div className="w-10 flex-shrink-0 text-xs text-right pr-1 font-bold">
                      {heatmapData.colTotals.reduce((s, t) => s + t, 0)}
                    </div>
                  </div>
                </div>
              </ScrollArea>

              {/* Floating tooltip */}
              {tooltip && tooltip.visible && (
                <div
                  className="absolute z-50 bg-popover text-popover-foreground border rounded-lg p-3 shadow-xl min-w-48 max-w-72 pointer-events-none"
                  style={{ left: tooltip.x, top: tooltip.y }}
                >
                  {(() => {
                    const cat = HEATMAP_CATEGORIES.find(c => c.id === tooltip.catId);
                    const version = heatmapData.sorted.find(v => v.id === tooltip.versionId);
                    return (
                      <>
                        <div className="flex items-center justify-between gap-2 mb-2 pb-2 border-b">
                          <span className="font-semibold text-xs" style={{ color: cat?.hexColor }}>
                            {cat?.label}
                          </span>
                          <span className="text-xs text-muted-foreground">v{version?.version}</span>
                        </div>
                        <div className="text-lg font-bold mb-1">
                          {tooltip.count} feature{tooltip.count !== 1 ? "s" : ""}
                        </div>
                        {tooltip.features.length > 0 && (
                          <div className="space-y-0.5">
                            {tooltip.features.map((f, i) => (
                              <div key={i} className="text-xs text-muted-foreground">• {f}</div>
                            ))}
                            {tooltip.count > tooltip.features.length && (
                              <div className="text-xs text-muted-foreground italic">
                                +{tooltip.count - tooltip.features.length} more…
                              </div>
                            )}
                          </div>
                        )}
                        {onHeatmapCellClick && (
                          <div className="text-[10px] text-muted-foreground mt-2 italic">
                            Click to navigate timeline →
                          </div>
                        )}
                      </>
                    );
                  })()}
                </div>
              )}
            </div>

            <div className="mt-3">
              <p className="text-xs text-muted-foreground">
                {heatmapData.matrix.length} categories × {heatmapData.sorted.length} versions.
                {normalizeByRow ? " Normalized per row." : " Global intensity scale."}
                {onHeatmapCellClick ? " Click any cell to navigate the timeline." : ""}
              </p>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
}
