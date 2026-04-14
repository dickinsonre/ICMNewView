# ICM InfoWorks — What's New: Handover Document

**Project**: ICM InfoWorks "What's New" — AI-Powered Release Notes Explorer  
**Date**: April 2026  
**Stack**: React 18 + TypeScript + Vite (frontend) / Express.js + TypeScript (backend)  
**URL**: Deployed on Replit at `*.replit.app`

---

## 1. Project Overview

This application replaces traditional static release notes for ICM InfoWorks software with an interactive, AI-powered experience. Users can explore 48 software versions (spanning 2011–2027) containing 809 documented features through a visual timeline, category filters, analytics visualizations, and four independent AI chat assistants.

### Key Capabilities
- **Interactive Timeline**: Chronological, scrollable release timeline with feature cards
- **Quad AI Chat**: Four AI models (Claude Sonnet, DeepSeek, Gemini 2.5 Flash, GPT-4o Mini) with independent conversation histories, citation linking, and suggested prompts
- **Search & Filtering**: Full-text search with inline highlighting, 7 category filters, "My Stack" version tracking, version range filtering
- **Analytics Dashboard**: Features-by-year charts, development focus areas, recent releases bar chart, and a full Category × Version heatmap
- **Compare Versions**: Upgrade-path analysis between any two versions with By-Version, By-Category, and Evolution Chains tabs
- **Feature Evolution Chains**: Automatic detection of related features across versions using Jaccard title similarity
- **Deep-Linkable Features**: Every feature card has a unique `id` for shareable URL anchors

---

## 2. Architecture

### 2.1 Frontend (`client/src/`)

| File | Purpose |
|------|---------|
| `App.tsx` | Root component — QueryClientProvider, TooltipProvider, Toaster, Router |
| `pages/home.tsx` | Main page — orchestrates all components, manages shared state |
| `pages/not-found.tsx` | 404 page |

**Core Components** (`client/src/components/`):

| Component | Purpose |
|-----------|---------|
| `Header.tsx` | Top bar with ICM logo, search input, documentation link, dark mode toggle |
| `TimelineView.tsx` | Renders the scrollable version timeline with feature cards |
| `FeatureCard.tsx` | Individual feature display — title, description, category badge, "Ask AI" button |
| `FeatureDetailModal.tsx` | Full-detail modal when clicking a feature card |
| `ChatSidebar.tsx` | Right panel (desktop) or tab (mobile) — 4-model tabbed AI chat interface |
| `ChatMessage.tsx` | Renders AI/user messages with markdown, citation parsing (`[cite:featureId]` → clickable badges) |
| `FilterPanel.tsx` | Popover with category toggles, My Stack version selector, version range dropdowns |
| `VersionCharts.tsx` | Analytics section — bar charts + Category × Version heatmap (11 categories) |
| `CompareVersionsDialog.tsx` | Compare two versions — summary banner, By-Version tab, By-Category tab, Chains tab, markdown export |
| `EvolutionChainsDialog.tsx` | Feature evolution chain detection — Jaccard clustering, maturity classification, mini timeline bars |
| `VersionNavigator.tsx` | Jump-to-version dropdown with prev/next arrows |
| `UpgradeImpactBanner.tsx` | Banner showing total new features since "My Stack" version |
| `DocumentationSheet.tsx` | Side sheet listing all version data |
| `ThemeToggle.tsx` | Dark/light mode toggle |

**UI Primitives** (`client/src/components/ui/`): 45+ Shadcn/ui components (Button, Card, Dialog, Tabs, ScrollArea, Badge, Select, etc.)

**Lib & Hooks**:
- `lib/queryClient.ts` — TanStack Query client with default fetcher and `apiRequest` helper
- `lib/utils.ts` — `cn()` utility for class merging
- `hooks/use-toast.ts` — Toast notification hook
- `hooks/use-mobile.tsx` — Mobile breakpoint detection

### 2.2 Backend (`server/`)

| File | Purpose |
|------|---------|
| `index.ts` | Express server entry point (port 5000) |
| `routes.ts` | API routes — version CRUD + 4 AI chat endpoints |
| `storage.ts` | `IStorage` interface + `MemStorage` implementation (in-memory) |
| `vite.ts` | Vite dev server integration (DO NOT MODIFY) |
| `data/versions.ts` | 5,202-line TypeScript file containing all 48 versions and 809 features |

### 2.3 Shared (`shared/`)

| File | Purpose |
|------|---------|
| `schema.ts` | Zod schemas + TypeScript types for `Version`, `Feature`, `ChatMessage`, `User` |

### 2.4 Utility Scripts (`scripts/`)
- `remove-duplicates.ts` — Deduplication utility for version data
- `restore-from-backup.ts` — Restores version data from backup
- `sort-versions.ts` — Sorts versions in the data file

---

## 3. API Endpoints

### Version Data
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/versions` | Returns all 48 versions (sorted by version number descending) |
| GET | `/api/versions/:id` | Returns a single version by ID |

### AI Chat
| Method | Endpoint | Model | Provider |
|--------|----------|-------|----------|
| POST | `/api/chat/claude` | Claude Sonnet 4.5 | Anthropic SDK (direct) |
| POST | `/api/chat/deepseek` | DeepSeek Chat | OpenRouter (OpenAI SDK compat) |
| POST | `/api/chat/gemini` | Gemini 2.5 Flash | Google GenAI SDK (Replit integration) |
| POST | `/api/chat/openai` | GPT-4o Mini | OpenAI SDK (Replit integration) |

**Chat Request Format**:
```json
{
  "messages": [
    { "role": "user", "content": "What's new in version 2027.0?" }
  ]
}
```

**Chat Response Format**:
```json
{
  "message": "# What's New in Version 2027.0\n\n..."
}
```

All chat endpoints inject a system prompt containing the full version data (all 48 versions, 809 features as JSON) plus citation instructions. The AI is instructed to include `[cite:featureId]` markers which the frontend renders as clickable badge links.

---

## 4. Data Model

### Version
```typescript
{
  id: string;           // e.g. "2027.0" (equals the version string)
  version: string;      // e.g. "2027.0"
  releaseDate: string;  // ISO date e.g. "2025-06-15"
  features: Feature[];
}
```

### Feature
```typescript
{
  id: string;              // e.g. "2027.0-network-design"
  title: string;           // e.g. "Network Design (Tech Preview)"
  description: string;     // Multi-sentence description
  category: string;        // Free-text category
  documentationUrl?: string; // Optional link to Autodesk docs
}
```

### Version Data Stats
- **48 versions**: from v1.5 (Feb 2011) to v2027.0 (Jun 2025)
- **809 features** across all versions
- Version IDs equal version strings (e.g., `id: "2027.0"`, `version: "2027.0"`)
- Release dates do NOT always align chronologically with version numbers (e.g., v2026.1 has releaseDate 2026-06-01, but v2027.0 has releaseDate 2025-06-15)
- Data is stored in `server/data/versions.ts` as a TypeScript array (5,202 lines)

### Major Versions (highlighted in UI)
```
2027.0, 2026.3, 2024.0, 2023.0, 10.5, 10.0, 5.0, 3.0, 1.5
```

---

## 5. Feature Category Systems

The app has two separate category systems:

### 5.1 FilterPanel Categories (7 categories)
Used for filtering the timeline. Defined in `FilterPanel.tsx`:

| ID | Label | Keywords |
|----|-------|----------|
| cloud | Cloud/SaaS | cloud, saas, web, online, remote, master database |
| ui | Interface/UI | interface, ui, dialog, display, geoplan, icon, toolbar, window, view, theme |
| 2d | 2D Modelling | 2d, mesh, subgrid, raster, flood, boundary, zone, polygon, surface, terrain |
| data | Data Import/Export | import, export, odic, hec-ras, csv, gis, esri, geodatabase, shapefile, netcdf, 12d |
| scripting | Automation/Scripting | ruby, script, automation, icmexchange, api, batch, custom action |
| admin | Administration | license, admin, deploy, install, setting, privacy, config, permission |
| analysis | Analysis/Results | result, report, analysis, simulation, run, output, graph, chart, statistics |

### 5.2 Heatmap Categories (11 categories)
Used in the analytics heatmap. Defined in `VersionCharts.tsx`:

| ID | Label | Hex Color | Keywords |
|----|-------|-----------|----------|
| cloud | Cloud / SaaS | #38bdf8 | cloud, saas, web, online, remote, master database, agent-based |
| 2d | 2D Modelling | #3b82f6 | 2d, mesh, subgrid, raster, flood, boundary zone, surface, terrain, inundation |
| ui | UI / UX | #a78bfa | interface, ui, dialog, display, geoplan, icon, toolbar, window, theme, home tab, context menu |
| data | Data Management | #f97316 | import, export, odic, hec-ras, csv, gis, esri, geodatabase, shapefile, netcdf, database, tsdb |
| 1d | 1D Hydraulics | #22c55e | 1d, river, hydraulic, reach, channel, node, conduit, manhole, pipe, weir, orifice, pump |
| gis | GIS Integration | #eab308 | gis, esri, arcgis, shapefile, projection, coordinate, raster, spatial, map, geospatial |
| rainfall | Rainfall | #64748b | rainfall, rain, feh, noaa, atlas 14, euler, idf, precipitation, storm, design storm |
| wq | Water Quality | #d946ef | water quality, sediment, pollutant, contaminant, diffusion, estuary, quality, erosion, wq |
| scripting | Scripting / API | #78716c | ruby, script, automation, icmexchange, api, batch, custom action, plugin |
| swmm | SWMM | #6366f1 | swmm, suds, lid, dynamic wave, climatology |
| analysis | Analysis / Results | #14b8a6 | result, report, analysis, simulation, output, graph, chart, statistics, profile |

### Exclusive Override Rules (Heatmap)
Features containing "ruby" in title/description/category are **exclusively** assigned to the Scripting/API row and excluded from all other heatmap categories. This is implemented via `EXCLUSIVE_OVERRIDES` in `VersionCharts.tsx`.

---

## 6. Key Feature Details

### 6.1 Heatmap (VersionCharts.tsx)
- 11-row × 48-column grid, sorted by release date (ascending, left to right)
- Cell background uses each category's hex color with alpha intensity (gamma-corrected, power 0.6)
- Row + column hover highlighting (dims non-hovered to 45% opacity)
- Floating tooltip on hover shows category name, version, count, and up to 5 feature names
- **Color Scheme Switcher**: Category colors / Blue scale / Heat (yellow→red) / Viridis
- **Normalize by Row**: Scales each row's intensity independently
- **Show Values**: Toggles numeric count inside cells
- **Cell Click**: Navigates timeline to that version with pulse highlight
- **Column Header Click**: Opens Compare Versions dialog pre-filled with that version
- **Compare Range Overlay**: When a compare range is active, cells outside the range dim to 15% opacity; cells inside get a green ring indicator

### 6.2 Compare Versions Dialog (CompareVersionsDialog.tsx)
- **Controlled component**: Accepts external `open`, `onOpenChange`, `externalFromId`, `externalToId` props for cross-component coordination
- **Upgrade Path Logic**: Collects all features from every version between From and To (not just endpoints)
- **Summary Banner**: Total features, version count, major releases, avg per release, top-category badges, and **category shift analysis** (e.g., "Cloud ↑32%, 1D Hydraulics ↓14%") computed via sliding window of ±3 versions
- **By Version Tab**: Collapsible version blocks with feature cards
- **By Category Tab**: Features grouped by category with version badges
- **Chains Tab (3rd)**: Detects evolution chains within the selected range using Jaccard title similarity (≥0.5), displays as collapsible flow cards with version arrows
- **Markdown Export**: Copies structured upgrade report to clipboard

### 6.3 Evolution Chains Dialog (EvolutionChainsDialog.tsx)
- Jaccard clustering (threshold 0.5) groups related features across all versions
- Maturity classification: introduced / growing / mature-active / stable
- Mini timeline bar per chain showing span across the version range
- Expanded flow view with change-type labels (enhanced, continued, iterated, evolved)
- Filters by maturity stage and category; sorts by length/recency/category
- "View in timeline" links scroll to the feature card
- "Compare" button per chain opens Compare Versions dialog pre-filled with the chain's version range

### 6.4 AI Chat (ChatSidebar.tsx + ChatMessage.tsx)
- 4 independent chat models with separate message histories and per-model loading states
- Citation parsing: `[cite:featureId]` markers in AI responses render as clickable `[1] vX.X` badge links
- Citation click scrolls timeline to that feature with pulse animation; on mobile, switches to timeline tab first
- 5 suggested prompt chips when chat is empty
- "Ask About This Feature" button on feature cards pre-fills chat input
- Enter to send, Shift+Enter for newline

### 6.5 Filter System (FilterPanel.tsx + home.tsx)
- **Category Filters**: 7 categories with keyword matching (toggleable chips)
- **My Stack**: Select your current version → all newer features get "New for you" badges; selection persisted in localStorage
- **Version Range**: From/To dropdowns to narrow the timeline to a date range
- Active filters shown as dismissible badges

### 6.6 Search (Header.tsx + home.tsx)
- Full-text search across feature title, description, and category
- Matched terms highlighted inline (yellow) in feature cards as you type
- Versions with zero matching features are hidden

### 6.7 Deep Linking
- Every feature card has `id="feature-{featureId}"` (e.g., `feature-2027.0-network-design`)
- URL hash `/#feature-{featureId}` auto-scrolls and highlights on page load
- Citation clicks and timeline navigation use the same scroll + pulse pattern

---

## 7. Layout & Responsiveness

### Desktop (≥768px)
- Two-column layout: 75% timeline (left) + 25% chat sidebar (right)
- Timeline includes filter bar, version navigator, analytics section, and scrollable feature cards
- Chat sidebar is always visible with 4-tab model switcher

### Mobile (<768px)
- Tabbed interface: "Timeline" and "AI Chat" tabs
- Full-width views for each tab
- Compact filter bar (hides Compare Versions and Evolution Chains buttons)
- Icon-only model tabs in chat

---

## 8. Environment Variables

### Required (via Replit AI Integrations — auto-configured)
| Variable | Purpose |
|----------|---------|
| `AI_INTEGRATIONS_ANTHROPIC_API_KEY` | Anthropic Claude API key |
| `AI_INTEGRATIONS_ANTHROPIC_BASE_URL` | Anthropic API base URL |
| `AI_INTEGRATIONS_OPENROUTER_API_KEY` | OpenRouter API key (for DeepSeek) |
| `AI_INTEGRATIONS_OPENROUTER_BASE_URL` | OpenRouter API base URL |
| `AI_INTEGRATIONS_GEMINI_API_KEY` | Google Gemini API key |
| `AI_INTEGRATIONS_GEMINI_BASE_URL` | Gemini API base URL |
| `AI_INTEGRATIONS_OPENAI_API_KEY` | OpenAI API key |
| `AI_INTEGRATIONS_OPENAI_BASE_URL` | OpenAI API base URL |

### Other
| Variable | Purpose |
|----------|---------|
| `SESSION_SECRET` | Express session secret |
| `KIMI_API_KEY` | Kimi API key (currently unused) |

---

## 9. How to Run

```bash
npm run dev
```

This starts the Express backend on port 5000, which also serves the Vite-bundled frontend. The Vite dev server handles HMR during development.

**Do NOT modify**: `server/vite.ts`, `vite.config.ts`, `drizzle.config.ts`, `package.json`

---

## 10. Cross-Component Communication

Three power features (Heatmap, Compare Versions, Evolution Chains) are wired together via shared state lifted to `home.tsx`:

```
home.tsx
├── compareOpen (boolean) ─────────────► CompareVersionsDialog.open
├── compareFromId (string) ────────────► CompareVersionsDialog.externalFromId
├── compareToId (string) ──────────────► CompareVersionsDialog.externalToId
├── openCompare(fromId, toId) callback
│   ├── Called by VersionCharts.onColumnHeaderClick(versionId)
│   └── Called by EvolutionChainsDialog.onCompareRange(fromId, toId)
├── VersionCharts.compareRange ← { fromId: compareFromId, toId: compareToId }
│   └── Dims heatmap cells outside the range
└── handleHeatmapCellClick(versionId, catId)
    └── Scrolls timeline to that version with pulse highlight
```

---

## 11. Known Quirks & Notes

1. **Version IDs = Version Strings**: In this app, `version.id` always equals `version.version` (e.g., both are `"2027.0"`). This simplifies cross-referencing but could be confusing.

2. **Release Dates vs Version Numbers**: Release dates do NOT always increase with version numbers. For example, v2027.0 (2025-06-15) was released before v2026.1 (2026-06-01). The heatmap sorts by release date, so column order may differ from version number order.

3. **Two Category Systems**: The FilterPanel uses 7 categories; the Heatmap uses 11 categories with different keywords. They are independent — changing one does not affect the other.

4. **Heatmap EXCLUSIVE_OVERRIDES**: The `EXCLUSIVE_OVERRIDES` array in `VersionCharts.tsx` forces features matching certain patterns (currently only "ruby") to exclusively map to one heatmap category. This prevents Ruby scripting features from appearing in unrelated rows.

5. **CompareVersionsDialog Dual Rendering**: On desktop, `CompareVersionsDialog` appears twice in the DOM — once in the FilterBar (inside the filter toolbar) and once standalone (in the version navigator area). The FilterBar instance is the controlled one wired to shared state; the standalone instance in the navigator area operates independently.

6. **HEATMAP_CATEGORIES Export Warning**: Vite's Fast Refresh shows a warning about `HEATMAP_CATEGORIES` being an incompatible export. This is harmless — it causes a full page refresh instead of hot module replacement when `VersionCharts.tsx` is edited.

7. **In-Memory Storage**: All version data is loaded from `server/data/versions.ts` into memory. There is no database. The `IStorage` interface and Drizzle ORM configuration exist for future database integration but are unused.

8. **AI System Prompt Size**: Each chat request sends the full version data (~809 features as JSON) in the system prompt. This works but uses significant tokens per request.

---

## 12. File Sizes (Key Files)

| File | Lines | Purpose |
|------|-------|---------|
| `server/data/versions.ts` | 5,202 | All version + feature data |
| `client/src/components/VersionCharts.tsx` | ~619 | Analytics + heatmap |
| `client/src/components/CompareVersionsDialog.tsx` | ~600+ | Compare versions dialog |
| `client/src/components/EvolutionChainsDialog.tsx` | ~500+ | Evolution chains |
| `client/src/pages/home.tsx` | 355 | Main page orchestration |
| `client/src/components/ChatSidebar.tsx` | 288 | AI chat interface |
| `client/src/components/FilterPanel.tsx` | 271 | Filter controls |
| `server/routes.ts` | 226 | API routes |

---

## 13. Dependencies (Key)

### Frontend
- `react` 18, `react-dom` 18
- `wouter` — lightweight routing
- `@tanstack/react-query` v5 — server state
- `@radix-ui/*` — accessible UI primitives (via Shadcn/ui)
- `tailwindcss` — utility CSS
- `lucide-react` — icons
- `date-fns` — date formatting
- `clsx`, `tailwind-merge` — class utilities

### Backend
- `express` — HTTP server
- `@anthropic-ai/sdk` — Claude API
- `openai` — OpenAI + OpenRouter (DeepSeek) APIs
- `@google/genai` — Gemini API
- `zod` — request validation
- `drizzle-orm`, `drizzle-zod` — ORM (configured but unused)

---

## 14. Deployment

The app is deployed via Replit's built-in deployment system. The `npm run dev` command starts both the Express backend and Vite frontend on port 5000. In production, Vite builds static assets and Express serves them.

To publish: Use Replit's Deploy/Publish feature. The app will be available at a `*.replit.app` domain.

---

## 15. Future Considerations

- **Database Migration**: The `IStorage` interface is ready for PostgreSQL via Drizzle ORM. Neon Database is configured but unused.
- **Streaming AI Responses**: Currently responses are buffered. SSE streaming would improve perceived latency.
- **Version Data Management**: Consider a CMS or admin interface instead of editing the 5,202-line TypeScript file directly.
- **Heatmap Date Sorting**: The mismatch between version numbers and release dates can confuse users. Consider offering a sort-by-version-number option.
- **Token Optimization**: The system prompt includes all 809 features as JSON. RAG or selective context could reduce costs.
