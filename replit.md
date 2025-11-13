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
- **Version 2025.2 Updated (July 2024)**: Completed with 5 comprehensive features including cloud capabilities continuation, Export 2D to Raster tech preview (TIFF format for GIS import), Cloud Simulation Quota dialog, SWMM5/InfoSWMM import logs improvements, and 2D depth noise filter for reducing numerical noise.
- **Version 2025.3 Updated (September 2024)**: Completed with 6 comprehensive features including cloud capabilities continuation, RPA grid report export to Info360 Asset (with Asset ID and Surcharge due to flow columns), Buildings Drainage contribution for SUDS/LID modeling, Buildings Perimeter option for Exceedance flow type, SWMM Additional DWF Baseline renamed to Base flow, and State search radius/power parameter help updates.
- **Version 2.0 Updated (August 2011)**: Completed with all 54 comprehensive features including Workgroup Data Server rename, check for updates menu, side-by-side installation support, multi-threading control, improved agent with network shares, automatic phase-in time adjustment, culvert engine updates, bank flow stability, 2D engine sleep mode performance, licence logging, 2D minor timestep calculations, Inline Bank object, RS CSV importer enhancements, comprehensive water quality features (new determinants DO/NO2/NO3/pH/SAL/TW/COL, decaying pollutants, built-in processes, user-defined processes, structure reaeration), lateral inflows, sub-event seconds, non-normalised shapes, cross section rotation, interpolated rows, channel to river reach conversion, TIN ground model network objects, scenario object ghosts toggle, notes in grid views, offline 2D meshing via agent, mesh zone filtering removed, mesh aggregation improvements, 2D element counts in overview, 2D triangle export to CSV, river reach section building improvements, bed slope validation (Rule 4012), comprehensive network validation enhancements, 3D Network Window improvements, Flooding Section Window enhancements, advanced caching for drawing performance, improved arrow drawing on reaches, simulation status revised to "Ended", hyperlinked coordinates in logs, base flow depth field removed, river/bridge tutorials, undo/redo dropdown list, restrictive user permissions, Windows groups permissions, globally unique IDs ({K} variable), edit scenario notes, import centre settings retention, Ruby export filtering, GeoPlan theme configuration improvements, grid/section properties saving, simulation progress/jump bar, time-varying export seconds display, new-style dongles, ArcEngine map control, ArcGIS Server Map Services, and ArcGIS 10 compatibility export option.
- **Version 10.5 Updated (December 2019)**: Completed with all 17 comprehensive features including SWMM Integration (new network type, engine, and database items), new RTC Controllers (FUZZY/CENTAUR), subcatchment Output lag and Bypass runoff parameters, Conduits (2D) performance improvements, 2D summary log VBEPNI metric, ReFH timestep control, flexible Nimrod file naming, TSLAG time series expression, spatial TSDB initialization performance, pressurised pipes technical papers, legacy state files deprecated, conduit status improvements, arrow themes enhancements, snow melt SWMM5 update, multi-part shapefile import, binary export sorting, and HTML log improvements.
- **Version 10.0 Updated (May 2019)**: Completed with all 30 comprehensive features including Episode collections for multiple simulations, runoff-only simulations with PDM warm-up, simulation properties re-run capability, groundwater infiltration/evaporation results, SQL queries across networks, extended SOBEK/MicroDrainage importers, state saving improvements (PDM/SRM/RDII), GPU 2D conduits support, UK Grid node naming (1295 IDs/100m²), ArcGIS 10.7 support, elevation validation (6000m limit), Factory defaults layout, Configuration menu updates, OPC data sources deprecated, scenario management enhancements, and TSDB improvements (FW Format1, jump to date, import/export config).
- **Version 9.5 Updated (November 2018)**: Completed with all 28 comprehensive features including Euler Type II design rainfall, German hydrology (DWA/Cascade), RAFTS routing, 2D conduits (Linear Drainage/Conduit 2D), Connect 2D nodes, MicroDrainage/SOBEK importers, gated weirs, SWMM v5.1.013 engine update, variable crest/width weirs, spatial TSDB enhancements (new file formats: Geotiff, Grib 1, HDF5 OPERA), NetCDF AUS.BOM update, TSDB performance improvements, master database layouts, and multi-GPU PCI support.
- **Version 9.0 Updated (May 2018)**: Replaced placeholder with 20 comprehensive features including text reports (no size limit), SUDS area adjustment, river reach validation, MCM 2017 damage function import, FEH2013 point data import, growth-product water quality process, TUFLOW import improvements, HEC Snyder routing model, network version indicators, spatial TSDB zoom, TVD connector parameter clarity, wastewater profile validation enhancements, ARMA error prediction, 2D mesh improvements (30M elements), SQL spatial rain layer, X-MP observed rainfall format support, and new SWMM build-up/washoff model.
- **Data Deduplication**: Removed duplicate version entries (8.5, 9.0, 9.5, 10.0, 10.5, 11.0) keeping the most complete data. Automated deduplication script created to prevent future issues.
- **Automated Version Sorting**: Sort script maintains chronological order of all versions by releaseDate (descending). All 45 versions properly ordered from 2026-06-01 (newest) to 2011-02-01 (oldest).
- **Dynamic UI Counts**: All UI displays dynamically calculate version and feature counts from actual data, ensuring accuracy.
- **Timeline Coverage**: Application displays 45 version entries from 2026.2 back to 1.5 (February 2011). COMPLETE CONTINUOUS COVERAGE from Version 1.5 (Feb 2011) through Version 2023.2 (Oct 2022) with partial coverage for future releases (2024-2026). **Total: 45 versions, 710 features, 14+ years of continuous coverage.**

## Data Structure

**Version Data**: Stored in `server/data/versions.ts` with structured format including version ID, release date, and comprehensive feature arrays with categories for filtering. The versionsData array is maintained in descending chronological order by releaseDate for proper timeline rendering.

**AI Chat Context**: Both Claude Sonnet and DeepSeek chat assistants receive all 710 features across 45 versions as system context, enabling accurate historical queries about any feature or version from 2011 to present.

## Maintenance

**Version Ordering**: The versionsData array must be kept in descending chronological order by releaseDate. Use `npx tsx scripts/sort-versions.ts` to automatically sort the array after adding new versions. Run with `--dry-run` flag to preview changes before applying.

**Deduplication**: Use `npx tsx scripts/remove-duplicates.ts` to remove duplicate version entries, keeping the most complete data (version with most features).
