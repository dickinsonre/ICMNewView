# ICM InfoWorks - What's New

## Overview

ICM InfoWorks "What's New" is a web application providing an interactive, AI-powered experience for exploring release notes and feature updates of the ICM InfoWorks software. It replaces static documentation with a dynamic platform featuring a visual timeline, categorized features, and dual AI chat assistants (Claude Sonnet and DeepSeek). The application aims to enhance user engagement with product updates and make information retrieval efficient and intuitive through a modern, responsive interface inspired by Material Design 3, including dark mode support.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend

The frontend uses React 18, TypeScript, and Vite. It features Wouter for routing and TanStack Query for server state management. UI is built with Shadcn/ui components (Radix UI primitives) and styled with Tailwind CSS, adhering to Material Design 3. Typography uses Inter and JetBrains Mono. The layout includes a two-column design with a main content area and a fixed-width chat sidebar, a responsive grid for feature cards, and a horizontally scrollable timeline.

### Backend

The backend is an Express.js application written in TypeScript (ESM), providing RESTful endpoints for version data and streaming chat endpoints for AI integrations. API data is JSON-based and validated with Zod schemas. It currently uses in-memory data storage but is architected with an `IStorage` interface for future database integration. Drizzle ORM for PostgreSQL is pre-configured with a defined schema and migration setup, anticipating future data persistence needs.

### System Design Choices

The application's design emphasizes dynamic content delivery over static files, interactive user experiences with AI integration, and a modular architecture allowing for future scalability (e.g., database integration). The UI/UX follows Material Design 3 for a consistent and modern look, including dark mode.

## External Dependencies

**AI Services:**
- **Anthropic Claude**: Primary AI assistant (Claude Sonnet) via `@anthropic-ai/sdk`.
- **OpenAI (DeepSeek)**: Secondary AI assistant via the OpenAI SDK.

**UI Component Libraries:**
- **Radix UI**: Headless, accessible component primitives.
- **Tailwind CSS**: Utility-first CSS framework for styling.

**Validation & Type Safety:**
- **Zod**: Runtime schema validation.
- **TypeScript**: Strict mode enabled.

**Other Libraries:**
- **date-fns**: For date formatting.
- **Google Fonts**: Inter and JetBrains Mono fonts.

**Database Services (Configured but Unused):**
- **Neon Database**: PostgreSQL serverless database.