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

## Recent Changes

### November 2024
- **Version 7.0 Added (May 2016)**: Comprehensive version with 17 features including 1D diffusion for water quality, GPU 2D engine water quality support (processes and decay pollutants), third-party geocoding services (Google/Bing), alphanumeric TSDB data with lookup tables, Clark runoff routing model, separate groundwater/runoff destinations, user-definable conveyance data editor, 40% GPU performance improvement, TVD SQL expressions, and enhanced usability features
- **Version 6.5 Added (November 2015)**: Comprehensive version with 24 features including SUDS/LID structures modeling (SWMM 5.1.010), advanced subcatchment routing, ReFH2 rainfall runoff model, 2D Line Source objects, TUFLOW import, conveyance graph tool, TSDB script support with Batch CSV, UPM tool for CS conversion, node-level 2D elevation configuration, and WMS enhancements for MapXtreme
- **Version 6.0 Added (April 2015)**: Comprehensive version with 26 features including sediment modeling in river reaches with three-layered bed composition, Velocity Profile Grid Report, improved 1D/2D network linking, multi-GPU support for 2D engine, web mapping integration (Google Maps/Bing/OpenStreetMap), Object Browser Window, time varying results in SQL expressions, TSDB enhancements with NetCDF support, structure flow engine improvements, and ICM Agent robustness enhancements
- **Version 5.5 Added (November 2014)**: Comprehensive version with 25 features including Mesh Level Zones, Risk Impact Zones, 2D bed load sediment transport, enhanced 2D sediment results, Chinese Rainfall Generator, comprehensive GIS export enhancements, SWMM5 v5.1.007 support, ICMLive user permissions improvements, Object Property Window layout sharing, commit prompting for version control, bulk database item deletion, MapXtreme 7.2 and ArcGIS 10.3 support
- **Version 5.0 Added (May 2014)**: Comprehensive version with 22 features including Initial Conditions 1D editor, 2D mesh initialization from different meshes, 2D suspended sediment transport, UKWIR runoff models, Japanese rainfall runoff models (f1-Rsa, Kadoya, Non-linear, Rational), node ground level inference, risk analysis GeoPlan display, enhanced SQL functionality (NL/NVL functions, array deletion), TSDB historic mode with iHistorian/ClearSCADA support, and significant performance improvements
- **Version 4.5 Added (December 2013)**: Comprehensive version with 23 features including Flood Risk Analysis with Damage Receptors/Functions and Risk Analysis Run (EAD), area-averaged subcatchment rainfall, Deficit and Constant Loss runoff model, EACSD import, TSDB enhancements with permissions and historic versions, scenario management improvements, GeoPlan usability enhancements, soft licensing, and AutoCAD 2014/ArcGIS 10.2 support
- **Version 4.0 Added (June 2013)**: Comprehensive version with 20 features including Spatial Bookmarks, print layout enhancements, PDM and SRM runoff models, multiple temperature profiles, ground model sampling tools, breach display improvements, flexible saved states, performance enhancements, and MapXtreme 7.1 upgrade
- **Version 3.5 Added (February 2013)**: Comprehensive version with 19 features including Time Series Database (TSDB) support for live data, Regulator Events, manual breaches, 2D bridge structures, Hydrogen Sulphide modeling, FHWA headloss, Episode Collections with Extreme Value Analysis, HEC-RAS export, engine/GPU performance improvements, and print layouts
- **Version 3.0 Added (August 2012)**: Comprehensive version with 19 features including HEC-RAS import, Cross Section Window, advanced water quality modeling (algae, macrophytes), GPU improvements, comprehensive graphing enhancements, and AutoCAD 2013 support
- **Version 2.5 Added (February 2012)**: Comprehensive version with 21 features including terrain-sensitive meshing, standalone 2D simulations, enhanced polygon/polyline tools, 2D performance improvements, local steady state detection, and GIS enhancements
- **Version 1.5 Added (February 2011)**: Comprehensive version with 24 features including 2D Infiltration Model, 2D Water Quality Model, SQL enhancements, River Reach building improvements, meshing enhancements, and extensive usability features
- **Version 2025.4 Added**: Complete version with 10 features including InfoWorks ICM Viewer, 2D Mesh Element Histograms, Muskingum routing, and Ruby scripting enhancements
- **Placeholder Versions Created**: Structured placeholder entries for 14 versions (2025.3, 2025.2, 2025.1, 2025.0, 2024.4, 2024.3, 2024.1, 2024.0, 11.0, 10.5, 10.0, 9.5, 9.0, 2.0) awaiting user-provided content
- **Timeline Coverage**: Application displays ~30 version entries from 2026.2 back to 1.5 (February 2011). Currently 18 versions have full content and 12 are placeholders. All populated versions have comprehensive feature documentation with no partial content remaining. User can provide "What's New" documentation to populate remaining versions.

## Data Structure

**Version Data**: Stored in `server/data/versions.ts` with structured format:
- Each version contains: id, version number, release date (ISO 8601 format), and features array
- Each feature contains: id, title, description, and category
- Categories include: Product, Development, Hydrology, Meshing, Results, SWMM, Cloud, Integration, Administration, Performance, Modeling, Visualization, Water Quality, Data Management, Usability, Tools, Version Control