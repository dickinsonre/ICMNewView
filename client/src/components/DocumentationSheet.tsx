import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";

interface DocumentationSheetProps {
  open: boolean;
  onClose: () => void;
}

export default function DocumentationSheet({ open, onClose }: DocumentationSheetProps) {
  return (
    <Sheet open={open} onOpenChange={(isOpen) => !isOpen && onClose()}>
      <SheetContent className="w-full sm:max-w-2xl">
        <SheetHeader>
          <SheetTitle>Documentation</SheetTitle>
          <SheetDescription>
            ICM InfoWorks "What's New" - Project Information
          </SheetDescription>
        </SheetHeader>
        <ScrollArea className="h-[calc(100vh-8rem)] mt-6">
          <div className="space-y-6 pr-4">
            <section>
              <h3 className="text-lg font-semibold mb-3">Overview</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                ICM InfoWorks "What's New" is an interactive documentation platform for exploring release notes 
                and feature updates of the ICM InfoWorks software. This dynamic platform features a visual timeline 
                of software versions, categorized features, and dual AI chat assistants for natural language queries.
              </p>
            </section>

            <section>
              <h3 className="text-lg font-semibold mb-3">Key Features</h3>
              <div className="space-y-2">
                <div className="flex items-start gap-2">
                  <Badge variant="outline" className="mt-0.5">Timeline</Badge>
                  <p className="text-sm text-muted-foreground">
                    Visual timeline spanning from 2011 to present, covering 32 fully documented versions
                  </p>
                </div>
                <div className="flex items-start gap-2">
                  <Badge variant="outline" className="mt-0.5">AI Assistants</Badge>
                  <p className="text-sm text-muted-foreground">
                    Dual AI chatbots (Claude Sonnet & DeepSeek) for intelligent feature queries
                  </p>
                </div>
                <div className="flex items-start gap-2">
                  <Badge variant="outline" className="mt-0.5">Search</Badge>
                  <p className="text-sm text-muted-foreground">
                    Powerful search across 638 features and comprehensive filtering by category
                  </p>
                </div>
                <div className="flex items-start gap-2">
                  <Badge variant="outline" className="mt-0.5">Dark Mode</Badge>
                  <p className="text-sm text-muted-foreground">
                    Modern Material Design 3 interface with full dark mode support
                  </p>
                </div>
              </div>
            </section>

            <section>
              <h3 className="text-lg font-semibold mb-3">Coverage Statistics</h3>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <p className="text-2xl font-bold">32</p>
                  <p className="text-xs text-muted-foreground">Documented Versions</p>
                </div>
                <div className="space-y-1">
                  <p className="text-2xl font-bold">638</p>
                  <p className="text-xs text-muted-foreground">Total Features</p>
                </div>
                <div className="space-y-1">
                  <p className="text-2xl font-bold">11.67</p>
                  <p className="text-xs text-muted-foreground">Years Covered</p>
                </div>
                <div className="space-y-1">
                  <p className="text-2xl font-bold">100%</p>
                  <p className="text-xs text-muted-foreground">Documentation Complete</p>
                </div>
              </div>
            </section>

            <section>
              <h3 className="text-lg font-semibold mb-3">Timeline Coverage</h3>
              <div className="space-y-3">
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-sm font-medium">2025-2026</span>
                    <Badge variant="secondary">Partial</Badge>
                  </div>
                  <p className="text-xs text-muted-foreground">6 versions documented</p>
                </div>
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-sm font-medium">2022-2023</span>
                    <Badge>Complete</Badge>
                  </div>
                  <p className="text-xs text-muted-foreground">3 versions, 48 features</p>
                </div>
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-sm font-medium">2021 (Nov 2020 - Oct 2021)</span>
                    <Badge>Complete</Badge>
                  </div>
                  <p className="text-xs text-muted-foreground">8 versions, 104 features</p>
                </div>
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-sm font-medium">2011-2017</span>
                    <Badge>Complete</Badge>
                  </div>
                  <p className="text-xs text-muted-foreground">20 versions, 486 features</p>
                </div>
              </div>
            </section>

            <section>
              <h3 className="text-lg font-semibold mb-3">Technology Stack</h3>
              <div className="space-y-2">
                <div>
                  <p className="text-sm font-medium">Frontend</p>
                  <p className="text-xs text-muted-foreground">
                    React 18, TypeScript, Vite, TanStack Query, Shadcn/ui, Tailwind CSS
                  </p>
                </div>
                <div>
                  <p className="text-sm font-medium">Backend</p>
                  <p className="text-xs text-muted-foreground">
                    Express.js, TypeScript (ESM), Zod validation
                  </p>
                </div>
                <div>
                  <p className="text-sm font-medium">AI Services</p>
                  <p className="text-xs text-muted-foreground">
                    Anthropic Claude (Sonnet), OpenAI SDK (DeepSeek)
                  </p>
                </div>
              </div>
            </section>

            <section>
              <h3 className="text-lg font-semibold mb-3">How to Use</h3>
              <ol className="space-y-2 text-sm text-muted-foreground list-decimal list-inside">
                <li>Browse the timeline to explore versions chronologically</li>
                <li>Click on feature cards to see detailed descriptions</li>
                <li>Use the search bar to find specific features or keywords</li>
                <li>Navigate to specific versions using the version selector</li>
                <li>Ask questions to the AI assistants in the chat sidebar</li>
                <li>Toggle dark mode using the theme button in the header</li>
              </ol>
            </section>
          </div>
        </ScrollArea>
      </SheetContent>
    </Sheet>
  );
}
