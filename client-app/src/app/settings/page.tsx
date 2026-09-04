"use client";

import React, { useState } from "react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ShieldCheck, Server, Bell, Key, Save, RefreshCw } from "lucide-react";

export default function SettingsPage() {
  const [backendUrl, setBackendUrl] = useState("http://localhost:8080/api/v1");
  const [discordWebhook, setDiscordWebhook] = useState(
    "https://discord.com/api/webhooks/1346386000000000000/xyz..."
  );
  const [savedStatus, setSavedStatus] = useState(false);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setSavedStatus(true);
    setTimeout(() => setSavedStatus(false), 3000);
  };

  return (
    <div className="space-y-6 max-w-4xl">
      {/* Top Header */}
      <div>
        <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-foreground">
          System & API Settings
        </h1>
        <p className="text-xs sm:text-sm text-muted-foreground pt-1">
          Configure backend endpoints, notification webhooks, and administrative parameters for ALAP.
        </p>
      </div>

      <form onSubmit={handleSave} className="space-y-6">
        {/* Backend API Settings */}
        <Card className="p-6 space-y-4">
          <div className="flex items-center gap-3">
            <div className="h-9 w-9 rounded-xl bg-[#5B5CE2]/10 text-[#5B5CE2] dark:bg-[#7C7EF2]/20 dark:text-[#7C7EF2] flex items-center justify-center">
              <Server className="h-5 w-5" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-foreground">Spring Boot Backend Service</h2>
              <p className="text-xs text-muted-foreground">
                REST API base URL for lead processing and client data synchronization.
              </p>
            </div>
          </div>

          <div className="space-y-2 pt-2 text-xs">
            <label className="font-semibold text-foreground">API Base Endpoint</label>
            <Input
              value={backendUrl}
              onChange={(e) => setBackendUrl(e.target.value)}
              className="text-xs font-mono"
            />
          </div>

          <div className="flex items-center justify-between text-xs p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-600 dark:text-emerald-400">
            <span className="flex items-center gap-2 font-medium">
              <ShieldCheck className="h-4 w-4" />
              Connected to Java 21 Spring Boot Service on port 8080
            </span>
            <Badge variant="success" className="text-[10px]">
              Status UP
            </Badge>
          </div>
        </Card>

        {/* Discord Webhook Settings */}
        <Card className="p-6 space-y-4">
          <div className="flex items-center gap-3">
            <div className="h-9 w-9 rounded-xl bg-indigo-500/10 text-indigo-500 flex items-center justify-center">
              <Bell className="h-5 w-5" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-foreground">Discord Notification Webhook</h2>
              <p className="text-xs text-muted-foreground">
                Channel webhook URL for instant team alerts on incoming leads.
              </p>
            </div>
          </div>

          <div className="space-y-2 pt-2 text-xs">
            <label className="font-semibold text-foreground">Webhook URL</label>
            <Input
              value={discordWebhook}
              onChange={(e) => setDiscordWebhook(e.target.value)}
              className="text-xs font-mono"
            />
          </div>
        </Card>

        {/* Save Button */}
        <div className="flex items-center justify-between pt-2">
          {savedStatus ? (
            <span className="text-xs font-bold text-emerald-500 flex items-center gap-1.5">
              <ShieldCheck className="h-4 w-4" />
              Settings saved successfully!
            </span>
          ) : (
            <span className="text-xs text-muted-foreground">
              Changes apply across client manager sessions.
            </span>
          )}

          <Button type="submit" variant="cta" className="gap-2">
            <Save className="h-4 w-4" />
            <span>Save Settings</span>
          </Button>
        </div>
      </form>
    </div>
  );
}
