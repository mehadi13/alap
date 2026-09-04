# ALAP (আলাপ) — Documentation Directory

Welcome to the official documentation repository for **ALAP (আলাপ)** — Business Automation & Digital Solutions Platform.

The documentation is organized into three primary sections:

---

## 📁 Documentation Structure

```text
docs/
├── developer/             # Technical architecture, API reference, developer workflow
│   ├── README.md          # Developer docs overview & quick start
│   ├── architecture.md    # System architecture, DB schema, frontend/backend component structure
│   ├── backend-api.md     # Spring Boot REST API reference, JPA pagination, Discord webhooks & voice endpoints
│   └── frontend-apps.md   # Next.js 16 client-app & frontend architecture, layout & theme system
│
├── user-manual/           # Operational user guides and admin panel documentation
│   ├── README.md          # User manual directory overview
│   ├── admin-guide.md     # Admin Panel manual (Consultations queue, filters, voice playback, clients)
│   └── client-guide.md    # Client Portal user guide (Requesting callback, solutions catalog, voice notes)
│
└── roadmap/               # Business vision, goals, and development milestones
    ├── README.md          # Goals & Roadmap index
    ├── business-purpose.md# Brand strategy, core promise, business model (Track A & B)
    └── launch-roadmap.md  # Detailed Phase 1, Phase 2, & Phase 3+ feature roadmap and status
```

---

## 🚀 Quick Navigation

| Section | Description | Target Audience |
| :--- | :--- | :--- |
| 🛠️ [**Developer Documentation**](file:///d:/alap/docs/developer/README.md) | Codebase setup, API endpoints, JPA schema, Next.js components, and development workflow. | Engineers & System Maintainers |
| 📖 [**User Manual**](file:///d:/alap/docs/user-manual/README.md) | Step-by-step operational guides for both administrators (`client-app`) and public users (`frontend`). | Platform Admins & Clients |
| 🎯 [**Goals & Roadmap**](file:///d:/alap/docs/roadmap/README.md) | Business purpose, brand promise, operational strategy, and launch milestone tracker. | Stakeholders & Product Managers |

---

## ⚡ Tech Stack Quick Summary

- **Backend**: Spring Boot 3.4.3 (Java 21), H2/PostgreSQL Database, Discord Webhooks Service (`http://localhost:8080`).
- **Client App**: Next.js 16.3 (React 19), Tailwind CSS v4, Lucide Icons (`http://localhost:3001`).
- **Public Website**: Next.js 16.3 (React 19), `@xyflow/react`, i18n (`http://localhost:3000`).
