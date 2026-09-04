"use client";

import React from "react";
import { ThemeToggle } from "@/components/shared/ThemeToggle";
import { Search, Bell, Sparkles, UserCheck } from "lucide-react";
import { Input } from "@/components/ui/input";

export function Header() {
  return (
    <header className="h-16 border-b border-border bg-card/50 backdrop-blur-md px-6 flex items-center justify-between sticky top-0 z-30 transition-colors duration-200">
      {/* Global Search Bar */}
      <div className="relative w-72">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Search clients, leads, invoices..."
          className="pl-9 h-9 text-xs bg-background"
        />
      </div>

      {/* Action Controls & Profile */}
      <div className="flex items-center gap-4">
        <ThemeToggle />

        <button
          type="button"
          className="relative p-2 rounded-xl border border-border bg-background text-muted-foreground hover:text-foreground transition-colors"
          title="Notifications"
        >
          <Bell className="h-4 w-4" />
          <span className="absolute top-1.5 right-1.5 h-2 w-2 rounded-full bg-[#5B5CE2] dark:bg-[#7C7EF2]" />
        </button>

        <div className="h-4 w-px bg-border" />

        {/* User Profile */}
        <div className="flex items-center gap-3">
          <div className="h-8 w-8 rounded-xl bg-gradient-to-tr from-[#5B5CE2] to-[#7C7EF2] flex items-center justify-center text-white font-bold text-xs shadow-xs">
            AD
          </div>
          <div className="hidden sm:block text-left">
            <div className="text-xs font-bold text-foreground leading-none">ALAP Admin</div>
            <div className="text-[10px] text-muted-foreground pt-0.5">admin@alap.ai</div>
          </div>
        </div>
      </div>
    </header>
  );
}
