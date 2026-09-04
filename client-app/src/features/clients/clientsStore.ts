"use client";

import { initialClients, ClientRecord } from "./clientsData";

const STORAGE_KEY = "alap_clients_directory_v1";

export function getStoredClients(): ClientRecord[] {
  if (typeof window === "undefined") return initialClients;

  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      const parsed = JSON.parse(saved);
      if (Array.isArray(parsed) && parsed.length > 0) {
        return parsed;
      }
    }
  } catch (err) {
    console.warn("Error loading stored clients:", err);
  }

  return initialClients;
}

export function saveStoredClients(clients: ClientRecord[]): void {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(clients));
  } catch (err) {
    console.warn("Error saving clients to localStorage:", err);
  }
}

export function addClientRecord(newClientData: Partial<ClientRecord>): ClientRecord {
  const existing = getStoredClients();
  
  const created: ClientRecord = {
    id: `CLT-${1000 + existing.length + 1}`,
    name: newClientData.name || "Client Contact",
    company: newClientData.company || "Client Business",
    email: newClientData.email || "client@example.com",
    phone: newClientData.phone || "+880 1700-000000",
    industry: newClientData.industry || "Business Automation",
    solution: newClientData.solution || "Custom Workflow Automation",
    status: newClientData.status || "Onboarding",
    monthlyValue: newClientData.monthlyValue || "$500 / mo",
    startDate: newClientData.startDate || new Date().toISOString().split("T")[0],
    lastContact: new Date().toISOString().split("T")[0],
    notes: newClientData.notes || "Client profile created.",
  };

  const updated = [created, ...existing];
  saveStoredClients(updated);
  return created;
}

export function convertLeadToClientRecord(lead: {
  id: string;
  name: string;
  company: string;
  email: string;
  phone: string;
  industry?: string;
  problemDescription?: string;
}): ClientRecord {
  const existing = getStoredClients();

  // Check if client with matching company or email already exists
  const found = existing.find(
    (c) => c.email.toLowerCase() === lead.email.toLowerCase() ||
           c.company.toLowerCase() === lead.company.toLowerCase()
  );

  if (found) {
    return found;
  }

  const created: ClientRecord = {
    id: `CLT-${1000 + existing.length + 1}`,
    name: lead.name,
    company: lead.company || `${lead.name}'s Company`,
    email: lead.email,
    phone: lead.phone,
    industry: lead.industry || "General Industry",
    solution: "Custom Automation Solution",
    status: "Onboarding",
    monthlyValue: "$500 / mo",
    startDate: new Date().toISOString().split("T")[0],
    lastContact: new Date().toISOString().split("T")[0],
    notes: `Converted from Consultation Lead (${lead.id}). Problem description: ${lead.problemDescription || "N/A"}`,
  };

  const updated = [created, ...existing];
  saveStoredClients(updated);
  return created;
}

export function updateClientRecord(id: string, updates: Partial<ClientRecord>): ClientRecord[] {
  const existing = getStoredClients();
  const updated = existing.map((c) => (c.id === id ? { ...c, ...updates } : c));
  saveStoredClients(updated);
  return updated;
}

export function deleteClientRecord(id: string): ClientRecord[] {
  const existing = getStoredClients();
  const updated = existing.filter((c) => c.id !== id);
  saveStoredClients(updated);
  return updated;
}
