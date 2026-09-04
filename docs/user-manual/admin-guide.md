# Admin Panel User Guide (`client-app`)

This manual details how platform administrators use the ALAP Client Management Application (`http://localhost:3001`) to review leads, manage client accounts, process voice messages, and monitor business automations.

---

## 🚀 1. Dashboard Navigation & Layout Controls

### Top Header Bar & Sidebar Collapse Toggle
- **Sidebar Collapse Toggle Icon**: Located on the top bar header (left side).
  - Click the **Panel Left** icon to collapse the sidebar into compact icon-only mode (`w-20`).
  - Click again to expand the sidebar back to full width (`w-64`).
- **Theme Switcher**: Located in the sidebar footer.
  - In expanded mode, select **Light**, **Dark**, or **System**.
  - In collapsed mode, click the single Sun/Moon icon button to cycle through themes.

---

## 📋 2. Consultation Queue (`/consultations`)

The Consultation Queue displays all incoming inquiries submitted through the website or callback forms.

### Filtering by Lead Status
Click the **Filter** icon button at the top right of the consultation queue to filter inquiries by stage:
- **All**: View all consultation records.
- **New**: Fresh leads requiring first contact.
- **Contacted**: Leads that have been called or messaged.
- **Proposal Sent**: Leads with active proposal proposals under review.
- **Converted**: Converted clients.

### Understanding Channel Types & Icons
Each lead item displays a dedicated channel type badge and icon indicating how the client prefers to communicate:
- 💬 **Message**: Text message inquiry.
- 📅 **Meeting**: Scheduled video or in-person meeting.
- 📞 **Call**: Direct phone call request.
- 🎙️ **Voice Note**: Audio message recording.

### Listening to Voice Notes
When a client submits a **Voice Note**:
1. Locate the voice message badge in the consultation item card.
2. Click the **Play** button on the embedded audio widget to listen to the recorded voice note directly in your browser.
3. Use the progress slider or volume control as needed.

### Changing Lead Status
Click on any consultation lead card to open details, and update its status dropdown to progress the lead through the sales pipeline (`NEW` → `CONTACTED` → `PROPOSAL SENT` → `CONVERTED`).

### Pagination Navigation
Use the **Previous** and **Next** buttons at the bottom of the table to navigate between pages.

---

## 👥 3. Clients Directory (`/clients`)

- View active clients, onboarding status, project assignments, and total revenue.
- Use the **Add Client** button to manually add a new client to the directory.
- Click any client row to view detailed contact info, active automations, and consultation history.

---

## ⚙️ 4. Settings (`/settings`)

- **Backend REST URL**: Verify connection to `http://localhost:8080/api/v1`.
- **Discord Webhook**: Configure the Discord webhook URL to receive instant push alerts when new consultations or callbacks arrive.
