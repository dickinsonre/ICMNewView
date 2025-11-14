import { Button } from "@/components/ui/button";
import { Info } from "lucide-react";
import ThemeToggle from "./ThemeToggle";

interface HeaderProps {
  onShowDocumentation?: () => void;
}

export default function Header({ onShowDocumentation }: HeaderProps) {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between gap-4 px-6">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2">
            <div className="h-8 w-8 rounded-md bg-primary flex items-center justify-center">
              <span className="text-primary-foreground font-bold text-sm">ICM</span>
            </div>
            <div>
              <h1 className="text-lg font-semibold leading-none">ICM InfoWorks</h1>
              <p className="text-xs text-muted-foreground">AI Chat Assistant</p>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <Button 
            variant="outline"
            onClick={onShowDocumentation}
            data-testid="button-info"
            className="gap-2"
          >
            <Info className="h-4 w-4" />
            <span className="hidden sm:inline">Documentation</span>
          </Button>
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
}
