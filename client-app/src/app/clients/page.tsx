"use client";

import React, { useState, useEffect, useCallback } from "react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ClientRecord } from "@/features/clients/clientsData";
import {
  getStoredClients,
  addClientRecord,
  updateClientRecord,
  deleteClientRecord,
} from "@/features/clients/clientsStore";
import {
  Users,
  Search,
  Plus,
  Mail,
  Phone,
  Building2,
  Calendar,
  X,
  Edit2,
  Trash2,
  TrendingUp,
  CheckCircle2,
  Clock,
  RefreshCw,
  Loader2,
} from "lucide-react";

export default function ClientsDirectoryPage() {
  const [clients, setClients] = useState<ClientRecord[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedStatus, setSelectedStatus] = useState<string>("All");
  const [selectedClient, setSelectedClient] = useState<ClientRecord | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isRefreshing, setIsRefreshing] = useState<boolean>(false);
  const [isBackendLive, setIsBackendLive] = useState<boolean>(false);

  // Edit State
  const [editingClient, setEditingClient] = useState<ClientRecord | null>(null);

  // New Client Form Modal State
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [newClient, setNewClient] = useState({
    name: "",
    company: "",
    email: "",
    phone: "",
    industry: "E-Commerce",
    solution: "Customer Support Automation",
    status: "Onboarding" as ClientRecord["status"],
    monthlyValue: "$500 / mo",
    notes: "",
  });

  const fetchClients = useCallback(async (showRefreshing = false) => {
    if (showRefreshing) setIsRefreshing(true);

    try {
      const backendUrl = process.env.NEXT_PUBLIC_CLIENTS_URL || `${process.env.NEXT_PUBLIC_API_URL || "http://187.77.152.224:8081"}/api/v1/clients`;
      const response = await fetch(backendUrl);

      if (response.ok) {
        const json = await response.json();
        const rawList = Array.isArray(json.data) ? json.data : null;

        if (json.success && rawList) {
          const mappedClients: ClientRecord[] = rawList.map((item: any) => ({
            id: item.clientCode || (item.id ? `CLT-${1000 + item.id}` : "CLT-1000"),
            numericId: item.id,
            name: item.name,
            company: item.company,
            email: item.email || "N/A",
            phone: item.phone || "N/A",
            industry: item.industry || "General Industry",
            solution: item.solution || "Custom Business Solution",
            status: (item.status as ClientRecord["status"]) || "Onboarding",
            monthlyValue: item.monthlyValue || "$500 / mo",
            startDate: item.startDate || "Recently",
            lastContact: item.lastContact || "Recently",
            notes: item.notes || "No notes attached.",
          }));

          setClients(mappedClients);
          setIsBackendLive(true);
        } else {
          setClients(getStoredClients());
          setIsBackendLive(false);
        }
      } else {
        setClients(getStoredClients());
        setIsBackendLive(false);
      }
    } catch (err) {
      console.warn("Backend clients service offline, fallback to local store", err);
      setClients(getStoredClients());
      setIsBackendLive(false);
    } finally {
      setIsLoading(false);
      setIsRefreshing(false);
    }
  }, []);

  useEffect(() => {
    fetchClients();
  }, [fetchClients]);

  const handleAddClient = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newClient.name || !newClient.company) return;

    try {
      const backendUrl = process.env.NEXT_PUBLIC_CLIENTS_URL || `${process.env.NEXT_PUBLIC_API_URL || "http://187.77.152.224:8081"}/api/v1/clients`;
      const response = await fetch(backendUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newClient),
      });

      if (response.ok) {
        await fetchClients();
      } else {
        addClientRecord(newClient);
        setClients(getStoredClients());
      }
    } catch (err) {
      addClientRecord(newClient);
      setClients(getStoredClients());
    }

    setIsAddModalOpen(false);
    setNewClient({
      name: "",
      company: "",
      email: "",
      phone: "",
      industry: "E-Commerce",
      solution: "Customer Support Automation",
      status: "Onboarding",
      monthlyValue: "$500 / mo",
      notes: "",
    });
  };

  const handleUpdateClient = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingClient) return;

    try {
      const backendUrl = process.env.NEXT_PUBLIC_CLIENTS_URL || `${process.env.NEXT_PUBLIC_API_URL || "http://187.77.152.224:8081"}/api/v1/clients`;
      const targetId = (editingClient as any).numericId || editingClient.id.replace(/\D/g, "");

      const response = await fetch(`${backendUrl.replace(/\/$/, "")}/${targetId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(editingClient),
      });

      if (response.ok) {
        await fetchClients();
      } else {
        const updatedList = updateClientRecord(editingClient.id, editingClient);
        setClients(updatedList);
      }
    } catch (err) {
      const updatedList = updateClientRecord(editingClient.id, editingClient);
      setClients(updatedList);
    }

    if (selectedClient?.id === editingClient.id) {
      setSelectedClient(editingClient);
    }
    setEditingClient(null);
  };

  const handleDeleteClient = async (clientToDelete: ClientRecord) => {
    if (!confirm(`Are you sure you want to delete client "${clientToDelete.company}"?`)) return;

    try {
      const backendUrl = process.env.NEXT_PUBLIC_CLIENTS_URL || `${process.env.NEXT_PUBLIC_API_URL || "http://187.77.152.224:8081"}/api/v1/clients`;
      const targetId = (clientToDelete as any).numericId || clientToDelete.id.replace(/\D/g, "");

      const response = await fetch(`${backendUrl.replace(/\/$/, "")}/${targetId}`, {
        method: "DELETE",
      });

      if (response.ok) {
        await fetchClients();
      } else {
        const updatedList = deleteClientRecord(clientToDelete.id);
        setClients(updatedList);
      }
    } catch (err) {
      const updatedList = deleteClientRecord(clientToDelete.id);
      setClients(updatedList);
    }

    if (selectedClient?.id === clientToDelete.id) {
      setSelectedClient(null);
    }
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

  // Calculate Metrics
  const totalClients = clients.length;
  const activeClients = clients.filter((c) => c.status === "Active").length;
  const onboardingClients = clients.filter((c) => c.status === "Onboarding").length;

  return (
    <div className="space-y-6">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-foreground">
              Clients Directory
            </h1>
            {isBackendLive ? (
              <Badge variant="outline" className="text-xs bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/30 font-bold gap-1">
                <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
                Live DB Connected
              </Badge>
            ) : (
              <Badge variant="outline" className="text-xs bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/30 font-bold">
                Offline Mode (Local Sync)
              </Badge>
            )}
          </div>
          <p className="text-xs sm:text-sm text-muted-foreground pt-1">
            Manage ALAP&apos;s client relationships, automation contracts, and ongoing operational support.
          </p>
        </div>

        <div className="flex items-center gap-2 self-start sm:self-auto">
          <Button
            variant="outline"
            size="sm"
            onClick={() => fetchClients(true)}
            disabled={isRefreshing || isLoading}
            className="h-8 gap-1.5 text-xs rounded-xl"
          >
            <RefreshCw className={`h-3.5 w-3.5 ${isRefreshing ? "animate-spin" : ""}`} />
            <span className="hidden sm:inline">Refresh</span>
          </Button>

          <Button
            variant="cta"
            size="sm"
            onClick={() => setIsAddModalOpen(true)}
            className="gap-2"
          >
            <Plus className="h-4 w-4" />
            <span>Add Client</span>
          </Button>
        </div>
      </div>

      {/* Overview Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <Card className="p-4 flex items-center gap-3 bg-card border-border">
          <div className="h-10 w-10 rounded-xl bg-[#5B5CE2]/10 text-[#5B5CE2] dark:bg-[#7C7EF2]/20 dark:text-[#7C7EF2] flex items-center justify-center font-bold">
            <Users className="h-5 w-5" />
          </div>
          <div>
            <p className="text-xs font-semibold text-muted-foreground">Total Managed Clients</p>
            <p className="text-xl font-extrabold text-foreground">{totalClients}</p>
          </div>
        </Card>

        <Card className="p-4 flex items-center gap-3 bg-card border-border">
          <div className="h-10 w-10 rounded-xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 flex items-center justify-center font-bold">
            <CheckCircle2 className="h-5 w-5" />
          </div>
          <div>
            <p className="text-xs font-semibold text-muted-foreground">Active Operational</p>
            <p className="text-xl font-extrabold text-foreground">{activeClients}</p>
          </div>
        </Card>

        <Card className="p-4 flex items-center gap-3 bg-card border-border">
          <div className="h-10 w-10 rounded-xl bg-purple-500/10 text-purple-600 dark:text-purple-400 flex items-center justify-center font-bold">
            <Clock className="h-5 w-5" />
          </div>
          <div>
            <p className="text-xs font-semibold text-muted-foreground">In Onboarding</p>
            <p className="text-xl font-extrabold text-foreground">{onboardingClients}</p>
          </div>
        </Card>
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

      {/* Loading Skeleton */}
      {isLoading && (
        <div className="flex flex-col items-center justify-center p-12 space-y-3 rounded-2xl bg-card border border-border">
          <Loader2 className="h-8 w-8 animate-spin text-[#5B5CE2] dark:text-[#7C7EF2]" />
          <p className="text-sm font-semibold text-muted-foreground">
            Loading clients directory from backend database...
          </p>
        </div>
      )}

      {/* Clients Grid */}
      {!isLoading && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredClients.map((client) => (
            <Card
              key={client.id}
              className="p-6 space-y-4 flex flex-col justify-between hover:border-[#5B5CE2]/50 dark:hover:border-[#7C7EF2]/50 transition-colors relative"
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
                  <span className="font-semibold text-foreground text-[11px]">Deploying Solution:</span>
                  <p className="text-[#5B5CE2] dark:text-[#7C7EF2] font-medium text-xs">
                    {client.solution}
                  </p>
                </div>
              </div>

              <div className="flex items-center justify-between pt-3 border-t border-border gap-2">
                <span className="text-xs font-bold text-foreground">{client.monthlyValue}</span>
                <div className="flex items-center gap-1.5">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setEditingClient(client)}
                    className="text-xs p-2 h-8"
                    title="Edit Client"
                  >
                    <Edit2 className="h-3.5 w-3.5" />
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setSelectedClient(client)}
                    className="text-xs h-8"
                  >
                    Details
                  </Button>
                </div>
              </div>
            </Card>
          ))}
        </div>
      )}

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
              <p className="text-xs text-muted-foreground">Contact Person: {selectedClient.name}</p>
            </div>

            <div className="space-y-3 text-xs">
              <div className="p-3 rounded-xl bg-muted space-y-1">
                <span className="font-semibold text-foreground">Active Automation Solution:</span>
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

            <div className="flex items-center justify-between pt-2 border-t border-border">
              <Button
                variant="outline"
                size="sm"
                onClick={() => handleDeleteClient(selectedClient)}
                className="text-xs text-rose-600 border-rose-500/30 hover:bg-rose-500/10 gap-1.5"
              >
                <Trash2 className="h-3.5 w-3.5" />
                <span>Delete Client</span>
              </Button>

              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    setEditingClient(selectedClient);
                  }}
                >
                  Edit Profile
                </Button>
                <Button variant="outline" size="sm" onClick={() => setSelectedClient(null)}>
                  Close
                </Button>
              </div>
            </div>
          </Card>
        </div>
      )}

      {/* Edit Client Modal */}
      {editingClient && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <Card className="max-w-md w-full p-6 space-y-4 bg-card border-border shadow-2xl relative">
            <button
              type="button"
              onClick={() => setEditingClient(null)}
              className="absolute top-4 right-4 p-1 rounded-lg text-muted-foreground hover:text-foreground"
            >
              <X className="h-5 w-5" />
            </button>

            <h2 className="text-xl font-bold text-foreground">Edit Client Profile ({editingClient.id})</h2>

            <form onSubmit={handleUpdateClient} className="space-y-3 text-xs">
              <div className="space-y-1">
                <label className="font-semibold text-foreground">Company Name *</label>
                <Input
                  value={editingClient.company}
                  onChange={(e) => setEditingClient({ ...editingClient, company: e.target.value })}
                  required
                />
              </div>

              <div className="space-y-1">
                <label className="font-semibold text-foreground">Contact Person *</label>
                <Input
                  value={editingClient.name}
                  onChange={(e) => setEditingClient({ ...editingClient, name: e.target.value })}
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="font-semibold text-foreground">Email</label>
                  <Input
                    value={editingClient.email}
                    onChange={(e) => setEditingClient({ ...editingClient, email: e.target.value })}
                  />
                </div>
                <div className="space-y-1">
                  <label className="font-semibold text-foreground">Phone</label>
                  <Input
                    value={editingClient.phone}
                    onChange={(e) => setEditingClient({ ...editingClient, phone: e.target.value })}
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="font-semibold text-foreground">Status</label>
                  <select
                    value={editingClient.status}
                    onChange={(e) =>
                      setEditingClient({
                        ...editingClient,
                        status: e.target.value as ClientRecord["status"],
                      })
                    }
                    className="flex h-11 w-full rounded-xl border border-border bg-background px-3 text-xs text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                  >
                    <option value="Active">Active</option>
                    <option value="Onboarding">Onboarding</option>
                    <option value="In Consultation">In Consultation</option>
                    <option value="Inactive">Inactive</option>
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="font-semibold text-foreground">Contract Value</label>
                  <Input
                    value={editingClient.monthlyValue}
                    onChange={(e) => setEditingClient({ ...editingClient, monthlyValue: e.target.value })}
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="font-semibold text-foreground">Solution Category</label>
                <Input
                  value={editingClient.solution}
                  onChange={(e) => setEditingClient({ ...editingClient, solution: e.target.value })}
                />
              </div>

              <div className="flex justify-end gap-2 pt-4">
                <Button type="button" variant="outline" size="sm" onClick={() => setEditingClient(null)}>
                  Cancel
                </Button>
                <Button type="submit" variant="cta" size="sm">
                  Save Changes
                </Button>
              </div>
            </form>
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
