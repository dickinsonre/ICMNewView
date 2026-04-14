import { useMemo } from "react";
import { Badge } from "@/components/ui/badge";
import { Sparkles, ChevronRight } from "lucide-react";
import { FEATURE_CATEGORIES, matchesCategory, type CategoryId } from "./FilterPanel";
import type { Version } from "@shared/schema";

interface UpgradeImpactBannerProps {
  versions: Version[];
  myStackVersion: string;
  onNavigateToVersion?: (versionId: string) => void;
}

export default function UpgradeImpactBanner({ versions, myStackVersion, onNavigateToVersion }: UpgradeImpactBannerProps) {
  const summary = useMemo(() => {
    const baseline = versions.find(v => v.id === myStackVersion);
    if (!baseline) return null;

    const baselineDate = new Date(baseline.releaseDate);
    const newerVersions = versions.filter(v => new Date(v.releaseDate) > baselineDate);
    
    if (newerVersions.length === 0) return null;

    const allNewFeatures = newerVersions.flatMap(v =>
      v.features.map(f => ({ ...f, version: v.version, releaseDate: v.releaseDate }))
    );

    const categoryBreakdown: Partial<Record<CategoryId, number>> = {};
    FEATURE_CATEGORIES.forEach(cat => {
      const count = allNewFeatures.filter(f => matchesCategory(f, cat.id)).length;
      if (count > 0) categoryBreakdown[cat.id] = count;
    });

    const topCategories = Object.entries(categoryBreakdown)
      .sort((a, b) => (b[1] as number) - (a[1] as number))
      .slice(0, 4) as [CategoryId, number][];

    return {
      totalFeatures: allNewFeatures.length,
      versionsCount: newerVersions.length,
      latestVersion: newerVersions[0]?.version,
      topCategories,
    };
  }, [versions, myStackVersion]);

  if (!summary) return null;

  return (
    <div className="flex items-start gap-3 px-4 py-3 rounded-lg bg-primary/8 border border-primary/20 mt-3">
      <Sparkles className="h-4 w-4 text-primary flex-shrink-0 mt-0.5" />
      <div className="flex-1 min-w-0">
        <p className="text-sm font-medium text-primary">
          {summary.totalFeatures} new features across {summary.versionsCount} version{summary.versionsCount > 1 ? "s" : ""} since v{myStackVersion}
        </p>
        <div className="flex flex-wrap gap-1.5 mt-1.5">
          {summary.topCategories.map(([catId, count]) => {
            const cat = FEATURE_CATEGORIES.find(c => c.id === catId);
            if (!cat) return null;
            const Icon = cat.icon;
            return (
              <Badge
                key={catId}
                variant="secondary"
                className={`text-xs gap-1 ${cat.color}`}
              >
                <Icon className="h-2.5 w-2.5" />
                {cat.label}: {count}
              </Badge>
            );
          })}
        </div>
      </div>
      {summary.latestVersion && onNavigateToVersion && (
        <button
          onClick={() => onNavigateToVersion(summary.latestVersion!)}
          className="flex items-center gap-0.5 text-xs text-primary hover:underline flex-shrink-0 mt-0.5"
          data-testid="button-jump-to-latest"
        >
          Latest
          <ChevronRight className="h-3 w-3" />
        </button>
      )}
    </div>
  );
}
