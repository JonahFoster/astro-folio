# Astro 6 Homepage Migration — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Migrate `gazette-v2.html` into an Astro 6.0 project with Fonts API, hybrid CSS architecture (global tokens + scoped component styles), and pixel-perfect homepage reproduction.

**Architecture:** Static Astro 6 project. `BaseLayout.astro` wraps all pages, imports trimmed `global.css` (tokens + resets + shared utilities), and includes `<Font>` + `<ClientRouter>` in `<head>`. Seven presentational components with scoped styles assembled in `index.astro`.

**Tech Stack:** Astro 6.0, Astro Fonts API (Google provider), CSS custom properties, static output, Netlify deploy target.

---

## File Map

| File | Action | Responsibility |
|------|--------|----------------|
| `package.json` | Create (via `npm create astro`) | Project metadata, dependencies |
| `astro.config.mjs` | Create | Fonts API config (3 fonts), static output |
| `tsconfig.json` | Create (via scaffold) | TypeScript config |
| `src/styles/global.css` | Modify | Remove component styles + font family tokens; add typography enhancements |
| `src/layouts/BaseLayout.astro` | Create | HTML shell, `<Font>`, `<ClientRouter>`, global.css import, `<slot>` |
| `src/components/Masthead.astro` | Create | Dateline + title, scoped styles |
| `src/components/NavBar.astro` | Create | Navigation links, scoped styles |
| `src/components/HeadlineSection.astro` | Create | Profile article + sidebar, scoped styles |
| `src/components/ProjectColumns.astro` | Create | Three-column project grid, scoped styles |
| `src/components/DispatchList.astro` | Create | Dispatch items list, scoped styles |
| `src/components/Classifieds.astro` | Create | Personnel File + Where to Find Me, scoped styles |
| `src/components/Footer.astro` | Create | Footer line, scoped styles |
| `src/pages/index.astro` | Create | Assemble all components with fade-in classes |

---

### Task 1: Scaffold Astro 6 Project

**Files:**
- Create: `package.json`, `astro.config.mjs`, `tsconfig.json`

- [ ] **Step 1: Create the Astro project**

Run from the project root. Use the `minimal` template, skip installing dependencies (we'll install after configuring):

```bash
npm create astro@latest . -- --template minimal --no-install --no-git --typescript strict
```

This creates `package.json`, `astro.config.mjs`, `tsconfig.json`, and the `src/pages/index.astro` placeholder. If prompted about overwriting existing files, allow it for the generated files but NOT for `src/styles/global.css` or any `docs/` files.

- [ ] **Step 2: Verify the scaffold created the expected files**

```bash
ls -la package.json astro.config.mjs tsconfig.json src/pages/index.astro
```

Expected: all four files exist.

- [ ] **Step 3: Create the component and layout directories**

```bash
mkdir -p src/components src/layouts
```

- [ ] **Step 4: Install dependencies**

```bash
npm install
```

Expected: `node_modules/` created, `package-lock.json` generated. Astro 6.x should appear in `package.json` dependencies.

- [ ] **Step 5: Verify Astro version**

```bash
npx astro --version
```

Expected: output shows `astro@6.x.x` (6.0 or later).

- [ ] **Step 6: Commit scaffold**

```bash
git add package.json package-lock.json astro.config.mjs tsconfig.json src/pages/index.astro
git commit -m "chore: scaffold Astro 6 project with minimal template"
```

---

### Task 2: Configure Fonts API

**Files:**
- Modify: `astro.config.mjs`

- [ ] **Step 1: Write the Astro config with Fonts API**

Replace the contents of `astro.config.mjs` with:

```js
import { defineConfig, fontProviders } from "astro/config";

export default defineConfig({
  fonts: [
    {
      name: "Playfair Display",
      cssVariable: "--font-headline",
      provider: fontProviders.google(),
      weights: [600, 700, 900],
      styles: ["normal", "italic"],
      subsets: ["latin"],
      fallbacks: ["Georgia", "serif"],
    },
    {
      name: "Source Serif 4",
      cssVariable: "--font-body",
      provider: fontProviders.google(),
      weights: [300, 400, 500, 600, 700],
      styles: ["normal", "italic"],
      subsets: ["latin"],
      fallbacks: ["Georgia", "serif"],
    },
    {
      name: "Courier Prime",
      cssVariable: "--font-mono",
      provider: fontProviders.google(),
      weights: [400],
      styles: ["normal", "italic"],
      subsets: ["latin"],
      fallbacks: ["Courier New", "monospace"],
    },
  ],
});
```

- [ ] **Step 2: Verify config is valid**

```bash
npx astro check 2>&1 | head -20
```

Expected: no config-related errors. (There may be warnings about the placeholder `index.astro` — that's fine.)

- [ ] **Step 3: Commit**

```bash
git add astro.config.mjs
git commit -m "feat: configure Fonts API with Playfair Display, Source Serif 4, Courier Prime"
```

---

### Task 3: Trim global.css

**Files:**
- Modify: `src/styles/global.css`

The existing `global.css` has both design system tokens AND component-specific styles. Remove component styles (they'll move to scoped `<style>` blocks) and font family tokens (now managed by Fonts API). Add CSS typography enhancements.

- [ ] **Step 1: Replace `global.css` with tokens + resets + shared utilities only**

Write the following to `src/styles/global.css`:

```css
/* ==========================================================================
   The Foster Gazette — Design System Tokens
   49 CSS custom properties (font families managed by Astro Fonts API).
   See docs/superpowers/specs/2026-03-26-design-system-design.md
   ========================================================================== */

:root {
  /* Spacing Scale (14 steps) */
  --space-0: 0;
  --space-px: 1px;
  --space-05: 0.125rem;
  --space-1: 0.25rem;
  --space-15: 0.375rem;
  --space-2: 0.5rem;
  --space-25: 0.625rem;
  --space-3: 0.75rem;
  --space-4: 1rem;
  --space-5: 1.25rem;
  --space-6: 1.5rem;
  --space-7: 1.75rem;
  --space-8: 2rem;
  --space-10: 2.5rem;

  /* Type Scale (11 steps) */
  --text-2xs: 0.65rem;
  --text-xs: 0.75rem;
  --text-sm: 0.875rem;
  --text-base: 1rem;
  --text-md: 1.05rem;
  --text-lg: 1.125rem;
  --text-xl: 1.4rem;
  --text-2xl: 2rem;
  --text-3xl: 2.8rem;
  --text-4xl: 3.8rem;
  --text-5xl: 4.5rem;

  /* Letter-Spacing (4 tokens) */
  --tracking-neg: -0.02em;
  --tracking-sm: 0.08em;
  --tracking-md: 0.1em;
  --tracking-lg: 0.15em;

  /* Line-Height (7 tokens) */
  --leading-compressed: 0.75;
  --leading-none: 1;
  --leading-tight: 1.1;
  --leading-snug: 1.3;
  --leading-normal: 1.5;
  --leading-relaxed: 1.6;
  --leading-loose: 1.7;

  /* Colors (5 tokens) */
  --ink: #1a1714;
  --paper: #F5F0E8;
  --paper-dark: #EBE4D6;
  --red: #C41E1E;
  --muted: #6B6358;

  /* Transitions (2 tokens) */
  --duration-fast: 0.2s;
  --duration-normal: 0.8s;

  /* Layout (3 tokens) */
  --page-max-width: 75rem;
  --page-gutter: 2rem;
  --sidebar-width: 21.25rem;

  /* Rules & Borders (3 tokens) */
  --rule-thin: 1px;
  --rule-thick: 3px;
  --rule-accent: 2px;
}

/* ==========================================================================
   Global Base Styles
   ========================================================================== */

* { margin: 0; padding: 0; box-sizing: border-box; }

body {
  font-family: var(--font-body);
  background: var(--paper);
  color: var(--ink);
  line-height: var(--leading-relaxed);
  font-size: var(--text-base);
  -webkit-font-smoothing: antialiased;
  text-rendering: optimizeLegibility;
  font-synthesis: none;
  text-wrap: pretty;
  background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.03'/%3E%3C/svg%3E");
}

::selection { background: var(--red); color: white; }

.page {
  max-width: var(--page-max-width);
  margin: 0 auto;
  padding: 0 var(--page-gutter);
}

.thin-rule {
  border: none;
  border-top: var(--rule-thin) solid var(--ink);
  margin: 0;
}

.thick-rule {
  border: none;
  border-top: var(--rule-thick) solid var(--ink);
  margin: 0;
}

/* ==========================================================================
   Animations
   ========================================================================== */

.fade-in { opacity: 0; animation: fadeIn var(--duration-normal) ease forwards; }
@keyframes fadeIn { to { opacity: 1; } }
.d1 { animation-delay: 0.1s; }
.d2 { animation-delay: 0.2s; }
.d3 { animation-delay: 0.3s; }
.d4 { animation-delay: 0.4s; }

/* ==========================================================================
   Global Responsive
   ========================================================================== */

@media (max-width: 640px) {
  .page { padding: 0 var(--space-4); }
}
```

- [ ] **Step 2: Commit**

```bash
git add src/styles/global.css
git commit -m "refactor: trim global.css to tokens, resets, and shared utilities

Remove component-specific styles (moving to scoped Astro components).
Remove font family tokens (now managed by Astro Fonts API).
Add text-rendering, font-synthesis, text-wrap enhancements."
```

---

### Task 4: Create BaseLayout

**Files:**
- Create: `src/layouts/BaseLayout.astro`

- [ ] **Step 1: Write BaseLayout.astro**

```astro
---
import { Font } from "astro:assets";
import { ClientRouter } from "astro:transitions";
import "../styles/global.css";
---

<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>The Foster Gazette</title>
    <Font cssVariable="--font-headline" preload />
    <Font cssVariable="--font-body" preload />
    <Font cssVariable="--font-mono" />
    <ClientRouter />
  </head>
  <body>
    <div class="page">
      <slot />
    </div>
  </body>
</html>
```

- [ ] **Step 2: Commit**

```bash
git add src/layouts/BaseLayout.astro
git commit -m "feat: add BaseLayout with Font components and ClientRouter"
```

---

### Task 5: Create Masthead Component

**Files:**
- Create: `src/components/Masthead.astro`

- [ ] **Step 1: Write Masthead.astro**

```astro
<header class="masthead">
  <div class="dateline">Gainesville, Florida &middot; Est. 2023 &middot; Published Irregularly</div>
  <h1>The Foster Gazette</h1>
</header>

<style>
  .masthead {
    text-align: center;
    padding: var(--space-8) 0 var(--space-4);
    border-bottom: var(--rule-thin) solid var(--ink);
  }

  .dateline {
    font-family: var(--font-mono);
    font-size: var(--text-xs);
    letter-spacing: var(--tracking-md);
    text-transform: uppercase;
    color: var(--muted);
    margin-bottom: var(--space-15);
  }

  h1 {
    font-family: var(--font-headline);
    font-size: var(--text-5xl);
    font-weight: 900;
    letter-spacing: var(--tracking-neg);
    line-height: var(--leading-none);
  }

  @media (max-width: 860px) {
    h1 { font-size: var(--text-3xl); }
  }

  @media (max-width: 640px) {
    h1 { font-size: var(--text-2xl); }
  }
</style>
```

- [ ] **Step 2: Commit**

```bash
git add src/components/Masthead.astro
git commit -m "feat: add Masthead component with scoped styles"
```

---

### Task 6: Create NavBar Component

**Files:**
- Create: `src/components/NavBar.astro`

- [ ] **Step 1: Write NavBar.astro**

```astro
<nav class="nav-bar">
  <a href="/dispatches">Dispatches</a>
  <a href="/projects">Projects</a>
  <a href="/about">About</a>
  <a href="/contact">Letters to the Editor</a>
</nav>

<style>
  .nav-bar {
    display: flex;
    justify-content: center;
    gap: var(--space-8);
    padding: var(--space-3) 0;
    border-bottom: var(--rule-thin) solid var(--ink);
  }

  a {
    font-family: var(--font-mono);
    font-size: var(--text-xs);
    letter-spacing: var(--tracking-md);
    text-transform: uppercase;
    color: var(--ink);
    text-decoration: none;
    transition: color var(--duration-fast);
  }

  a:hover { color: var(--red); }

  @media (max-width: 640px) {
    .nav-bar {
      gap: var(--space-4);
      flex-wrap: wrap;
    }
  }
</style>
```

- [ ] **Step 2: Commit**

```bash
git add src/components/NavBar.astro
git commit -m "feat: add NavBar component with scoped styles"
```

---

### Task 7: Create HeadlineSection Component

**Files:**
- Create: `src/components/HeadlineSection.astro`

- [ ] **Step 1: Write HeadlineSection.astro**

```astro
<section class="headline-section">
  <div class="headline-main">
    <div class="kicker">Profile</div>
    <h2>Local Man Builds Things for the Internet, Seems to Enjoy It</h2>
    <div class="byline">By Jonah Foster &middot; Ongoing</div>
    <p class="lede">Somewhere between shipping features at an accounting software startup and running a scrappy web design agency, Jonah Foster has managed to convince a small but growing number of people that he knows what he's doing. Sources close to the subject describe him as &ldquo;a frontend engineer who can&rsquo;t stop having opinions about the product,&rdquo; and also &ldquo;pretty good at SEO for some reason.&rdquo; He lives in Florida with his wife and a deeply indifferent cat. The investigation continues.</p>
  </div>
  <aside class="headline-sidebar">
    <div class="sidebar-item">
      <div class="sidebar-kicker">Day Job</div>
      <h3>Frontend Engineer at COUNT</h3>
      <p>Building accounting software. Shipping features, fixing bugs, and occasionally asking &ldquo;but why&rdquo; in meetings.</p>
    </div>
    <div class="sidebar-item">
      <div class="sidebar-kicker">My Own Thing</div>
      <h3>GNV Web Design</h3>
      <p>Web design and SEO for small businesses who deserve a better website than what they currently have.</p>
    </div>
    <div class="sidebar-item">
      <div class="sidebar-kicker">Currently Reading</div>
      <h3>Making Things Happen &amp; War and Peace</h3>
      <p>Scott Berkun on shipping and project management. Tolstoy on everything else.</p>
    </div>
  </aside>
</section>

<style>
  .headline-section {
    display: grid;
    grid-template-columns: 1fr var(--sidebar-width);
    border-bottom: var(--rule-thin) solid var(--ink);
    min-height: 380px;
  }

  .headline-main {
    padding: var(--space-8) var(--space-10) var(--space-8) 0;
    border-right: var(--rule-thin) solid var(--ink);
  }

  .kicker {
    font-family: var(--font-mono);
    font-size: var(--text-xs);
    font-weight: 700;
    letter-spacing: var(--tracking-lg);
    text-transform: uppercase;
    color: var(--red);
    margin-bottom: var(--space-25);
  }

  h2 {
    font-family: var(--font-headline);
    font-size: var(--text-3xl);
    font-weight: 700;
    line-height: var(--leading-tight);
    letter-spacing: var(--tracking-neg);
    margin-bottom: var(--space-4);
  }

  .byline {
    font-family: var(--font-mono);
    font-size: var(--text-xs);
    text-transform: uppercase;
    letter-spacing: var(--tracking-sm);
    color: var(--muted);
    margin-bottom: var(--space-5);
  }

  .lede {
    font-size: var(--text-lg);
    line-height: var(--leading-loose);
    color: var(--ink);
    max-width: 580px;
  }

  .lede::first-letter {
    font-family: var(--font-headline);
    font-size: var(--text-4xl);
    float: left;
    line-height: var(--leading-compressed);
    margin-right: var(--space-05);
    margin-top: var(--space-05);
    font-weight: 900;
    color: var(--red);
  }

  .headline-sidebar {
    display: flex;
    flex-direction: column;
    gap: var(--space-6);
    padding: var(--space-8) 0 var(--space-8) var(--space-8);
  }

  .sidebar-item {
    padding-bottom: var(--space-5);
    border-bottom: var(--rule-thin) solid var(--paper-dark);
  }

  .sidebar-item:last-child { border-bottom: none; }

  .sidebar-kicker {
    font-family: var(--font-mono);
    font-size: var(--text-2xs);
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: var(--tracking-md);
    color: var(--red);
    margin-bottom: var(--space-1);
  }

  h3 {
    font-family: var(--font-headline);
    font-size: var(--text-lg);
    font-weight: 700;
    line-height: var(--leading-snug);
    margin-bottom: var(--space-1);
  }

  .sidebar-item p {
    font-size: var(--text-sm);
    color: var(--muted);
    line-height: var(--leading-normal);
  }

  @media (max-width: 860px) {
    .headline-section { grid-template-columns: 1fr; }

    .headline-main {
      border-right: none;
      padding-right: 0;
      border-bottom: var(--rule-thin) solid var(--ink);
    }

    .headline-sidebar { padding-left: 0; }

    h2 { font-size: var(--text-2xl); }
  }
</style>
```

- [ ] **Step 2: Commit**

```bash
git add src/components/HeadlineSection.astro
git commit -m "feat: add HeadlineSection component with profile, sidebar, and drop cap"
```

---

### Task 8: Create ProjectColumns Component

**Files:**
- Create: `src/components/ProjectColumns.astro`

- [ ] **Step 1: Write ProjectColumns.astro**

```astro
<section class="three-col">
  <div class="col">
    <div class="col-head">SaaS &middot; Featured</div>
    <h3>COUNT &mdash; Accounting Software</h3>
    <p>Frontend engineering and product thinking for a growing accounting platform. Building the interfaces people use to manage their books, track expenses, and close the month without losing their minds.</p>
    <a href="https://getcount.com">Visit &rarr;</a>
  </div>
  <div class="col">
    <div class="col-head">My Own Thing &middot; Featured</div>
    <h3>GNV Web Design</h3>
    <p>Websites and SEO for small businesses. I design, build, and optimize sites for people who deserve a better web presence than what they&rsquo;ve got.</p>
    <a href="https://gnvwebdesign.com">Visit &rarr;</a>
  </div>
  <div class="col">
    <div class="col-head">Side Project &middot; Archived</div>
    <h3>College Baseball Stats</h3>
    <p>Every college baseball player&rsquo;s stats since 2020. React, Firebase, and a Python scraper. My first full-stack project and still alive somehow.</p>
    <a href="#">Visit &rarr;</a>
  </div>
</section>

<style>
  .three-col {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    border-bottom: var(--rule-thin) solid var(--ink);
  }

  .col {
    padding: var(--space-7);
    border-right: var(--rule-thin) solid var(--ink);
  }

  .col:first-child { padding-left: 0; }
  .col:last-child { border-right: none; padding-right: 0; }

  .col-head {
    font-family: var(--font-mono);
    font-size: var(--text-2xs);
    text-transform: uppercase;
    letter-spacing: var(--tracking-lg);
    color: var(--muted);
    border-bottom: var(--rule-accent) solid var(--ink);
    padding-bottom: var(--space-15);
    margin-bottom: var(--space-4);
  }

  h3 {
    font-family: var(--font-headline);
    font-size: var(--text-lg);
    font-weight: 700;
    line-height: var(--leading-snug);
    margin-bottom: var(--space-25);
  }

  p {
    font-size: var(--text-sm);
    line-height: var(--leading-relaxed);
    color: var(--muted);
  }

  a {
    display: inline-block;
    font-family: var(--font-mono);
    font-size: var(--text-xs);
    text-transform: uppercase;
    letter-spacing: var(--tracking-md);
    color: var(--red);
    text-decoration: none;
    margin-top: var(--space-25);
    border-bottom: var(--rule-thin) solid var(--red);
    transition: opacity var(--duration-fast);
  }

  a:hover { opacity: 0.7; }

  @media (max-width: 1024px) {
    .three-col { grid-template-columns: 1fr 1fr; }
    .col:nth-child(2) { border-right: none; }
    .col:nth-child(3) {
      padding-left: 0;
      border-top: var(--rule-thin) solid var(--paper-dark);
    }
  }

  @media (max-width: 860px) {
    .three-col { grid-template-columns: 1fr; }

    .col {
      border-right: none;
      padding: var(--space-6) 0;
      border-bottom: var(--rule-thin) solid var(--paper-dark);
    }

    .col:first-child { padding-left: 0; }
    .col:last-child { border-bottom: none; }
  }
</style>
```

- [ ] **Step 2: Commit**

```bash
git add src/components/ProjectColumns.astro
git commit -m "feat: add ProjectColumns component with three-column grid"
```

---

### Task 9: Create DispatchList Component

**Files:**
- Create: `src/components/DispatchList.astro`

- [ ] **Step 1: Write DispatchList.astro**

```astro
<section class="dispatches">
  <div class="section-head">Dispatches</div>
  <div class="section-sub">Thoughts, notes, and things I learned the hard way</div>
  <div class="dispatch-list">
    <a href="#" class="dispatch-item">
      <span class="dispatch-num">01</span>
      <h4>How to Accidentally Become the Product Person</h4>
      <span class="dispatch-tag">Product</span>
    </a>
    <a href="#" class="dispatch-item">
      <span class="dispatch-num">02</span>
      <h4>Building an SEO Audit Tool on a Budget</h4>
      <span class="dispatch-tag">Engineering</span>
    </a>
    <a href="#" class="dispatch-item">
      <span class="dispatch-num">03</span>
      <h4>Domain Expertise is a Frontend Superpower</h4>
      <span class="dispatch-tag">Career</span>
    </a>
    <a href="#" class="dispatch-item">
      <span class="dispatch-num">04</span>
      <h4>My AI-Assisted Dev Workflow (Cursor + Claude Edition)</h4>
      <span class="dispatch-tag">Tools</span>
    </a>
    <a href="#" class="dispatch-item">
      <span class="dispatch-num">05</span>
      <h4>Running an Agency While Employed Full-Time</h4>
      <span class="dispatch-tag">Business</span>
    </a>
  </div>
</section>

<style>
  .dispatches {
    padding: var(--space-8) 0;
    border-bottom: var(--rule-thin) solid var(--ink);
  }

  .section-head {
    font-family: var(--font-headline);
    font-size: var(--text-xl);
    font-weight: 900;
    text-align: center;
    margin-bottom: var(--space-1);
  }

  .section-sub {
    font-style: italic;
    font-size: var(--text-sm);
    text-align: center;
    color: var(--muted);
    margin-bottom: var(--space-6);
  }

  .dispatch-list {
    display: flex;
    flex-direction: column;
  }

  .dispatch-item {
    display: grid;
    grid-template-columns: 80px 1fr auto;
    gap: var(--space-5);
    align-items: baseline;
    padding: var(--space-3) 0;
    border-top: var(--rule-thin) solid var(--paper-dark);
    text-decoration: none;
    color: var(--ink);
    transition: background var(--duration-fast);
  }

  .dispatch-item:hover {
    background: var(--paper-dark);
    margin: 0 calc(-1 * var(--space-2));
    padding: var(--space-3) var(--space-2);
  }

  .dispatch-num {
    font-family: var(--font-headline);
    font-size: var(--text-2xl);
    font-weight: 900;
    line-height: var(--leading-none);
    text-align: right;
    color: var(--paper-dark);
  }

  .dispatch-item:hover .dispatch-num { color: var(--red); }

  h4 {
    font-family: var(--font-headline);
    font-size: var(--text-md);
    font-weight: 600;
    line-height: var(--leading-snug);
  }

  .dispatch-tag {
    font-family: var(--font-mono);
    font-size: var(--text-2xs);
    text-transform: uppercase;
    letter-spacing: var(--tracking-md);
    color: var(--muted);
    white-space: nowrap;
  }

  @media (max-width: 860px) {
    .dispatch-item { grid-template-columns: 40px 1fr; }
    .dispatch-tag { display: none; }
  }
</style>
```

- [ ] **Step 2: Commit**

```bash
git add src/components/DispatchList.astro
git commit -m "feat: add DispatchList component with numbered dispatch items"
```

---

### Task 10: Create Classifieds Component

**Files:**
- Create: `src/components/Classifieds.astro`

- [ ] **Step 1: Write Classifieds.astro**

```astro
<section class="classifieds">
  <div class="classified-col">
    <h3>Personnel File</h3>
    <div class="classified-entry">
      <div class="cl-label">Education</div>
      <div class="cl-value">University of Florida, B.A. in History</div>
    </div>
    <div class="classified-entry">
      <div class="cl-label">Primary Stack</div>
      <div class="cl-value">Astro, Tailwind, React, Node.js</div>
    </div>
    <div class="classified-entry">
      <div class="cl-label">Also Into</div>
      <div class="cl-value">SEO, Product Strategy, AI Automation, Webflow</div>
    </div>
    <div class="classified-entry">
      <div class="cl-label">Off the Clock</div>
      <div class="cl-value">Coffee, college baseball, or reading about something that happened hundreds of years ago</div>
    </div>
  </div>
  <div class="classified-col">
    <h3>Where to Find Me</h3>
    <div class="classified-entry">
      <div class="cl-label">GitHub</div>
      <div class="cl-value"><a href="https://github.com/JonahFoster">github.com/JonahFoster</a></div>
    </div>
    <div class="classified-entry">
      <div class="cl-label">LinkedIn</div>
      <div class="cl-value"><a href="https://linkedin.com/in/jonahfoster">linkedin.com/in/jonahfoster</a></div>
    </div>
    <div class="classified-entry">
      <div class="cl-label">GNV Web Design</div>
      <div class="cl-value"><a href="https://gnvwebdesign.com">gnvwebdesign.com</a></div>
    </div>
    <div class="classified-entry">
      <div class="cl-label">Twitter</div>
      <div class="cl-value"><a href="https://twitter.com/thejonahfoster">@thejonahfoster</a></div>
    </div>
  </div>
</section>

<style>
  .classifieds {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: var(--space-8);
    padding: var(--space-8) 0;
    border-bottom: var(--rule-thin) solid var(--ink);
  }

  h3 {
    font-family: var(--font-headline);
    font-size: var(--text-lg);
    font-weight: 900;
    margin-bottom: var(--space-4);
    padding-bottom: var(--space-15);
    border-bottom: var(--rule-accent) solid var(--ink);
  }

  .classified-entry {
    padding: var(--space-3) 0;
    border-bottom: var(--rule-thin) solid var(--paper-dark);
  }

  .cl-label {
    font-family: var(--font-mono);
    font-size: var(--text-xs);
    text-transform: uppercase;
    letter-spacing: var(--tracking-sm);
    color: var(--muted);
  }

  .cl-value {
    font-size: var(--text-sm);
    margin-top: var(--space-05);
  }

  .cl-value a {
    color: var(--red);
    text-decoration: none;
    border-bottom: var(--rule-thin) solid transparent;
    transition: border-color var(--duration-fast);
  }

  .cl-value a:hover { border-color: var(--red); }

  @media (max-width: 860px) {
    .classifieds { grid-template-columns: 1fr; }
  }
</style>
```

- [ ] **Step 2: Commit**

```bash
git add src/components/Classifieds.astro
git commit -m "feat: add Classifieds component with Personnel File and links"
```

---

### Task 11: Create Footer Component

**Files:**
- Create: `src/components/Footer.astro`

- [ ] **Step 1: Write Footer.astro**

```astro
<footer class="paper-footer">
  &copy; 2026 The Foster Gazette &middot; Pulitzer pending &middot; Printed with Astro &amp; good intentions
</footer>

<style>
  .paper-footer {
    font-family: var(--font-mono);
    font-size: var(--text-xs);
    text-transform: uppercase;
    letter-spacing: var(--tracking-sm);
    text-align: center;
    color: var(--muted);
    padding: var(--space-6) 0;
  }
</style>
```

- [ ] **Step 2: Commit**

```bash
git add src/components/Footer.astro
git commit -m "feat: add Footer component"
```

---

### Task 12: Create Homepage

**Files:**
- Modify: `src/pages/index.astro`

- [ ] **Step 1: Write index.astro**

Replace the scaffold placeholder with:

```astro
---
import BaseLayout from "../layouts/BaseLayout.astro";
import Masthead from "../components/Masthead.astro";
import NavBar from "../components/NavBar.astro";
import HeadlineSection from "../components/HeadlineSection.astro";
import ProjectColumns from "../components/ProjectColumns.astro";
import DispatchList from "../components/DispatchList.astro";
import Classifieds from "../components/Classifieds.astro";
import Footer from "../components/Footer.astro";
---

<BaseLayout>
  <div class="fade-in">
    <Masthead />
  </div>
  <div class="fade-in d1">
    <NavBar />
  </div>
  <div class="fade-in d2">
    <HeadlineSection />
  </div>
  <div class="fade-in d3">
    <ProjectColumns />
  </div>
  <div class="fade-in d4">
    <DispatchList />
  </div>
  <Classifieds />
  <Footer />
</BaseLayout>
```

- [ ] **Step 2: Commit**

```bash
git add src/pages/index.astro
git commit -m "feat: assemble homepage from all components with fade-in animations"
```

---

### Task 13: Verify Build and Visual Match

**Files:** None (verification only)

- [ ] **Step 1: Run the dev server**

```bash
npx astro dev
```

Expected: server starts on `http://localhost:4321` with no errors. Open it in a browser and visually compare against `gazette-v2.html`.

- [ ] **Step 2: Check for zero JavaScript in production build**

```bash
npx astro build
```

Expected: build succeeds. Check the output:

```bash
find dist -name "*.js" -type f
```

Expected: no `.js` files in `dist/` (the ClientRouter adds a small script for view transitions — this is expected and acceptable; it's Astro's router, not application JS).

- [ ] **Step 3: Verify fonts are self-hosted (no Google Fonts requests)**

```bash
grep -r "fonts.googleapis.com" dist/ || echo "No Google Fonts requests found — fonts are self-hosted"
```

Expected: "No Google Fonts requests found" message.

- [ ] **Step 4: Preview the production build**

```bash
npx astro preview
```

Expected: serves the built site on `http://localhost:4321`. Visually identical to `gazette-v2.html`. Check:
- Masthead renders with Playfair Display at large size
- Nav links are Courier Prime, uppercase, spaced
- Headline section has two columns with vertical rule separator
- Drop cap on lede paragraph is red Playfair Display
- Three project columns with vertical rules
- Dispatch list with numbered items, hover states work
- Classifieds two-column layout
- Footer centered with Courier Prime
- Responsive: resize to 860px (single column), 640px (tighter spacing)

- [ ] **Step 5: Commit any fixes needed**

If any visual discrepancies are found, fix them in the relevant component and commit:

```bash
git add -A
git commit -m "fix: visual adjustments from comparison against gazette-v2.html"
```

If no fixes needed, skip this step.
