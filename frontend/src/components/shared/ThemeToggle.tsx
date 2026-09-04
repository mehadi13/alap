"use client";

import * as React from "react";
import { Moon, Sun, Monitor } from "lucide-react";
import { useTheme } from "@/components/shared/ThemeProvider";
import { cn } from "@/lib/utils";

interface ThemeToggleProps {
  className?: string;
  showLabels?: boolean;
}

const emptySubscribe = () => () => {};

export function ThemeToggle({ className, showLabels = false }: ThemeToggleProps) {
  const { theme, setTheme } = useTheme();
  const isMounted = React.useSyncExternalStore(
    emptySubscribe,
    () => true,
    () => false
  );

  if (!isMounted) {
    return (
      <div className={cn("inline-flex items-center gap-1 rounded-full border border-[#E5E5E5] p-1 dark:border-[#292929]", className)}>
        <div className="h-7 w-7 rounded-full bg-[#F3F3F3] dark:bg-[#1C1C1C] animate-pulse" />
      </div>
    );
  }

  return (
    <div
      className={cn(
        "inline-flex items-center gap-1 rounded-full border border-[#E5E5E5] bg-[#F3F3F3] p-1 shadow-xs dark:border-[#292929] dark:bg-[#1C1C1C]",
        className
      )}
    >
      <button
        type="button"
        onClick={() => setTheme("light")}
        className={cn(
          "flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-semibold transition-all",
          theme === "light"
            ? "bg-[#FFFFFF] text-[#111111] shadow-xs dark:bg-[#141414] dark:text-[#F5F5F5]"
            : "text-[#6B6B6B] hover:text-[#111111] dark:text-[#A3A3A3] dark:hover:text-[#F5F5F5]"
        )}
        title="Light Theme"
      >
        <Sun className="h-3.5 w-3.5" />
        {showLabels && <span>Light</span>}
      </button>

      <button
        type="button"
        onClick={() => setTheme("dark")}
        className={cn(
          "flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-semibold transition-all",
          theme === "dark"
            ? "bg-[#FFFFFF] text-[#111111] shadow-xs dark:bg-[#141414] dark:text-[#F5F5F5]"
            : "text-[#6B6B6B] hover:text-[#111111] dark:text-[#A3A3A3] dark:hover:text-[#F5F5F5]"
        )}
        title="Dark Theme"
      >
        <Moon className="h-3.5 w-3.5" />
        {showLabels && <span>Dark</span>}
      </button>

      <button
        type="button"
        onClick={() => setTheme("system")}
        className={cn(
          "flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-semibold transition-all",
          theme === "system"
            ? "bg-[#FFFFFF] text-[#111111] shadow-xs dark:bg-[#141414] dark:text-[#F5F5F5]"
            : "text-[#6B6B6B] hover:text-[#111111] dark:text-[#A3A3A3] dark:hover:text-[#F5F5F5]"
        )}
        title="System Theme"
      >
        <Monitor className="h-3.5 w-3.5" />
        {showLabels && <span>System</span>}
      </button>
    </div>
  );
}
