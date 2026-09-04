"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Users,
  MessageSquare,
  Settings,
  BookOpen,
  Building2,
  ExternalLink,
  LogOut,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { ThemeToggle } from "@/components/shared/ThemeToggle";
import { useAuth } from "@/features/auth/AuthContext";

interface SidebarProps {
  isCollapsed?: boolean;
}

export function Sidebar({ isCollapsed = false }: SidebarProps) {
  const pathname = usePathname();
  const { user, logout } = useAuth();

  const isAdmin = user?.role === "ADMIN";

  const initials = user?.name
    ? user.name
        .split(" ")
        .map((n) => n[0])
        .join("")
        .toUpperCase()
        .slice(0, 2)
    : "US";

  const navItems = [
    {
      label: isAdmin ? "Admin Dashboard" : "My Client Portal",
      href: "/",
      icon: LayoutDashboard,
    },
    {
      label: isAdmin ? "Clients Directory" : "My Deployments",
      href: "/clients",
      icon: Users,
    },
    {
      label: isAdmin ? "Consultation Queue" : "Consultation Support",
      href: "/consultations",
      icon: MessageSquare,
    },
    {
      label: "Documentation",
      href: "/docs",
      icon: BookOpen,
    },
    ...(isAdmin
      ? [
          {
            label: "Settings",
            href: "/settings",
            icon: Settings,
          },
        ]
      : []),
  ];

  return (
    <aside
      className={cn(
        "border-r border-border bg-card flex flex-col justify-between p-4 shrink-0 transition-all duration-300 ease-in-out relative z-40 select-none",
        isCollapsed ? "w-20 px-2.5 py-4 items-center" : "w-64"
      )}
    >
      <div className="w-full space-y-6">
        {/* Brand Header */}
        <div
          className={cn(
            "flex items-center pt-1",
            isCollapsed ? "justify-center" : "px-2"
          )}
        >
          <Link href="/" className="flex items-center gap-3">
            <div className="h-9 w-9 rounded-xl bg-[#5B5CE2] dark:bg-[#7C7EF2] flex items-center justify-center text-white font-black text-lg shadow-sm shrink-0">
              A
            </div>
            {!isCollapsed && (
              <div>
                <div className="flex items-center gap-1.5">
                  <span className="font-extrabold text-lg text-foreground tracking-tight">ALAP</span>
                  <span className="text-[10px] uppercase font-bold tracking-wider px-1.5 py-0.5 rounded-md bg-[#5B5CE2]/10 text-[#5B5CE2] dark:bg-[#7C7EF2]/20 dark:text-[#7C7EF2]">
                    {user?.role || "PORTAL"}
                  </span>
                </div>
                <p className="text-[11px] text-muted-foreground">
                  {isAdmin ? "Client Management Hub" : "Client Operations Portal"}
                </p>
              </div>
            )}
          </Link>
        </div>

        {/* Navigation Menu */}
        <nav className="space-y-1 w-full">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href;

            return (
              <Link
                key={item.href}
                href={item.href}
                title={isCollapsed ? item.label : undefined}
                className={cn(
                  "flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-semibold transition-all",
                  isCollapsed ? "justify-center px-0" : "",
                  isActive
                    ? "bg-[#5B5CE2] text-white dark:bg-[#7C7EF2] shadow-xs"
                    : "text-muted-foreground hover:text-foreground hover:bg-muted"
                )}
              >
                <Icon className="h-4 w-4 shrink-0" />
                {!isCollapsed && <span>{item.label}</span>}
              </Link>
            );
          })}
        </nav>
      </div>

      {/* Sidebar Footer Controls & User Profile */}
      <div className="w-full space-y-3 pt-4 border-t border-border">
        {/* Theme Switcher */}
        <div
          className={cn(
            "flex items-center",
            isCollapsed ? "justify-center" : "justify-between px-1"
          )}
        >
          {!isCollapsed && <span className="text-[11px] font-semibold text-muted-foreground">Theme</span>}
          <ThemeToggle compact={isCollapsed} />
        </div>

        {/* User Profile & Logout */}
        {user ? (
          <div
            className={cn(
              "rounded-2xl bg-background border border-border transition-all",
              isCollapsed ? "p-2 flex flex-col items-center gap-2" : "p-3 space-y-3"
            )}
          >
            <div
              className={cn(
                "flex items-center min-w-0",
                isCollapsed ? "justify-center" : "justify-between"
              )}
              title={isCollapsed ? `${user.name} (${user.role})` : undefined}
            >
              <div className="flex items-center gap-2.5 min-w-0">
                <div className="h-8 w-8 rounded-xl bg-gradient-to-tr from-[#5B5CE2] to-[#7C7EF2] flex items-center justify-center text-white font-bold text-xs shrink-0 shadow-xs">
                  {initials}
                </div>
                {!isCollapsed && (
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-1">
                      <span className="text-xs font-bold text-foreground truncate">{user.name}</span>
                      <Badge
                        variant={user.role === "ADMIN" ? "accent" : "success"}
                        className="text-[8px] px-1 py-0 shrink-0"
                      >
                        {user.role}
                      </Badge>
                    </div>
                    <p className="text-[10px] text-muted-foreground truncate">{user.email}</p>
                  </div>
                )}
              </div>
            </div>

            <button
              type="button"
              onClick={logout}
              title="Sign Out"
              className={cn(
                "flex items-center justify-center gap-2 rounded-xl border border-rose-500/20 bg-rose-500/10 hover:bg-rose-500/20 text-rose-600 dark:text-rose-400 font-bold text-xs transition-colors cursor-pointer",
                isCollapsed ? "h-8 w-8 p-0" : "w-full py-2 px-3"
              )}
            >
              <LogOut className="h-3.5 w-3.5" />
              {!isCollapsed && <span>Sign Out</span>}
            </button>
          </div>
        ) : (
          <div
            className={cn(
              "rounded-2xl bg-background border border-border text-center text-xs",
              isCollapsed ? "p-2" : "p-3"
            )}
          >
            <Link
              href="/login"
              className="font-bold text-[#5B5CE2] dark:text-[#7C7EF2]"
              title={isCollapsed ? "Sign In" : undefined}
            >
              {isCollapsed ? "In" : "Sign In to Account"}
            </Link>
          </div>
        )}

        {/* External Main Site Link */}
        <a
          href="http://localhost:3000"
          target="_blank"
          rel="noopener noreferrer"
          title={isCollapsed ? "Main ALAP Site" : undefined}
          className={cn(
            "flex items-center rounded-xl text-xs font-medium text-muted-foreground hover:text-foreground hover:bg-muted transition-colors",
            isCollapsed ? "justify-center p-2.5" : "justify-between px-3 py-2"
          )}
        >
          <span className="flex items-center gap-2">
            <Building2 className="h-3.5 w-3.5 text-[#5B5CE2] dark:text-[#7C7EF2]" />
            {!isCollapsed && <span>Main ALAP Site</span>}
          </span>
          {!isCollapsed && <ExternalLink className="h-3 w-3" />}
        </a>
      </div>
    </aside>
  );
}
