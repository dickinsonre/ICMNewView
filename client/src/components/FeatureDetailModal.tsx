import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ExternalLink, Play, X } from "lucide-react";
import type { Feature } from "./FeatureCard";
import { cn } from "@/lib/utils";

interface FeatureDetailModalProps {
  feature: Feature | null;
  open: boolean;
  onClose: () => void;
}

const categoryColors: Record<string, string> = {
  "Esri Integration": "bg-blue-500/10 text-blue-700 dark:text-blue-300 border-blue-500/20",
  "Project Admin": "bg-purple-500/10 text-purple-700 dark:text-purple-300 border-purple-500/20",
  "Subgrid Sampling": "bg-green-500/10 text-green-700 dark:text-green-300 border-green-500/20",
  "Cloud": "bg-orange-500/10 text-orange-700 dark:text-orange-300 border-orange-500/20",
};

export default function FeatureDetailModal({ feature, open, onClose }: FeatureDetailModalProps) {
  if (!feature) return null;

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto" data-testid="modal-feature-detail">
        <DialogHeader>
          <div className="flex items-start justify-between gap-4">
            <div className="flex-1">
              <Badge
                variant="outline"
                className={cn(
                  "mb-3 text-xs font-medium",
                  categoryColors[feature.category] || "bg-muted"
                )}
              >
                {feature.category}
              </Badge>
              <DialogTitle className="text-2xl mb-2">{feature.title}</DialogTitle>
              <DialogDescription className="text-base">
                Version {feature.version} • {new Date(feature.releaseDate).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric'
                })}
              </DialogDescription>
            </div>
            <Button
              variant="ghost"
              size="icon"
              onClick={onClose}
              data-testid="button-close-modal"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        </DialogHeader>

        <div className="space-y-6 mt-4">
          {feature.hasVideo && (
            <div className="aspect-video bg-muted rounded-lg flex items-center justify-center">
              <div className="text-center">
                <Play className="h-12 w-12 mx-auto mb-2 text-muted-foreground" />
                <p className="text-sm text-muted-foreground">Video player placeholder</p>
                <p className="text-xs text-muted-foreground mt-1">
                  In production, video will be embedded here
                </p>
              </div>
            </div>
          )}

          <div>
            <h3 className="font-semibold mb-3">Description</h3>
            <p className="text-muted-foreground leading-relaxed whitespace-pre-wrap">
              {feature.description}
            </p>
          </div>

          {feature.documentationUrl && (
            <div className="pt-4 border-t">
              <Button
                variant="outline"
                className="gap-2"
                onClick={() => window.open(feature.documentationUrl, '_blank')}
                data-testid="button-view-docs"
              >
                <ExternalLink className="h-4 w-4" />
                View Full Documentation
              </Button>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
