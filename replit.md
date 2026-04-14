# ICM InfoWorks - What's New

## Overview

ICM InfoWorks "What's New" is an AI-powered web application designed to provide an interactive and dynamic experience for exploring release notes and feature updates of the ICM InfoWorks software. It replaces traditional static documentation with a visual timeline, categorized features, and integrated AI chat assistants. The application aims to significantly enhance user engagement and provide efficient, intuitive information retrieval through a modern, responsive user interface inspired by Material Design 3.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend

The frontend is built with React 18, TypeScript, and Vite, utilizing Wouter for routing and TanStack Query for server state management. UI components are developed using Shadcn/ui (Radix UI primitives) and styled with Tailwind CSS, adhering to Material Design 3 guidelines, including dark mode support. The typography uses Inter and JetBrains Mono fonts. 

**Layout:**
- **Desktop (≥768px)**: Two-column design with 75% timeline (left) and 25% chat sidebar (right)
- **Mobile (<768px)**: Tabbed interface with "Timeline" and "AI Chat" tabs for full-width views
- Features responsive grid for feature cards and scrollable timeline
- 4 AI chatbots with independent conversation histories and per-model loading states

### Backend

The backend is an Express.js application written in TypeScript (ESM), offering RESTful endpoints for version data and streaming endpoints for AI chat integrations. It uses JSON-based API data validated with Zod schemas. While currently using in-memory data storage, it is designed with an `IStorage` interface for future database integration, with Drizzle ORM for PostgreSQL pre-configured for persistence.

### System Design Choices

The application emphasizes dynamic content delivery, interactive user experiences with integrated AI, and a modular architecture for scalability. The UI/UX prioritizes a consistent and modern look following Material Design 3 principles. Version data is structured to include version ID, release date, and categorized feature arrays, maintained in descending chronological order for timeline rendering.

## External Dependencies

**AI Services:**
- **Anthropic Claude**: Claude Sonnet via `@anthropic-ai/sdk` with dedicated API key.
- **DeepSeek**: Via OpenRouter using the OpenAI SDK compatibility layer.
- **Google Gemini**: Gemini 2.5 Flash via Replit AI Integrations (no API key required, billed to credits).
- **OpenAI GPT**: GPT-4o Mini via Replit AI Integrations (no API key required, billed to credits).

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

## Recent Updates (April 2026 — Three Power Features)

### Upgrade Path Comparison (CompareVersionsDialog rewrite)
- **Upgrade Path Logic**: Comparing v2024.0 → v2026.3 now collects all features from every intermediate version — not just the two endpoints
- **Summary Banner**: Stats (total new features, versions count, major releases, avg per release) + top-category badges
- **By Version tab**: All intermediate versions shown as collapsible version blocks with feature cards
- **By Category tab**: Features grouped by category (Cloud, UI, 2D, etc.) with version badges
- **Markdown Export**: "Export" button copies structured upgrade report to clipboard
- **Star badges**: Major release versions highlighted throughout

### Feature Evolution Chains (EvolutionChainsDialog — new)
- **Title-similarity detection**: Jaccard clustering (threshold 0.5) automatically groups related features across versions (e.g. "Cloud Capabilities" across 12+ versions)
- **Maturity classification**: introduced / growing / mature-active / stable based on count and recency
- **Mini timeline bar**: Each chain card shows a compact visual bar of its span across the 48-version range
- **Expanded flow view**: Click any chain to see the chronological flow of features with change-type labels (enhanced, continued, iterated, evolved)
- **Filters & sorting**: Sort by length/recency/category; filter by maturity stage or category
- **"View in timeline" links**: Clicking scrolls the main timeline to that feature card

### Category × Version Heatmap (new tab in Analytics)
- **Grid view**: Rows = 7 categories, columns = all 48 versions, cells = feature count with color intensity
- **Gamma-corrected intensity**: Uses power (0.6) scaling so low counts remain visible
- **Tooltips**: Hover any cell to see `vX.X · Category: N`
- **Column totals**: Row below heatmap shows total features per version
- **Row totals**: Rightmost column shows total per category across all versions

---

## Previous Recent Updates (April 2026)

### AI Citations (RAG)
- **AI Citation Markers**: All 4 backend system prompts now instruct the AI to include `[cite:featureId]` markers whenever they reference a specific feature
- **Clickable Inline Citations**: `ChatMessage.tsx` parses citation markers and renders them as inline `[1] v2027.0` badge links
- **Citation Navigation**: Clicking any citation badge scrolls the timeline to that feature card with a pulse highlight animation; on mobile, switches to the timeline tab first

### Upgrade Impact Summary
- **UpgradeImpactBanner**: When "My Stack" version is set, a banner appears below the filter bar showing total new features across newer versions, versions count, and top categories with counts (Cloud, UI, 2D Modelling, etc.)
- **Jump to Latest**: Banner includes a quick link to scroll to the newest version

### Filter Enhancements
- **localStorage Persistence**: My Stack version selection is now saved in `localStorage` and restored on page load — survives refreshes and browser restarts
- **Version Range Filter**: New "Version Range" section in the filter popover with From/To version dropdowns; narrows the timeline to features released between two selected versions; active range shown as a dismissible badge

### Interactivity Improvements (earlier April 2026)
- **Search Text Highlighting**: Matched search terms are highlighted inline (yellow) in feature titles and descriptions as you type
- **"Ask About This Feature" Button**: Hover over any feature card to reveal a chat icon; clicking it pre-fills the AI chat input with a contextual question about that feature. On mobile, automatically switches to the AI Chat tab
- **AI Query Template Prompts**: When the AI chat is empty, five suggested questions appear as clickable chips to help users get started (e.g. "What's new in version 2027.0?", "Which version first introduced cloud capabilities?")
- **Deep-Linkable Features**: Every feature card has a unique `id` attribute (e.g. `feature-2027.0-network-design`). Navigating to `/#feature-{id}` scrolls to and briefly highlights that feature — enables sharing precise links

## Previous Updates (December 2024)

### A+ Enhancements
- **Compare Versions Tool**: Side-by-side version comparison dialog showing:
  - Features unique to each version (color-coded red/green)
  - Features present in both versions
  - Category breakdown comparison
- **Documentation Links**: Features can include `documentationUrl` field for direct links to Autodesk Knowledge Network
  - External link button appears on feature cards with docs available
- **Release Analytics Charts**: Expandable visualization section showing:
  - Features by Year (horizontal bar chart)
  - Development Focus Areas (7 categories with color-coded bars)
  - Recent Releases (last 10 versions as vertical bar chart)
  - Summary statistics and top categories

### Filtering & Discovery Enhancements
- **Category Filters**: 7 predefined categories (Cloud/SaaS, Interface/UI, 2D Modelling, Data Import/Export, Automation/Scripting, Administration, Analysis/Results) with keyword-based matching
- **My Stack Feature**: Select your current version to highlight all features released since then with "New for you" badges
- **Major Release Badges**: Key versions (2027.0, 2026.3, 2024.0, 2023.0, 10.5, 10.0, 5.0, 3.0, 1.5) show gold "Major Release" badge with star icon
- **Visual Highlighting**: Date-based comparison ensures My Stack works correctly even when filters are active
- **FilterPanel Component**: Popover-based filter UI with dismissible active filter badges

### Version Data
- 48 versions documented spanning 2011 to present
- 809 features catalogued across all versions
- Newest version: 2027.0 with 5 features (June 2025)

## Previous Updates (November 2024)

### OpenAI Integration
- Added GPT-4o Mini as 4th AI chatbot using Replit AI Integrations
- All 4 AI assistants (Claude, DeepSeek, Gemini, GPT) maintain independent conversation histories
- Per-model loading states and separate scroll refs prevent state leakage

### UI/UX Improvements
- **Message Display**: Larger message bubbles (px-5 py-4), bigger text (16px), increased spacing
- **Chat Input**: Expanded from 44px to 60px height with 16px text for better visibility
- **Optimized Spacing**: Reduced empty space while maintaining readability

### Mobile Optimization
- **Responsive Layout**: Tabbed interface for mobile (<768px) with Timeline/Chat switcher
- **Compact AI Tabs**: Icon-only display on small screens, full names on larger screens
- **Touch-Friendly**: Appropriately sized touch targets and optimized spacing
- **Native Scrolling**: Smooth scroll behavior on mobile devices