import { useState, useMemo } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";
import type { Version } from "@shared/schema";

interface VersionNavigatorProps {
  versions: Version[];
  onNavigate: (versionId: string) => void;
}

export default function VersionNavigator({ versions, onNavigate }: VersionNavigatorProps) {
  const [selectedVersion, setSelectedVersion] = useState<string>("");

  const sortedVersions = useMemo(() => {
    return [...versions].sort((a, b) => 
      new Date(b.releaseDate).getTime() - new Date(a.releaseDate).getTime()
    );
  }, [versions]);

  const currentIndex = sortedVersions.findIndex(v => v.id === selectedVersion);

  const handleNavigate = (versionId: string) => {
    setSelectedVersion(versionId);
    onNavigate(versionId);
  };

  const navigatePrevious = () => {
    if (currentIndex > 0) {
      const prevVersion = sortedVersions[currentIndex - 1];
      handleNavigate(prevVersion.id);
    }
  };

  const navigateNext = () => {
    if (currentIndex < sortedVersions.length - 1) {
      const nextVersion = sortedVersions[currentIndex + 1];
      handleNavigate(nextVersion.id);
    }
  };

  return (
    <div className="flex items-center gap-2">
      <Button
        variant="outline"
        size="icon"
        onClick={navigatePrevious}
        disabled={currentIndex <= 0 || !selectedVersion}
        data-testid="button-version-previous"
      >
        <ChevronLeft className="h-4 w-4" />
      </Button>

      <Select value={selectedVersion} onValueChange={handleNavigate}>
        <SelectTrigger className="w-[200px]" data-testid="select-version">
          <SelectValue placeholder="Jump to version..." />
        </SelectTrigger>
        <SelectContent>
          {sortedVersions.map((version) => (
            <SelectItem 
              key={version.id} 
              value={version.id}
              data-testid={`select-version-${version.id}`}
            >
              Version {version.version}
              <span className="text-xs text-muted-foreground ml-2">
                ({version.features.length} features)
              </span>
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      <Button
        variant="outline"
        size="icon"
        onClick={navigateNext}
        disabled={currentIndex >= sortedVersions.length - 1 || !selectedVersion}
        data-testid="button-version-next"
      >
        <ChevronRight className="h-4 w-4" />
      </Button>
    </div>
  );
}
