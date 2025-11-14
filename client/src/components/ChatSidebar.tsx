import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Send, Sparkles, Cpu, Zap, Bot } from "lucide-react";
import ChatMessage, { ChatMessageProps } from "./ChatMessage";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";

export default function ChatSidebar() {
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

  const handleSend = async () => {
    if (!input.trim() || loadingStates[activeModel]) return;

    const userMessage: ChatMessageProps = {
      role: "user",
      content: input.trim(),
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

  return (
    <div className="h-full flex flex-col">
      <Tabs value={activeModel} onValueChange={(v) => setActiveModel(v as "claude" | "deepseek" | "gemini" | "openai")} className="flex-1 flex flex-col overflow-hidden">
        <div className="border-b p-2 sm:p-4 flex-shrink-0">
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

        <TabsContent value="claude" className="flex-1 flex flex-col m-0 overflow-hidden h-full">
          <ScrollArea className="flex-1 px-2 sm:px-4 h-full" ref={claudeScrollRef}>
            <div className="py-2 space-y-4 sm:space-y-6">
              {claudeMessages.length === 0 ? (
                <div className="h-full flex items-center justify-center text-center text-muted-foreground text-sm p-8">
                  Ask Claude Sonnet about ICM InfoWorks features and updates
                </div>
              ) : (
                claudeMessages.map((msg, idx) => (
                  <ChatMessage key={idx} {...msg} />
                ))
              )}
              {loadingStates.claude && (
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

        <TabsContent value="deepseek" className="flex-1 flex flex-col m-0 overflow-hidden h-full">
          <ScrollArea className="flex-1 px-2 sm:px-4 h-full" ref={deepseekScrollRef}>
            <div className="py-2 space-y-4 sm:space-y-6">
              {deepseekMessages.length === 0 ? (
                <div className="h-full flex items-center justify-center text-center text-muted-foreground text-sm p-8">
                  Ask DeepSeek about ICM InfoWorks features and updates
                </div>
              ) : (
                deepseekMessages.map((msg, idx) => (
                  <ChatMessage key={idx} {...msg} />
                ))
              )}
              {loadingStates.deepseek && (
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

        <TabsContent value="gemini" className="flex-1 flex flex-col m-0 overflow-hidden h-full">
          <ScrollArea className="flex-1 px-2 sm:px-4 h-full" ref={geminiScrollRef}>
            <div className="py-2 space-y-4 sm:space-y-6">
              {geminiMessages.length === 0 ? (
                <div className="h-full flex items-center justify-center text-center text-muted-foreground text-sm p-8">
                  Ask Gemini about ICM InfoWorks features and updates
                </div>
              ) : (
                geminiMessages.map((msg, idx) => (
                  <ChatMessage key={idx} {...msg} />
                ))
              )}
              {loadingStates.gemini && (
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

        <TabsContent value="openai" className="flex-1 flex flex-col m-0 overflow-hidden h-full">
          <ScrollArea className="flex-1 px-2 sm:px-4 h-full" ref={openaiScrollRef}>
            <div className="py-2 space-y-4 sm:space-y-6">
              {openaiMessages.length === 0 ? (
                <div className="h-full flex items-center justify-center text-center text-muted-foreground text-sm p-8">
                  Ask GPT about ICM InfoWorks features and updates
                </div>
              ) : (
                openaiMessages.map((msg, idx) => (
                  <ChatMessage key={idx} {...msg} />
                ))
              )}
              {loadingStates.openai && (
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

      <div className="border-t p-2 sm:p-4 flex-shrink-0">
        <div className="flex gap-2">
          <Textarea
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
            onClick={handleSend}
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
