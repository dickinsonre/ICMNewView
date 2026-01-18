import { useState, useMemo } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { GitCompare, ArrowRight, Plus, Minus, Equal } from "lucide-react";
import type { Version } from "@shared/schema";

interface CompareVersionsDialogProps {
  versions: Version[];
}

export default function CompareVersionsDialog({ versions }: CompareVersionsDialogProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [version1Id, setVersion1Id] = useState<string | null>(null);
  const [version2Id, setVersion2Id] = useState<string | null>(null);

  const version1 = versions.find(v => v.id === version1Id);
  const version2 = versions.find(v => v.id === version2Id);

  const comparison = useMemo(() => {
    if (!version1 || !version2) return null;

    const v1Features = new Set(version1.features.map(f => f.title.toLowerCase()));
    const v2Features = new Set(version2.features.map(f => f.title.toLowerCase()));

    const onlyInV1 = version1.features.filter(f => !v2Features.has(f.title.toLowerCase()));
    const onlyInV2 = version2.features.filter(f => !v1Features.has(f.title.toLowerCase()));
    const inBoth = version1.features.filter(f => v2Features.has(f.title.toLowerCase()));

    const v1Categories: Record<string, number> = {};
    const v2Categories: Record<string, number> = {};
    
    version1.features.forEach(f => {
      v1Categories[f.category] = (v1Categories[f.category] || 0) + 1;
    });
    version2.features.forEach(f => {
      v2Categories[f.category] = (v2Categories[f.category] || 0) + 1;
    });

    return {
      onlyInV1,
      onlyInV2,
      inBoth,
      v1Categories,
      v2Categories,
      v1Total: version1.features.length,
      v2Total: version2.features.length,
    };
  }, [version1, version2]);

  const swapVersions = () => {
    const temp = version1Id;
    setVersion1Id(version2Id);
    setVersion2Id(temp);
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm" className="gap-2" data-testid="button-compare-versions">
          <GitCompare className="h-4 w-4" />
          <span className="hidden sm:inline">Compare Versions</span>
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-4xl max-h-[85vh] flex flex-col">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <GitCompare className="h-5 w-5" />
            Compare Versions
          </DialogTitle>
        </DialogHeader>

        <div className="flex items-center gap-4 py-4">
          <div className="flex-1">
            <label className="text-sm font-medium mb-2 block">First Version</label>
            <Select value={version1Id || ""} onValueChange={setVersion1Id}>
              <SelectTrigger data-testid="select-compare-v1">
                <SelectValue placeholder="Select version" />
              </SelectTrigger>
              <SelectContent>
                {versions.map(v => (
                  <SelectItem key={v.id} value={v.id} disabled={v.id === version2Id}>
                    Version {v.version} ({v.features.length} features)
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <Button
            variant="ghost"
            size="icon"
            onClick={swapVersions}
            disabled={!version1Id || !version2Id}
            className="mt-6"
            data-testid="button-swap-versions"
          >
            <ArrowRight className="h-4 w-4" />
          </Button>

          <div className="flex-1">
            <label className="text-sm font-medium mb-2 block">Second Version</label>
            <Select value={version2Id || ""} onValueChange={setVersion2Id}>
              <SelectTrigger data-testid="select-compare-v2">
                <SelectValue placeholder="Select version" />
              </SelectTrigger>
              <SelectContent>
                {versions.map(v => (
                  <SelectItem key={v.id} value={v.id} disabled={v.id === version1Id}>
                    Version {v.version} ({v.features.length} features)
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        {comparison && version1 && version2 && (
          <ScrollArea className="flex-1 -mx-6 px-6">
            <div className="space-y-6 pb-4">
              <div className="grid grid-cols-3 gap-4 text-center">
                <Card>
                  <CardContent className="pt-4">
                    <div className="text-2xl font-bold text-red-500">{comparison.onlyInV1.length}</div>
                    <div className="text-xs text-muted-foreground">Only in v{version1.version}</div>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="pt-4">
                    <div className="text-2xl font-bold text-muted-foreground">{comparison.inBoth.length}</div>
                    <div className="text-xs text-muted-foreground">In Both</div>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="pt-4">
                    <div className="text-2xl font-bold text-green-500">{comparison.onlyInV2.length}</div>
                    <div className="text-xs text-muted-foreground">Only in v{version2.version}</div>
                  </CardContent>
                </Card>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm flex items-center gap-2">
                      <Minus className="h-4 w-4 text-red-500" />
                      Only in Version {version1.version}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    {comparison.onlyInV1.length === 0 ? (
                      <p className="text-sm text-muted-foreground">No unique features</p>
                    ) : (
                      <div className="space-y-2">
                        {comparison.onlyInV1.map((feature, idx) => (
                          <div key={idx} className="text-sm p-2 bg-red-500/10 rounded border border-red-500/20">
                            <div className="font-medium">{feature.title}</div>
                            <Badge variant="outline" className="mt-1 text-xs">{feature.category}</Badge>
                          </div>
                        ))}
                      </div>
                    )}
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm flex items-center gap-2">
                      <Plus className="h-4 w-4 text-green-500" />
                      Only in Version {version2.version}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    {comparison.onlyInV2.length === 0 ? (
                      <p className="text-sm text-muted-foreground">No unique features</p>
                    ) : (
                      <div className="space-y-2">
                        {comparison.onlyInV2.map((feature, idx) => (
                          <div key={idx} className="text-sm p-2 bg-green-500/10 rounded border border-green-500/20">
                            <div className="font-medium">{feature.title}</div>
                            <Badge variant="outline" className="mt-1 text-xs">{feature.category}</Badge>
                          </div>
                        ))}
                      </div>
                    )}
                  </CardContent>
                </Card>
              </div>

              {comparison.inBoth.length > 0 && (
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm flex items-center gap-2">
                      <Equal className="h-4 w-4 text-muted-foreground" />
                      Features in Both Versions ({comparison.inBoth.length})
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex flex-wrap gap-2">
                      {comparison.inBoth.map((feature, idx) => (
                        <Badge key={idx} variant="secondary" className="text-xs">
                          {feature.title}
                        </Badge>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              )}

              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm">Category Breakdown</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <div className="text-sm font-medium mb-2">v{version1.version}</div>
                      <div className="space-y-1">
                        {Object.entries(comparison.v1Categories).map(([cat, count]) => (
                          <div key={cat} className="flex justify-between text-sm">
                            <span className="text-muted-foreground">{cat}</span>
                            <span className="font-mono">{count}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                    <div>
                      <div className="text-sm font-medium mb-2">v{version2.version}</div>
                      <div className="space-y-1">
                        {Object.entries(comparison.v2Categories).map(([cat, count]) => (
                          <div key={cat} className="flex justify-between text-sm">
                            <span className="text-muted-foreground">{cat}</span>
                            <span className="font-mono">{count}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </ScrollArea>
        )}

        {!comparison && (
          <div className="flex-1 flex items-center justify-center text-muted-foreground">
            Select two versions to compare their features
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
