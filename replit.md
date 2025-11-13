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
- **Version 9.0 Updated (May 2018)**: Replaced placeholder with 20 comprehensive features including text reports (no size limit), SUDS area adjustment, river reach validation, MCM 2017 damage function import, FEH2013 point data import, growth-product water quality process, TUFLOW import improvements, HEC Snyder routing model, network version indicators, spatial TSDB zoom, TVD connector parameter clarity, wastewater profile validation enhancements, ARMA error prediction, 2D mesh improvements (30M elements), SQL spatial rain layer, X-MP observed rainfall format support, and new SWMM build-up/washoff model.
- **Data Deduplication**: Removed duplicate version entries (8.5, 9.0, 9.5, 10.0, 10.5, 11.0) keeping the most complete data. Automated deduplication script created to prevent future issues.
- **Automated Version Sorting**: Sort script maintains chronological order of all versions by releaseDate (descending). All 45 versions properly ordered from 2026-06-01 (newest) to 2011-02-01 (oldest).
- **Dynamic UI Counts**: All UI displays dynamically calculate version and feature counts from actual data, ensuring accuracy.
- **Timeline Coverage**: Application displays 45 version entries from 2026.2 back to 1.5 (February 2011). COMPLETE CONTINUOUS COVERAGE from Version 1.5 (Feb 2011) through Version 2023.2 (Oct 2022) with partial coverage for future releases (2024-2026). **Total: 45 versions, 640 features, 14+ years of continuous coverage.**

## Data Structure

**Version Data**: Stored in `server/data/versions.ts` with structured format including version ID, release date, and comprehensive feature arrays with categories for filtering. The versionsData array is maintained in descending chronological order by releaseDate for proper timeline rendering.

**AI Chat Context**: Both Claude Sonnet and DeepSeek chat assistants receive all 640 features across 45 versions as system context, enabling accurate historical queries about any feature or version from 2011 to present.

## Maintenance

**Version Ordering**: The versionsData array must be kept in descending chronological order by releaseDate. Use `npx tsx scripts/sort-versions.ts` to automatically sort the array after adding new versions. Run with `--dry-run` flag to preview changes before applying.

**Deduplication**: Use `npx tsx scripts/remove-duplicates.ts` to remove duplicate version entries, keeping the most complete data (version with most features).
