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

## Recent Changes

### November 2024
- **Version 2021.8 Added (October 2021)**: Comprehensive version with 11 features including 2D Boundary objects for SWMM networks with head unit flow support, XPSWMM/XPStorm XPX import enhancements (2D boundaries, roughness zones, IC zones, inflow/level events), SWMM job progress details for 2D simulations, PRN file ISO 8601 format updates, asset property sheet display changes, ICM Exchange TCP/IP connections, and workgroup data server authentication
- **Version 2023.0 Added (March 2022)**: Foundational version with 8 features including Autodesk licensing system introduction (Standard/Ultimate licences), SWMM node insertion with link splitting, terrain-sensitive meshing for SWMM 2D zones, consistent zone attribution for clip meshing with simplified logging, enhanced HEC-RAS import error messages, XPSWMM/XPStorm evaporation data import, and resizable Additional Information window
- **Version 2023.1 Added (July 2022)**: Major version with 23 features including multi-version database support system (2023.0+), culvert type conduit for simplified modeling with FHWA standards, NOAA rainfall generator temporal distribution methods, subcatchment runoff limits with exceedance handling, comprehensive clip meshing performance improvements (10x triangulation, 40% polygon processing), new Mesh Level Zone ground adjustment methods, 2D zone results enhancements, and SWMM mesh logging
- **Version 2023.2 Added (October 2022)**: Comprehensive version with 17 features including overlapping roughness zones with priority-based meshing, CNSWMM runoff volume model, SCS runoff models for SWMM subcatchments, XPSWMM/XPStorm XPX import enhancements, SWMM5 infiltration export/import improvements, and alert graph trace colors
- **Complete 2011-2017 Coverage**: All versions from 8.5 (November 2017) back to 1.5 (February 2011) fully populated with comprehensive feature documentation
- **Timeline Coverage**: Application displays ~30 version entries from 2026.2 back to 1.5 (February 2011). Currently 25 versions have full content and 5 are placeholders. **Notable gap**: ~4-year period between Version 8.5 (Nov 2017) and Version 2021.8 (Oct 2021) with missing intermediate versions (9.0, 9.5, 10.0, 10.5, 11.0).

## Data Structure

**Version Data**: Stored in `server/data/versions.ts` with structured format including version ID, release date, and comprehensive feature arrays with categories for filtering.