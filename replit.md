# ICM InfoWorks - What's New

## Overview

ICM InfoWorks "What's New" is a technical documentation web application designed to provide an interactive and AI-powered experience for exploring release notes and feature updates of the ICM InfoWorks software. It aims to replace traditional static release notes with a dynamic platform featuring a visual timeline of software versions, categorized features, and dual AI chat assistants (Claude Sonnet and DeepSeek) for natural language queries. The application boasts a modern, responsive interface inspired by Material Design 3, including dark mode support. Its core purpose is to enhance user engagement with product updates and make information retrieval more efficient and intuitive.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend

The frontend is built with React 18 and TypeScript, using Vite for development and production. It employs Wouter for client-side routing and TanStack Query for server state management and caching, avoiding global state management libraries. The UI is constructed using Shadcn/ui components (based on Radix UI primitives) and styled with Tailwind CSS, adhering to Material Design 3 principles with custom design tokens. Typography uses Inter for UI and JetBrains Mono for code. The layout features a two-column design with a main content area and a fixed-width chat sidebar, a responsive grid for feature cards, and a horizontally scrollable timeline.

### Backend

The backend is an Express.js application written in TypeScript (ESM). It provides RESTful endpoints for version data and streaming chat endpoints for AI integrations. API requests and responses are JSON-based and validated with Zod schemas. Currently, it uses in-memory data storage for version information, but is architected with an interface (`IStorage`) to allow for future database integration. Development leverages Vite middleware for HMR and custom logging.

### Database Strategy

The application currently uses in-memory data storage, with version data imported from static TypeScript files. However, it is pre-configured with Drizzle ORM for PostgreSQL, including a defined schema (`/shared/schema.ts`) and migration setup. Neon Database (serverless PostgreSQL) and `connect-pg-simple` for session storage are also configured but unused. This setup anticipates future features requiring data persistence, such as user accounts or dynamic content, allowing for a seamless transition from in-memory to a database-backed solution.

## External Dependencies

**AI Services:**
- **Anthropic Claude**: Primary AI assistant (Claude Sonnet model) used for conversational queries via `@anthropic-ai/sdk`.
- **OpenAI (DeepSeek)**: Secondary AI assistant providing an alternative perspective, integrated via the OpenAI SDK.

**UI Component Libraries:**
- **Radix UI**: Provides headless, accessible component primitives.
- **Tailwind CSS**: Utility-first CSS framework for styling and custom theming based on Material Design 3.

**Validation & Type Safety:**
- **Zod**: Runtime schema validation for API data.
- **Drizzle Zod**: Integration for ORM and Zod schemas.
- **TypeScript**: Strict mode enabled throughout the codebase.

**Other Libraries:**
- **date-fns**: For date formatting and manipulation.
- **Google Fonts**: Inter and JetBrains Mono fonts.

**Database Services (Configured but Unused):**
- **Neon Database**: PostgreSQL serverless database, configured via `@neondatabase/serverless` driver.

**Development Tools:**
- **Vite**: Build tool and dev server.
- **Replit Integrations**: Includes an error overlay modal, Cartographer for code mapping, and a dev banner.