import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { chatMessageSchema } from "@shared/schema";
import Anthropic from "@anthropic-ai/sdk";
import OpenAI from "openai";

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
      const { messages } = req.body;
      const validatedMessages = messages.map((msg: any) => chatMessageSchema.parse(msg));
      
      const anthropic = new Anthropic();
      
      const response = await anthropic.messages.create({
        model: "claude-sonnet-4-20250514",
        max_tokens: 2048,
        messages: validatedMessages.map((msg: any) => ({
          role: msg.role,
          content: msg.content
        }))
      });

      const content = response.content[0];
      const assistantMessage = content.type === 'text' ? content.text : '';
      
      res.json({ message: assistantMessage });
    } catch (error) {
      console.error("Claude API error:", error);
      res.status(500).json({ message: "Failed to get response from Claude" });
    }
  });

  app.post("/api/chat/deepseek", async (req, res) => {
    try {
      const { messages } = req.body;
      const validatedMessages = messages.map((msg: any) => chatMessageSchema.parse(msg));
      
      const openai = new OpenAI({
        baseURL: "https://openrouter.ai/api/v1",
        apiKey: process.env.OPENROUTER_API_KEY,
      });
      
      const response = await openai.chat.completions.create({
        model: "deepseek/deepseek-chat",
        messages: validatedMessages.map((msg: any) => ({
          role: msg.role,
          content: msg.content
        }))
      });

      const assistantMessage = response.choices[0]?.message?.content || '';
      
      res.json({ message: assistantMessage });
    } catch (error) {
      console.error("DeepSeek API error:", error);
      res.status(500).json({ message: "Failed to get response from DeepSeek" });
    }
  });

  const httpServer = createServer(app);

  return httpServer;
}
