import { useState, useRef, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import Header from "@/components/Header";
import ChatSidebar from "@/components/ChatSidebar";
import TimelineView from "@/components/TimelineView";
import FeatureDetailModal from "@/components/FeatureDetailModal";
import DocumentationSheet from "@/components/DocumentationSheet";
import VersionNavigator from "@/components/VersionNavigator";
import type { Feature } from "@/components/FeatureCard";
import { ScrollArea } from "@/components/ui/scroll-area";
import type { Version } from "@shared/schema";

export default function HomePage() {
  const [selectedFeature, setSelectedFeature] = useState<Feature | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [showDocumentation, setShowDocumentation] = useState(false);
  const versionRefs = useRef<Map<string, HTMLDivElement>>(new Map());

  const { data: versions, isLoading } = useQuery<Version[]>({
    queryKey: ["/api/versions"],
  });

  const filteredVersions = (versions || []).map(version => ({
    ...version,
    features: version.features
      .map(feature => ({
        ...feature,
        version: version.version,
        releaseDate: version.releaseDate,
      }))
      .filter(feature =>
        searchQuery === "" ||
        feature.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        feature.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        feature.category.toLowerCase().includes(searchQuery.toLowerCase())
      )
  })).filter(version => version.features.length > 0);

  const handleVersionNavigate = (versionId: string) => {
    const element = versionRefs.current.get(versionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <div className="flex h-screen flex-col">
      <Header 
        onSearch={setSearchQuery}
        onShowDocumentation={() => setShowDocumentation(true)}
      />
      
      <div className="flex flex-1 overflow-hidden">
        <ScrollArea className="flex-1">
          <div className="container py-8 px-6">
            <div className="mb-6">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <div className="flex items-center gap-3 mb-2">
                    <h2 className="text-3xl font-bold">Release Timeline</h2>
                    {versions && versions.length > 0 && (
                      <div className="flex items-center gap-2">
                        <span className="text-2xl font-bold text-primary">{versions.length}</span>
                        <span className="text-sm text-muted-foreground">versions documented</span>
                      </div>
                    )}
                  </div>
                  <p className="text-muted-foreground">
                    Explore {versions?.reduce((sum, v) => sum + v.features.length, 0) || 0} features across {versions?.length || 0} versions from 2011 to present
                  </p>
                </div>
                {versions && versions.length > 0 && (
                  <VersionNavigator
                    versions={versions}
                    onNavigate={handleVersionNavigate}
                  />
                )}
              </div>
            </div>

            {isLoading ? (
              <div className="text-center py-12">
                <p className="text-muted-foreground">Loading versions...</p>
              </div>
            ) : filteredVersions.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-muted-foreground">No features found matching "{searchQuery}"</p>
              </div>
            ) : (
              <TimelineView
                versions={filteredVersions}
                onFeatureClick={setSelectedFeature}
                versionRefs={versionRefs}
              />
            )}
          </div>
        </ScrollArea>

        <aside className="w-[400px] hidden lg:flex flex-col">
          <ChatSidebar />
        </aside>
      </div>

      <FeatureDetailModal
        feature={selectedFeature}
        open={!!selectedFeature}
        onClose={() => setSelectedFeature(null)}
      />
      
      <DocumentationSheet
        open={showDocumentation}
        onClose={() => setShowDocumentation(false)}
        versions={versions}
      />
    </div>
  );
}
