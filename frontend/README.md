# ALAP (আলাপ) — Business Automation & Digital Solutions

Production-ready marketing and consultation web application for **ALAP**.

## Tech Stack

* **Framework:** Next.js 16 (App Router) & React 19
* **Language:** TypeScript (Strict Mode)
* **Styling:** Tailwind CSS v4, `clsx`, `tailwind-merge`
* **Components:** shadcn/ui foundation, Lucide Icons
* **Forms & Validation:** React Hook Form, Zod
* **Integrations:** Discord Webhook (Consultation Submissions), Vercel Analytics
* **Localization:** next-intl (`/en`, `/bn`)
* **Theming:** next-themes (Light / Dark / System)

---

## Official ALAP Color System & UI Guidelines

All UI components, pages, and features **must strictly adhere** to the official color tokens defined below:

| Token Name | Light Mode | Dark Mode | Tailwind Class / CSS Variable | Purpose |
| :--- | :--- | :--- | :--- | :--- |
| **Background** | `#FFFFFF` | `#0A0A0A` | `bg-background` (`--background`) | Main page background |
| **Foreground** | `#111111` | `#F5F5F5` | `text-foreground` (`--foreground`) | Primary headings & body text |
| **Card** | `#F8F8F8` | `#141414` | `bg-card` (`--card`) | Cards, containers & sections |
| **Card Foreground** | `#111111` | `#F5F5F5` | `text-card-foreground` | Card titles & text |
| **Muted** | `#F3F3F3` | `#1C1C1C` | `bg-muted` (`--muted`) | Secondary surfaces & pill containers |
| **Muted Text** | `#6B6B6B` | `#A3A3A3` | `text-muted-foreground` | Subtext, descriptions, placeholders |
| **Border** | `#E5E5E5` | `#292929` | `border-border` (`--border`) | Dividers, card & input borders |
| **Primary Button** | `#111111` | `#FFFFFF` | `bg-primary text-primary-foreground` | Default primary action buttons |
| **Accent** | `#5B5CE2` | `#7C7EF2` | `bg-accent` / `.bg-accent-gradient` | Brand CTA buttons, active rings, icons |
| **Accent Hover** | `#4B4CCB` | `#9294FF` | `hover:bg-accent-hover` | Hover state for accent buttons & links |

### Frontend UI Development Rules
1. **Always use semantic token utilities** (`bg-background`, `text-foreground`, `bg-card`, `border-border`, `text-muted-foreground`) instead of hardcoding static color values in React component classes.
2. **Tailwind CSS v4 Dark Variant**: `globals.css` includes `@variant dark (&:where(.dark, .dark *));`. Toggle class `.dark` on `<html>` seamlessly updates all `--background`, `--card`, and `--border` values document-wide.

---

## Directory Architecture

```text
src/
├── app/                  # Next.js App Router pages and layouts
├── components/           # UI and layout components
│   ├── ui/               # Primitive shadcn/ui design components
│   ├── layout/           # Header, Navbar, Footer, MobileNav
│   ├── marketing/        # Hero, Solutions, HowItWorks, Features
│   └── shared/           # LanguageSwitcher, ThemeToggle
├── features/             # Feature-specific modules
│   ├── services/         # Service catalog logic
│   ├── consultation/     # Consultation modal & Discord webhook form
│   └── contact/          # Contact page components
├── config/               # Site configuration and navigation metadata
├── hooks/                # Custom React hooks
├── i18n/                 # Localization configuration
├── lib/                  # Utilities (cn, formatting helpers)
├── messages/             # i18n dictionaries (en.json, bn.json)
└── types/                # TypeScript declarations
```

---

## Development Setup

### Prerequisites

* Node.js `v20+` or `v24+`
* npm `v10+`

### Installation

```bash
npm install
```

### Environment Variables

Copy `.env.example` to `.env.local`:

```bash
cp .env.example .env.local
```

Configure your Discord Webhook URL for lead notifications:
`DISCORD_WEBHOOK_URL=https://discord.com/api/webhooks/...`

### Running Locally

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## Scripts

* `npm run dev` — Starts the development server.
* `npm run build` — Builds the application for production.
* `npm run start` — Starts the production build server.
* `npm run lint` — Runs ESLint checks across the codebase.

---

## Sprint Status

- [x] **Sprint 1 — Project Foundation** (Complete)
- [x] **Sprint 2 — Brand & Design System** (Complete)
- [ ] **Sprint 3 — Core Marketing Pages** (Next)
- [ ] **Sprint 4 — Services & Conversion Flow**
- [ ] **Sprint 5 — Localization & Theme**
- [ ] **Sprint 6 — SEO, Accessibility & Performance**
- [ ] **Sprint 7 — Testing & Production Launch**
