import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { chatMessageSchema } from "@shared/schema";
import Anthropic from "@anthropic-ai/sdk";
import OpenAI from "openai";
import { GoogleGenAI } from "@google/genai";
import { z } from "zod";

const chatRequestSchema = z.object({
  messages: z.array(chatMessageSchema)
});

function buildSystemPrompt(versions: any[]): string {
  const totalFeatures = versions.reduce((sum: number, v: any) => sum + v.features.length, 0);
  const contextData = JSON.stringify(versions, null, 2);

  return `You are an expert assistant for ICM InfoWorks software documentation. You have access to comprehensive release notes covering ${versions.length} versions from 2011 to present, with ${totalFeatures} total features documented.

Here is the complete version history data:

${contextData}

CITATION RULES (IMPORTANT):
When you reference or mention a specific feature in your response, you MUST include a citation marker immediately after it in this exact format: [cite:FEATURE_ID]
- FEATURE_ID is the exact "id" field value from the feature data above
- Example: "The Network Design tool [cite:2027.0-network-design] was introduced in version 2027.0."
- Example: "Subgrid Sampling improvements [cite:2026.3-subgrid-meshing] expand mesh element support."
- Only cite features whose id actually exists in the provided data
- Include citations for every specific feature you mention — this helps users jump directly to the feature in the timeline
- You may cite the same feature multiple times if you reference it repeatedly

When answering questions:
- Search through the version data to find relevant features
- Provide specific version numbers and release dates
- Quote feature descriptions when relevant
- If a feature appears in multiple versions, mention the evolution
- Be concise but informative

Answer the user's questions about ICM InfoWorks features, versions, and release history based on this data.`;
}

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

      const { messages } = validationResult.data;
      const versions = await storage.getAllVersions();
      const systemMessage = buildSystemPrompt(versions);
      
      const anthropic = new Anthropic({
        apiKey: process.env.AI_INTEGRATIONS_ANTHROPIC_API_KEY,
        baseURL: process.env.AI_INTEGRATIONS_ANTHROPIC_BASE_URL,
      });
      
      const response = await anthropic.messages.create({
        model: "claude-sonnet-4-5",
        max_tokens: 2048,
        system: systemMessage,
        messages: messages.map((msg) => ({
          role: msg.role,
          content: [{ type: "text" as const, text: msg.content }]
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
      const versions = await storage.getAllVersions();
      const systemMessage = buildSystemPrompt(versions);
      
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
        messages: [
          { role: "system", content: systemMessage },
          ...messages.map((msg) => ({ role: msg.role, content: msg.content }))
        ]
      });

      const assistantMessage = response.choices[0]?.message?.content || '';
      res.json({ message: assistantMessage });
    } catch (error) {
      console.error("DeepSeek API error:", error);
      const errorMessage = error instanceof Error ? error.message : "Failed to get response from DeepSeek";
      res.status(500).json({ message: errorMessage });
    }
  });

  app.post("/api/chat/gemini", async (req, res) => {
    try {
      const validationResult = chatRequestSchema.safeParse(req.body);
      if (!validationResult.success) {
        return res.status(400).json({ 
          message: "Invalid request: messages array is required" 
        });
      }

      const { messages } = validationResult.data;
      const versions = await storage.getAllVersions();
      const systemMessage = buildSystemPrompt(versions);
      
      const ai = new GoogleGenAI({
        apiKey: process.env.AI_INTEGRATIONS_GEMINI_API_KEY,
        httpOptions: {
          apiVersion: "",
          baseUrl: process.env.AI_INTEGRATIONS_GEMINI_BASE_URL,
        },
      });
      
      const response = await ai.models.generateContent({
        model: "gemini-2.5-flash",
        contents: [
          {
            role: "user",
            parts: [
              { text: systemMessage },
              ...messages.map((msg) => ({ 
                text: `${msg.role === "user" ? "User" : "Assistant"}: ${msg.content}` 
              }))
            ]
          }
        ]
      });

      const assistantMessage = response.text || '';
      res.json({ message: assistantMessage });
    } catch (error) {
      console.error("Gemini API error:", error);
      const errorMessage = error instanceof Error ? error.message : "Failed to get response from Gemini";
      res.status(500).json({ message: errorMessage });
    }
  });

  app.post("/api/chat/openai", async (req, res) => {
    try {
      const validationResult = chatRequestSchema.safeParse(req.body);
      if (!validationResult.success) {
        return res.status(400).json({ 
          message: "Invalid request: messages array is required" 
        });
      }

      const { messages } = validationResult.data;
      const versions = await storage.getAllVersions();
      const systemMessage = buildSystemPrompt(versions);
      
      const openai = new OpenAI({
        baseURL: process.env.AI_INTEGRATIONS_OPENAI_BASE_URL,
        apiKey: process.env.AI_INTEGRATIONS_OPENAI_API_KEY,
      });
      
      const response = await openai.chat.completions.create({
        model: "gpt-4o-mini",
        messages: [
          { role: "system", content: systemMessage },
          ...messages.map((msg) => ({ role: msg.role, content: msg.content }))
        ]
      });

      const assistantMessage = response.choices[0]?.message?.content || '';
      res.json({ message: assistantMessage });
    } catch (error) {
      console.error("OpenAI API error:", error);
      const errorMessage = error instanceof Error ? error.message : "Failed to get response from OpenAI";
      res.status(500).json({ message: errorMessage });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
