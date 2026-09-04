"use client";

import React, { useState, useEffect, useCallback } from "react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { initialLeads, ConsultationLead } from "@/features/clients/clientsData";
import {
  Phone,
  Mail,
  CheckCircle2,
  UserPlus,
  Loader2,
  RefreshCw,
  Mic,
  AlertCircle,
  Inbox,
  Volume2,
} from "lucide-react";

interface ApiConsultation {
  id: string;
  name: string;
  email: string;
  phone: string;
  company: string;
  businessType: string;
  problemDescription: string;
  preferredContact: "whatsapp" | "phone" | "email";
  type: string;
  durationSeconds: number;
  audioFileUrl?: string;
  status: "New" | "Contacted" | "Proposal Sent" | "Converted" | "Archived";
  createdAt: string;
}

export default function ConsultationsQueuePage() {
  const [leads, setLeads] = useState<ConsultationLead[]>([]);
  const [statusFilter, setStatusFilter] = useState<string>("All");
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isRefreshing, setIsRefreshing] = useState<boolean>(false);
  const [isBackendLive, setIsBackendLive] = useState<boolean>(false);

  const fetchConsultations = useCallback(async (showRefreshing = false) => {
    if (showRefreshing) setIsRefreshing(true);

    try {
      const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:8080/api/v1/consultation";
      const response = await fetch(backendUrl);

      if (response.ok) {
        const json = await response.json();
        if (json.success && Array.isArray(json.data)) {
          const mappedLeads: ConsultationLead[] = json.data.map((item: ApiConsultation) => ({
            id: item.id,
            name: item.name,
            company: item.company || `${item.name}'s Business`,
            email: item.email,
            phone: item.phone,
            industry: item.businessType || (item.type === "VOICE" ? "Voice Note" : "General Inquiry"),
            problemDescription: item.problemDescription,
            preferredContact: item.preferredContact || "phone",
            audioFileUrl: item.audioFileUrl,
            submittedAt: item.createdAt ? new Date(item.createdAt).toLocaleString("en-US", {
              dateStyle: "medium",
              timeStyle: "short",
            }) : "Recently",
            status: item.status || "New",
          }));

          setLeads(mappedLeads);
          setIsBackendLive(true);
        }
      } else {
        console.warn("Backend consultation fetch failed, using fallback initial data");
        setLeads(initialLeads);
        setIsBackendLive(false);
      }
    } catch (err) {
      console.warn("Backend consultation service offline, using fallback initial data", err);
      setLeads(initialLeads);
      setIsBackendLive(false);
    } finally {
      setIsLoading(false);
      setIsRefreshing(false);
    }
  }, []);

  useEffect(() => {
    fetchConsultations();
  }, [fetchConsultations]);

  const updateLeadStatus = async (id: string, newStatus: ConsultationLead["status"]) => {
    // Optimistic UI update
    setLeads((prevLeads) =>
      prevLeads.map((lead) => (lead.id === id ? { ...lead, status: newStatus } : lead))
    );

    try {
      const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:8080/api/v1/consultation";
      const response = await fetch(`${backendUrl.replace(/\/$/, "")}/${id}/status`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: newStatus }),
      });
      if (!response.ok) {
        console.warn("Backend status update returned code:", response.status);
      }
    } catch (err) {
      console.warn("Could not reach backend for status update:", err);
    }
  };

  const filteredLeads = leads.filter(
    (lead) => statusFilter === "All" || lead.status === statusFilter
  );

  return (
    <div className="space-y-6">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-foreground">
              Consultation Queue & Leads
            </h1>
            {isBackendLive ? (
              <Badge variant="outline" className="text-xs bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/30 font-bold gap-1">
                <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
                Live DB Connected
              </Badge>
            ) : (
              <Badge variant="outline" className="text-xs bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/30 font-bold">
                Offline Mode (Demo Data)
              </Badge>
            )}
          </div>
          <p className="text-xs sm:text-sm text-muted-foreground pt-1">
            Review incoming consultation inquiries from ALAP web forms and listen to recorded voice notes.
          </p>
        </div>

        {/* Filter Controls & Refresh */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 sm:pb-0">
          <Button
            variant="outline"
            size="sm"
            onClick={() => fetchConsultations(true)}
            disabled={isRefreshing || isLoading}
            className="h-8 gap-1.5 text-xs rounded-xl"
          >
            <RefreshCw className={`h-3.5 w-3.5 ${isRefreshing ? "animate-spin" : ""}`} />
            <span className="hidden sm:inline">Refresh</span>
          </Button>

          <div className="flex items-center gap-1.5">
            {["All", "New", "Contacted", "Proposal Sent", "Converted"].map((st) => (
              <button
                key={st}
                type="button"
                onClick={() => setStatusFilter(st)}
                className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
                  statusFilter === st
                    ? "bg-[#5B5CE2] text-white dark:bg-[#7C7EF2]"
                    : "bg-muted text-muted-foreground hover:text-foreground"
                }`}
              >
                {st}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Loading Skeleton */}
      {isLoading && (
        <div className="flex flex-col items-center justify-center p-12 space-y-3 rounded-2xl bg-card border border-border">
          <Loader2 className="h-8 w-8 animate-spin text-[#5B5CE2] dark:text-[#7C7EF2]" />
          <p className="text-sm font-semibold text-muted-foreground">
            Loading consultations from database...
          </p>
        </div>
      )}

      {/* Leads List */}
      {!isLoading && (
        <div className="space-y-4">
          {filteredLeads.length === 0 ? (
            <Card className="p-12 text-center space-y-4 rounded-2xl border-dashed">
              <Inbox className="h-12 w-12 text-muted-foreground mx-auto" />
              <div className="space-y-1">
                <h3 className="text-base font-bold text-foreground">No consultation leads in database</h3>
                <p className="text-xs text-muted-foreground max-w-sm mx-auto">
                  {statusFilter === "All"
                    ? "No clients have submitted a consultation request or voice message yet. Submit one from the landing page to test live sync!"
                    : `No consultation leads match the filter "${statusFilter}".`}
                </p>
              </div>
            </Card>
          ) : (
            filteredLeads.map((lead) => (
              <Card key={lead.id} className="p-6 space-y-4 transition-all hover:border-[#5B5CE2]/40 dark:hover:border-[#7C7EF2]/40">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-border">
                  <div className="flex items-center gap-3">
                    <div className="h-9 w-9 rounded-xl bg-[#5B5CE2]/10 text-[#5B5CE2] dark:bg-[#7C7EF2]/20 dark:text-[#7C7EF2] flex items-center justify-center font-bold text-xs">
                      {lead.industry === "Voice Note" ? <Mic className="h-4 w-4 text-rose-500" /> : lead.company.charAt(0)}
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <h3 className="text-base font-bold text-foreground">{lead.company}</h3>
                        {lead.industry === "Voice Note" && (
                          <Badge variant="destructive" className="text-[10px] gap-1 px-1.5 py-0 bg-rose-500/10 text-rose-600 dark:text-rose-400 border border-rose-500/20">
                            <Mic className="h-2.5 w-2.5" /> Voice Note
                          </Badge>
                        )}
                      </div>
                      <p className="text-xs text-muted-foreground">
                        Contact: {lead.name} • {lead.industry}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 self-start sm:self-auto">
                    <Badge
                      variant={
                        lead.status === "New"
                          ? "warning"
                          : lead.status === "Converted"
                          ? "success"
                          : "accent"
                      }
                    >
                      {lead.status}
                    </Badge>
                    <span className="text-xs font-mono text-muted-foreground">
                      {lead.submittedAt}
                    </span>
                  </div>
                </div>

                {/* Problem Description Callout */}
                <div className="p-4 rounded-xl bg-muted/60 text-xs space-y-2">
                  <span className="font-semibold text-foreground">Problem Description / Note:</span>
                  <p className="text-muted-foreground leading-relaxed">
                    &ldquo;{lead.problemDescription}&rdquo;
                  </p>

                  {/* Audio Player for Voice Notes */}
                  {lead.audioFileUrl && (
                    <div className="pt-2 border-t border-border/40 space-y-1.5">
                      <div className="flex items-center gap-2 text-rose-600 dark:text-rose-400 font-bold text-xs">
                        <Volume2 className="h-4 w-4 animate-pulse" />
                        <span>Recorded Client Voice Note:</span>
                      </div>
                      <audio
                        controls
                        src={lead.audioFileUrl}
                        className="w-full h-9 rounded-lg bg-background border border-border"
                      />
                    </div>
                  )}
                </div>

                {/* Contact details & Action Controls */}
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pt-2 text-xs">
                  <div className="flex items-center gap-4 text-muted-foreground">
                    <span className="flex items-center gap-1.5">
                      <Mail className="h-3.5 w-3.5 text-[#5B5CE2] dark:text-[#7C7EF2]" />
                      {lead.email}
                    </span>
                    <span className="flex items-center gap-1.5">
                      <Phone className="h-3.5 w-3.5 text-[#5B5CE2] dark:text-[#7C7EF2]" />
                      {lead.phone}
                    </span>
                    <Badge variant="outline" className="text-[10px] capitalize">
                      Prefers {lead.preferredContact}
                    </Badge>
                  </div>

                  <div className="flex items-center gap-2">
                    {lead.status === "New" && (
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => updateLeadStatus(lead.id, "Contacted")}
                        className="text-xs gap-1.5"
                      >
                        <CheckCircle2 className="h-3.5 w-3.5 text-emerald-500" />
                        <span>Mark Contacted</span>
                      </Button>
                    )}

                    {lead.status !== "Converted" && (
                      <Button
                        variant="cta"
                        size="sm"
                        onClick={() => updateLeadStatus(lead.id, "Converted")}
                        className="text-xs gap-1.5"
                      >
                        <UserPlus className="h-3.5 w-3.5" />
                        <span>Convert to Client</span>
                      </Button>
                    )}
                  </div>
                </div>
              </Card>
            ))
          )}
        </div>
      )}
    </div>
  );
}
