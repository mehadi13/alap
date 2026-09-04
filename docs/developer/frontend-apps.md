# Frontend Applications Architecture — ALAP (আলাপ)

The ALAP repository contains two Next.js 16 applications built with React 19 and Tailwind CSS v4.

---

## 📱 1. Client Management Application (`client-app`)

Location: `d:\alap\client-app`  
Port: `3001`  

### Architecture & Layout System

```text
AppShell (Lifts state isCollapsed)
 ├── Sidebar (isCollapsed: boolean)
 │    ├── Brand Header ("ALAP")
 │    ├── Navigation Links (Icons + Labels / Collapsed Icons + Tooltips)
 │    ├── ThemeToggle (compact={isCollapsed})
 │    ├── User Profile Card & Sign Out
 │    └── Main Site Link
 └── Header (isCollapsed: boolean, onToggleSidebar: () => void)
      ├── Top Bar Collapse Toggle Button (<PanelLeftOpen /> / <PanelLeftClose />)
      └── Notifications Button
```

#### Core Components
- **[`AppShell.tsx`](file:///d:/alap/client-app/src/components/layout/AppShell.tsx)**: Manages state for `isCollapsed` sidebar layout and passes props down to `Sidebar` and `Header`.
- **[`Header.tsx`](file:///d:/alap/client-app/src/components/layout/Header.tsx)**: Top sticky bar featuring the collapse toggle icon button on the left and notifications on the right.
- **[`Sidebar.tsx`](file:///d:/alap/client-app/src/components/layout/Sidebar.tsx)**: Collapsible sidebar navigation (`w-64` expanded, `w-20` compact icon mode) with tooltips.
- **[`ThemeToggle.tsx`](file:///d:/alap/client-app/src/components/shared/ThemeToggle.tsx)**: Supports `compact` prop. Renders a full 3-button pill in expanded mode and a single `8x8` theme cycling icon button (`Sun`/`Moon`) in compact mode.

#### Consultations Queue (`/consultations`)
- **Status Filter Dropdown**: Filter button with hidden items under dropdown menu ("All", "New", "Contacted", "Proposal Sent", "Converted").
- **Channel Type Badges & Icons**:
  - `MESSAGE`: `MessageSquare` icon.
  - `MEETING`: `Calendar`/`Video` icon.
  - `CALL`: `PhoneCall` icon.
  - `VOICE_NOTE`: `Mic` icon with inline HTML5 audio player widget.
- **Pagination**: Server/API integration supporting `page` navigation (`Previous`, `Next`, `Page X of Y`).

---

## 🌐 2. Main Marketing Frontend (`frontend`)

Location: `d:\alap\frontend`  
Port: `3000`  

### Key Modules & Components
- **Internationalization (`LanguageContext.tsx`)**: Context provider storing selected language (`en` or `bn`). Page strings are loaded dynamically from translation dictionaries.
- **Interactive Flow Diagram (`@xyflow/react`)**: 7-step interactive workflow blueprint rendered on the homepage.
- **Consultation & Callback Modals**:
  - Select channel type (`message`, `meeting`, `call`, `voice_note`).
  - Audio recording widget (Web Audio API `MediaRecorder` recording `.webm`/`.wav` voice notes).
  - Form validation with `react-hook-form` & `zod`.
