"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Users,
  MessageSquare,
  Settings,
  Sparkles,
  ShieldCheck,
  Building2,
  ExternalLink,
} from "lucide-react";
import { cn } from "@/lib/utils";

const navItems = [
  {
    label: "Dashboard",
    href: "/",
    icon: LayoutDashboard,
  },
  {
    label: "Clients Directory",
    href: "/clients",
    icon: Users,
  },
  {
    label: "Consultation Queue",
    href: "/consultations",
    icon: MessageSquare,
  },
  {
    label: "Settings",
    href: "/settings",
    icon: Settings,
  },
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-64 border-r border-border bg-card flex flex-col justify-between p-4 shrink-0 transition-colors duration-200">
      <div className="space-y-6">
        {/* Brand Header */}
        <Link href="/" className="flex items-center gap-3 px-2 pt-2">
          <div className="h-9 w-9 rounded-xl bg-[#5B5CE2] dark:bg-[#7C7EF2] flex items-center justify-center text-white font-black text-lg shadow-sm">
            A
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="font-extrabold text-lg text-foreground tracking-tight">ALAP</span>
              <span className="text-[10px] uppercase font-bold tracking-wider px-1.5 py-0.5 rounded-md bg-[#5B5CE2]/10 text-[#5B5CE2] dark:bg-[#7C7EF2]/20 dark:text-[#7C7EF2]">
                Client Portal
              </span>
            </div>
            <p className="text-[11px] text-muted-foreground">Client Management Hub</p>
          </div>
        </Link>

        {/* Navigation Menu */}
        <nav className="space-y-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href;

            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-semibold transition-all",
                  isActive
                    ? "bg-[#5B5CE2] text-white dark:bg-[#7C7EF2] shadow-xs"
                    : "text-muted-foreground hover:text-foreground hover:bg-muted"
                )}
              >
                <Icon className="h-4 w-4 shrink-0" />
                <span>{item.label}</span>
              </Link>
            );
          })}
        </nav>
      </div>

      {/* Footer Info / Status Card */}
      <div className="space-y-3 pt-4 border-t border-border">
        <div className="rounded-xl bg-background border border-border p-3 space-y-2 text-xs">
          <div className="flex items-center justify-between text-muted-foreground">
            <span className="font-medium text-[11px]">Backend API</span>
            <span className="flex items-center gap-1 text-[11px] font-semibold text-emerald-500">
              <ShieldCheck className="h-3 w-3" />
              UP
            </span>
          </div>
          <p className="text-[11px] text-muted-foreground">
            Spring Boot 3.4.3 @ localhost:8080
          </p>
        </div>

        <a
          href="http://localhost:3000"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-between px-3 py-2 rounded-xl text-xs font-medium text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
        >
          <span className="flex items-center gap-2">
            <Building2 className="h-3.5 w-3.5 text-[#5B5CE2] dark:text-[#7C7EF2]" />
            Main ALAP Site
          </span>
          <ExternalLink className="h-3 w-3" />
        </a>
      </div>
    </aside>
  );
}
