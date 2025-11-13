# ICM InfoWorks - What's New

## Overview

ICM InfoWorks "What's New" is a technical documentation web application that provides an interactive way to explore release notes and feature updates for ICM InfoWorks software. The application combines a timeline-based visualization of software versions with an AI-powered chat interface, allowing users to both browse and query information about new features.

The application serves as a modern alternative to traditional release notes, offering:
- Visual timeline of software releases with categorized features
- Dual AI chat assistants (Claude Sonnet and DeepSeek) for natural language queries
- Material Design 3-inspired interface optimized for technical content
- Responsive design with dark mode support

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture

**Framework**: React 18 with TypeScript running on Vite for development and production builds.

**Routing**: Client-side routing using Wouter, a lightweight React router alternative.

**State Management**: 
- TanStack Query (React Query) for server state management and API data caching
- Local component state for UI interactions
- No global state management library - keeping state local to components

**UI Component System**:
- Shadcn/ui components based on Radix UI primitives
- Tailwind CSS with custom design tokens following Material Design 3 principles
- Component library organized in `/client/src/components/ui/`
- Custom components for feature cards, timeline, chat interface in `/client/src/components/`

**Design System**:
- Typography: Inter for UI/headings, JetBrains Mono for code/technical content
- Spacing: Tailwind's 4px-based scale (2, 4, 6, 8, 12, 16 units)
- Elevation system using CSS custom properties for hover and active states
- Extensive theming via CSS variables supporting light/dark modes
- Border radius: Custom values (.5625rem, .375rem, .1875rem)

**Layout Strategy**:
- Two-column split: Main content area with timeline + fixed-width chat sidebar (400px)
- Responsive grid system for feature cards (1-3 columns based on viewport)
- Sticky header navigation
- Full-width timeline with horizontal scroll capability

### Backend Architecture

**Server Framework**: Express.js with TypeScript running in ESM module mode.

**API Design**:
- RESTful endpoints for version data (`/api/versions`, `/api/versions/:id`)
- Streaming chat endpoints for AI integrations (`/api/chat/claude`, `/api/chat/deepseek`)
- JSON-based request/response format with Zod schema validation

**Development Setup**:
- Vite middleware integration for HMR during development
- Custom logging middleware tracking API request duration and responses
- Static file serving for production builds

**Data Storage**:
- In-memory storage implementation (`MemStorage` class)
- Structured version data imported from `/server/data/versions.ts`
- Interface-based storage abstraction (`IStorage`) allowing for future database implementations

**Session Management**: 
- User authentication schema defined but not currently implemented
- Session infrastructure configured with connect-pg-simple for PostgreSQL session storage (unused currently)

### Database Strategy

**Current State**: Application uses in-memory data storage with no active database connection.

**Configured But Unused**: 
- Drizzle ORM configured with PostgreSQL dialect
- Neon Database serverless driver available
- Database schema defined in `/shared/schema.ts` with user table
- Migration setup configured via `drizzle.config.ts`

**Rationale**: The application currently serves static release note data that doesn't require persistence. The database infrastructure is configured to support future features like user accounts, saved conversations, or dynamic content management.

**Future Migration Path**: When database features are needed, the existing Drizzle schema can be pushed and the `MemStorage` implementation can be replaced with a database-backed storage class implementing the same `IStorage` interface.

### External Dependencies

**AI Services**:
- **Anthropic Claude**: Primary AI assistant using Claude Sonnet model via `@anthropic-ai/sdk`
  - Configured via `AI_INTEGRATIONS_ANTHROPIC_API_KEY` and `AI_INTEGRATIONS_ANTHROPIC_BASE_URL`
  - Used for conversational queries about features and releases
  
- **OpenAI (DeepSeek)**: Secondary AI assistant using OpenAI SDK
  - Provides alternative AI perspective on technical documentation
  - Configured via OpenAI-compatible environment variables

**Database Services**:
- **Neon Database**: PostgreSQL serverless database (configured but currently unused)
  - Connection via `@neondatabase/serverless` driver
  - DATABASE_URL environment variable required in config but not actively used
  - Session store configured with `connect-pg-simple`

**UI Component Libraries**:
- **Radix UI**: Headless component primitives for all interactive components
  - Provides accessibility features out of the box
  - Components include dialog, dropdown, tabs, accordion, tooltips, etc.
  
- **Tailwind CSS**: Utility-first CSS framework with extensive customization
  - Custom color system via CSS variables
  - Extended with custom spacing and typography tokens

**Development Tools**:
- **Vite**: Build tool and dev server with HMR
- **Replit Integrations**: Development environment enhancements
  - Error overlay modal for runtime errors
  - Cartographer for code mapping
  - Dev banner for development builds

**Validation & Type Safety**:
- **Zod**: Runtime schema validation for API requests and responses
- **Drizzle Zod**: Integration between Drizzle ORM and Zod schemas
- TypeScript strict mode enabled throughout

**Date Handling**:
- **date-fns**: Modern date utility library for formatting release dates

**Fonts**:
- **Google Fonts**: Inter (UI font) and JetBrains Mono (code font) loaded from CDN