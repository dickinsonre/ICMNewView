import ChatMessage from "../ChatMessage";

export default function ChatMessageExample() {
  return (
    <div className="p-4 space-y-4 bg-background">
      <ChatMessage
        role="user"
        content="What are the new features in ICM InfoWorks 2026.2?"
      />
      <ChatMessage
        role="assistant"
        model="claude"
        content="ICM InfoWorks 2026.2 introduces several major enhancements including Esri Integration, Project Admin capabilities with role-based permissions, and improved Subgrid Sampling with 2D nodes support."
      />
      <ChatMessage
        role="user"
        content="Tell me more about the Esri Integration"
      />
      <ChatMessage
        role="assistant"
        model="deepseek"
        content="The Esri Integration is a tech preview feature that provides modern 64-bit ArcGIS Online integration. It supports web maps from ArcGIS Online and local GIS layers like Shapefiles, WMS, Raster, and Esri File Geodatabases."
      />
    </div>
  );
}
