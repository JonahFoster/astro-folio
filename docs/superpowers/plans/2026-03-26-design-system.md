# Design System Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Create `src/styles/global.css` with all 52 design tokens and migrated component styles from the prototype, ready for the Astro build.

**Architecture:** Single CSS file with `:root` custom properties (tokens) followed by component styles that reference only those tokens — no magic numbers. The HTML markup stays identical to `gazette-v2.html`; only the CSS source changes.

**Tech Stack:** Vanilla CSS custom properties. No preprocessor, no framework.

---

## File Structure

```
src/
└── styles/
    └── global.css          # All tokens + all component styles
tests/
└── visual-test.html        # Same markup as gazette-v2.html, links to global.css for visual comparison
```

---

### Task 1: Create global.css with all 52 design tokens

**Files:**
- Create: `src/styles/global.css`

**Spec reference:** `docs/superpowers/specs/2026-03-26-design-system-design.md` — all token tables.

- [ ] **Step 1: Create the file with `:root` block containing all tokens**

```css
/* ==========================================================================
   The Foster Gazette — Design System Tokens
   52 CSS custom properties. See docs/superpowers/specs/2026-03-26-design-system-design.md
   ========================================================================== */

:root {
  /* Font Families */
  --font-headline: 'Playfair Display', Georgia, serif;
  --font-body: 'Source Serif 4', Georgia, serif;
  --font-mono: 'Courier Prime', 'Courier New', monospace;

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
```

- [ ] **Step 2: Verify token count**

Count the custom properties in the file. There should be exactly 52.

Run: `grep -c '^\s*--' src/styles/global.css`
Expected: `52`

- [ ] **Step 3: Commit**

```bash
git add src/styles/global.css
git commit -m "feat: add design system tokens (52 CSS custom properties)"
```

---

### Task 2: Add global base styles

**Files:**
- Modify: `src/styles/global.css`

**Prototype reference:** `gazette-v2.html:23-42` (reset, body, selection, .page container), `gazette-v2.html:68-78` (utility rules).

- [ ] **Step 1: Add base styles after the `:root` block**

Append to `src/styles/global.css`:

```css
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
```

- [ ] **Step 2: Verify no magic numbers were introduced**

Run: `grep -n 'px\|rem\|em\|#[0-9a-fA-F]' src/styles/global.css | grep -v 'var(--' | grep -v '^\s*/\*' | grep -v ':root' | grep -v '^\s*--'`

Expected output should only show:
- The SVG data URI line (inline noise texture — intentional literal)
- `color: white` in `::selection` (intentional literal per spec)
- `margin: 0` / `padding: 0` in reset (zero values — no token needed)

- [ ] **Step 3: Commit**

```bash
git add src/styles/global.css
git commit -m "feat: add global base styles using design tokens"
```

---

### Task 3: Add masthead and nav bar styles

**Files:**
- Modify: `src/styles/global.css`

**Prototype reference:** `gazette-v2.html:44-99` (masthead + nav bar sections).

- [ ] **Step 1: Add masthead styles**

Append to `src/styles/global.css`:

```css
/* ==========================================================================
   Masthead
   ========================================================================== */

.masthead {
  text-align: center;
  padding: var(--space-8) 0 var(--space-4);
  border-bottom: var(--rule-thin) solid var(--ink);
}

.masthead .dateline {
  font-family: var(--font-mono);
  font-size: var(--text-xs);
  letter-spacing: var(--tracking-md);
  text-transform: uppercase;
  color: var(--muted);
  margin-bottom: var(--space-15);
}

.masthead h1 {
  font-family: var(--font-headline);
  font-size: var(--text-5xl);
  font-weight: 900;
  letter-spacing: var(--tracking-neg);
  line-height: var(--leading-none);
}
```

- [ ] **Step 2: Add nav bar styles**

Append to `src/styles/global.css`:

```css
/* ==========================================================================
   Nav Bar
   ========================================================================== */

.nav-bar {
  display: flex;
  justify-content: center;
  gap: var(--space-8);
  padding: var(--space-3) 0;
  border-bottom: var(--rule-thin) solid var(--ink);
}

.nav-bar a {
  font-family: var(--font-mono);
  font-size: var(--text-xs);
  letter-spacing: var(--tracking-md);
  text-transform: uppercase;
  color: var(--ink);
  text-decoration: none;
  transition: color var(--duration-fast);
}

.nav-bar a:hover { color: var(--red); }
```

- [ ] **Step 3: Commit**

```bash
git add src/styles/global.css
git commit -m "feat: add masthead and nav bar styles using design tokens"
```

---

### Task 4: Add headline section styles

**Files:**
- Modify: `src/styles/global.css`

**Prototype reference:** `gazette-v2.html:101-197` (headline section — main content + sidebar).

- [ ] **Step 1: Add headline main styles**

Append to `src/styles/global.css`:

```css
/* ==========================================================================
   Headline Section
   ========================================================================== */

.headline-section {
  display: grid;
  grid-template-columns: 1fr var(--sidebar-width);
  gap: var(--space-0);
  border-bottom: var(--rule-thin) solid var(--ink);
  min-height: 380px;
}

.headline-main {
  padding: var(--space-8) var(--space-10) var(--space-8) 0;
  border-right: var(--rule-thin) solid var(--ink);
}

.headline-main .kicker {
  font-family: var(--font-mono);
  font-size: var(--text-xs);
  letter-spacing: var(--tracking-lg);
  text-transform: uppercase;
  color: var(--red);
  font-weight: 700;
  margin-bottom: var(--space-25);
}

.headline-main h2 {
  font-family: var(--font-headline);
  font-size: var(--text-3xl);
  font-weight: 700;
  line-height: var(--leading-tight);
  letter-spacing: var(--tracking-neg);
  margin-bottom: var(--space-4);
}

.headline-main .byline {
  font-family: var(--font-mono);
  font-size: var(--text-xs);
  text-transform: uppercase;
  letter-spacing: var(--tracking-sm);
  color: var(--muted);
  margin-bottom: var(--space-5);
}

.headline-main .lede {
  font-size: var(--text-lg);
  line-height: var(--leading-loose);
  color: var(--ink);
  max-width: 580px;
}

.headline-main .lede::first-letter {
  font-family: var(--font-headline);
  font-size: var(--text-4xl);
  float: left;
  line-height: var(--leading-compressed);
  margin-right: var(--space-05);
  margin-top: var(--space-05);
  font-weight: 900;
  color: var(--red);
}
```

- [ ] **Step 2: Add sidebar styles**

Append to `src/styles/global.css`:

```css
.headline-sidebar {
  padding: var(--space-8) 0 var(--space-8) var(--space-8);
  display: flex;
  flex-direction: column;
  gap: var(--space-6);
}

.sidebar-item {
  padding-bottom: var(--space-5);
  border-bottom: var(--rule-thin) solid var(--paper-dark);
}

.sidebar-item:last-child { border-bottom: none; }

.sidebar-item .sidebar-kicker {
  font-family: var(--font-mono);
  font-size: var(--text-2xs);
  text-transform: uppercase;
  letter-spacing: var(--tracking-md);
  color: var(--red);
  font-weight: 700;
  margin-bottom: var(--space-1);
}

.sidebar-item h3 {
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
```

- [ ] **Step 3: Commit**

```bash
git add src/styles/global.css
git commit -m "feat: add headline section styles using design tokens"
```

---

### Task 5: Add three-column project styles

**Files:**
- Modify: `src/styles/global.css`

**Prototype reference:** `gazette-v2.html:199-252` (three-col section).

- [ ] **Step 1: Add three-column styles**

Append to `src/styles/global.css`:

```css
/* ==========================================================================
   Three Column Projects
   ========================================================================== */

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

.col .col-head {
  font-family: var(--font-mono);
  font-size: var(--text-2xs);
  text-transform: uppercase;
  letter-spacing: var(--tracking-lg);
  color: var(--muted);
  border-bottom: var(--rule-accent) solid var(--ink);
  padding-bottom: var(--space-15);
  margin-bottom: var(--space-4);
}

.col h3 {
  font-family: var(--font-headline);
  font-size: var(--text-lg);
  font-weight: 700;
  line-height: var(--leading-snug);
  margin-bottom: var(--space-25);
}

.col p {
  font-size: var(--text-sm);
  line-height: var(--leading-relaxed);
  color: var(--muted);
}

.col a {
  display: inline-block;
  margin-top: var(--space-25);
  font-family: var(--font-mono);
  font-size: var(--text-xs);
  text-transform: uppercase;
  letter-spacing: var(--tracking-md);
  color: var(--red);
  text-decoration: none;
  border-bottom: var(--rule-thin) solid var(--red);
  transition: opacity var(--duration-fast);
}

.col a:hover { opacity: 0.7; }
```

- [ ] **Step 2: Commit**

```bash
git add src/styles/global.css
git commit -m "feat: add three-column project styles using design tokens"
```

---

### Task 6: Add dispatches styles

**Files:**
- Modify: `src/styles/global.css`

**Prototype reference:** `gazette-v2.html:254-320` (dispatches section).

- [ ] **Step 1: Add dispatches styles**

Append to `src/styles/global.css`:

```css
/* ==========================================================================
   Dispatches
   ========================================================================== */

.dispatches {
  padding: var(--space-8) 0;
  border-bottom: var(--rule-thin) solid var(--ink);
}

.dispatches .section-head {
  font-family: var(--font-headline);
  font-size: var(--text-xl);
  font-weight: 900;
  text-align: center;
  margin-bottom: var(--space-1);
}

.dispatches .section-sub {
  text-align: center;
  font-style: italic;
  color: var(--muted);
  font-size: var(--text-sm);
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

.dispatch-item .dispatch-num {
  font-family: var(--font-headline);
  font-size: var(--text-2xl);
  font-weight: 900;
  color: var(--paper-dark);
  line-height: var(--leading-none);
  text-align: right;
}

.dispatch-item:hover .dispatch-num { color: var(--red); }

.dispatch-item h4 {
  font-family: var(--font-headline);
  font-size: var(--text-md);
  font-weight: 600;
  line-height: var(--leading-snug);
}

.dispatch-item .dispatch-tag {
  font-family: var(--font-mono);
  font-size: var(--text-2xs);
  text-transform: uppercase;
  letter-spacing: var(--tracking-md);
  color: var(--muted);
  white-space: nowrap;
}
```

- [ ] **Step 2: Commit**

```bash
git add src/styles/global.css
git commit -m "feat: add dispatches styles using design tokens"
```

---

### Task 7: Add classifieds and footer styles

**Files:**
- Modify: `src/styles/global.css`

**Prototype reference:** `gazette-v2.html:322-376` (classifieds + footer).

- [ ] **Step 1: Add classifieds styles**

Append to `src/styles/global.css`:

```css
/* ==========================================================================
   Classifieds
   ========================================================================== */

.classifieds {
  padding: var(--space-8) 0;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: var(--space-8);
  border-bottom: var(--rule-thin) solid var(--ink);
}

.classified-col h3 {
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

.classified-entry .cl-label {
  font-family: var(--font-mono);
  font-size: var(--text-xs);
  text-transform: uppercase;
  letter-spacing: var(--tracking-sm);
  color: var(--muted);
}

.classified-entry .cl-value {
  font-size: var(--text-sm);
  margin-top: var(--space-05);
}

.classified-entry .cl-value a {
  color: var(--red);
  text-decoration: none;
  border-bottom: var(--rule-thin) solid transparent;
  transition: border-color var(--duration-fast);
}

.classified-entry .cl-value a:hover { border-color: var(--red); }
```

- [ ] **Step 2: Add footer styles**

Append to `src/styles/global.css`:

```css
/* ==========================================================================
   Footer
   ========================================================================== */

.paper-footer {
  padding: var(--space-6) 0;
  text-align: center;
  font-family: var(--font-mono);
  font-size: var(--text-xs);
  color: var(--muted);
  letter-spacing: var(--tracking-sm);
  text-transform: uppercase;
}
```

- [ ] **Step 3: Commit**

```bash
git add src/styles/global.css
git commit -m "feat: add classifieds and footer styles using design tokens"
```

---

### Task 8: Add animations and responsive breakpoints

**Files:**
- Modify: `src/styles/global.css`

**Prototype reference:** `gazette-v2.html:378-397` (animations + responsive). Spec reference: breakpoint table in design spec.

- [ ] **Step 1: Add animation styles**

Append to `src/styles/global.css`:

```css
/* ==========================================================================
   Animations
   ========================================================================== */

.fade-in { opacity: 0; animation: fadeIn var(--duration-normal) ease forwards; }
@keyframes fadeIn { to { opacity: 1; } }
.d1 { animation-delay: 0.1s; }
.d2 { animation-delay: 0.2s; }
.d3 { animation-delay: 0.3s; }
.d4 { animation-delay: 0.4s; }
```

- [ ] **Step 2: Add responsive breakpoints**

The prototype had one breakpoint (860px). The spec adds 640px and 1024px. Append to `src/styles/global.css`:

```css
/* ==========================================================================
   Responsive Breakpoints
   Large desktop: 1024px (new)
   Tablet: 860px (from prototype)
   Mobile: 640px (new)
   ========================================================================== */

@media (max-width: 1024px) {
  .three-col {
    grid-template-columns: 1fr 1fr;
  }

  .col:nth-child(2) {
    border-right: none;
  }

  .col:nth-child(3) {
    padding-left: 0;
    border-top: var(--rule-thin) solid var(--paper-dark);
  }
}

@media (max-width: 860px) {
  .masthead h1 { font-size: var(--text-3xl); }

  .headline-section { grid-template-columns: 1fr; }

  .headline-main {
    border-right: none;
    padding-right: 0;
    border-bottom: var(--rule-thin) solid var(--ink);
  }

  .headline-sidebar { padding-left: 0; }

  .three-col { grid-template-columns: 1fr; }

  .col {
    border-right: none;
    padding: var(--space-6) 0;
    border-bottom: var(--rule-thin) solid var(--paper-dark);
  }

  .col:first-child { padding-left: 0; }
  .col:last-child { border-bottom: none; }

  .classifieds { grid-template-columns: 1fr; }

  .headline-main h2 { font-size: var(--text-2xl); }

  .dispatch-item { grid-template-columns: 40px 1fr; }
  .dispatch-item .dispatch-tag { display: none; }
}

@media (max-width: 640px) {
  .page { padding: 0 var(--space-4); }

  .masthead h1 { font-size: var(--text-2xl); }

  .nav-bar {
    gap: var(--space-4);
    flex-wrap: wrap;
  }
}
```

- [ ] **Step 3: Commit**

```bash
git add src/styles/global.css
git commit -m "feat: add animations and responsive breakpoints using design tokens"
```

---

### Task 9: Create verification page and visual comparison

**Files:**
- Create: `tests/visual-test.html`

This file uses the exact same HTML markup as `gazette-v2.html` but links to `global.css` instead of inline styles. Open both files in a browser side-by-side to verify visual parity.

- [ ] **Step 1: Create the test HTML**

Create `tests/visual-test.html` — copy the `<body>` content from `gazette-v2.html` verbatim, but replace the inline `<style>` block with a `<link>` to `global.css`:

```html
<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>The Foster Gazette — Visual Test</title>
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400..900;1,400..900&family=Source+Serif+4:ital,opsz,wght@0,8..60,300..700;1,8..60,300..700&family=Courier+Prime:ital@0;1&display=swap" rel="stylesheet">
<link rel="stylesheet" href="../src/styles/global.css">
</head>
<body>
<div class="page">

  <!-- MASTHEAD -->
  <header class="masthead fade-in">
    <div class="dateline">Gainesville, Florida &middot; Est. 2023 &middot; Published Irregularly</div>
    <h1>The Foster Gazette</h1>
  </header>

  <nav class="nav-bar fade-in d1">
    <a href="#work">Work</a>
    <a href="#dispatches">Dispatches</a>
    <a href="#projects">Projects</a>
    <a href="#classifieds">Classifieds</a>
    <a href="mailto:jonah@jonahfoster.com">Letters to the Editor</a>
  </nav>

  <!-- HEADLINE -->
  <section class="headline-section fade-in d2" id="work">
    <div class="headline-main">
      <div class="kicker">Profile</div>
      <h2>Local Man Builds Things for the Internet, Seems to Enjoy It</h2>
      <div class="byline">By Jonah Foster &middot; Ongoing</div>
      <p class="lede">Somewhere between shipping features at an accounting software startup and running a scrappy web design agency, Jonah Foster has managed to convince a small but growing number of people that he knows what he's doing. Sources close to the subject describe him as "a frontend engineer who can't stop having opinions about the product," and also "pretty good at SEO for some reason." He lives in Florida with his wife and a deeply indifferent cat. The investigation continues.</p>
    </div>
    <aside class="headline-sidebar">
      <div class="sidebar-item">
        <div class="sidebar-kicker">Day Job</div>
        <h3>Frontend Engineer at COUNT</h3>
        <p>Building accounting software. Shipping features, fixing bugs, and occasionally asking "but why" in meetings.</p>
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

  <!-- THREE COLUMNS: PROJECTS -->
  <section class="three-col fade-in d3" id="projects">
    <div class="col">
      <div class="col-head">SaaS &middot; Featured</div>
      <h3>COUNT — Accounting Software</h3>
      <p>Frontend engineering and product thinking for a growing accounting platform. Building the interfaces people use to manage their books, track expenses, and close the month without losing their minds.</p>
      <a href="https://getcount.com">Visit &rarr;</a>
    </div>
    <div class="col">
      <div class="col-head">My Own Thing &middot; Featured</div>
      <h3>GNV Web Design</h3>
      <p>Websites and SEO for small businesses. I design, build, and optimize sites for people who deserve a better web presence than what they've got.</p>
      <a href="https://gnvwebdesign.com">Visit &rarr;</a>
    </div>
    <div class="col">
      <div class="col-head">Side Project &middot; Archived</div>
      <h3>College Baseball Stats</h3>
      <p>Every college baseball player's stats since 2020. React, Firebase, and a Python scraper. My first full-stack project and still alive somehow.</p>
      <a href="#">Visit &rarr;</a>
    </div>
  </section>

  <!-- DISPATCHES -->
  <section class="dispatches fade-in d4" id="dispatches">
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

  <!-- CLASSIFIEDS -->
  <section class="classifieds" id="classifieds">
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

  <footer class="paper-footer">
    &copy; 2026 The Foster Gazette &middot; Pulitzer pending &middot; Printed with Astro & good intentions
  </footer>

</div>
</body>
</html>
```

- [ ] **Step 2: Open both files in a browser and compare**

Run: `open gazette-v2.html tests/visual-test.html`

Compare both tabs at full width (>1024px). Check:
- Masthead: title size, dateline spacing, bottom rule
- Nav bar: link spacing, padding, rule
- Headline: column widths, kicker color, drop cap size/color, sidebar items
- Three columns: vertical rules, col-head borders, link styles
- Dispatches: number sizing, hover states, tag alignment
- Classifieds: two-column layout, label/value spacing
- Footer: centered, muted text

Resize to tablet (860px) and mobile (640px) to check responsive behavior.

- [ ] **Step 3: Verify zero magic numbers in component styles**

Run: `grep -nE '[0-9]+(\.[0-9]+)?(px|rem|em)' src/styles/global.css | grep -v 'var(--' | grep -v '^\s*--' | grep -v '/\*' | grep -v 'data:image'`

Expected: Only lines with intentional literal values per spec:
- `min-height: 380px` (headline section)
- `max-width: 580px` (lede)
- `grid-template-columns: 80px 1fr auto` (dispatch item)
- `grid-template-columns: 40px 1fr` (dispatch item mobile)
- `opacity: 0.7` (col link hover)
- `opacity: 0.03` (in the SVG data URI)
- Animation delay values: `0.1s`, `0.2s`, `0.3s`, `0.4s`

Any other matches indicate a missed token migration.

- [ ] **Step 4: Commit**

```bash
git add tests/visual-test.html
git commit -m "feat: add visual test page for design system verification"
```
