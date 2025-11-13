import { useState, RefObject } from "react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import type { Feature } from "./FeatureCard";

interface Version {
  id: string;
  version: string;
  releaseDate: string;
  features: Feature[];
}

interface TimelineViewProps {
  versions: Version[];
  onFeatureClick?: (feature: Feature) => void;
  versionRefs?: RefObject<Map<string, HTMLDivElement>>;
}

export default function TimelineView({ versions, onFeatureClick, versionRefs }: TimelineViewProps) {
  const [expandedVersion, setExpandedVersion] = useState<string | null>(versions[0]?.version || null);

  return (
    <div className="relative">
      <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-border" />
      
      <div className="space-y-8">
        {versions.map((version, idx) => (
          <div 
            key={version.version} 
            className="relative pl-20"
            ref={(el) => {
              if (el && versionRefs?.current) {
                versionRefs.current.set(version.id, el);
              }
            }}
          >
            <div className="absolute left-6 top-2 w-4 h-4 rounded-full bg-primary border-4 border-background ring-4 ring-border" />
            
            <div className="space-y-4">
              <div>
                <div className="flex items-center gap-3 mb-1">
                  <h2 className="text-2xl font-semibold">Version {version.version}</h2>
                  <Badge variant="outline" className="font-mono text-xs">
                    {new Date(version.releaseDate).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric'
                    })}
                  </Badge>
                </div>
                <p className="text-sm text-muted-foreground">
                  {version.features.length} new {version.features.length === 1 ? 'feature' : 'features'}
                </p>
              </div>

              <div
                className={cn(
                  "grid gap-4 transition-all",
                  expandedVersion === version.version
                    ? "grid-cols-1 md:grid-cols-2 lg:grid-cols-3"
                    : "grid-cols-1"
                )}
              >
                {(expandedVersion === version.version ? version.features : version.features.slice(0, 1)).map((feature) => (
                  <Card
                    key={feature.id}
                    className="hover-elevate active-elevate-2 cursor-pointer"
                    onClick={() => onFeatureClick?.(feature)}
                    data-testid={`timeline-feature-${feature.id}`}
                  >
                    <CardHeader className="pb-3">
                      <CardTitle className="text-lg">{feature.title}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-muted-foreground line-clamp-2">
                        {feature.description}
                      </p>
                    </CardContent>
                  </Card>
                ))}
              </div>

              {version.features.length > 1 && (
                <button
                  onClick={() => setExpandedVersion(expandedVersion === version.version ? null : version.version)}
                  className="text-sm text-primary hover:underline"
                  data-testid={`button-expand-${version.version}`}
                >
                  {expandedVersion === version.version
                    ? "Show less"
                    : `Show all ${version.features.length} features`}
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
