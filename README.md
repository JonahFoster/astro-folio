# The Foster Gazette — jonahfoster.com

Personal brand / thought leadership site for Jonah Foster, built as a fictional newspaper called **The Foster Gazette**. The entire site uses a broadsheet newspaper metaphor — sections are "columns," blog posts are "dispatches," the contact page is "Letters to the Editor," the about section is "Classifieds," etc.

## Concept

This is NOT a portfolio site or a resume. It's a personal brand platform with a built-in content framework. The newspaper conceit gives every page type a natural name and structure without feeling forced. The tone is warm, funny, and self-aware — never try-hard. Jonah is a funny guy and the humor should feel effortless.

The flagship example of the tone: the main headline reads **"Local Man Builds Things for the Internet, Seems to Enjoy It"** and the bio is written in third person like a newspaper profile. The footer says "Pulitzer pending."

## Tech Stack

- **Framework:** Astro
- **Blog/Content:** Astro Content Collections with MDX
- **Styling:** Custom CSS (no framework — the newspaper aesthetic requires precise typographic control)
- **Fonts:** Playfair Display (headlines), Source Serif 4 (body), Courier Prime (labels/kickers/datelines)
- **Deployment:** Netlify

## Design System

### Colors
- `--ink: #1a1714` — primary text, rules
- `--paper: #F5F0E8` — background (warm cream, not white)
- `--paper-dark: #EBE4D6` — secondary backgrounds, hover states
- `--red: #C41E1E` — accent color, used sparingly for kickers and links
- `--muted: #6B6358` — secondary text

### Typography
- **Headlines:** Playfair Display, 900 weight. Big, bold, serif. The soul of the newspaper look.
- **Body:** Source Serif 4, 400 weight. Readable, warm, literary.
- **Labels/UI:** Courier Prime, uppercase, letterspaced. Used for kickers ("PROFILE," "DAY JOB"), nav items, datelines, classified labels, and bylines.

### Layout Patterns
- **Multi-column grids** separated by 1px ink-colored vertical rules (like newspaper columns)
- **Horizontal rules** (1px solid) to separate sections
- **Drop caps** on the lede paragraph (first letter is Playfair Display, 3.8rem, red)
- **Subtle paper texture** via an inline SVG noise filter on the body background

### Design Principles
- No rounded corners, no cards with shadows, no gradients. This is a newspaper — flat, ruled, typographic.
- Red accent is used ONLY for kickers, link hovers, dispatch numbers on hover, and the drop cap. Never decorative.
- Spacing should feel tight and editorial, not airy SaaS-style.
- Hover states are subtle — text indents, color shifts, no transforms or scale effects.

## Site Structure

### Pages

```
/                   → Homepage (the "front page")
/dispatches         → Blog listing (all dispatches)
/dispatches/[slug]  → Individual blog post
/projects           → Projects page (expanded from homepage)
/about              → About page (includes Classifieds section)
/contact            → "Letters to the Editor" — contact form
```

### Homepage Sections (in order)
1. **Masthead** — dateline ("Gainesville, Florida · Est. 2023 · Published Irregularly"), "The Foster Gazette" in large Playfair Display
2. **Nav bar** — centered mono links between two horizontal rules
3. **Headline section** — two-column: main profile article (left, ~70%) + sidebar items (right, ~30%) separated by vertical rule
4. **Three-column projects** — three equal columns separated by vertical rules, each with a kicker label, title, description, and link
5. **Dispatches** — centered section header, list of blog post links with large dispatch numbers (01, 02, etc.) and category tags
6. **Classifieds** — two-column grid: "Personnel File" (left) and "Where to Find Me" (right)
7. **Footer** — centered, mono, includes "Pulitzer pending"

### Nav Items
- Dispatches
- Projects
- About
- Contact (labeled "Letters to the Editor")

## Content & Tone Guide

### About Jonah (for writing copy)
- **Day job:** Frontend Engineer at COUNT (getcount.com) — an accounting software startup. He builds the frontend and has been stepping into product thinking. Do NOT call it payroll software. Do NOT mention specific internal tools (Rollfi, Linear tickets, etc.).
- **His own thing:** GNV Web Design (gnvwebdesign.com) — a web design and SEO agency. It's just him and the occasional freelancer. OK to call it an "agency" — don't call it a "side business" or "side hustle." Don't mention specific client names or client counts.
- **Education:** University of Florida, B.A. in History
- **Location:** Lives in Florida (not Gainesville specifically in body copy; Gainesville is fine in the masthead dateline since that's where the "paper" is published)
- **Personal:** Married to Ezma. Has a cat. Into coffee, college baseball, history (ties to his degree). Reads a lot — currently Making Things Happen by Scott Berkun and War and Peace.
- **Tech stack:** Astro, Tailwind, React, Node.js. Also into SEO, Product Strategy, AI Automation, Webflow.

### Tone Rules
- Third person for the profile/lede section. First person is fine elsewhere (dispatches, project descriptions).
- Funny but not jokey. The humor comes from the framing (newspaper metaphor) and dry observations, not from punchlines.
- Confident but not braggy. "Managed to convince a small but growing number of people that he knows what he's doing" — that's the register.
- Never mention specific internal work details (bug ticket numbers, API names, coworker names, internal processes).
- Don't mention personal AI-powered tools or side projects (like the SEO audit engine) unless Jonah specifically wants to feature them.

### Newspaper Voice Conventions
- Kickers are uppercase mono: PROFILE, DAY JOB, MY OWN THING, CURRENTLY READING, etc.
- Bylines: "By Jonah Foster · Ongoing" or "By Jonah Foster · March 2026"
- Blog posts are called "dispatches"
- Categories/tags are displayed in uppercase mono
- Section headers use Playfair Display, centered when standalone

## File Structure (planned)

```
src/
├── layouts/
│   ├── BaseLayout.astro        # HTML head, fonts, global styles
│   └── DispatchLayout.astro    # Blog post layout with newspaper article styling
├── pages/
│   ├── index.astro             # Homepage / front page
│   ├── dispatches/
│   │   └── index.astro         # Dispatch listing
│   ├── projects.astro
│   ├── about.astro
│   └── contact.astro
├── components/
│   ├── Masthead.astro
│   ├── NavBar.astro
│   ├── HeadlineSection.astro
│   ├── ProjectColumns.astro
│   ├── DispatchList.astro
│   ├── Classifieds.astro
│   └── Footer.astro
├── content/
│   └── dispatches/             # MDX blog posts
│       └── *.mdx
├── styles/
│   └── global.css              # All CSS (design system + component styles)
└── assets/
```

## Reference

The homepage HTML prototype is `gazette-v2.html` — this is the source of truth for the design. All CSS, layout, typography, and content decisions are finalized there. Build the Astro project to match it exactly, then extend for additional pages.
