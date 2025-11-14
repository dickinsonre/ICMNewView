import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Bot, User } from "lucide-react";
import { cn } from "@/lib/utils";

export interface ChatMessageProps {
  role: "user" | "assistant";
  content: string;
  model?: "claude" | "deepseek" | "kimi";
}

export default function ChatMessage({ role, content, model }: ChatMessageProps) {
  const isUser = role === "user";
  
  const modelName = model === "claude" ? "Claude Sonnet" : 
                   model === "deepseek" ? "DeepSeek" : 
                   model === "kimi" ? "Kimi" : "";
  
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
          "rounded-2xl px-4 py-2.5 max-w-[85%]",
          isUser
            ? "bg-primary text-primary-foreground"
            : "bg-muted text-foreground"
        )}
      >
        {!isUser && model && (
          <div className="text-xs font-medium mb-1 text-muted-foreground">
            {modelName}
          </div>
        )}
        <div className="text-sm whitespace-pre-wrap break-words">{content}</div>
      </div>
    </div>
  );
}
