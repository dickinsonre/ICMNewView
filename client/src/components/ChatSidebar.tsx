import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Send, Sparkles, Cpu } from "lucide-react";
import ChatMessage, { ChatMessageProps } from "./ChatMessage";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";

export default function ChatSidebar() {
  const { toast } = useToast();
  const [activeModel, setActiveModel] = useState<"claude" | "deepseek">("claude");
  const [claudeMessages, setClaudeMessages] = useState<ChatMessageProps[]>([]);
  const [deepseekMessages, setDeepseekMessages] = useState<ChatMessageProps[]>([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [claudeMessages, deepseekMessages]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage: ChatMessageProps = {
      role: "user",
      content: input.trim(),
    };

    const currentMessages = activeModel === "claude" ? claudeMessages : deepseekMessages;

    if (activeModel === "claude") {
      setClaudeMessages((prev) => [...prev, userMessage]);
    } else {
      setDeepseekMessages((prev) => [...prev, userMessage]);
    }

    setInput("");
    setIsLoading(true);

    try {
      const endpoint = activeModel === "claude" ? "/api/chat/claude" : "/api/chat/deepseek";
      const response = await apiRequest(
        "POST",
        endpoint,
        {
          messages: [...currentMessages, userMessage]
        }
      );

      const data = await response.json() as { message: string };

      const aiMessage: ChatMessageProps = {
        role: "assistant",
        content: data.message,
        model: activeModel,
      };

      if (activeModel === "claude") {
        setClaudeMessages((prev) => [...prev, aiMessage]);
      } else {
        setDeepseekMessages((prev) => [...prev, aiMessage]);
      }
    } catch (error) {
      console.error("Chat API error:", error);
      const errorMessage = error instanceof Error ? error.message : "Sorry, I encountered an error. Please try again.";
      
      toast({
        variant: "destructive",
        title: "Chat Error",
        description: errorMessage,
      });

      const chatErrorMessage: ChatMessageProps = {
        role: "assistant",
        content: errorMessage,
        model: activeModel,
      };

      if (activeModel === "claude") {
        setClaudeMessages((prev) => [...prev, chatErrorMessage]);
      } else {
        setDeepseekMessages((prev) => [...prev, chatErrorMessage]);
      }
    } finally {
      setIsLoading(false);
    }
  };

  const currentMessages = activeModel === "claude" ? claudeMessages : deepseekMessages;

  return (
    <div className="h-full flex flex-col border-l">
      <Tabs value={activeModel} onValueChange={(v) => setActiveModel(v as "claude" | "deepseek")} className="flex-1 flex flex-col overflow-hidden">
        <div className="border-b p-4 flex-shrink-0">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="claude" className="gap-2" data-testid="tab-claude">
              <Sparkles className="h-4 w-4" />
              Claude Sonnet
            </TabsTrigger>
            <TabsTrigger value="deepseek" className="gap-2" data-testid="tab-deepseek">
              <Cpu className="h-4 w-4" />
              DeepSeek
            </TabsTrigger>
          </TabsList>
        </div>

        <TabsContent value="claude" className="flex-1 flex flex-col m-0 overflow-hidden">
          <ScrollArea className="flex-1 px-4" ref={scrollRef}>
            <div className="py-4 space-y-4">
              {currentMessages.length === 0 ? (
                <div className="h-full flex items-center justify-center text-center text-muted-foreground text-sm p-8">
                  Ask Claude Sonnet about ICM InfoWorks features and updates
                </div>
              ) : (
                currentMessages.map((msg, idx) => (
                  <ChatMessage key={idx} {...msg} />
                ))
              )}
              {isLoading && activeModel === "claude" && (
                <div className="flex gap-2 items-center text-muted-foreground text-sm">
                  <div className="flex gap-1">
                    <div className="w-2 h-2 bg-current rounded-full animate-bounce" style={{ animationDelay: "0ms" }} />
                    <div className="w-2 h-2 bg-current rounded-full animate-bounce" style={{ animationDelay: "150ms" }} />
                    <div className="w-2 h-2 bg-current rounded-full animate-bounce" style={{ animationDelay: "300ms" }} />
                  </div>
                  Thinking...
                </div>
              )}
            </div>
          </ScrollArea>
        </TabsContent>

        <TabsContent value="deepseek" className="flex-1 flex flex-col m-0 overflow-hidden">
          <ScrollArea className="flex-1 px-4" ref={scrollRef}>
            <div className="py-4 space-y-4">
              {currentMessages.length === 0 ? (
                <div className="h-full flex items-center justify-center text-center text-muted-foreground text-sm p-8">
                  Ask DeepSeek about ICM InfoWorks features and updates
                </div>
              ) : (
                currentMessages.map((msg, idx) => (
                  <ChatMessage key={idx} {...msg} />
                ))
              )}
              {isLoading && activeModel === "deepseek" && (
                <div className="flex gap-2 items-center text-muted-foreground text-sm">
                  <div className="flex gap-1">
                    <div className="w-2 h-2 bg-current rounded-full animate-bounce" style={{ animationDelay: "0ms" }} />
                    <div className="w-2 h-2 bg-current rounded-full animate-bounce" style={{ animationDelay: "150ms" }} />
                    <div className="w-2 h-2 bg-current rounded-full animate-bounce" style={{ animationDelay: "300ms" }} />
                  </div>
                  Thinking...
                </div>
              )}
            </div>
          </ScrollArea>
        </TabsContent>
      </Tabs>

      <div className="border-t p-4 flex-shrink-0">
        <div className="flex gap-2">
          <Textarea
            placeholder={`Ask ${activeModel === "claude" ? "Claude" : "DeepSeek"} about ICM InfoWorks...`}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault();
                handleSend();
              }
            }}
            className="resize-none min-h-[44px] max-h-[120px]"
            rows={1}
            data-testid="input-chat"
          />
          <Button
            onClick={handleSend}
            disabled={!input.trim() || isLoading}
            size="icon"
            className="flex-shrink-0"
            data-testid="button-send"
          >
            <Send className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}
