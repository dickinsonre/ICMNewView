import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Send, Sparkles, Cpu, Zap, Bot } from "lucide-react";
import ChatMessage, { ChatMessageProps } from "./ChatMessage";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";

const SUGGESTED_PROMPTS = [
  "What's new in version 2027.0?",
  "What changed in 2D modelling between 2024.0 and 2027.0?",
  "Which version first introduced cloud capabilities?",
  "What's the upgrade path for someone still on version 10.5?",
  "What scripting features have been added over the years?",
];

interface ChatSidebarProps {
  pendingMessage?: string;
  onPendingMessageUsed?: () => void;
}

export default function ChatSidebar({ pendingMessage, onPendingMessageUsed }: ChatSidebarProps) {
  const { toast } = useToast();
  const [activeModel, setActiveModel] = useState<"claude" | "deepseek" | "gemini" | "openai">("claude");
  const [claudeMessages, setClaudeMessages] = useState<ChatMessageProps[]>([]);
  const [deepseekMessages, setDeepseekMessages] = useState<ChatMessageProps[]>([]);
  const [geminiMessages, setGeminiMessages] = useState<ChatMessageProps[]>([]);
  const [openaiMessages, setOpenaiMessages] = useState<ChatMessageProps[]>([]);
  const [input, setInput] = useState("");
  const [loadingStates, setLoadingStates] = useState<Record<string, boolean>>({
    claude: false,
    deepseek: false,
    gemini: false,
    openai: false,
  });
  const claudeScrollRef = useRef<HTMLDivElement>(null);
  const deepseekScrollRef = useRef<HTMLDivElement>(null);
  const geminiScrollRef = useRef<HTMLDivElement>(null);
  const openaiScrollRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (pendingMessage) {
      setInput(pendingMessage);
      onPendingMessageUsed?.();
      setTimeout(() => textareaRef.current?.focus(), 50);
    }
  }, [pendingMessage, onPendingMessageUsed]);

  useEffect(() => {
    if (claudeScrollRef.current && activeModel === "claude") {
      claudeScrollRef.current.scrollTop = claudeScrollRef.current.scrollHeight;
    }
  }, [claudeMessages, activeModel]);

  useEffect(() => {
    if (deepseekScrollRef.current && activeModel === "deepseek") {
      deepseekScrollRef.current.scrollTop = deepseekScrollRef.current.scrollHeight;
    }
  }, [deepseekMessages, activeModel]);

  useEffect(() => {
    if (geminiScrollRef.current && activeModel === "gemini") {
      geminiScrollRef.current.scrollTop = geminiScrollRef.current.scrollHeight;
    }
  }, [geminiMessages, activeModel]);

  useEffect(() => {
    if (openaiScrollRef.current && activeModel === "openai") {
      openaiScrollRef.current.scrollTop = openaiScrollRef.current.scrollHeight;
    }
  }, [openaiMessages, activeModel]);

  const handleSend = async (overrideInput?: string) => {
    const message = (overrideInput ?? input).trim();
    if (!message || loadingStates[activeModel]) return;

    const userMessage: ChatMessageProps = {
      role: "user",
      content: message,
    };

    const currentMessages = activeModel === "claude" ? claudeMessages : 
                           activeModel === "deepseek" ? deepseekMessages :
                           activeModel === "gemini" ? geminiMessages : openaiMessages;

    if (activeModel === "claude") {
      setClaudeMessages((prev) => [...prev, userMessage]);
    } else if (activeModel === "deepseek") {
      setDeepseekMessages((prev) => [...prev, userMessage]);
    } else if (activeModel === "gemini") {
      setGeminiMessages((prev) => [...prev, userMessage]);
    } else {
      setOpenaiMessages((prev) => [...prev, userMessage]);
    }

    setInput("");
    setLoadingStates(prev => ({ ...prev, [activeModel]: true }));

    try {
      const endpoint = activeModel === "claude" ? "/api/chat/claude" : 
                      activeModel === "deepseek" ? "/api/chat/deepseek" :
                      activeModel === "gemini" ? "/api/chat/gemini" : "/api/chat/openai";
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
      } else if (activeModel === "deepseek") {
        setDeepseekMessages((prev) => [...prev, aiMessage]);
      } else if (activeModel === "gemini") {
        setGeminiMessages((prev) => [...prev, aiMessage]);
      } else {
        setOpenaiMessages((prev) => [...prev, aiMessage]);
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
      } else if (activeModel === "deepseek") {
        setDeepseekMessages((prev) => [...prev, chatErrorMessage]);
      } else if (activeModel === "gemini") {
        setGeminiMessages((prev) => [...prev, chatErrorMessage]);
      } else {
        setOpenaiMessages((prev) => [...prev, chatErrorMessage]);
      }
    } finally {
      setLoadingStates(prev => ({ ...prev, [activeModel]: false }));
    }
  };

  const getMessages = () => {
    if (activeModel === "claude") return claudeMessages;
    if (activeModel === "deepseek") return deepseekMessages;
    if (activeModel === "gemini") return geminiMessages;
    return openaiMessages;
  };

  const EmptyState = () => (
    <div className="flex flex-col gap-4 p-4">
      <p className="text-center text-muted-foreground text-sm">
        {activeModel === "claude" ? "Ask Claude Sonnet" :
         activeModel === "deepseek" ? "Ask DeepSeek" :
         activeModel === "gemini" ? "Ask Gemini" : "Ask GPT"} about ICM InfoWorks features and updates
      </p>
      <div className="space-y-2">
        <p className="text-xs text-muted-foreground font-medium">Suggested questions</p>
        <div className="flex flex-col gap-1.5">
          {SUGGESTED_PROMPTS.map((prompt) => (
            <button
              key={prompt}
              className="text-left text-xs px-3 py-2 rounded-md border border-border bg-muted/40 hover-elevate text-muted-foreground hover:text-foreground transition-colors"
              onClick={() => {
                setInput(prompt);
                setTimeout(() => textareaRef.current?.focus(), 50);
              }}
              data-testid={`prompt-suggestion-${prompt.slice(0, 20).replace(/\s+/g, '-').toLowerCase()}`}
            >
              {prompt}
            </button>
          ))}
        </div>
      </div>
    </div>
  );

  const LoadingDots = () => (
    <div className="flex gap-2 items-center text-muted-foreground text-sm">
      <div className="flex gap-1">
        <div className="w-2 h-2 bg-current rounded-full animate-bounce" style={{ animationDelay: "0ms" }} />
        <div className="w-2 h-2 bg-current rounded-full animate-bounce" style={{ animationDelay: "150ms" }} />
        <div className="w-2 h-2 bg-current rounded-full animate-bounce" style={{ animationDelay: "300ms" }} />
      </div>
      Thinking...
    </div>
  );

  return (
    <div className="h-full flex flex-col">
      <Tabs value={activeModel} onValueChange={(v) => setActiveModel(v as "claude" | "deepseek" | "gemini" | "openai")} className="flex-1 flex flex-col overflow-hidden">
        <div className="border-b px-2 sm:px-4 pt-2 sm:pt-4 pb-2 sm:pb-4 flex-shrink-0">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="claude" className="gap-1 sm:gap-2 text-xs sm:text-sm px-2 sm:px-3" data-testid="tab-claude">
              <Sparkles className="h-3 w-3 sm:h-4 sm:w-4" />
              <span className="hidden sm:inline">Claude</span>
            </TabsTrigger>
            <TabsTrigger value="deepseek" className="gap-1 sm:gap-2 text-xs sm:text-sm px-2 sm:px-3" data-testid="tab-deepseek">
              <Cpu className="h-3 w-3 sm:h-4 sm:w-4" />
              <span className="hidden sm:inline">DeepSeek</span>
            </TabsTrigger>
            <TabsTrigger value="gemini" className="gap-1 sm:gap-2 text-xs sm:text-sm px-2 sm:px-3" data-testid="tab-gemini">
              <Zap className="h-3 w-3 sm:h-4 sm:w-4" />
              <span className="hidden sm:inline">Gemini</span>
            </TabsTrigger>
            <TabsTrigger value="openai" className="gap-1 sm:gap-2 text-xs sm:text-sm px-2 sm:px-3" data-testid="tab-openai">
              <Bot className="h-3 w-3 sm:h-4 sm:w-4" />
              <span className="hidden sm:inline">GPT</span>
            </TabsTrigger>
          </TabsList>
        </div>

        {(["claude", "deepseek", "gemini", "openai"] as const).map((model) => (
          <TabsContent key={model} value={model} className="flex-1 flex flex-col m-0 overflow-hidden h-full">
            <ScrollArea
              className="flex-1 h-full"
              ref={
                model === "claude" ? claudeScrollRef :
                model === "deepseek" ? deepseekScrollRef :
                model === "gemini" ? geminiScrollRef : openaiScrollRef
              }
            >
              <div className="space-y-4 sm:space-y-6 p-2 sm:p-4">
                {getMessages().length === 0 && model === activeModel ? (
                  <EmptyState />
                ) : (
                  (model === "claude" ? claudeMessages :
                   model === "deepseek" ? deepseekMessages :
                   model === "gemini" ? geminiMessages : openaiMessages
                  ).map((msg, idx) => (
                    <ChatMessage key={idx} {...msg} />
                  ))
                )}
                {loadingStates[model] && <LoadingDots />}
              </div>
            </ScrollArea>
          </TabsContent>
        ))}
      </Tabs>

      <div className="border-t p-2 sm:p-4 flex-shrink-0">
        <div className="flex gap-2">
          <Textarea
            ref={textareaRef}
            placeholder={`Ask ${activeModel === "claude" ? "Claude" : activeModel === "deepseek" ? "DeepSeek" : activeModel === "gemini" ? "Gemini" : "GPT"} about ICM InfoWorks...`}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault();
                handleSend();
              }
            }}
            className="resize-none min-h-[60px] max-h-[160px] text-base"
            rows={2}
            data-testid="input-chat"
          />
          <Button
            onClick={() => handleSend()}
            disabled={!input.trim() || loadingStates[activeModel]}
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
