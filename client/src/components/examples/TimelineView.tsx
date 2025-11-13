import TimelineView from "../TimelineView";

export default function TimelineViewExample() {
  const versions = [
    {
      version: "2026.2",
      releaseDate: "2026-11-13",
      features: [
        {
          id: "1",
          title: "Esri Integration Tech Preview",
          description: "Modern 64-bit ArcGIS Online integration with support for web maps and local GIS layers.",
          category: "Esri Integration",
          hasVideo: true,
          version: "2026.2",
          releaseDate: "2026-11-13"
        },
        {
          id: "2",
          title: "Project Admin Capabilities",
          description: "Role-based permissions and access levels for better governance and collaboration.",
          category: "Project Admin",
          hasVideo: true,
          version: "2026.2",
          releaseDate: "2026-11-13"
        },
        {
          id: "3",
          title: "Subgrid Sampling with 2D Nodes",
          description: "Support for 2D nodes providing more accurate modeling of water exchange.",
          category: "Subgrid Sampling",
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
          id: "4",
          title: "Enhanced Cloud Capabilities",
          description: "Improved cloud database performance and reliability.",
          category: "Cloud",
          version: "2026.1",
          releaseDate: "2026-06-01"
        }
      ]
    }
  ];

  return (
    <div className="p-8 bg-background">
      <TimelineView 
        versions={versions} 
        onFeatureClick={(feature) => console.log("Feature clicked:", feature)}
      />
    </div>
  );
}
