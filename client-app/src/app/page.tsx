"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { initialClients, initialLeads, ClientRecord, ConsultationLead } from "@/features/clients/clientsData";
import {
  Users,
  MessageSquare,
  DollarSign,
  TrendingUp,
  Plus,
  ArrowRight,
  Sparkles,
  CheckCircle2,
  Clock,
  ChevronRight,
  ShieldAlert,
} from "lucide-react";

export default function DashboardPage() {
  const [clients] = useState<ClientRecord[]>(initialClients);
  const [leads] = useState<ConsultationLead[]>(initialLeads);

  const activeClientsCount = clients.filter((c) => c.status === "Active").length;
  const newLeadsCount = leads.filter((l) => l.status === "New").length;

  return (
    <div className="space-y-8">
      {/* Top Banner / Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-foreground">
            Client Management Dashboard
          </h1>
          <p className="text-xs sm:text-sm text-muted-foreground pt-1">
            Overview of ALAP&apos;s active client portfolio, automation setups, and consultation queue.
          </p>
        </div>

        <div className="flex items-center gap-3 self-start sm:self-auto">
          <Link href="/clients">
            <Button variant="cta" size="sm" className="gap-2">
              <Plus className="h-4 w-4" />
              <span>Add New Client</span>
            </Button>
          </Link>
        </div>
      </div>

      {/* Overview Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        <Card className="p-5 space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-muted-foreground">Active Clients</span>
            <div className="h-8 w-8 rounded-lg bg-[#5B5CE2]/10 text-[#5B5CE2] dark:bg-[#7C7EF2]/20 dark:text-[#7C7EF2] flex items-center justify-center">
              <Users className="h-4 w-4" />
            </div>
          </div>
          <div className="text-3xl font-black text-foreground">{activeClientsCount}</div>
          <div className="flex items-center gap-1.5 text-[11px] text-emerald-500 font-medium">
            <TrendingUp className="h-3.5 w-3.5" />
            <span>+2 onboarded this month</span>
          </div>
        </Card>

        <Card className="p-5 space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-muted-foreground">Consultation Leads</span>
            <div className="h-8 w-8 rounded-lg bg-amber-500/10 text-amber-500 flex items-center justify-center">
              <MessageSquare className="h-4 w-4" />
            </div>
          </div>
          <div className="text-3xl font-black text-foreground">{newLeadsCount}</div>
          <div className="flex items-center gap-1.5 text-[11px] text-amber-500 font-medium">
            <Clock className="h-3.5 w-3.5" />
            <span>Awaiting first contact</span>
          </div>
        </Card>

        <Card className="p-5 space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-muted-foreground">Monthly Recurring</span>
            <div className="h-8 w-8 rounded-lg bg-emerald-500/10 text-emerald-500 flex items-center justify-center">
              <DollarSign className="h-4 w-4" />
            </div>
          </div>
          <div className="text-3xl font-black text-foreground">$3,100</div>
          <div className="flex items-center gap-1.5 text-[11px] text-emerald-500 font-medium">
            <CheckCircle2 className="h-3.5 w-3.5" />
            <span>100% active contracts</span>
          </div>
        </Card>

        <Card className="p-5 space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-muted-foreground">Automations Live</span>
            <div className="h-8 w-8 rounded-lg bg-indigo-500/10 text-indigo-500 flex items-center justify-center">
              <Sparkles className="h-4 w-4" />
            </div>
          </div>
          <div className="text-3xl font-black text-foreground">14</div>
          <div className="text-[11px] text-muted-foreground">Across 5 business sectors</div>
        </Card>
      </div>

      {/* Client Overview Grid & Consultation Queue */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Active Clients Summary Table */}
        <Card className="lg:col-span-8 p-6 space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Recent Clients</CardTitle>
              <CardDescription>Active business relationships & solution deployments</CardDescription>
            </div>
            <Link href="/clients">
              <Button variant="outline" size="sm" className="gap-1.5 text-xs">
                <span>View All ({clients.length})</span>
                <ChevronRight className="h-3.5 w-3.5" />
              </Button>
            </Link>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="border-b border-border text-muted-foreground font-semibold">
                <tr>
                  <th className="py-3 px-3">Client / Company</th>
                  <th className="py-3 px-3">Solution Assigned</th>
                  <th className="py-3 px-3">Status</th>
                  <th className="py-3 px-3 text-right">Value</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {clients.slice(0, 4).map((client) => (
                  <tr key={client.id} className="hover:bg-muted/50 transition-colors">
                    <td className="py-3 px-3">
                      <div className="font-bold text-foreground">{client.company}</div>
                      <div className="text-[11px] text-muted-foreground">{client.name}</div>
                    </td>
                    <td className="py-3 px-3 text-muted-foreground font-medium">
                      {client.solution}
                    </td>
                    <td className="py-3 px-3">
                      <Badge
                        variant={
                          client.status === "Active"
                            ? "success"
                            : client.status === "Onboarding"
                            ? "accent"
                            : "warning"
                        }
                        className="text-[10px]"
                      >
                        {client.status}
                      </Badge>
                    </td>
                    <td className="py-3 px-3 text-right font-bold text-foreground">
                      {client.monthlyValue}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>

        {/* Incoming Leads Column */}
        <Card className="lg:col-span-4 p-6 space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Incoming Leads</CardTitle>
              <CardDescription>New consultation requests</CardDescription>
            </div>
            <Link href="/consultations">
              <Button variant="ghost" size="sm" className="gap-1 text-xs">
                <span>Queue</span>
                <ArrowRight className="h-3.5 w-3.5" />
              </Button>
            </Link>
          </div>

          <div className="space-y-3">
            {leads.map((lead) => (
              <div
                key={lead.id}
                className="p-3.5 rounded-xl border border-border bg-background space-y-2 hover:border-[#5B5CE2]/50 dark:hover:border-[#7C7EF2]/50 transition-colors"
              >
                <div className="flex items-center justify-between">
                  <span className="font-bold text-xs text-foreground">{lead.company}</span>
                  <Badge variant="warning" className="text-[10px]">
                    {lead.status}
                  </Badge>
                </div>
                <p className="text-[11px] text-muted-foreground line-clamp-2">
                  &ldquo;{lead.problemDescription}&rdquo;
                </p>
                <div className="flex items-center justify-between text-[10px] text-muted-foreground pt-1 border-t border-border/50">
                  <span>{lead.name} ({lead.preferredContact})</span>
                  <span>{lead.submittedAt}</span>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
}
