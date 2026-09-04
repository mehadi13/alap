# Developer Documentation — ALAP (আলাপ)

Welcome to the technical developer documentation for **ALAP**. This folder contains detailed guides on system architecture, backend REST APIs, frontend Next.js applications, database schemas, and developer workflows.

---

## 📚 Documentation Index

1. 🏛️ [**System Architecture & Components**](file:///d:/alap/docs/developer/architecture.md)
   - Component topology (Backend, Client App, Public Frontend).
   - Database schema & entity definitions (`Consultation`, `ChannelType`, `Status`).
   - Network ports, environment variables, and CORS configuration.

2. 🔌 [**Backend REST API Reference**](file:///d:/alap/docs/developer/backend-api.md)
   - Spring Boot REST Endpoints (`/api/v1/consultation`, `/api/v1/health`).
   - Spring Data JPA pagination with `@PageableDefault`.
   - Voice note file upload and streaming endpoints.
   - Callback request handling (DB persistence & Discord Webhook notification).
   - Global exception handling and DTO specs.

3. 🎨 [**Frontend Applications Guide**](file:///d:/alap/docs/developer/frontend-apps.md)
   - `client-app` (Admin Portal) architecture: `AppShell`, top-bar collapse toggle (`Header.tsx`), compact `ThemeToggle`, paginated consultation queue, status filters.
   - `frontend` (Marketing Site) architecture: i18n (`LanguageContext`), `@xyflow/react` process diagram, voice note recording UI.
   - Theme system integration (Light / Dark / System).

---

## ⚡ Local Development Setup

### Prerequisites
- **Java**: JDK 21+
- **Build Tool**: Maven 3.9+
- **Node.js**: Node 20+ (npm 10+)

### Quick Start Commands

#### 1. Backend Service (Spring Boot)
```bash
cd backend
mvn clean spring-boot:run
```
*API Base URL*: `http://localhost:8080/api/v1`

#### 2. Client Management App (Admin Panel)
```bash
cd client-app
npm install
npm run dev
```
*Client App URL*: `http://localhost:3001`

#### 3. Main Public Frontend (Marketing Site)
```bash
cd frontend
npm install
npm run dev
```
*Public Website URL*: `http://localhost:3000`

---

## 🛠️ Verification & Build Commands

- **Backend Build & Test**: `cd backend && mvn clean verify`
- **Client App Type Check**: `cd client-app && npx tsc --noEmit`
- **Frontend Type Check**: `cd frontend && npx tsc --noEmit`
