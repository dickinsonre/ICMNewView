import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import Header from "@/components/Header";
import ChatSidebar from "@/components/ChatSidebar";
import DocumentationSheet from "@/components/DocumentationSheet";
import type { Version } from "@shared/schema";

export default function HomePage() {
  const [showDocumentation, setShowDocumentation] = useState(false);

  const { data: versions } = useQuery<Version[]>({
    queryKey: ["/api/versions"],
  });

  return (
    <div className="flex h-screen flex-col">
      <Header 
        onShowDocumentation={() => setShowDocumentation(true)}
      />
      
      <div className="flex flex-1 overflow-hidden">
        <ChatSidebar />
      </div>
      
      <DocumentationSheet
        open={showDocumentation}
        onClose={() => setShowDocumentation(false)}
        versions={versions}
      />
    </div>
  );
}
