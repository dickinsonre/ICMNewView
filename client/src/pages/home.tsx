import { useState } from "react";
import Header from "@/components/Header";
import ChatSidebar from "@/components/ChatSidebar";
import TimelineView from "@/components/TimelineView";
import FeatureDetailModal from "@/components/FeatureDetailModal";
import type { Feature } from "@/components/FeatureCard";
import { ScrollArea } from "@/components/ui/scroll-area";

// TODO: remove mock functionality - replace with real data from API
const mockVersions = [
  {
    version: "2026.2",
    releaseDate: "2026-11-13",
    features: [
      {
        id: "esri-integration",
        title: "Esri Integration Tech Preview",
        description: "InfoWorks ICM 2026.2 introduces a modern 64-bit ArcGIS Online integration that seamlessly connects InfoWorks ICM with web maps saved on ArcGIS Online. This enhancement includes support for local GIS Layers—such as Shapefiles, WMS, Raster, and Esri File Geodatabases—allowing users to bring spatial data directly into the model geo-plan environment and provide valuable context for hydraulic modelling processes.",
        category: "Esri Integration",
        hasVideo: true,
        documentationUrl: "https://help.autodesk.com/view/IWICMS/2026/ENU/?guid=GUID-EF450CB6-647A-4BA9-90B0-C53E39C75128",
        version: "2026.2",
        releaseDate: "2026-11-13"
      },
      {
        id: "project-admin",
        title: "Project Admin Capabilities",
        description: "This release introduces Project Admin capabilities with role-based permissions and access levels, enabling better governance and collaboration. Key enhancements include project-level administration, role-based control supporting Model Editor and Model Reader roles, access level control for Project Admin and members, and viewer access for cloud databases.",
        category: "Project Admin",
        hasVideo: true,
        documentationUrl: "https://help.autodesk.com/view/IWICMS/2026/ENU/?guid=GUID-2D63BBF4-586B-4C8C-8DF2-BC59CC9C8B03",
        version: "2026.2",
        releaseDate: "2026-11-13"
      },
      {
        id: "subgrid-sampling",
        title: "Subgrid Sampling Improvement",
        description: "Subgrid Sampling now supports 2D nodes, providing more accurate modelling of water exchange between the 1D collection system and 2D mesh. Users can define manholes, gullies, inlets, outfalls, and connect nodes as 2D nodes. Multiple calculation methods are supported including weir equations, head-discharge tables, and inlet parameters.",
        category: "Subgrid Sampling",
        hasVideo: false,
        documentationUrl: "https://help.autodesk.com/view/IWICMS/2026/ENU/?guid=GUID-0AB4AD8A-99DD-4AB1-9E27-083F538B3AE0",
        version: "2026.2",
        releaseDate: "2026-11-13"
      }
    ]
  },
  {
    version: "2026.1",
    releaseDate: "2026-06-01",
    features: [
      {
        id: "cloud-enhancements",
        title: "Cloud Capabilities Enhancement",
        description: "Enhanced cloud database performance with improved synchronization, better reliability, and optimized data transfer speeds for teams working across distributed locations.",
        category: "Cloud",
        hasVideo: false,
        documentationUrl: "https://help.autodesk.com/view/IWICMS/2026/ENU/?guid=GUID-839F8DB2-175C-44F4-80A1-83BDF3C9B0A4",
        version: "2026.1",
        releaseDate: "2026-06-01"
      }
    ]
  },
  {
    version: "2026.0",
    releaseDate: "2025-04-01",
    features: [
      {
        id: "general-improvements",
        title: "General Improvements",
        description: "Various performance improvements, bug fixes, and stability enhancements to the core InfoWorks ICM platform.",
        category: "Cloud",
        hasVideo: false,
        version: "2026.0",
        releaseDate: "2025-04-01"
      }
    ]
  }
];

export default function HomePage() {
  const [selectedFeature, setSelectedFeature] = useState<Feature | null>(null);
  const [searchQuery, setSearchQuery] = useState("");

  const filteredVersions = mockVersions.map(version => ({
    ...version,
    features: version.features.filter(feature =>
      searchQuery === "" ||
      feature.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      feature.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      feature.category.toLowerCase().includes(searchQuery.toLowerCase())
    )
  })).filter(version => version.features.length > 0);

  return (
    <div className="flex h-screen flex-col">
      <Header onSearch={setSearchQuery} />
      
      <div className="flex flex-1 overflow-hidden">
        <ScrollArea className="flex-1">
          <div className="container py-8 px-6">
            <div className="mb-8">
              <h2 className="text-3xl font-bold mb-2">Release Timeline</h2>
              <p className="text-muted-foreground">
                Explore the latest features and improvements in ICM InfoWorks
              </p>
            </div>

            {filteredVersions.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-muted-foreground">No features found matching "{searchQuery}"</p>
              </div>
            ) : (
              <TimelineView
                versions={filteredVersions}
                onFeatureClick={setSelectedFeature}
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
    </div>
  );
}
