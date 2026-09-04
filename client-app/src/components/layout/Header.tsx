"use client";

import React from "react";
import { Bell, PanelLeftClose, PanelLeftOpen } from "lucide-react";

interface HeaderProps {
  isCollapsed?: boolean;
  onToggleSidebar?: () => void;
}

export function Header({ isCollapsed, onToggleSidebar }: HeaderProps) {
  return (
    <header className="h-14 border-b border-border bg-card/50 backdrop-blur-md px-6 flex items-center justify-between sticky top-0 z-30 transition-colors duration-200">
      {/* Sidebar Collapse Toggle Button on Top Bar */}
      <button
        type="button"
        onClick={onToggleSidebar}
        className="p-2 rounded-xl border border-border bg-background text-muted-foreground hover:text-foreground hover:bg-muted transition-colors cursor-pointer"
        title={isCollapsed ? "Expand Sidebar" : "Collapse Sidebar"}
      >
        {isCollapsed ? (
          <PanelLeftOpen className="h-4 w-4 text-[#5B5CE2] dark:text-[#7C7EF2]" />
        ) : (
          <PanelLeftClose className="h-4 w-4" />
        )}
      </button>

      {/* Notifications Button */}
      <button
        type="button"
        className="relative p-2 rounded-xl border border-border bg-background text-muted-foreground hover:text-foreground transition-colors cursor-pointer"
        title="Notifications"
      >
        <Bell className="h-4 w-4" />
        <span className="absolute top-1.5 right-1.5 h-2 w-2 rounded-full bg-[#5B5CE2] dark:bg-[#7C7EF2]" />
      </button>
    </header>
  );
}
