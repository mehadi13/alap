# Backend REST API Reference — ALAP (আলাপ)

The backend service is built using **Spring Boot 3.4.3** with **Java 21**. Base URL: `http://localhost:8080/api/v1`.

---

## 📌 Endpoints Summary

| Method | Endpoint | Description | Query / Body |
| :--- | :--- | :--- | :--- |
| `POST` | `/api/v1/consultation` | Submit a new consultation (with optional voice note upload) | Multipart Form / JSON Body |
| `POST` | `/api/v1/consultation/callback` | Submit a quick "Request a Call Back" request | JSON Body |
| `GET` | `/api/v1/consultation` | Get paginated list of consultations (with optional status filter) | `page`, `size`, `sort`, `status` |
| `PUT` | `/api/v1/consultation/{id}/status` | Update consultation status (`NEW`, `CONTACTED`, `PROPOSAL_SENT`, `CONVERTED`) | JSON Body `{ "status": "CONTACTED" }` |
| `GET` | `/api/v1/consultation/voice/{filename}` | Stream voice note audio file | Audio Resource |
| `GET` | `/api/v1/health` | Backend health check endpoint | None |

---

## 📄 Detailed Endpoint Specifications

### 1. Submit Consultation Inquiry
`POST /api/v1/consultation`

Supports both `multipart/form-data` (for audio files) and `application/json`.

#### Form-Data Fields:
- `name` (String, Required)
- `email` (String, Required)
- `phone` (String, Optional)
- `company` (String, Optional)
- `message` (String, Optional)
- `channelType` (String, Enum: `MESSAGE`, `MEETING`, `CALL`, `VOICE_NOTE`)
- `voiceFile` (MultipartFile, Optional audio file)

#### Sample Response (`201 Created`):
```json
{
  "success": true,
  "message": "Consultation request received successfully",
  "data": {
    "id": 42,
    "name": "Rahim Ahmed",
    "email": "rahim@example.com",
    "phone": "+8801711223344",
    "company": "Tech Corp",
    "message": "We need help automating inventory sync.",
    "channelType": "VOICE_NOTE",
    "voiceFilePath": "voice_1725451200_rahim.wav",
    "isCallbackRequest": false,
    "status": "NEW",
    "createdAt": "2026-09-04T18:30:00"
  }
}
```

---

### 2. Request a Call Back
`POST /api/v1/consultation/callback`

Dedicated endpoint for quick phone callback requests. Automatically saves to database with `isCallbackRequest = true` and `channelType = CALL`, and dispatches an alert embed to Discord.

#### Request Body (`application/json`):
```json
{
  "name": "Karim Hossain",
  "phone": "+8801819998877",
  "message": "Please call me regarding automated CRM integration."
}
```

#### Sample Response (`200 OK`):
```json
{
  "success": true,
  "message": "Callback request registered successfully",
  "data": {
    "id": 43,
    "name": "Karim Hossain",
    "phone": "+8801819998877",
    "isCallbackRequest": true,
    "channelType": "CALL",
    "status": "NEW"
  }
}
```

---

### 3. Get Consultation Queue (Paginated & Filtered)
`GET /api/v1/consultation`

Uses Spring Data `@PageableDefault(size = 10, sort = "createdAt", direction = Sort.Direction.DESC)`.

#### Query Parameters:
- `page` (int, default `0`) — 0-indexed page number.
- `size` (int, default `10`) — Items per page.
- `status` (String, optional) — Filter by status (`NEW`, `CONTACTED`, `PROPOSAL_SENT`, `CONVERTED`).

#### Sample Response (`200 OK`):
```json
{
  "content": [
    {
      "id": 42,
      "name": "Rahim Ahmed",
      "email": "rahim@example.com",
      "phone": "+8801711223344",
      "channelType": "VOICE_NOTE",
      "voiceFilePath": "voice_1725451200_rahim.wav",
      "isCallbackRequest": false,
      "status": "NEW",
      "createdAt": "2026-09-04T18:30:00"
    }
  ],
  "pageable": {
    "pageNumber": 0,
    "pageSize": 10
  },
  "totalElements": 1,
  "totalPages": 1,
  "last": true
}
```

---

### 4. Update Consultation Status
`PUT /api/v1/consultation/{id}/status`

#### Request Body:
```json
{
  "status": "CONTACTED"
}
```

---

### 5. Stream Voice Note Audio
`GET /api/v1/consultation/voice/{filename}`

Serves the requested audio file with appropriate MIME headers (`audio/wav`, `audio/mpeg`, `audio/webm`).

---

## 🔔 Discord Webhook Service (`DiscordWebhookService.java`)

When a consultation or callback request is received, `DiscordWebhookService` constructs a color-coded Discord embed message and posts it asynchronously to the configured Discord Webhook URL.
- **Callback Alerts**: Highlighted in bold green with phone contact details.
- **Voice Messages**: Notes the attached voice recording availability.
