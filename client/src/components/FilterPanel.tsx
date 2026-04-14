import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Cloud, Monitor, Layers, Database, Code, Settings, BarChart, Filter, Sparkles, X, GitCompare } from "lucide-react";
import type { Version } from "@shared/schema";

export const FEATURE_CATEGORIES = [
  { id: "cloud", label: "Cloud/SaaS", icon: Cloud, color: "bg-blue-500/20 text-blue-700 dark:text-blue-300" },
  { id: "ui", label: "Interface/UI", icon: Monitor, color: "bg-purple-500/20 text-purple-700 dark:text-purple-300" },
  { id: "2d", label: "2D Modelling", icon: Layers, color: "bg-green-500/20 text-green-700 dark:text-green-300" },
  { id: "data", label: "Data Import/Export", icon: Database, color: "bg-orange-500/20 text-orange-700 dark:text-orange-300" },
  { id: "scripting", label: "Automation/Scripting", icon: Code, color: "bg-pink-500/20 text-pink-700 dark:text-pink-300" },
  { id: "admin", label: "Administration", icon: Settings, color: "bg-gray-500/20 text-gray-700 dark:text-gray-300" },
  { id: "analysis", label: "Analysis/Results", icon: BarChart, color: "bg-teal-500/20 text-teal-700 dark:text-teal-300" },
] as const;

export type CategoryId = typeof FEATURE_CATEGORIES[number]["id"];

const categoryKeywords: Record<CategoryId, string[]> = {
  cloud: ["cloud", "saas", "web", "online", "remote", "master database"],
  ui: ["interface", "ui", "dialog", "display", "geoplan", "icon", "toolbar", "window", "view", "theme"],
  "2d": ["2d", "mesh", "subgrid", "raster", "flood", "boundary", "zone", "polygon", "surface", "terrain"],
  data: ["import", "export", "odic", "hec-ras", "csv", "gis", "esri", "geodatabase", "shapefile", "netcdf", "12d"],
  scripting: ["ruby", "script", "automation", "icmexchange", "api", "batch", "custom action"],
  admin: ["license", "admin", "deploy", "install", "setting", "privacy", "config", "permission"],
  analysis: ["result", "report", "analysis", "simulation", "run", "output", "graph", "chart", "statistics"],
};

export function matchesCategory(feature: { title: string; description: string; category: string }, categoryId: CategoryId): boolean {
  const searchText = `${feature.title} ${feature.description} ${feature.category}`.toLowerCase();
  return categoryKeywords[categoryId].some(keyword => searchText.includes(keyword));
}

interface FilterPanelProps {
  versions: Version[];
  selectedCategories: CategoryId[];
  onCategoryChange: (categories: CategoryId[]) => void;
  myStackVersion: string | null;
  onMyStackChange: (version: string | null) => void;
  versionFrom: string | null;
  versionTo: string | null;
  onVersionRangeChange: (from: string | null, to: string | null) => void;
}

export default function FilterPanel({
  versions,
  selectedCategories,
  onCategoryChange,
  myStackVersion,
  onMyStackChange,
  versionFrom,
  versionTo,
  onVersionRangeChange,
}: FilterPanelProps) {
  const [isOpen, setIsOpen] = useState(false);

  const toggleCategory = (categoryId: CategoryId) => {
    if (selectedCategories.includes(categoryId)) {
      onCategoryChange(selectedCategories.filter(c => c !== categoryId));
    } else {
      onCategoryChange([...selectedCategories, categoryId]);
    }
  };

  const clearFilters = () => {
    onCategoryChange([]);
    onMyStackChange(null);
    onVersionRangeChange(null, null);
  };

  const hasActiveFilters = selectedCategories.length > 0 || myStackVersion !== null || versionFrom !== null || versionTo !== null;
  const activeCount = selectedCategories.length + (myStackVersion ? 1 : 0) + (versionFrom || versionTo ? 1 : 0);

  return (
    <div className="flex flex-wrap items-center gap-2">
      <Popover open={isOpen} onOpenChange={setIsOpen}>
        <PopoverTrigger asChild>
          <Button
            variant={hasActiveFilters ? "default" : "outline"}
            size="sm"
            className="gap-2"
            data-testid="button-filter"
          >
            <Filter className="h-4 w-4" />
            <span className="hidden sm:inline">Filters</span>
            {hasActiveFilters && (
              <Badge variant="secondary" className="ml-1 h-5 w-5 p-0 flex items-center justify-center text-xs">
                {activeCount}
              </Badge>
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-84" align="start">
          <div className="space-y-4">
            <div>
              <h4 className="font-medium mb-2 text-sm">Filter by Category</h4>
              <div className="flex flex-wrap gap-2">
                {FEATURE_CATEGORIES.map((category) => {
                  const Icon = category.icon;
                  const isSelected = selectedCategories.includes(category.id);
                  return (
                    <Button
                      key={category.id}
                      variant={isSelected ? "default" : "outline"}
                      size="sm"
                      className="gap-1.5 text-xs"
                      onClick={() => toggleCategory(category.id)}
                      data-testid={`filter-category-${category.id}`}
                    >
                      <Icon className="h-3 w-3" />
                      {category.label}
                    </Button>
                  );
                })}
              </div>
            </div>

            <div className="border-t pt-4">
              <h4 className="font-medium mb-2 text-sm flex items-center gap-2">
                <Sparkles className="h-4 w-4 text-primary" />
                My Stack - What's New Since...
              </h4>
              <p className="text-xs text-muted-foreground mb-2">
                Select your current version to highlight features you may have missed.
              </p>
              <Select
                value={myStackVersion || "none"}
                onValueChange={(v) => {
                  const val = v === "none" ? null : v;
                  onMyStackChange(val);
                  if (val) localStorage.setItem("icm-my-stack", val);
                  else localStorage.removeItem("icm-my-stack");
                }}
              >
                <SelectTrigger className="w-full" data-testid="select-my-stack">
                  <SelectValue placeholder="Select your version" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="none">No version selected</SelectItem>
                  {versions.map((v) => (
                    <SelectItem key={v.id} value={v.id}>
                      Version {v.version}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="border-t pt-4">
              <h4 className="font-medium mb-2 text-sm flex items-center gap-2">
                <GitCompare className="h-4 w-4 text-muted-foreground" />
                Version Range
              </h4>
              <p className="text-xs text-muted-foreground mb-2">
                Show features released between two versions.
              </p>
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <p className="text-xs text-muted-foreground mb-1">From (oldest)</p>
                  <Select
                    value={versionFrom || "all"}
                    onValueChange={(v) => onVersionRangeChange(v === "all" ? null : v, versionTo)}
                  >
                    <SelectTrigger className="w-full text-xs" data-testid="select-version-from">
                      <SelectValue placeholder="Earliest" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">Earliest</SelectItem>
                      {[...versions].reverse().map((v) => (
                        <SelectItem key={v.id} value={v.id}>
                          v{v.version}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground mb-1">To (newest)</p>
                  <Select
                    value={versionTo || "all"}
                    onValueChange={(v) => onVersionRangeChange(versionFrom, v === "all" ? null : v)}
                  >
                    <SelectTrigger className="w-full text-xs" data-testid="select-version-to">
                      <SelectValue placeholder="Latest" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">Latest</SelectItem>
                      {versions.map((v) => (
                        <SelectItem key={v.id} value={v.id}>
                          v{v.version}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>

            {hasActiveFilters && (
              <Button
                variant="ghost"
                size="sm"
                className="w-full text-muted-foreground"
                onClick={clearFilters}
                data-testid="button-clear-filters"
              >
                <X className="h-4 w-4 mr-2" />
                Clear all filters
              </Button>
            )}
          </div>
        </PopoverContent>
      </Popover>

      {selectedCategories.map((catId) => {
        const category = FEATURE_CATEGORIES.find(c => c.id === catId);
        if (!category) return null;
        const Icon = category.icon;
        return (
          <Badge
            key={catId}
            variant="secondary"
            className={`gap-1 cursor-pointer ${category.color}`}
            onClick={() => toggleCategory(catId)}
          >
            <Icon className="h-3 w-3" />
            {category.label}
            <X className="h-3 w-3 ml-1" />
          </Badge>
        );
      })}

      {myStackVersion && (
        <Badge
          variant="secondary"
          className="gap-1 cursor-pointer bg-primary/20 text-primary"
          onClick={() => { onMyStackChange(null); localStorage.removeItem("icm-my-stack"); }}
        >
          <Sparkles className="h-3 w-3" />
          Since v{versions.find(v => v.id === myStackVersion)?.version}
          <X className="h-3 w-3 ml-1" />
        </Badge>
      )}

      {(versionFrom || versionTo) && (
        <Badge
          variant="secondary"
          className="gap-1 cursor-pointer"
          onClick={() => onVersionRangeChange(null, null)}
        >
          <GitCompare className="h-3 w-3" />
          {versionFrom ? `v${versionFrom}` : "Start"} → {versionTo ? `v${versionTo}` : "Latest"}
          <X className="h-3 w-3 ml-1" />
        </Badge>
      )}
    </div>
  );
}
