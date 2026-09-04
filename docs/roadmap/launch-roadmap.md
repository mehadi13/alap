# Launch Roadmap & Milestone Tracker — ALAP (আলাপ)

---

## 🚩 Milestone Overview

```text
┌──────────────────────────────────────────────┐
│  Phase 1: Marketing Website Foundation       │  ✅ COMPLETED
│  - Next.js 16 public site & i18n (EN/BN)     │
└──────────────────────┬───────────────────────┘
                       │
                       ▼
┌──────────────────────────────────────────────┐
│  Phase 2: Core Platform & Admin Operations   │  ✅ COMPLETED
│  - Spring Boot 3.4 REST API & DB Persistence │
│  - Client App Admin Dashboard & Layout       │
│  - Top-bar collapse toggle & compact Theme   │
│  - JPA Pagination & Status Filters           │
│  - Channel Types & Audio Voice Notes Player  │
│  - Callback Requests (DB & Discord Sync)     │
└──────────────────────┬───────────────────────┘
                       │
                       ▼
┌──────────────────────────────────────────────┐
│  Phase 3: Client Self-Service & Automation   │  ⏳ UPCOMING
│  - Client auth & project dashboard           │
│  - Automated requirements & proposal builder │
│  - Integrated billing & payment gateways     │
└──────────────────────────────────────────────┘
```

---

## ✅ Phase 1: Marketing Website Foundation (Completed)

- [x] Brand identity & responsive Tailwind CSS v4 design system.
- [x] Next.js 16 App Router setup for public marketing website (`frontend`).
- [x] Full bilingual internationalization (`LanguageContext` for English `en` and Bangla `bn`).
- [x] Solutions catalog with static params pre-rendering (`/solutions` and `/solutions/[slug]`).
- [x] Interactive 7-step process diagram powered by `@xyflow/react`.
- [x] Light / Dark / System theme switching without layout flash.

---

## ✅ Phase 2: Core Platform & Admin Operations (Completed)

- [x] **Spring Boot REST API**: Java 21 backend service running on port `8080` with JPA repositories and H2/PostgreSQL database support.
- [x] **Callback Request Integration**: Dedicated endpoint `POST /api/v1/consultation/callback` registering quick callback inquiries in database and dispatching formatted alert embeds to Discord.
- [x] **Communication Channel Types**: Added `channelType` enum (`MESSAGE`, `MEETING`, `CALL`, `VOICE_NOTE`) to track client preferences and render channel icons in the admin queue.
- [x] **Voice Message Recording & Playback**: Supported voice message audio uploads (`.wav`, `.mp3`, `.webm`), audio streaming backend endpoint `/api/v1/consultation/voice/{filename}`, and embedded HTML5 audio player widget in the admin UI.
- [x] **Paginated Consultation Queue**: Implemented Spring Data `@PageableDefault` on `/api/v1/consultation` with page controls (`Previous`, `Next`, page indicators).
- [x] **Status Filter Dropdown**: Filter button in `client-app` consultation queue hiding/showing status filters ("All", "New", "Contacted", "Proposal Sent", "Converted").
- [x] **Admin Layout Optimization**:
  - Moved left sidebar collapse toggle icon to the top bar (`Header.tsx`).
  - Implemented compact single-button `ThemeToggle` for collapsed icon-only sidebar mode (`w-20`).

---

## 🔮 Phase 3: Client Self-Service & Advanced Automations (Upcoming)

- [ ] **Client Authentication & Portal**: NextAuth / JWT login for clients to track project progress, upload asset deliverables, and view milestones.
- [ ] **Automated Proposal Generator**: Auto-generate formal solution proposal PDFs from consultation requirement inputs.
- [ ] **AI Requirement Assistant**: LLM-powered interactive diagnostic assistant guiding clients to articulate their manual operational pain points.
- [ ] **Payment Gateway Integration**: Local Bangladeshi (bKash, Nagad, SSLCommerz) & international (Stripe) payment integration for milestone payments.
