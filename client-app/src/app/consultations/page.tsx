"use client";

import React, { useState, useEffect, useCallback } from "react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { initialLeads, ConsultationLead } from "@/features/clients/clientsData";
import { convertLeadToClientRecord } from "@/features/clients/clientsStore";
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
  MessageSquare,
  Calendar,
  PhoneCall,
  Filter,
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
  channelType?: "message" | "meeting" | "call" | "voice note";
  durationSeconds: number;
  audioFileUrl?: string;
  status: "New" | "Contacted" | "Proposal Sent" | "Converted" | "Archived";
  createdAt: string;
}

export default function ConsultationsQueuePage() {
  const [leads, setLeads] = useState<ConsultationLead[]>([]);
  const [statusFilter, setStatusFilter] = useState<string>("All");
  const [isFilterOpen, setIsFilterOpen] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isRefreshing, setIsRefreshing] = useState<boolean>(false);
  const [isBackendLive, setIsBackendLive] = useState<boolean>(false);

  const fetchConsultations = useCallback(async (showRefreshing = false) => {
    if (showRefreshing) setIsRefreshing(true);

    try {
      const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL || `${process.env.NEXT_PUBLIC_API_URL || "http://187.77.152.224:8081"}/api/v1/consultation`;
      const response = await fetch(backendUrl);

      if (response.ok) {
        const json = await response.json();
        const rawList = Array.isArray(json.data)
          ? json.data
          : (json.data && Array.isArray(json.data.content))
          ? json.data.content
          : null;

        if (json.success && rawList) {
          const mappedLeads: ConsultationLead[] = rawList.map((item: ApiConsultation) => {
            let channel: "message" | "meeting" | "call" | "voice note" = "message";
            if (item.channelType === "voice note" || item.channelType === "meeting" || item.channelType === "call" || item.channelType === "message") {
              channel = item.channelType;
            } else if (item.type === "VOICE" || item.problemDescription?.includes("[VOICE NOTE]")) {
              channel = "voice note";
            } else if (item.type === "CALL" || item.problemDescription?.includes("[CALL BACK REQUEST]")) {
              channel = "call";
            } else if (item.type === "MEETING" || item.problemDescription?.includes("[MEETING REQUEST]")) {
              channel = "meeting";
            }

            return {
              id: item.id,
              name: item.name,
              company: item.company || `${item.name}'s Business`,
              email: item.email,
              phone: item.phone,
              industry: item.businessType || (
                channel === "voice note" ? "Voice Note" :
                  channel === "call" ? "Call Back" :
                    channel === "meeting" ? "Scheduled Meeting" : "General Inquiry"
              ),
              problemDescription: item.problemDescription,
              preferredContact: item.preferredContact || "phone",
              channelType: channel,
              audioFileUrl: item.audioFileUrl,
              submittedAt: item.createdAt ? new Date(item.createdAt).toLocaleString("en-US", {
                dateStyle: "medium",
                timeStyle: "short",
              }) : "Recently",
              status: item.status || "New",
            };
          });

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
      const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL || `${process.env.NEXT_PUBLIC_API_URL || "http://187.77.152.224:8081"}/api/v1/consultation`;
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

  const handleConvertToClient = async (lead: ConsultationLead) => {
    updateLeadStatus(lead.id, "Converted");

    try {
      const apiHost = process.env.NEXT_PUBLIC_API_URL || "http://187.77.152.224:8081";
      const convertUrl = `${apiHost}/api/v1/clients/convert/${lead.id}`;
      const response = await fetch(convertUrl, { method: "POST" });
      if (!response.ok) {
        convertLeadToClientRecord({
          id: lead.id,
          name: lead.name,
          company: lead.company,
          email: lead.email,
          phone: lead.phone,
          industry: lead.industry,
          problemDescription: lead.problemDescription,
        });
      }
    } catch {
      convertLeadToClientRecord({
        id: lead.id,
        name: lead.name,
        company: lead.company,
        email: lead.email,
        phone: lead.phone,
        industry: lead.industry,
        problemDescription: lead.problemDescription,
      });
    }
  };

  const filteredLeads = leads.filter(
    (lead) => statusFilter === "All" || lead.status === statusFilter
  );

  const getChannelBadge = (channel?: "message" | "meeting" | "call" | "voice note") => {
    switch (channel) {
      case "voice note":
        return (
          <Badge variant="destructive" className="text-[10px] gap-1 px-2 py-0.5 bg-rose-500/10 text-rose-600 dark:text-rose-400 border border-rose-500/20 font-bold">
            <Mic className="h-3 w-3" /> Voice Note
          </Badge>
        );
      case "meeting":
        return (
          <Badge variant="outline" className="text-[10px] gap-1 px-2 py-0.5 bg-purple-500/10 text-purple-600 dark:text-purple-400 border border-purple-500/20 font-bold">
            <Calendar className="h-3 w-3" /> Meeting
          </Badge>
        );
      case "call":
        return (
          <Badge variant="outline" className="text-[10px] gap-1 px-2 py-0.5 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20 font-bold">
            <PhoneCall className="h-3 w-3" /> Call Back
          </Badge>
        );
      case "message":
      default:
        return (
          <Badge variant="outline" className="text-[10px] gap-1 px-2 py-0.5 bg-[#5B5CE2]/10 text-[#5B5CE2] dark:text-[#7C7EF2] border border-[#5B5CE2]/20 font-bold">
            <MessageSquare className="h-3 w-3" /> Message
          </Badge>
        );
    }
  };

  const getChannelIcon = (channel?: "message" | "meeting" | "call" | "voice note") => {
    switch (channel) {
      case "voice note":
        return <Mic className="h-4 w-4 text-rose-500" />;
      case "meeting":
        return <Calendar className="h-4 w-4 text-purple-500" />;
      case "call":
        return <PhoneCall className="h-4 w-4 text-emerald-500" />;
      case "message":
      default:
        return <MessageSquare className="h-4 w-4 text-[#5B5CE2] dark:text-[#7C7EF2]" />;
    }
  };

  return (
    <div className="space-y-6">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-foreground">
              Consultation Queue & Leads
            </h1>
            {/* {isBackendLive ? (
              <Badge variant="outline" className="text-xs bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/30 font-bold gap-1">
                <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
                Live DB Connected
              </Badge>
            ) : (
              <Badge variant="outline" className="text-xs bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/30 font-bold">
                Offline Mode (Demo Data)
              </Badge>
            )} */}
          </div>
          <p className="text-xs sm:text-sm text-muted-foreground pt-1">
            Review incoming consultation inquiries across all 4 channels (Message, Meeting, Call, Voice Note).
          </p>
        </div>

        {/* Filter Controls & Refresh */}
        <div className="flex items-center gap-2">
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

          {/* Filter Dropdown Menu */}
          <div className="relative">
            <Button
              variant={statusFilter !== "All" ? "cta" : "outline"}
              size="sm"
              onClick={() => setIsFilterOpen(!isFilterOpen)}
              className="h-8 gap-1.5 text-xs rounded-xl font-bold"
            >
              <Filter className="h-3.5 w-3.5" />
              <span>Filter{statusFilter !== "All" ? `: ${statusFilter}` : ""}</span>
            </Button>

            {isFilterOpen && (
              <>
                {/* Backdrop to close filter menu on click outside */}
                <div
                  className="fixed inset-0 z-20"
                  onClick={() => setIsFilterOpen(false)}
                />

                <div className="absolute right-0 mt-2 w-48 rounded-2xl bg-card border border-border p-2 shadow-2xl z-30 space-y-1 animate-in fade-in zoom-in-95 duration-150">
                  <div className="px-3 py-1.5 text-[10px] font-bold text-muted-foreground uppercase tracking-wider border-b border-border/50 mb-1">
                    Filter By Status
                  </div>
                  {["All", "New", "Contacted", "Proposal Sent", "Converted"].map((st) => (
                    <button
                      key={st}
                      type="button"
                      onClick={() => {
                        setStatusFilter(st);
                        setIsFilterOpen(false);
                      }}
                      className={`w-full text-left px-3 py-2 rounded-xl text-xs font-semibold flex items-center justify-between transition-all ${
                        statusFilter === st
                          ? "bg-[#5B5CE2]/10 text-[#5B5CE2] dark:bg-[#7C7EF2]/20 dark:text-[#7C7EF2] font-bold"
                          : "text-muted-foreground hover:bg-muted hover:text-foreground"
                      }`}
                    >
                      <span>{st}</span>
                      {statusFilter === st && (
                        <CheckCircle2 className="h-3.5 w-3.5 text-[#5B5CE2] dark:text-[#7C7EF2]" />
                      )}
                    </button>
                  ))}
                </div>
              </>
            )}
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
                    <div className="h-9 w-9 rounded-xl bg-muted flex items-center justify-center font-bold text-xs">
                      {getChannelIcon(lead.channelType)}
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <h3 className="text-base font-bold text-foreground">{lead.company}</h3>
                        {getChannelBadge(lead.channelType)}
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
                        onClick={() => handleConvertToClient(lead)}
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
