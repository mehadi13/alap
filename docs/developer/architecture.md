# System Architecture — ALAP (আলাপ)

This document describes the high-level architecture, component communication, network layout, and database entity schemas for the ALAP platform.

---

## 🏗️ System Overview

ALAP is structured as a multi-tier decoupled web application consisting of a Spring Boot backend REST service and two specialized Next.js web applications.

```text
                               ┌─────────────────────────────────────────┐
                               │       Main Marketing Frontend           │
                               │  Next.js 16 (App Router) - Port 3000   │
                               │  - Public solutions catalog             │
                               │  - Bilingual i18n (EN / BN)             │
                               │  - Consultation & Callback form         │
                               └────────────────────┬────────────────────┘
                                                    │
                                                    │ HTTP / JSON
                                                    ▼
┌────────────────────────────────────────┐  ┌─────────────────────────────────────────┐
│     Client Management Dashboard        │  │           Backend REST API              │
│  Next.js 16 (App Router) - Port 3001   ├──┼─►  Spring Boot 3.4.3 (Java 21) - 8080   │
│  - Consultations queue with filters    │  │  - JPA Consultation Repository          │
│  - Audio voice note player widget      │  │  - Voice File Storage & Streamer        │
│  - Top-bar sidebar collapse toggle     │  │  - Discord Webhook Notification Service │
│  - Clients directory & status badges   │  │  - CORS & Global Exception Handler      │
└────────────────────────────────────────┘  └────────────────────┬────────────────────┘
                                                                 │
                                                                 │ HTTP Webhook
                                                                 ▼
                                                    ┌─────────────────────────┐
                                                    │  Discord Notification   │
                                                    │       Channel           │
                                                    └─────────────────────────┘
```

---

## 💾 Database Schema & Domain Entities

### Domain Entity: `Consultation`

The central data record tracking inbound prospective lead inquiries, callback requests, and communication preferences.

| Field Name | Data Type | Nullable | Description / Constraints |
| :--- | :--- | :--- | :--- |
| `id` | `Long` | **No** | Primary Key, Auto-incremented (`@Id @GeneratedValue`) |
| `name` | `String` | **No** | Lead contact person full name |
| `email` | `String` | **No** | Lead email address |
| `phone` | `String` | Yes | Lead contact phone number |
| `company` | `String` | Yes | Company or organization name |
| `message` | `String` | Yes | Problem description / text message |
| `channelType` | `ChannelType` (Enum) | **No** | Preferred channel: `MESSAGE`, `MEETING`, `CALL`, `VOICE_NOTE` |
| `voiceFilePath` | `String` | Yes | Relative filename of saved voice message (e.g. `voice_1725450000.wav`) |
| `isCallbackRequest` | `Boolean` | **No** | `true` if initiated via "Request a Call Back" form |
| `status` | `ConsultationStatus` (Enum)| **No** | `NEW`, `CONTACTED`, `PROPOSAL_SENT`, `CONVERTED` |
| `createdAt` | `LocalDateTime` | **No** | Timestamp when record was created |

### Enums

#### `ChannelType`
- `MESSAGE`: Text-based inquiry.
- `MEETING`: Video call / scheduled meeting.
- `CALL`: Direct phone call.
- `VOICE_NOTE`: Recorded voice message file.

#### `ConsultationStatus`
- `NEW`: Newly submitted, uncontacted lead.
- `CONTACTED`: Admin team reached out.
- `PROPOSAL_SENT`: Solution outline / proposal sent to client.
- `CONVERTED`: Lead converted into paying project/client.

---

## 🌐 Network & CORS Configuration

- **Backend REST Service**: `http://localhost:8080`
- **Main Frontend**: `http://localhost:3000`
- **Client App**: `http://localhost:3001`
- **CORS Rules (`CorsConfig.java`)**:
  Allows origins `http://localhost:3000` and `http://localhost:3001` for HTTP methods `GET`, `POST`, `PUT`, `DELETE`, `OPTIONS`.

---

## 📂 Storage Architecture for Voice Messages

Voice message audio uploads (`.mp3`, `.wav`, `.webm`, `.ogg`, `.m4a`) are stored in the local server storage directory `uploads/voice-messages/`.
- Accessible via the REST endpoint: `GET /api/v1/consultation/voice/{filename}`.
- Streamed as `audio/mpeg` / `audio/wav` with `Accept-Ranges` support for in-browser audio playback.
