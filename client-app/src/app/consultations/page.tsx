"use client";

import React, { useState } from "react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { initialLeads, ConsultationLead } from "@/features/clients/clientsData";
import {
  MessageSquare,
  Phone,
  Mail,
  MessageCircle,
  CheckCircle2,
  Clock,
  Send,
  UserPlus,
  Filter,
} from "lucide-react";

export default function ConsultationsQueuePage() {
  const [leads, setLeads] = useState<ConsultationLead[]>(initialLeads);
  const [statusFilter, setStatusFilter] = useState<string>("All");

  const updateLeadStatus = (id: string, newStatus: ConsultationLead["status"]) => {
    setLeads(
      leads.map((lead) => (lead.id === id ? { ...lead, status: newStatus } : lead))
    );
  };

  const filteredLeads = leads.filter(
    (lead) => statusFilter === "All" || lead.status === statusFilter
  );

  return (
    <div className="space-y-6">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-foreground">
            Consultation Queue & Leads
          </h1>
          <p className="text-xs sm:text-sm text-muted-foreground pt-1">
            Review incoming consultation inquiries from ALAP web forms and manage lead follow-up.
          </p>
        </div>

        {/* Filter Controls */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0">
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

      {/* Leads List */}
      <div className="space-y-4">
        {filteredLeads.map((lead) => (
          <Card key={lead.id} className="p-6 space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-border">
              <div className="flex items-center gap-3">
                <div className="h-9 w-9 rounded-xl bg-[#5B5CE2]/10 text-[#5B5CE2] dark:bg-[#7C7EF2]/20 dark:text-[#7C7EF2] flex items-center justify-center font-bold text-xs">
                  {lead.company.charAt(0)}
                </div>
                <div>
                  <h3 className="text-base font-bold text-foreground">{lead.company}</h3>
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
            <div className="p-4 rounded-xl bg-muted/60 text-xs space-y-1">
              <span className="font-semibold text-foreground">Problem Description:</span>
              <p className="text-muted-foreground leading-relaxed">
                &ldquo;{lead.problemDescription}&rdquo;
              </p>
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
        ))}
      </div>
    </div>
  );
}
