# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Status

This project is in **pre-implementation**. The Astro project has not been scaffolded yet. Currently the repo contains:
- `README.md` — full spec (design system, site structure, tone guide, content rules)
- `gazette-v2.html` — **source of truth** for the homepage design. All CSS, layout, typography, and content decisions are finalized there. The Astro build must match it exactly.

## What This Is

A personal brand site for Jonah Foster built as a fictional broadsheet newspaper called **The Foster Gazette**. Every page type maps to a newspaper concept: blog posts are "dispatches," contact is "Letters to the Editor," about section is "Classifieds," etc.

## Planned Tech Stack

- **Framework:** Astro
- **Content:** Astro Content Collections with MDX (for dispatches/blog posts)
- **Styling:** Custom CSS only — no CSS framework. The newspaper aesthetic requires precise typographic control.
- **Fonts:** Playfair Display (headlines, 900), Source Serif 4 (body, 400), Courier Prime (labels/kickers/UI)
- **Deployment:** Netlify

## Design Rules (Critical)

- No rounded corners, no cards with shadows, no gradients — flat, ruled, typographic newspaper style
- Red accent (`#C41E1E`) used ONLY for: kickers, link hovers, dispatch numbers on hover, drop caps. Never decorative.
- Columns separated by 1px vertical rules, sections by horizontal rules
- Spacing is tight and editorial, not airy SaaS-style
- Hover states are subtle — text indents, color shifts, no transforms/scale
- Drop cap on lede paragraph: Playfair Display, 3.8rem, red, floated left

## Content & Tone Rules

- Profile/lede section written in third person; first person OK elsewhere
- Humor is dry and comes from the newspaper framing, never forced
- COUNT is "accounting software" — never call it payroll software
- GNV Web Design is an "agency" — never "side business" or "side hustle"
- Never mention specific internal work details, client names, or coworker names
- Don't mention personal AI tools/side projects unless Jonah specifically requests it

## Site Routes

```
/                   → Homepage (front page)
/dispatches         → Blog listing
/dispatches/[slug]  → Individual dispatch (blog post)
/projects           → Projects page
/about              → About page (includes Classifieds)
/contact            → "Letters to the Editor" (contact form)
```
