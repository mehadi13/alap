# ALAP (আলাপ) — Business Automation & Digital Solutions Platform

> **"Tell us what takes too much time. We'll turn it into a digital solution."**  
> **"আলাপ করুন। সমস্যাটা বলুন। আমরা সমাধান তৈরি করি।"**

ALAP is a full-stack digital solutions and automation platform helping growing businesses eliminate repetitive manual overhead, connect disconnected software tools, and implement practical AI and custom software workflows.

---

## 🏗 Repository Structure

```text
alap/
├── frontend/        # Public Marketing Website & Solutions Catalog (Next.js 16, React 19, Tailwind v4)
├── client-app/      # Internal Client Management Dashboard & Consultation Lead Portal (Next.js 16, React 19)
├── backend/         # Core Backend REST API & Discord Webhook Service (Spring Boot 3.4.3, Java 21)
└── docs/            # Business Strategy, Architecture & Implementation Roadmap Documentation
```

---

## 🌟 Applications & Services

### 1. Main Public Frontend (`/frontend`)
- **Framework**: Next.js 16.3.4 (App Router), React 19.2.8, TypeScript, Tailwind CSS v4, Lucide Icons, `@xyflow/react`.
- **Internationalization (i18n)**: Bilingual English (`en`) and natural Bangla (`bn`) support across all main pages:
  - **Homepage (`/`)**: Hero section with custom `Tiro_Bangla` typography, Problem breakdown cards, Solutions grid, Interactive React Flow 7-step process diagram, Why ALAP, Target Industries, Real Problem Scenarios, and Final CTA.
  - **Solutions Catalog (`/solutions`)**: Full bilingual catalog featuring 6 core solution categories with Bangla titles, short descriptions, deliverables, and category tags.
  - **Solution Details (`/solutions/[slug]`)**: Static params pre-rendered pages with detailed problem analysis, who it's for, common use cases, deliverables, expected outcomes, and step-by-step example workflows in both English and Bangla.
  - **How It Works (`/how-it-works`)**: Interactive operational blueprint, 7-step breakdown cards, and principle guarantees.
  - **Contact & Consultation (`/contact`)**: Form integration sending lead submissions to the backend proxy.
- **Theme Support**: Seamless Light, Dark, and System theme switching with zero flash on hydration using custom `ThemeProvider`.

### 2. Client Management Application (`/client-app`)
- **Framework**: Next.js 16.3.4 (App Router), React 19.2.8, TypeScript, Tailwind CSS v4.
- **Port**: Configured to run on port `3001` (`npm run dev -p 3001`).
- **Language**: English interface dedicated to client operations and administrative management.
- **Core Modules**:
  - **Dashboard (`/`)**: Overview metrics for active clients, new consultation leads, monthly recurring revenue, and live automations.
  - **Clients Directory (`/clients`)**: Filterable client registry with search, status badges (Active, Onboarding, In Consultation, Inactive), client creation modal, and profile detail view.
  - **Consultation Queue (`/consultations`)**: Queue for processing incoming website leads with stage progression (New → Contacted → Proposal Sent → Converted).
  - **Settings (`/settings`)**: Integration settings for Spring Boot backend API (`http://localhost:8080/api/v1`) and Discord notification webhooks.

### 3. Backend Service (`/backend`)
- **Framework**: Spring Boot 3.4.3, Java 21.
- **Package Architecture**: `com.alap.demo`
  - `controller/ConsultationController.java`: Endpoints for lead submission `/api/v1/consultation` and health monitoring `/api/v1/health`.
  - `dto/`: Immutable Java 21 records (`ConsultationRequestDto`, `ApiResponseDto`, `FieldErrorDetailDto`, `HealthStatusDto`).
  - `service/DiscordWebhookService.java`: Asynchronous notification proxy dispatching formatted lead details to Discord channels.
  - `config/GlobalExceptionHandler.java`: Centralized exception handling with structured JSON response DTOs.

---

## 🚀 Getting Started

### 1. Run Backend Service (Java 21 / Spring Boot)
```bash
cd backend
mvn clean spring-boot:run
```
*Backend runs on `http://localhost:8080`*.

### 2. Run Main Public Frontend (Next.js 16)
```bash
cd frontend
npm install
npm run dev
```
*Frontend runs on `http://localhost:3000`*.

### 3. Run Client Management App (Next.js 16)
```bash
cd client-app
npm install
npm run dev
```
*Client App runs on `http://localhost:3001`*.

---

## 🛠 Technology Matrix

| Component | Technology | Version | Key Libraries |
| :--- | :--- | :--- | :--- |
| **Frontend** | Next.js / React | 16.3.4 / 19.2.8 | `@xyflow/react`, `lucide-react`, `zod`, `react-hook-form`, Tailwind v4 |
| **Client App** | Next.js / React | 16.3.4 / 19.2.8 | `lucide-react`, `class-variance-authority`, `clsx`, `tailwind-merge` |
| **Backend** | Spring Boot | 3.4.3 (Java 21) | `spring-boot-starter-webmvc`, `jackson-databind`, Java 21 Records |
