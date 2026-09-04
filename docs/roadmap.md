# ALAP — Phase 1 & 2 Task List & Implementation Status

> **Status Update (September 2026)**: Phase 1 Marketing Website Foundation, Full Bangla/English i18n, Spring Boot Backend REST Service, and Separate Client Management FE App (`client-app`) are **Completed & Build Verified**.

## Current Implementation Overview

| Module | Location | Tech Stack | Status |
| :--- | :--- | :--- | :--- |
| **Public Frontend** | `d:\alap\frontend` | Next.js 16.3, React 19, Tailwind v4, `@xyflow/react`, `LanguageContext` | **Completed** (Port 3000) |
| **Client Management FE** | `d:\alap\client-app` | Next.js 16.3, React 19, Tailwind v4, Lucide Icons | **Completed** (Port 3001) |
| **Backend REST API** | `d:\alap\backend` | Spring Boot 3.4.3, Java 21 Records, Discord Webhook Service | **Completed** (Port 8080) |
| **Documentation** | `d:\alap\docs` | GFM Markdown (`purpose.md`, `roadmap.md`, `README.md`) | **Up-to-Date** |

---

# 1. Phase Objective

Create a premium, trustworthy, bilingual marketing website for **ALAP (আলাপ)** positioned as a:

> **Business Automation & Digital Solutions Company**

The website must clearly communicate:

\* What ALAP does

\* Who ALAP helps

\* What problems ALAP solves

\* What services are available

\* How the ALAP process works

\* Why businesses should work with ALAP

\* How to start a conversation

The website should drive users toward one primary action:

> \*\*Talk to ALAP\*\*

\---

\# 2. Phase Scope

\## In Scope

\* Brand foundation

\* Design system

\* Website architecture

\* Next.js application setup

\* Responsive UI

\* Marketing pages

\* Service catalog presentation

\* Bangla/English localization

\* Light/Dark/System themes

\* SEO foundation

\* Accessibility foundation

\* Contact/consultation CTA

\* Basic form UI

\* Deployment

\* Analytics-ready architecture

\## Out of Scope

The following belong to later phases:

\* User registration

\* Client dashboard

\* Authentication

\* Service requests backend

\* Meeting management backend

\* Requirements management

\* Proposal management

\* Project management

\* Payments

\* AI requirement assistant

\* Customer portal

\* Admin dashboard

- Full CRM

The Phase 1 website may contain placeholder/demo interactions for future functionality, but must not pretend that unavailable functionality is operational.

---

# 3. Technology Stack

## Frontend

- Next.js (App Router)
- TypeScript
- Tailwind CSS
- shadcn/ui
- Lucide Icons
- TanStack Query where API interaction is required
- React Hook Form
- Zod
- next-intl (Standard Next.js sub-path locale routing: `/en`, `/bn`)
- next-themes

## Backend & Integrations

- Spring Boot 4.
- Discord Webhook integration for consultation and contact form submissions
- Vercel Analytics (standard free analytics tier)

## Deployment

Preferred:

- Vercel for initial launch

Alternative:

- VPS
- Docker
- Nginx/Traefik

## Code Quality

- ESLint
- Prettier
- TypeScript strict mode
- Git
- Automated build verification

---

# 4. Sprint Structure

Phase 1 should be completed through the following sprints:

```text
Sprint 1
Project Foundation
        ↓
Sprint 2
Brand & Design System
        ↓
Sprint 3
Core Marketing Pages
        ↓
Sprint 4
Services & Conversion Flow
        ↓
Sprint 5
Localization & Theme
        ↓
Sprint 6
SEO, Accessibility & Performance
        ↓
Sprint 7
Testing & Production Launch
```

---

# Sprint 1 — Project Foundation

## Objective

Create a clean, scalable Next.js frontend foundation.

### Tasks

- [ ] Initialize Next.js project

- [ ] Configure TypeScript

- [ ] Configure Tailwind CSS

- [ ] Configure shadcn/ui

- [ ] Configure ESLint

- [ ] Configure Prettier

- [ ] Enable strict TypeScript

- [ ] Configure path aliases

- [ ] Configure environment variables

- [ ] Configure Git repository

- [ ] Create development README

- [ ] Create `.env.example`

- [ ] Configure production build

- [ ] Verify local development

- [ ] Verify production build

### Recommended structure

```text
src/
├── app/
├── components/
│   ├── ui/
│   ├── layout/
│   ├── marketing/
│   └── shared/
├── features/
│   ├── services/
│   ├── consultation/
│   └── contact/
├── lib/
├── hooks/
├── config/
├── i18n/
├── messages/
└── types/
```

### Acceptance Criteria

- Application starts successfully
- Production build succeeds
- TypeScript has no errors
- ESLint passes
- Tailwind works
- shadcn/ui components work
- Repository contains documentation
- Environment configuration is documented

---

# Sprint 2 — Brand Foundation

## Objective

Establish a consistent ALAP visual identity.

## Brand Name

Primary:

**আলাপ**

English:

**ALAP**

Use the two forms consistently according to the selected language.

## Official ALAP Color System

| Token Name | Light Mode | Dark Mode | Purpose |
| :--- | :--- | :--- | :--- |
| **Background** | `#FFFFFF` | `#0A0A0A` | Main page background |
| **Foreground** | `#111111` | `#F5F5F5` | Primary text & headings |
| **Card** | `#F8F8F8` | `#141414` | Card & section surfaces |
| **Card Foreground** | `#111111` | `#F5F5F5` | Card titles & text |
| **Muted** | `#F3F3F3` | `#1C1C1C` | Secondary surfaces / pills |
| **Muted Text** | `#6B6B6B` | `#A3A3A3` | Secondary text & descriptions |
| **Border** | `#E5E5E5` | `#292929` | Borders & dividers |
| **Primary** | `#111111` | `#FFFFFF` | Main buttons |
| **Primary Text** | `#FFFFFF` | `#111111` | Button label text |
| **Accent** | `#5B5CE2` | `#7C7EF2` | Brand accent (Indigo-Blue) |
| **Accent Hover** | `#4B4CCB` | `#9294FF` | Hover state |

---


## Tasks

- [ ] Define primary logo usage (AI proposal + review)

- [ ] Define logo sizing rules

- [ ] Define favicon

- [ ] Define typography

- [ ] Define heading hierarchy

- [ ] Define body typography

- [ ] Define color palette (AI proposal + review)

- [ ] Define spacing system

- [ ] Define border-radius system

- [ ] Define shadow/elevation system

- [ ] Define button styles

- [ ] Define card styles

- [ ] Define form styles

- [ ] Define navigation styles

- [ ] Define responsive breakpoints

- [ ] Define animation principles

---

# 5. Brand Personality

ALAP should feel:

- Intelligent
- Trustworthy
- Modern
- Human
- Professional
- Helpful
- Practical
- Premium
- Simple

Avoid making the brand feel:

- Overly corporate
- Cheap
- Generic IT outsourcing
- Overly futuristic
- AI-hype driven
- Technically intimidating

---

# 6. Design Direction

The visual language should be:

> **Premium technology company + human consulting experience**

Use an Apple-inspired level of polish, whitespace, typography, and product storytelling, but do **not** copy Apple's layouts, branding, or visual assets.

### Design principles

- Large typography
- Generous whitespace
- Strong visual hierarchy
- Minimal navigation
- High-quality cards
- Subtle gradients where appropriate
- Restrained animation
- Smooth transitions
- Strong CTA hierarchy
- Excellent mobile experience

---

# Sprint 3 — Core Marketing Pages

## Objective

Build the primary public website.

---

# 7. Global Navigation

Desktop navigation:

```text
ALAP

Solutions
How It Works
About
Resources

[Talk to ALAP]
```

Language:

```text
বাংলা | EN
```

Theme:

```text
Light | Dark | System
```

Mobile navigation should use a polished responsive menu.

---

# 8. Homepage

## Section 1 — Hero

Primary headline:

> **Tell us what takes too much time. We'll turn it into a digital solution.**

Supporting message:

> ALAP helps businesses automate repetitive work, improve customer experiences, connect systems, and build practical digital solutions.

Primary CTA:

> **Talk to ALAP**

Secondary CTA:

> **Explore Solutions**

---

## Section 2 — Problem

Explain common business problems.

Examples:

- Too much manual work
- Repetitive customer questions
- Data copied between systems
- Employees spending hours on reports
- Orders processed manually
- Disconnected tools
- Processes depending on spreadsheets

Headline:

> **Your business has problems. Technology should solve them—not create more.**

---

## Section 3 — Solutions

Display the primary solution categories.

### Customer Support Automation

Automate repetitive customer interactions and connect customers to the right people.

### Sales Automation

Capture, qualify, route, and follow up with leads automatically.

### E-commerce Automation

Connect orders, inventory, customers, notifications, and business workflows.

### Office Workflow Automation

Replace repetitive manual processes with structured digital workflows.

### AI Business Solutions

Use AI where it creates measurable business value.

### Custom Digital Solutions

Build websites, applications, integrations, and business software when an off-the-shelf solution isn't enough.

CTA:

> **Explore All Solutions**

---

# 9. How It Works

Show the ALAP process.

```text
01
Tell Us Your Problem

02
Talk With ALAP

03
Understand Your Process

04
Design the Solution

05
Agree on Scope, Budget & Timeline

06
We Build & Implement

07
Launch & Support
```

Primary message:

> **From conversation to working solution.**

---

# 10. Why ALAP

Explain differentiation.

### Problem First

We start with the business problem, not a technology stack.

### Practical Solutions

We focus on solutions that improve real business processes.

### Clear Scope

Requirements, budget, timeline, and deliverables are clearly defined before implementation.

### Collaborative

Clients can participate throughout the solution-design process.

### Built for Growth

Solutions can evolve as the business grows.

---

# 11. Who We Help

Create industry/use-case cards.

Initial focus:

- E-commerce
- Online businesses
- Clinics
- Education & coaching
- Real estate
- Travel
- Restaurants
- Distributors
- Professional services
- Growing SMEs

Do not claim exclusive specialization unless validated later.

---

# 12. Example Problems

Instead of only displaying services, show real problems.

Examples:

> "Our team answers the same customer questions all day."

> "We manually process every order."

> "Our reports take hours to prepare."

> "Our employees copy data between multiple systems."

> "We lose leads because nobody follows up."

CTA:

> **Have a problem like this? Talk to ALAP.**

---

# 13. Final CTA

Large closing section:

> **Something taking too much time? Let's talk.**

Supporting text:

> Tell us what is slowing your business down. We'll help you understand what can be improved, automated, or built.

CTA:

**Talk to ALAP**

---

# Sprint 4 — Services & Conversion Flow

## Objective

Turn website visitors into qualified conversations.

---

# 14. Solutions Page

Create a dedicated `/solutions` page.

Each solution should include:

- Problem
- Who it's for
- Common use cases
- What ALAP can implement
- Expected business outcomes
- Example workflow
- CTA

---

# 15. Individual Solution Pages

Create reusable dynamic structure:

```text
/solutions/customer-support-automation
/solutions/sales-automation
/solutions/ecommerce-automation
/solutions/workflow-automation
/solutions/ai-business-solutions
/solutions/custom-digital-solutions
```

Do not duplicate page code.

Use a shared solution-page component and structured content.

---

# 16. Consultation CTA

All major pages should lead toward:

> **Talk to ALAP**

The CTA should eventually connect to the Phase 2/Platform meeting flow.

\# 17. Consultation Form

Create a polished form UI.

Fields:

\* Name

\* Email

\* Phone

\* Company

\* Business type

\* Problem description

\* Preferred contact method

Optional:

\* Website

\* Estimated team size

\* Current tools

Primary CTA:

> \*\*Start the Conversation\*\*

\### Important

Do not ask for excessive information before the first conversation.

The purpose is to understand the problem, not complete the entire requirements process.

\---

\# 18. Contact Page

Include:

\* General contact

\* Consultation CTA

\* Email placeholder/configuration

\* Social links

\* Business information

\* FAQ link

The contact information must come from environment/configuration rather than being scattered throughout components.

\---

\# Sprint 5 — Localization & Theme

\## Objective

Deliver a first-class English and Bangla experience.

\---

\# 19. Language Support

Languages:

```text

en

bn
```

Use `next-intl`.

All user-facing strings must be translatable.

Avoid:

```tsx

<h1>Tell us what takes too much time</h1>
```

Prefer translation keys.

\---

\# 20. Translation Structure

Example:

```text

messages/

├── en.json

└── bn.json
```

Organize translations by feature:

```text

navigation

hero

problems

solutions

howItWorks

whyAlap

industries

cta

footer

forms

errors
```

\---

\# 21. Bangla Quality

Do not perform literal machine-style translations.

Bangla copy should sound natural and professional.

The English and Bangla versions should communicate the same idea, but wording may differ where necessary for natural language.

\---

\# 22. Theme

Support:

\* Light

\* Dark

\* System

Use `next-themes`.

Requirements:

\* No flash of incorrect theme

\* Accessible contrast

\* Images/logos appropriate for theme

\* Cards work in both themes

\* Forms work in both themes

\* Navigation works in both themes

\---

\# Sprint 6 — SEO, Accessibility & Performance

\## Objective

Make the site ready for real public traffic.

\---

\# 23. SEO

Implement:

\* Page titles

\* Meta descriptions

\* Open Graph metadata

\* Twitter/X metadata

\* Canonical URLs

\* Sitemap

\* Robots.txt

\* Structured metadata where appropriate

\* Semantic HTML

Homepage SEO should target concepts such as:

\* Business automation Bangladesh

\* Business automation services

\* AI automation Bangladesh

\* Workflow automation

\* Digital solutions Bangladesh

\* Business process automation

Do not keyword-stuff.

\---

\# 24. Accessibility

Target WCAG 2.2 AA principles.

Tasks:

\* \[ \] Keyboard navigation

\* \[ \] Visible focus states

\* \[ \] Semantic headings

\* \[ \] Proper button labels

\* \[ \] Form labels

\* \[ \] Error messages

\* \[ \] Accessible navigation

\* \[ \] Color contrast

\* \[ \] Reduced-motion support

\* \[ \] Screen-reader-friendly structure

\* \[ \] Alt text

\---

\# 25. Performance

Target:

\* Fast initial load

\* Optimized images

\* Responsive images

\* Minimal JavaScript

\* Server components where appropriate

\* Lazy loading where useful

\* Avoid unnecessary animation libraries

\* Avoid oversized assets

Target strong Core Web Vitals.

\---

\# Sprint 7 — Testing & Production Launch

\## Objective

Verify the website before public launch.

\---

\# 26. Functional Testing

Test:

\* \[ \] Navigation

\* \[ \] Mobile menu

\* \[ \] Language switch

\* \[ \] Theme switch

\* \[ \] All CTA buttons

\* \[ \] Consultation form

\* \[ \] Contact form

\* \[ \] Solution pages

\* \[ \] Internal links

\* \[ \] External links

\* \[ \] Footer

\* \[ \] 404 page

\---

\# 27. Responsive Testing

Test at minimum:

\* Mobile

\* Tablet

\* Laptop

\* Desktop

\* Large desktop

Verify:

\* Typography

\* Navigation

\* Cards

\* Forms

\* Images

\* CTA sections

\* Spacing

\* Overflow

\---

\# 28. Browser Testing

Verify:

\* Chrome

\* Edge

\* Firefox

\* Safari

Prioritize modern browsers.

\---

\# 29. Security

Even though this is primarily a marketing website:

\* \[ \] Validate form input

\* \[ \] Protect API endpoints

\* \[ \] Do not expose secrets

\* \[ \] Configure security headers

\* \[ \] Configure CSP where practical

\* \[ \] Prevent spam submissions

\* \[ \] Do not expose internal APIs

\* \[ \] Use HTTPS in production

\---

\# 30. Analytics Foundation

Prepare analytics architecture.

Track:

\* Page views

\* Solution page views

\* CTA clicks

\* Consultation form starts

\* Consultation submissions

\* Language selection

\* Important conversion events

Analytics provider: **Vercel Analytics** (or GA4 fallback via environment configuration).

Avoid collecting unnecessary personal information.

\---

\# 31. Production Deployment

\## Tasks

\* \[ \] Configure production domain

\* \[ \] Configure DNS

\* \[ \] Configure HTTPS

\* \[ \] Configure environment variables

\* \[ \] Configure deployment pipeline

\* \[ \] Configure analytics

\* \[ \] Configure sitemap

\* \[ \] Configure robots.txt

\* \[ \] Verify metadata

\* \[ \] Verify forms

\* \[ \] Verify error pages

\* \[ \] Run production build

\* \[ \] Run final smoke tests

\---

\# 32. Phase 1 Definition of Done

Phase 1 is complete only when all of the following are true:

\### Brand

\* \[ \] ALAP visual identity is defined

\* \[ \] Typography is defined

\* \[ \] Colors/theme are defined

\* \[ \] Logo usage is defined

\* \[ \] Brand voice is documented

\### Website

\* \[ \] Homepage complete

\* \[ \] Solutions page complete

\* \[ \] Solution detail pages complete

\* \[ \] How It Works complete

\* \[ \] About complete

\* \[ \] Contact complete

\* \[ \] Consultation CTA complete

\* \[ \] FAQ complete

\* \[ \] Privacy page complete

\* \[ \] Terms page complete

\* \[ \] 404 page complete

\### UX

\* \[ \] Mobile responsive

\* \[ \] Desktop responsive

\* \[ \] Light theme

\* \[ \] Dark theme

\* \[ \] System theme

\* \[ \] English

\* \[ \] Bangla

\* \[ \] Accessible navigation

\* \[ \] Clear CTA

\### Technical

\* \[ \] TypeScript passes

\* \[ \] ESLint passes

\* \[ \] Production build passes

\* \[ \] SEO configured

\* \[ \] Sitemap configured

\* \[ \] Robots configured

\* \[ \] Analytics ready

\* \[ \] HTTPS enabled

\* \[ \] Production deployment successful

\---

\# 33. Phase 1 Success Metrics

The website should allow ALAP to measure:

```text

Visitors

&#x20;  ↓

Solution Page Visitors

&#x20;  ↓

CTA Clicks

&#x20;  ↓

Consultation Starts

&#x20;  ↓

Consultation Submissions

&#x20;  ↓

Qualified Leads
```

Initial business goal:

> \*\*Generate the first qualified conversations.\*\*

Not vanity metrics.

\---

\# 34. Phase 1 Final Output

At the end of Phase 1, ALAP should have:

```text

&#x20;                   ALAP

&#x20;                    │

&#x20;         ┌──────────┴──────────┐

&#x20;         │                     │

&#x20;      BRAND                 WEBSITE

&#x20;         │                     │

&#x20;  ┌──────┼──────┐       ┌──────┼──────┐

&#x20;  │      │      │       │      │      │

&#x20;Logo  Colors  Voice   Solutions Process CTA

&#x20;                         │

&#x20;                   ┌─────┴─────┐

&#x20;                   │           │

&#x20;                English      বাংলা

&#x20;                   │           │

&#x20;                   └─────┬─────┘

&#x20;                         │

&#x20;                   CONSULTATION

&#x20;                         │

&#x20;                    FIRST LEADS
```

The website is now ready to support \*\*Phase 2 — Concierge MVP\*\*, where ALAP starts talking to real businesses, collecting problems, creating proposals, and delivering the first projects.

\---

\# 35. Recommended AI Development Workflow

Do not give the entire Phase 1 to an AI coding agent as one giant prompt.

Use:

```text

Phase 1

&#x20;  ↓

Sprint

&#x20;  ↓

Task

&#x20;  ↓

Implementation Prompt

&#x20;  ↓

Code

&#x20;  ↓

Test

&#x20;  ↓

Review

&#x20;  ↓

Commit
```

Each implementation task should require the AI agent to:

1\. Inspect the existing code.

2\. Understand the current architecture.

3\. Implement only the requested task.

4\. Follow existing conventions.

5\. Avoid unnecessary dependencies.

6\. Keep components reusable.

7\. Maintain responsive behavior.

8\. Maintain English/Bangla support.

9\. Maintain Light/Dark/System support.

10\. Run lint/typecheck/build.

11\. Fix errors.

12\. Summarize changed files and verification results.

\---

\# 36. Phase 1 Priority

If time becomes limited, prioritize in this order:

```text

P0 — Homepage

P0 — Services

P0 — How It Works

P0 — Consultation CTA

P0 — Mobile responsive

P0 — English/Bangla

P0 — Light/Dark

P1 — About

P1 — Contact

P1 — FAQ

P1 — SEO

P1 — Accessibility

P2 — Advanced animations

P2 — Advanced analytics

P2 — Additional marketing content
```

\---

\# 37. Phase 1 Exit Gate

Before moving to Phase 2, answer \*\*YES\*\* to these questions:

\* Can a stranger understand ALAP within 30 seconds?

\* Is it clear that ALAP solves business problems rather than simply selling software?

\* Can a business understand the major solution categories?

\* Can someone easily start a conversation?

\* Does the site look trustworthy enough for a business owner?

\* Does it work well on mobile?

\* Does it work in Bangla and English?

\* Does it work in Light and Dark mode?

\* Can ALAP measure lead generation?

\* Can the website be deployed publicly?

If all are \*\*YES\*\*, Phase 1 is complete.

\---

\## Next Phase

\*\*Phase 2 — Concierge MVP\*\*

The focus changes from:

> \*\*"Build the website."\*\*

to:

> \*\*"Get real businesses to tell ALAP their problems and turn the first problems into paid projects."\*\*