import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { chatMessageSchema } from "@shared/schema";
import Anthropic from "@anthropic-ai/sdk";
import OpenAI from "openai";
import { z } from "zod";

const chatRequestSchema = z.object({
  messages: z.array(chatMessageSchema)
});

export async function registerRoutes(app: Express): Promise<Server> {
  app.get("/api/versions", async (req, res) => {
    try {
      const versions = await storage.getAllVersions();
      res.json(versions);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch versions" });
    }
  });

  app.get("/api/versions/:id", async (req, res) => {
    try {
      const version = await storage.getVersion(req.params.id);
      if (!version) {
        return res.status(404).json({ message: "Version not found" });
      }
      res.json(version);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch version" });
    }
  });

  app.post("/api/chat/claude", async (req, res) => {
    try {
      const validationResult = chatRequestSchema.safeParse(req.body);
      if (!validationResult.success) {
        return res.status(400).json({ 
          message: "Invalid request: messages array is required" 
        });
      }

      const { messages} = validationResult.data;
      
      const anthropic = new Anthropic({
        apiKey: process.env.AI_INTEGRATIONS_ANTHROPIC_API_KEY,
        baseURL: process.env.AI_INTEGRATIONS_ANTHROPIC_BASE_URL,
      });
      
      const response = await anthropic.messages.create({
        model: "claude-sonnet-4-20250514",
        max_tokens: 2048,
        messages: messages.map((msg) => ({
          role: msg.role,
          content: [
            {
              type: "text",
              text: msg.content
            }
          ]
        }))
      });

      const content = response.content[0];
      const assistantMessage = content.type === 'text' ? content.text : '';
      
      res.json({ message: assistantMessage });
    } catch (error) {
      console.error("Claude API error:", error);
      const errorMessage = error instanceof Error ? error.message : "Failed to get response from Claude";
      res.status(500).json({ message: errorMessage });
    }
  });

  app.post("/api/chat/deepseek", async (req, res) => {
    try {
      const validationResult = chatRequestSchema.safeParse(req.body);
      if (!validationResult.success) {
        return res.status(400).json({ 
          message: "Invalid request: messages array is required" 
        });
      }

      const { messages } = validationResult.data;
      
      const openai = new OpenAI({
        baseURL: process.env.AI_INTEGRATIONS_OPENROUTER_BASE_URL,
        apiKey: process.env.AI_INTEGRATIONS_OPENROUTER_API_KEY,
        defaultHeaders: {
          "HTTP-Referer": "https://icm-whatsnew.replit.app",
          "X-Title": "ICM WhatsNew"
        }
      });
      
      const response = await openai.chat.completions.create({
        model: "deepseek/deepseek-chat",
        messages: messages.map((msg) => ({
          role: msg.role,
          content: msg.content
        }))
      });

      const assistantMessage = response.choices[0]?.message?.content || '';
      
      res.json({ message: assistantMessage });
    } catch (error) {
      console.error("DeepSeek API error:", error);
      const errorMessage = error instanceof Error ? error.message : "Failed to get response from DeepSeek";
      res.status(500).json({ message: errorMessage });
    }
  });

  const httpServer = createServer(app);

  return httpServer;
}
