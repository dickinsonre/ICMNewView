# ICM InfoWorks - What's New

## Overview

ICM InfoWorks "What's New" is an AI-powered web application designed to provide an interactive and dynamic experience for exploring release notes and feature updates of the ICM InfoWorks software. It replaces traditional static documentation with a visual timeline, categorized features, and integrated AI chat assistants. The application aims to significantly enhance user engagement and provide efficient, intuitive information retrieval through a modern, responsive user interface inspired by Material Design 3.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend

The frontend is built with React 18, TypeScript, and Vite, utilizing Wouter for routing and TanStack Query for server state management. UI components are developed using Shadcn/ui (Radix UI primitives) and styled with Tailwind CSS, adhering to Material Design 3 guidelines, including dark mode support. The typography uses Inter and JetBrains Mono fonts. The layout features a two-column design with a main content area, a fixed-width chat sidebar, a responsive grid for feature cards, and a horizontally scrollable timeline.

### Backend

The backend is an Express.js application written in TypeScript (ESM), offering RESTful endpoints for version data and streaming endpoints for AI chat integrations. It uses JSON-based API data validated with Zod schemas. While currently using in-memory data storage, it is designed with an `IStorage` interface for future database integration, with Drizzle ORM for PostgreSQL pre-configured for persistence.

### System Design Choices

The application emphasizes dynamic content delivery, interactive user experiences with integrated AI, and a modular architecture for scalability. The UI/UX prioritizes a consistent and modern look following Material Design 3 principles. Version data is structured to include version ID, release date, and categorized feature arrays, maintained in descending chronological order for timeline rendering.

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