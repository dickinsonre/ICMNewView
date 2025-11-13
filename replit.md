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

## Recent Changes

### November 2024
- **COMPLETE CHRONOLOGICAL ORDERING ACHIEVED!**
- **Version 8.5 Added (November 2017)**: COMPREHENSIVE version with 25 features including massive increase in rainfall profiles (999M user-created, 2.1B TSDB-generated in binary format for efficiency), TSDB description fields and user edit enhancements, multiple observed data streams in Object Per Page graphs, Initial Conditions 2D import/export, Sim ID in statistical reports, ICM Exchange meshing capability, RTC editors improvements, UK EA block spillage method (12/24 hour), flood sections for 2D results interrogation, complex graphs performance, river confluences from InfoWorks RS, HEC-RAS geometry enhancements (2D modelling, shaped lateral banks, curved lateral structures), SWMM v5.1.012 engine, **Blockages introduced** (time-varying obstructions with contraction/expansion loss coefficients), overlapping 1D/2D banks and boundaries support, head unit flows for 2D boundaries, **Permeable Zone (2D) introduced** (transfer infiltrated volume to 1D network), multi barrel links (Number of barrels parameter), headloss coefficients for 2D linear structures (upstream/downstream separation, fixed/per unit length), SWMM5 RDII implementation choice, user defined controls modular limits, alternative flow units (Ml/day, Ml/hour, m³/day, m³/hour), resizable SQL dialog, Australian Rainfall (2016) design generator with ARR Storm Generator
- **Automated Version Sorting**: Created sorting script (`scripts/sort-versions.ts`) to maintain chronological order of all versions by releaseDate (descending). All 51 versions now properly ordered from 2026-06-01 (newest) to 2011-02-01 (oldest).
- **Dynamic UI Counts**: Updated all UI displays to dynamically calculate version and feature counts from actual data instead of hardcoded values, ensuring accuracy.
- **Timeline Coverage**: Application displays 51 version entries from 2026.1 back to 1.5 (February 2011). COMPLETE CONTINUOUS COVERAGE from Version 1.5 (Feb 2011) through Version 2023.2 (Oct 2022) with partial coverage for future releases (2024-2026). **Total: 51 versions, 669 features, 14+ years of continuous coverage.**

## Data Structure

**Version Data**: Stored in `server/data/versions.ts` with structured format including version ID, release date, and comprehensive feature arrays with categories for filtering. The versionsData array is maintained in descending chronological order by releaseDate for proper timeline rendering.

**AI Chat Context**: Both Claude Sonnet and DeepSeek chat assistants receive all 669 features across 51 versions as system context, enabling accurate historical queries about any feature or version from 2011 to present.

## Maintenance

**Version Ordering**: The versionsData array must be kept in descending chronological order by releaseDate. Use `npx tsx scripts/sort-versions.ts` to automatically sort the array after adding new versions. Run with `--dry-run` flag to preview changes before applying.
