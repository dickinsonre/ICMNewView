import { useState } from "react";
import FeatureDetailModal from "../FeatureDetailModal";
import { Button } from "@/components/ui/button";

export default function FeatureDetailModalExample() {
  const [open, setOpen] = useState(false);

  const feature = {
    id: "1",
    title: "Esri Integration Tech Preview",
    description: "InfoWorks ICM 2026.2 introduces a modern 64-bit ArcGIS Online integration that seamlessly connects InfoWorks ICM with web maps saved on ArcGIS Online.\n\nThis enhancement includes support for local GIS Layers—such as Shapefiles, WMS, Raster, and Esri File Geodatabases—allowing users to bring spatial data directly into the model geo-plan environment and provide valuable context for hydraulic modelling processes.\n\nAs part of this Technical Preview, users can also import and export geospatial data to and from Esri enterprise geodatabases, streamlining data exchange and enabling more efficient collaboration between GIS and modelling teams.",
    category: "Esri Integration",
    hasVideo: true,
    documentationUrl: "https://help.autodesk.com/view/IWICMS/2026/ENU/",
    version: "2026.2",
    releaseDate: "2026-11-13"
  };

  return (
    <div className="p-8 bg-background">
      <Button onClick={() => setOpen(true)}>Open Feature Detail</Button>
      <FeatureDetailModal
        feature={feature}
        open={open}
        onClose={() => setOpen(false)}
      />
    </div>
  );
}
