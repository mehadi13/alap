<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

# Mandatory ALAP UI Color System Guidelines

When writing or modifying any UI component, page, layout, or style in this project, you MUST adhere to the official ALAP color tokens below:

| Token Name | Light Mode | Dark Mode | Class / Utility | Purpose |
| :--- | :--- | :--- | :--- | :--- |
| **Background** | `#FFFFFF` | `#0A0A0A` | `bg-background` | Main page background |
| **Foreground** | `#111111` | `#F5F5F5` | `text-foreground` | Primary text & headings |
| **Card** | `#F8F8F8` | `#141414` | `bg-card` | Cards / section surfaces |
| **Card Foreground** | `#111111` | `#F5F5F5` | `text-card-foreground` | Card titles & text |
| **Muted** | `#F3F3F3` | `#1C1C1C` | `bg-muted` | Secondary surfaces / pills |
| **Muted Text** | `#6B6B6B` | `#A3A3A3` | `text-muted-foreground` | Subtext & descriptions |
| **Border** | `#E5E5E5` | `#292929` | `border-border` | Borders & dividers |
| **Primary** | `#111111` | `#FFFFFF` | `bg-primary text-primary-foreground` | Main action buttons |
| **Accent** | `#5B5CE2` | `#7C7EF2` | `bg-accent` / `.bg-accent-gradient` | Brand CTA buttons, active rings, icons |
| **Accent Hover** | `#4B4CCB` | `#9294FF` | `hover:bg-accent-hover` | Hover state |

- Always use dynamic semantic utilities (`bg-background`, `text-foreground`, `bg-card`, `border-border`, `text-muted-foreground`) rather than hardcoding static color values.
- Do not introduce alternative dark mode palette themes.
