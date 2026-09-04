"use client";

import React, { useState } from "react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { initialClients, ClientRecord } from "@/features/clients/clientsData";
import {
  Users,
  Search,
  Plus,
  Mail,
  Phone,
  Building2,
  Calendar,
  Filter,
  CheckCircle2,
  MoreVertical,
  X,
} from "lucide-react";

export default function ClientsDirectoryPage() {
  const [clients, setClients] = useState<ClientRecord[]>(initialClients);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedStatus, setSelectedStatus] = useState<string>("All");
  const [selectedClient, setSelectedClient] = useState<ClientRecord | null>(null);

  // New Client Form Modal State
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [newClient, setNewClient] = useState({
    name: "",
    company: "",
    email: "",
    phone: "",
    industry: "E-Commerce",
    solution: "Customer Support Automation",
    monthlyValue: "$500 / mo",
    notes: "",
  });

  const handleAddClient = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newClient.name || !newClient.company) return;

    const created: ClientRecord = {
      id: `CLT-${1000 + clients.length + 1}`,
      name: newClient.name,
      company: newClient.company,
      email: newClient.email || "info@company.com",
      phone: newClient.phone || "+880 1700-000000",
      industry: newClient.industry,
      solution: newClient.solution,
      status: "Onboarding",
      monthlyValue: newClient.monthlyValue,
      startDate: new Date().toISOString().split("T")[0],
      lastContact: new Date().toISOString().split("T")[0],
      notes: newClient.notes || "Initial onboarding client profile.",
    };

    setClients([created, ...clients]);
    setIsAddModalOpen(false);
    setNewClient({
      name: "",
      company: "",
      email: "",
      phone: "",
      industry: "E-Commerce",
      solution: "Customer Support Automation",
      monthlyValue: "$500 / mo",
      notes: "",
    });
  };

  const filteredClients = clients.filter((c) => {
    const matchesSearch =
      c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.industry.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus =
      selectedStatus === "All" || c.status === selectedStatus;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="space-y-6">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-foreground">
            Clients Directory
          </h1>
          <p className="text-xs sm:text-sm text-muted-foreground pt-1">
            Manage ALAP&apos;s client relationships, automation contracts, and ongoing operational support.
          </p>
        </div>

        <Button
          variant="cta"
          size="sm"
          onClick={() => setIsAddModalOpen(true)}
          className="gap-2 self-start sm:self-auto"
        >
          <Plus className="h-4 w-4" />
          <span>Add Client</span>
        </Button>
      </div>

      {/* Filter & Search Bar */}
      <Card className="p-4 flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="relative w-full md:w-80">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search by client, company, industry..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-9 h-9 text-xs"
          />
        </div>

        {/* Status Tabs */}
        <div className="flex items-center gap-1.5 overflow-x-auto w-full md:w-auto pb-1 md:pb-0">
          {["All", "Active", "Onboarding", "In Consultation", "Inactive"].map((st) => (
            <button
              key={st}
              type="button"
              onClick={() => setSelectedStatus(st)}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
                selectedStatus === st
                  ? "bg-[#5B5CE2] text-white dark:bg-[#7C7EF2]"
                  : "bg-muted text-muted-foreground hover:text-foreground"
              }`}
            >
              {st}
            </button>
          ))}
        </div>
      </Card>

      {/* Clients Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredClients.map((client) => (
          <Card
            key={client.id}
            className="p-6 space-y-4 flex flex-col justify-between hover:border-[#5B5CE2]/50 dark:hover:border-[#7C7EF2]/50 transition-colors"
          >
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <Badge
                  variant={
                    client.status === "Active"
                      ? "success"
                      : client.status === "Onboarding"
                      ? "accent"
                      : "warning"
                  }
                >
                  {client.status}
                </Badge>
                <span className="text-[11px] font-mono text-muted-foreground">
                  {client.id}
                </span>
              </div>

              <div>
                <h3 className="text-lg font-bold text-foreground">{client.company}</h3>
                <p className="text-xs text-muted-foreground">{client.name}</p>
              </div>

              <div className="space-y-1.5 pt-2 text-xs">
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Building2 className="h-3.5 w-3.5 text-[#5B5CE2] dark:text-[#7C7EF2]" />
                  <span>{client.industry}</span>
                </div>
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Mail className="h-3.5 w-3.5 text-[#5B5CE2] dark:text-[#7C7EF2]" />
                  <span>{client.email}</span>
                </div>
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Phone className="h-3.5 w-3.5 text-[#5B5CE2] dark:text-[#7C7EF2]" />
                  <span>{client.phone}</span>
                </div>
              </div>

              <div className="p-3 rounded-xl bg-muted/60 text-xs space-y-1">
                <span className="font-semibold text-foreground text-[11px]">Deploying:</span>
                <p className="text-[#5B5CE2] dark:text-[#7C7EF2] font-medium text-xs">
                  {client.solution}
                </p>
              </div>
            </div>

            <div className="flex items-center justify-between pt-3 border-t border-border">
              <span className="text-xs font-bold text-foreground">{client.monthlyValue}</span>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setSelectedClient(client)}
                className="text-xs"
              >
                View Details
              </Button>
            </div>
          </Card>
        ))}
      </div>

      {/* Client Detail Modal */}
      {selectedClient && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <Card className="max-w-lg w-full p-6 space-y-6 bg-card border-border shadow-2xl relative">
            <button
              type="button"
              onClick={() => setSelectedClient(null)}
              className="absolute top-4 right-4 p-1 rounded-lg text-muted-foreground hover:text-foreground"
            >
              <X className="h-5 w-5" />
            </button>

            <div className="space-y-1">
              <Badge variant="success">{selectedClient.status}</Badge>
              <h2 className="text-2xl font-extrabold text-foreground pt-1">
                {selectedClient.company}
              </h2>
              <p className="text-xs text-muted-foreground">Contact: {selectedClient.name}</p>
            </div>

            <div className="space-y-3 text-xs">
              <div className="p-3 rounded-xl bg-muted space-y-1">
                <span className="font-semibold text-foreground">Solution Automation:</span>
                <p className="text-sm font-bold text-[#5B5CE2] dark:text-[#7C7EF2]">
                  {selectedClient.solution}
                </p>
              </div>

              <div className="grid grid-cols-2 gap-3 text-xs">
                <div>
                  <span className="text-muted-foreground">Email:</span>
                  <p className="font-medium text-foreground">{selectedClient.email}</p>
                </div>
                <div>
                  <span className="text-muted-foreground">Phone:</span>
                  <p className="font-medium text-foreground">{selectedClient.phone}</p>
                </div>
                <div>
                  <span className="text-muted-foreground">Contract Value:</span>
                  <p className="font-medium text-foreground">{selectedClient.monthlyValue}</p>
                </div>
                <div>
                  <span className="text-muted-foreground">Start Date:</span>
                  <p className="font-medium text-foreground">{selectedClient.startDate}</p>
                </div>
              </div>

              <div className="pt-2">
                <span className="text-muted-foreground">Notes & Technical Setup:</span>
                <p className="p-3 rounded-xl bg-background border border-border mt-1 text-muted-foreground leading-relaxed">
                  {selectedClient.notes}
                </p>
              </div>
            </div>

            <div className="flex items-center justify-end gap-3 pt-2 border-t border-border">
              <Button variant="outline" size="sm" onClick={() => setSelectedClient(null)}>
                Close
              </Button>
            </div>
          </Card>
        </div>
      )}

      {/* Add Client Modal */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <Card className="max-w-md w-full p-6 space-y-4 bg-card border-border shadow-2xl relative">
            <button
              type="button"
              onClick={() => setIsAddModalOpen(false)}
              className="absolute top-4 right-4 p-1 rounded-lg text-muted-foreground hover:text-foreground"
            >
              <X className="h-5 w-5" />
            </button>

            <h2 className="text-xl font-bold text-foreground">Add New Client Profile</h2>

            <form onSubmit={handleAddClient} className="space-y-3 text-xs">
              <div className="space-y-1">
                <label className="font-semibold text-foreground">Company Name *</label>
                <Input
                  placeholder="e.g. Dhaka Logistics Ltd."
                  value={newClient.company}
                  onChange={(e) => setNewClient({ ...newClient, company: e.target.value })}
                  required
                />
              </div>

              <div className="space-y-1">
                <label className="font-semibold text-foreground">Contact Person *</label>
                <Input
                  placeholder="e.g. Anisur Rahman"
                  value={newClient.name}
                  onChange={(e) => setNewClient({ ...newClient, name: e.target.value })}
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="font-semibold text-foreground">Email</label>
                  <Input
                    placeholder="name@company.com"
                    value={newClient.email}
                    onChange={(e) => setNewClient({ ...newClient, email: e.target.value })}
                  />
                </div>
                <div className="space-y-1">
                  <label className="font-semibold text-foreground">Phone</label>
                  <Input
                    placeholder="+880 1700-000000"
                    value={newClient.phone}
                    onChange={(e) => setNewClient({ ...newClient, phone: e.target.value })}
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="font-semibold text-foreground">Solution Category</label>
                <select
                  value={newClient.solution}
                  onChange={(e) => setNewClient({ ...newClient, solution: e.target.value })}
                  className="flex h-11 w-full rounded-xl border border-border bg-background px-4 text-xs text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                >
                  <option value="Customer Support Automation">Customer Support Automation</option>
                  <option value="Sales Lead Routing & Automation">Sales Lead Routing & Automation</option>
                  <option value="E-Commerce Order Workflows">E-Commerce Order Workflows</option>
                  <option value="Office Workflow Automation">Office Workflow Automation</option>
                  <option value="AI Business Solutions">AI Business Solutions</option>
                  <option value="Custom Digital Solutions">Custom Digital Solutions</option>
                </select>
              </div>

              <div className="flex justify-end gap-2 pt-4">
                <Button type="button" variant="outline" size="sm" onClick={() => setIsAddModalOpen(false)}>
                  Cancel
                </Button>
                <Button type="submit" variant="cta" size="sm">
                  Save Client
                </Button>
              </div>
            </form>
          </Card>
        </div>
      )}
    </div>
  );
}
