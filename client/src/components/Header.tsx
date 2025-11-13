import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, Info } from "lucide-react";
import ThemeToggle from "./ThemeToggle";

interface HeaderProps {
  onSearch?: (query: string) => void;
  onShowDocumentation?: () => void;
}

export default function Header({ onSearch, onShowDocumentation }: HeaderProps) {
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
              <p className="text-xs text-muted-foreground">What's New</p>
            </div>
          </div>
        </div>

        <div className="flex-1 max-w-md hidden md:flex">
          <div className="relative w-full">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search features..."
              className="pl-9"
              onChange={(e) => onSearch?.(e.target.value)}
              data-testid="input-search"
            />
          </div>
        </div>

        <div className="flex items-center gap-2">
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={onShowDocumentation}
            data-testid="button-info"
          >
            <Info className="h-5 w-5" />
          </Button>
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
}
