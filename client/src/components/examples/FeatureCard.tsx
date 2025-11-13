import FeatureCard from "../FeatureCard";

export default function FeatureCardExample() {
  const feature = {
    id: "1",
    title: "Esri Integration Tech Preview",
    description: "InfoWorks ICM 2026.2 introduces a modern 64-bit ArcGIS Online integration that seamlessly connects InfoWorks ICM with web maps saved on ArcGIS Online. Includes support for local GIS Layers such as Shapefiles, WMS, Raster, and Esri File Geodatabases.",
    category: "Esri Integration",
    hasVideo: true,
    documentationUrl: "https://help.autodesk.com/view/IWICMS/2026/ENU/",
    version: "2026.2",
    releaseDate: "2026-11-13"
  };

  return (
    <div className="p-8 bg-background">
      <div className="max-w-md">
        <FeatureCard 
          feature={feature} 
          onClick={() => console.log("Feature clicked:", feature.id)} 
        />
      </div>
    </div>
  );
}
