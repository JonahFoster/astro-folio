# Astro 6 Migration Spec — The Foster Gazette Homepage

Migrate `gazette-v2.html` to an Astro 6.0 project. Scope: homepage only, pixel-perfect match to the prototype. Static output, zero JavaScript shipped. Sets the foundation for future routes (`/dispatches`, `/projects`, `/about`, `/contact`).

## Tech Decisions

- **Astro 6.0** (released 2026-03-10). Requires Node 22+.
- **Static output mode** — no SSR, no adapter, no islands. Pre-rendered HTML + CSS.
- **Fonts API** — self-hosted fonts configured in `astro.config.mjs`. Eliminates third-party Google Fonts requests.
- **`<ClientRouter />`** — included in layout for future view transitions. No effect on single-page site.
- **Netlify deployment** — static deploy, no adapter needed.
- **No content collections yet** — dispatches section uses hardcoded data. Collections come when `/dispatches` route is built.

## Project Structure

```
gazette/
├── astro.config.mjs
├── package.json
├── tsconfig.json
├── src/
│   ├── components/
│   │   ├── Masthead.astro
│   │   ├── NavBar.astro
│   │   ├── HeadlineSection.astro
│   │   ├── ProjectColumns.astro
│   │   ├── DispatchList.astro
│   │   ├── Classifieds.astro
│   │   └── Footer.astro
│   ├── layouts/
│   │   └── BaseLayout.astro
│   ├── pages/
│   │   └── index.astro
│   └── styles/
│       └── global.css
├── gazette-v2.html              # Source of truth (kept for reference)
├── README.md
└── CLAUDE.md
```

## Astro Config

`astro.config.mjs` configuration:

- **Output:** `static` (default)
- **Site:** Netlify URL (set when known)
- **Fonts API:**
  - Playfair Display from Google — weights 600, 700, 900 (used in prototype), plus italic range for future use
  - Source Serif 4 from Google — weight 400 (body text), plus 300-700 range for future use
  - Courier Prime from Google — weight 400, plus italic
  - Each font mapped to the existing CSS custom property names (`--font-headline`, `--font-body`, `--font-mono`)
  - Astro handles: downloading font files, generating `@font-face` declarations, creating metrics-based fallback fonts, inserting `<link rel="preload">` tags

## CSS Architecture

**Hybrid approach:** global tokens + scoped component styles.

### `global.css` contains:

1. **Design system tokens** — all 52 custom properties in `:root` (already built, carried over from existing `global.css`)
2. **Reset** — `* { margin: 0; padding: 0; box-sizing: border-box; }`
3. **Body base styles:**
   - Font family, background color, paper texture SVG, ink color, line height, font size
   - `-webkit-font-smoothing: antialiased`
   - `text-rendering: optimizeLegibility` (new — enables kerning/ligatures)
   - `font-synthesis: none` (new — prevents faked bold/italic)
   - `text-wrap: pretty` (new — improves line breaking, reduces orphans)
4. **`::selection`** — red background, white text
5. **`.page` container** — max-width, auto margin, horizontal padding
6. **`.thin-rule` / `.thick-rule`** — shared horizontal rule utilities
7. **Fade-in animation** — `@keyframes fadeIn`, `.fade-in`, `.d1`–`.d4` delay classes

### Component-specific styles removed from `global.css`:

All `.masthead`, `.nav-bar`, `.headline-section`, `.headline-main`, `.headline-sidebar`, `.sidebar-item`, `.three-col`, `.col`, `.dispatches`, `.dispatch-item`, `.classifieds`, `.classified-entry`, `.paper-footer` styles move into scoped `<style>` blocks in their respective `.astro` components.

Responsive `@media` rules move into each component's scoped `<style>` — each component owns its own breakpoint behavior.

## Components

All components have no props. Content is hardcoded to match `gazette-v2.html` exactly.

### `BaseLayout.astro`

- `<!DOCTYPE html>`, `<html lang="en">`, `<head>`
- Meta charset, viewport
- `<title>The Foster Gazette</title>`
- Fonts loaded via Astro Fonts API (no manual `<link>` tags)
- `<ClientRouter />` from `astro:transitions`
- Imports `../styles/global.css`
- `<body>` with `<div class="page">` wrapping `<slot />`

### `Masthead.astro`

- Dateline: "Gainesville, Florida · Est. 2023 · Published Irregularly"
- `<h1>The Foster Gazette</h1>`
- Scoped styles: `.masthead`, `.dateline`, `h1`

### `NavBar.astro`

- Links: Dispatches (`/dispatches`), Projects (`/projects`), About (`/about`), Letters to the Editor (`/contact`)
- Scoped styles: nav flex layout, link styles, hover color

### `HeadlineSection.astro`

- Two-column grid: main profile article (left) + sidebar items (right)
- Main: kicker "Profile", headline, byline, lede with `::first-letter` drop cap
- Sidebar: three items (Day Job, My Own Thing, Currently Reading)
- Scoped styles: grid layout, `.kicker`, `h2`, `.byline`, `.lede`, `.lede::first-letter`, `.headline-sidebar`, `.sidebar-item`, `.sidebar-kicker`
- Responsive: single column below 860px

### `ProjectColumns.astro`

- Three equal columns separated by vertical rules
- Each column: kicker label, title, description, link
- Content: COUNT, GNV Web Design, College Baseball Stats
- Scoped styles: `.three-col` grid, `.col`, `.col-head`, link styles
- Responsive: 2+1 at 1024px, single column at 860px

### `DispatchList.astro`

- Section header "Dispatches" + subtitle
- Five dispatch items with numbers (01–05), titles, category tags
- Hardcoded placeholder data (same as prototype)
- Scoped styles: `.dispatches`, `.dispatch-list`, `.dispatch-item` grid, `.dispatch-num`, hover states
- Responsive: tag column hidden, number column shrinks at 860px

### `Classifieds.astro`

- Two-column grid: Personnel File (left) + Where to Find Me (right)
- Personnel File: Education, Primary Stack, Also Into, Off the Clock
- Where to Find Me: GitHub, LinkedIn, GNV Web Design, Twitter (with links)
- Scoped styles: `.classifieds` grid, `.classified-col`, `.classified-entry`, link styles
- Responsive: single column at 860px

### `Footer.astro`

- "© 2026 The Foster Gazette · Pulitzer pending · Printed with Astro & good intentions"
- Scoped styles: `.paper-footer`

### `index.astro`

- Uses `BaseLayout`
- Renders components in order: Masthead, NavBar, HeadlineSection, ProjectColumns, DispatchList, Classifieds, Footer
- Fade-in classes applied to each section with staggered delays (matching prototype)

## CSS Typography Enhancements

Added to `body` in `global.css` (not in the original prototype):

| Property | Value | Purpose |
|----------|-------|---------|
| `text-rendering` | `optimizeLegibility` | Enables kerning and ligatures in Playfair Display and Source Serif 4 |
| `font-synthesis` | `none` | Prevents browser from faking bold/italic for weights not loaded |
| `text-wrap` | `pretty` | Improves line breaking to reduce orphans — fits newspaper aesthetic |

## Responsive Breakpoints

Three breakpoints, carried over from existing `global.css`. Each component owns its responsive rules in scoped styles.

| Breakpoint | Width | Key changes |
|------------|-------|-------------|
| Large | 1024px | Three-col projects → 2+1 layout |
| Medium | 860px | All multi-column sections → single column. Masthead title shrinks. |
| Small | 640px | Page gutter tightens. Masthead title shrinks further. Nav wraps. |

## What This Spec Does NOT Cover

- Content collections / MDX pipeline (comes with `/dispatches` route)
- Other pages: `/dispatches`, `/projects`, `/about`, `/contact`
- Contact form functionality
- SEO metadata beyond `<title>`
- Analytics or third-party integrations
- Netlify deployment configuration (netlify.toml)

## Success Criteria

1. `astro dev` serves a homepage visually identical to `gazette-v2.html`
2. Zero JavaScript shipped in production build
3. Fonts self-hosted via Astro Fonts API — no requests to fonts.googleapis.com
4. All 52 design tokens used correctly (no magic values)
5. Lighthouse Performance score 95+ on static build
6. All three responsive breakpoints working correctly
