# ICMWhatsNew Design Guidelines

## Design Approach

**Selected Approach**: Design System - Material Design 3 inspired
**Rationale**: Technical documentation app requiring clarity, information density, and functional efficiency. Material Design's elevation system, clear hierarchy, and structured grid work perfectly for data visualization and chat interfaces.

**Key Principles**:
- Information clarity over decoration
- Purposeful use of space for dense technical content
- Consistent interaction patterns across chat and visualization views
- Professional, trustworthy aesthetic for enterprise software

## Typography

**Font Families**: 
- Primary: Inter (headings, UI elements, chat interface)
- Secondary: JetBrains Mono (code snippets, version numbers, technical labels)

**Hierarchy**:
- H1: text-4xl font-bold (page titles)
- H2: text-2xl font-semibold (section headers, version titles)
- H3: text-xl font-medium (feature names, subsections)
- Body: text-base (descriptions, chat messages)
- Small: text-sm (metadata, timestamps, labels)
- Code/Technical: text-sm font-mono (version numbers, technical terms)

## Layout System

**Spacing Primitives**: Use Tailwind units of 2, 4, 6, 8, 12, 16
- Component padding: p-4, p-6
- Section gaps: gap-6, gap-8
- Page margins: px-6, px-8, py-8
- Card spacing: p-6

**Container Strategy**:
- Max width: max-w-7xl for main content
- Full-width timeline visualization
- Sidebar chat: fixed width 400px (w-[400px])

**Grid System**:
- Main layout: Two-column split (timeline/content + chat sidebar)
- Feature cards: Grid layout grid-cols-1 md:grid-cols-2 lg:grid-cols-3
- Timeline: Horizontal scroll container with vertical feature cards

## Component Library

### Core Layout
**Navigation Header**:
- Full-width sticky header (h-16)
- App title/logo (left), view toggle tabs (center), settings/info (right)
- Minimal elevation with subtle border-bottom

**Main Content Area**:
- Split layout: 70% content area + 30% chat sidebar (desktop)
- Stack vertically on mobile with toggle between views
- Content area with scrollable timeline or feature grid

**Dual Chat Sidebar**:
- Tabbed interface: "Claude Sonnet" | "DeepSeek" tabs at top
- Chat message container with auto-scroll
- Input field with send button (bottom)
- Message bubbles: user (right-aligned), AI (left-aligned)
- Avatar indicators for each AI model

### Timeline Visualization
**Timeline Container**:
- Horizontal scrollable timeline with version markers
- Vertical connecting line with nodes for each release
- Version cards: rounded-lg shadow with p-6
- Release date badges positioned on timeline nodes

**Version Nodes**:
- Circular indicators (w-4 h-4) on timeline
- Connecting line (h-1 border-l-2)
- Hover state reveals quick preview tooltip

**Timeline Cards**:
- Stacked vertically from timeline node
- Compact mode showing version, date, feature count
- Expandable to reveal detailed features

### Feature Cards
**Card Structure**:
- Rounded container (rounded-xl) with subtle shadow
- Header: Feature icon + title (text-xl font-semibold)
- Description: multi-line text with line-clamp-3
- Footer: Documentation link, video indicator (if present)
- Tag system for categories (Esri, Admin, Subgrid, Cloud)

**Feature Detail Modal**:
- Full-screen overlay for expanded feature view
- Video player embed (if available)
- Full description with formatted text
- External links to Autodesk documentation
- Close button (top-right)

**Category Tags**:
- Small rounded pills (px-3 py-1 rounded-full text-xs)
- Icon + label combination
- Filter chips at top of feature grid

### Chat Interface Components
**Message Bubbles**:
- Rounded corners (rounded-2xl)
- Max width: max-w-[85%]
- User messages: self-end
- AI messages: self-start with model avatar
- Markdown rendering for formatted responses
- Code blocks with syntax highlighting

**Input Area**:
- Sticky bottom position
- Textarea with auto-resize (max 5 lines)
- Send button (icon button)
- Character count indicator (optional)
- "Thinking..." indicator when AI processing

**Model Tabs**:
- Horizontal tabs with active indicator
- Icon + name for each model
- Badge showing message count per conversation

### Data Visualization
**Timeline Diagram**:
- SVG-based timeline with D3.js or similar
- Interactive hover states
- Zoom controls for dense timelines
- Filter by date range slider

**Feature Stats**:
- Compact metrics cards (Total features, Categories, Latest version)
- Positioned above timeline
- Grid layout: grid-cols-3 gap-4

## Interaction Patterns

**Navigation**:
- Tab-based switching between Timeline and Chat views (mobile)
- Persistent sidebar chat (desktop)
- Smooth scroll to timeline positions
- Breadcrumb navigation for feature drill-down

**Filtering**:
- Multi-select category filters (checkbox list)
- Search input for text search across features
- Date range picker for timeline filtering
- Clear filters button

**Loading States**:
- Skeleton screens for timeline loading
- Spinner for chat responses
- Progressive loading for feature cards

**Responsive Behavior**:
- Desktop (lg+): Side-by-side timeline + chat
- Tablet (md): Stacked with sticky tabs
- Mobile: Full-screen views with bottom nav toggle

## Images

**No Hero Image**: This is a functional application, not a marketing site. Lead directly with the timeline visualization and chat interface.

**Icons**:
- Use Heroicons for UI elements
- Model-specific icons for chat tabs (sparkle for Claude, circuit for DeepSeek)
- Category icons for feature tags
- Timeline node indicators

**Feature Thumbnails**: 
- Video placeholder icons for features with video content
- External link icons for documentation
- Autodesk logo/branding where appropriate

## Accessibility

- ARIA labels for all interactive elements
- Keyboard navigation for timeline and chat
- Focus indicators with high contrast
- Screen reader announcements for AI responses
- Semantic HTML structure throughout