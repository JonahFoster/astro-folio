# Design System Spec — The Foster Gazette

A flat CSS custom property system providing consistent spacing, typography, color, layout, and border tokens for the entire site. Replaces ~50+ magic values from `gazette-v2.html` with 52 named tokens.

## Approach

Flat custom properties in `:root`. No utility classes, no semantic alias layer. Components reference tokens directly (e.g., `padding: var(--space-4)`). New pages draw from the same token set.

All values are `rem` (spacing and type both scale with user font-size preferences). Breakpoints are documented constants used directly in `@media` rules since CSS custom properties cannot be used in media queries.

**What is not tokenized (intentionally):** Component-specific dimensional values like grid column widths (`80px` dispatch number column, `40px` mobile variant), element max-widths (`580px` lede), and min-heights (`380px` headline section) are left as literal values in component CSS. These are layout-specific, not reusable across components. The color `white` (used only in `::selection`) is also left literal.

## Font Families

3 tokens. Carried over from the prototype unchanged — these define the newspaper's typographic identity.

| Token | Value | Role |
|-------|-------|------|
| `--font-headline` | `'Playfair Display', Georgia, serif` | Headlines, mastheads, drop caps, dispatch numbers |
| `--font-body` | `'Source Serif 4', Georgia, serif` | Body text, descriptions, lede |
| `--font-mono` | `'Courier Prime', 'Courier New', monospace` | Kickers, labels, nav, bylines, UI elements |

## Spacing Scale

14 steps. Linear 0.25rem increments up to 1rem, then larger jumps.

| Token | Value | px (at 16px base) | Prototype values consolidated |
|-------|-------|--------------------|-------------------------------|
| `--space-0` | `0` | 0 | 0 |
| `--space-px` | `1px` | 1 | Micro spacing offsets only (not for border widths — use rule tokens) |
| `--space-05` | `0.125rem` | 2 | 0.1, 0.12, 0.15rem |
| `--space-1` | `0.25rem` | 4 | 0.25, 0.3rem |
| `--space-15` | `0.375rem` | 6 | 0.4rem |
| `--space-2` | `0.5rem` | 8 | 0.5rem |
| `--space-25` | `0.625rem` | 10 | 0.6rem |
| `--space-3` | `0.75rem` | 12 | 0.7, 0.75, 0.8rem (as padding/margin/gap values) |
| `--space-4` | `1rem` | 16 | 1rem |
| `--space-5` | `1.25rem` | 20 | 1.2rem |
| `--space-6` | `1.5rem` | 24 | 1.5rem |
| `--space-7` | `1.75rem` | 28 | 1.8rem |
| `--space-8` | `2rem` | 32 | 2rem |
| `--space-10` | `2.5rem` | 40 | 2.5rem |

Maximum drift from prototype: 0.05rem (~0.8px).

## Type Scale

11 steps. Consolidates 17 prototype font sizes.

| Token | Value | Usage |
|-------|-------|-------|
| `--text-2xs` | `0.65rem` | Tiny mono labels (sidebar kickers, col heads, dispatch tags) |
| `--text-xs` | `0.75rem` | Mono labels, nav links, byline, dateline |
| `--text-sm` | `0.875rem` | Small body text (sidebar descriptions, col body, classified values) |
| `--text-base` | `1rem` | Standard body text |
| `--text-md` | `1.05rem` | Dispatch item titles |
| `--text-lg` | `1.125rem` | Emphasized body, subheadings (lede, sidebar h3, col h3, classified h3) |
| `--text-xl` | `1.4rem` | Section headers (dispatches heading) |
| `--text-2xl` | `2rem` | Dispatch numbers |
| `--text-3xl` | `2.8rem` | Article headline, responsive masthead |
| `--text-4xl` | `3.8rem` | Drop cap |
| `--text-5xl` | `4.5rem` | Masthead title |

Key consolidations:
- 0.7, 0.72, 0.75rem all become `--text-xs` (0.75rem)
- 0.85, 0.88, 0.9, 0.92rem all become `--text-sm` (0.875rem)
- 1.1, 1.15, 1.2rem become `--text-lg` (1.125rem)
- 1.05rem gets its own step (`--text-md`) to preserve the visual hierarchy between dispatch item titles and column headings

## Letter-Spacing

4 tokens replacing 6 prototype values (4 positive, 2 negative).

| Token | Value | Usage |
|-------|-------|-------|
| `--tracking-neg` | `-0.02em` | Masthead title, article headline (consolidates -0.02 and -0.015) |
| `--tracking-sm` | `0.08em` | Byline, classified labels, footer |
| `--tracking-md` | `0.1em` | Nav links, col links, dispatch tags, dateline, sidebar kickers |
| `--tracking-lg` | `0.15em` | Kickers, col heads |

Prototype's `0.12em` snaps to `--tracking-md` (0.1em). Prototype's `-0.015em` snaps to `--tracking-neg` (-0.02em).

## Line-Height

7 tokens. No consolidation — each serves a distinct typographic role.

| Token | Value | Usage |
|-------|-------|-------|
| `--leading-compressed` | `0.75` | Drop cap only |
| `--leading-none` | `1` | Masthead title |
| `--leading-tight` | `1.1` | Article headline |
| `--leading-snug` | `1.3` | Subheadings (sidebar h3, col h3, dispatch h4) |
| `--leading-normal` | `1.5` | Secondary text (sidebar p) |
| `--leading-relaxed` | `1.6` | Body default, col p |
| `--leading-loose` | `1.7` | Lede paragraph |

## Colors

5 tokens. Dropped `--rule` (was identical to `--ink`).

| Token | Value | Usage |
|-------|-------|-------|
| `--ink` | `#1a1714` | Primary text, border/rule color |
| `--paper` | `#F5F0E8` | Page background |
| `--paper-dark` | `#EBE4D6` | Hover states, secondary backgrounds, subtle internal dividers |
| `--red` | `#C41E1E` | Kickers, link hovers, dispatch numbers on hover, drop cap |
| `--muted` | `#6B6358` | Secondary text |

## Transitions

2 tokens. The prototype uses `0.2s` for all four transition properties (color, background, border-color, opacity) and `0.8s` for the page-load fade-in animation. All transitions use the CSS default `ease` timing function — no custom easing token is needed.

| Token | Value | Usage |
|-------|-------|-------|
| `--duration-fast` | `0.2s` | Hover transitions (color, background, border-color, opacity) |
| `--duration-normal` | `0.8s` | Page-load fade-in animation |

Animation stagger delays (0.1s, 0.2s, 0.3s, 0.4s) are left as literal values on per-component animation-delay declarations — they are sequential offsets, not a reusable timing value.

## Layout

| Token | Value | Notes |
|-------|-------|-------|
| `--page-max-width` | `75rem` | 1200px page container |
| `--page-gutter` | `2rem` | Horizontal page padding |
| `--sidebar-width` | `21.25rem` | 340px headline sidebar |

## Breakpoints

Constants used directly in `@media` rules (CSS custom properties cannot be used in media queries).

The prototype has a single breakpoint at `860px`. The `640px` and `1024px` breakpoints are **new additions** for the Astro build to provide finer control across the full site's page types.

| Name | Value | Behavior |
|------|-------|----------|
| Small (mobile) | `640px` | **New.** Single column. Masthead shrinks. Dispatch grid loses tag column. Page gutter tightens to `var(--space-4)`. |
| Medium (tablet) | `860px` | Single column for main content. Classifieds can go side-by-side. Matches existing prototype breakpoint. |
| Large (desktop) | `1024px` | **New.** Intermediate step. Headline goes two-column. Three-col projects may stack as 2+1. |
| Full | Above `1024px` | Full layout as prototype — headline + sidebar, three project columns, everything at full width. |

## Rules & Borders

3 border-width tokens. These are for `border-width` declarations only — do not use `--space-px` for borders.

| Token | Value | Usage |
|-------|-------|-------|
| `--rule-thin` | `1px` | Section dividers, column rules, nav borders |
| `--rule-thick` | `3px` | Heavy emphasis rule |
| `--rule-accent` | `2px` | Col-head bottom borders, classified h3 bottom borders |

Usage pattern: `border-bottom: var(--rule-thin) solid var(--ink)` for structural rules, `border-bottom: var(--rule-thin) solid var(--paper-dark)` for subtle internal dividers.

## Token Summary

| Category | Count |
|----------|-------|
| Font families | 3 |
| Spacing | 14 |
| Type sizes | 11 |
| Letter-spacing | 4 |
| Line-height | 7 |
| Colors | 5 |
| Transitions | 2 |
| Layout | 3 |
| Rules | 3 |
| **Total** | **52** |

## Migration Reference

When converting `gazette-v2.html` to Astro components, each tokenizable value maps to exactly one token. The full mapping is defined in the tables above.

The prototype's `--rule` custom property is removed (it was identical to `--ink`). Replace all `var(--rule)` references with `var(--ink)`.

Values intentionally left as literals (not tokenized):
- Component-specific grid column widths: `80px` (dispatch number column), `40px` (mobile variant)
- Component-specific max-widths: `580px` (lede paragraph)
- Component-specific min-heights: `380px` (headline section)
- Font weights: `600`, `700`, `900` — small set of standard values, self-documenting
- One-off color: `white` (used only in `::selection`)
- One-off opacity: `0.7` (used only on `.col a:hover`)
- Animation stagger delays: `0.1s`, `0.2s`, `0.3s`, `0.4s`
