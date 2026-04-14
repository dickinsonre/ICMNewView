import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Bot, User } from "lucide-react";
import { cn } from "@/lib/utils";

export interface ChatMessageProps {
  role: "user" | "assistant";
  content: string;
  model?: "claude" | "deepseek" | "gemini" | "openai";
  onCiteClick?: (featureId: string) => void;
}

function parseCitationId(raw: string): { version: string; label: string } {
  const firstDash = raw.indexOf("-");
  if (firstDash === -1) return { version: "", label: raw };
  const version = raw.slice(0, firstDash);
  const slug = raw.slice(firstDash + 1).replace(/-/g, " ");
  const label = slug.replace(/\b\w/g, (c) => c.toUpperCase());
  return { version, label };
}

function CitedContent({ content, onCiteClick }: { content: string; onCiteClick?: (id: string) => void }) {
  const citeRegex = /\[cite:([\w.\-]+)\]/g;
  const parts: React.ReactNode[] = [];
  let last = 0;
  let match: RegExpExecArray | null;
  let citNum = 0;

  while ((match = citeRegex.exec(content)) !== null) {
    if (match.index > last) {
      parts.push(content.slice(last, match.index));
    }
    const featureId = match[1];
    const { version, label } = parseCitationId(featureId);
    citNum++;
    parts.push(
      <button
        key={`cite-${citNum}-${featureId}`}
        onClick={() => onCiteClick?.(featureId)}
        title={`Go to: ${label} (v${version})`}
        className="inline-flex items-center gap-1 mx-0.5 align-baseline"
      >
        <Badge
          variant="secondary"
          className="text-[10px] px-1.5 py-0 h-4 font-mono cursor-pointer hover-elevate no-default-active-elevate bg-primary/15 text-primary border-primary/30"
        >
          [{citNum}] v{version}
        </Badge>
      </button>
    );
    last = match.index + match[0].length;
  }
  if (last < content.length) parts.push(content.slice(last));

  if (citNum === 0) {
    return <span className="whitespace-pre-wrap break-words">{content}</span>;
  }

  return <span className="whitespace-pre-wrap break-words leading-relaxed">{parts}</span>;
}

export default function ChatMessage({ role, content, model, onCiteClick }: ChatMessageProps) {
  const isUser = role === "user";
  
  const modelName = model === "claude" ? "Claude Sonnet" : 
                   model === "deepseek" ? "DeepSeek" : 
                   model === "gemini" ? "Gemini" :
                   model === "openai" ? "GPT-4o Mini" : "";
  
  return (
    <div
      className={cn(
        "flex gap-3 mb-4",
        isUser ? "flex-row-reverse" : "flex-row"
      )}
      data-testid={`message-${role}`}
    >
      <Avatar className="h-8 w-8 flex-shrink-0">
        <AvatarFallback className={cn(
          isUser ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"
        )}>
          {isUser ? <User className="h-4 w-4" /> : <Bot className="h-4 w-4" />}
        </AvatarFallback>
      </Avatar>
      
      <div
        className={cn(
          "rounded-2xl px-5 py-4 max-w-[85%]",
          isUser
            ? "bg-primary text-primary-foreground"
            : "bg-muted text-foreground"
        )}
      >
        {!isUser && model && (
          <div className="text-xs font-medium mb-2 text-muted-foreground">
            {modelName}
          </div>
        )}
        <div className="text-base leading-relaxed">
          {isUser ? (
            <span className="whitespace-pre-wrap break-words">{content}</span>
          ) : (
            <CitedContent content={content} onCiteClick={onCiteClick} />
          )}
        </div>
      </div>
    </div>
  );
}
