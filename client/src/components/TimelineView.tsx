import { useState, RefObject } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { Sparkles, Star, MessageSquare, ExternalLink } from "lucide-react";
import type { Feature } from "./FeatureCard";

interface Version {
  id: string;
  version: string;
  releaseDate: string;
  features: Feature[];
  isNewerThanMyStack?: boolean;
}

interface TimelineViewProps {
  versions: Version[];
  onFeatureClick?: (feature: Feature) => void;
  onAskInChat?: (message: string) => void;
  searchQuery?: string;
  versionRefs?: RefObject<Map<string, HTMLDivElement>>;
}

const MAJOR_VERSIONS = ["2027.0", "2026.3", "2024.0", "2023.0", "10.5", "10.0", "5.0", "3.0", "1.5"];

function isMajorVersion(version: string): boolean {
  return MAJOR_VERSIONS.includes(version);
}

function HighlightedText({ text, query }: { text: string; query?: string }) {
  if (!query || !query.trim()) return <>{text}</>;
  const escaped = query.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  const parts = text.split(new RegExp(`(${escaped})`, "gi"));
  return (
    <>
      {parts.map((part, i) =>
        part.toLowerCase() === query.toLowerCase() ? (
          <mark
            key={i}
            className="bg-yellow-200 dark:bg-yellow-700 text-foreground rounded-sm px-0.5"
          >
            {part}
          </mark>
        ) : (
          part
        )
      )}
    </>
  );
}

export default function TimelineView({ versions, onFeatureClick, onAskInChat, searchQuery, versionRefs }: TimelineViewProps) {
  const [expandedVersion, setExpandedVersion] = useState<string | null>(versions[0]?.version || null);
  const isMajor = (v: Version) => isMajorVersion(v.version);

  const handleAskAboutFeature = (feature: Feature, e: React.MouseEvent) => {
    e.stopPropagation();
    const prompt = `Tell me more about "${feature.title}" introduced in Version ${feature.version}. How does it differ from previous versions, and what modelling scenarios benefit most from it?`;
    onAskInChat?.(prompt);
  };

  return (
    <div className="relative">
      <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-border" />
      
      <div className="space-y-8">
        {versions.map((version) => (
          <div 
            key={version.version} 
            id={`version-${version.id}`}
            className={cn(
              "relative pl-20 transition-all",
              version.isNewerThanMyStack && "bg-primary/5 -mx-4 px-4 py-4 rounded-lg border border-primary/20"
            )}
            ref={(el) => {
              if (el && versionRefs?.current) {
                versionRefs.current.set(version.id, el);
              }
            }}
          >
            <div className={cn(
              "absolute left-6 top-2 w-4 h-4 rounded-full border-4 border-background ring-4",
              version.isNewerThanMyStack 
                ? "bg-primary ring-primary/30" 
                : isMajor(version) 
                  ? "bg-yellow-500 ring-yellow-500/30" 
                  : "bg-primary ring-border"
            )} />
            
            <div className="space-y-4">
              <div>
                <div className="flex items-center gap-3 mb-1 flex-wrap">
                  <h2 className="text-2xl font-semibold">Version {version.version}</h2>
                  {isMajor(version) && (
                    <Badge className="bg-yellow-500/20 text-yellow-700 dark:text-yellow-300 gap-1">
                      <Star className="h-3 w-3" />
                      Major Release
                    </Badge>
                  )}
                  {version.isNewerThanMyStack && (
                    <Badge className="bg-primary/20 text-primary gap-1">
                      <Sparkles className="h-3 w-3" />
                      New for you
                    </Badge>
                  )}
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
                    id={`feature-${feature.id}`}
                    className="hover-elevate active-elevate-2 cursor-pointer group"
                    onClick={() => onFeatureClick?.(feature)}
                    data-testid={`timeline-feature-${feature.id}`}
                  >
                    <CardHeader className="pb-2">
                      <div className="flex items-start justify-between gap-2">
                        <CardTitle className="text-lg leading-snug flex-1">
                          <HighlightedText text={feature.title} query={searchQuery} />
                        </CardTitle>
                        <div className="flex gap-1 flex-shrink-0 opacity-0 group-hover:opacity-100 transition-opacity">
                          {onAskInChat && (
                            <Button
                              variant="ghost"
                              size="icon"
                              className="h-7 w-7"
                              onClick={(e) => handleAskAboutFeature(feature, e)}
                              data-testid={`button-ask-${feature.id}`}
                              title="Ask AI about this feature"
                            >
                              <MessageSquare className="h-3.5 w-3.5" />
                            </Button>
                          )}
                          {feature.documentationUrl && (
                            <Button
                              variant="ghost"
                              size="icon"
                              className="h-7 w-7"
                              onClick={(e) => {
                                e.stopPropagation();
                                window.open(feature.documentationUrl, '_blank');
                              }}
                              data-testid={`button-docs-${feature.id}`}
                              title="View documentation"
                            >
                              <ExternalLink className="h-3.5 w-3.5" />
                            </Button>
                          )}
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-muted-foreground line-clamp-2">
                        <HighlightedText text={feature.description} query={searchQuery} />
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
