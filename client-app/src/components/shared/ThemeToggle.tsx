"use client";

import React, { useSyncExternalStore } from "react";
import { Sun, Moon, Laptop } from "lucide-react";
import { useTheme } from "./ThemeProvider";

const emptySubscribe = () => () => {};

function useIsClient() {
  return useSyncExternalStore(
    emptySubscribe,
    () => true,
    () => false
  );
}

interface ThemeToggleProps {
  compact?: boolean;
}

export function ThemeToggle({ compact = false }: ThemeToggleProps) {
  const { theme, setTheme, resolvedTheme } = useTheme();
  const isClient = useIsClient();

  if (!isClient) {
    return compact ? (
      <div className="h-8 w-8 rounded-xl border border-border bg-muted/50 animate-pulse" />
    ) : (
      <div className="h-8 w-24 rounded-xl border border-border bg-muted/50 animate-pulse" />
    );
  }

  const cycleTheme = () => {
    if (theme === "light") setTheme("dark");
    else if (theme === "dark") setTheme("system");
    else setTheme("light");
  };

  if (compact) {
    return (
      <button
        type="button"
        onClick={cycleTheme}
        className="h-8 w-8 rounded-xl border border-border bg-background text-muted-foreground hover:text-foreground hover:bg-muted transition-colors cursor-pointer flex items-center justify-center"
        title={`Current Theme: ${theme} (Click to switch)`}
      >
        {resolvedTheme === "dark" ? (
          <Moon className="h-4 w-4 text-[#7C7EF2]" />
        ) : (
          <Sun className="h-4 w-4 text-[#5B5CE2]" />
        )}
      </button>
    );
  }

  return (
    <div className="flex items-center gap-1 rounded-xl border border-border bg-muted p-1 text-xs">
      <button
        type="button"
        onClick={() => setTheme("light")}
        className={`rounded-lg p-1.5 transition-all ${
          theme === "light"
            ? "bg-background text-foreground shadow-xs font-medium"
            : "text-muted-foreground hover:text-foreground"
        }`}
        title="Light Mode"
      >
        <Sun className="h-3.5 w-3.5" />
      </button>
      <button
        type="button"
        onClick={() => setTheme("dark")}
        className={`rounded-lg p-1.5 transition-all ${
          theme === "dark"
            ? "bg-background text-foreground shadow-xs font-medium"
            : "text-muted-foreground hover:text-foreground"
        }`}
        title="Dark Mode"
      >
        <Moon className="h-3.5 w-3.5" />
      </button>
      <button
        type="button"
        onClick={() => setTheme("system")}
        className={`rounded-lg p-1.5 transition-all ${
          theme === "system"
            ? "bg-background text-foreground shadow-xs font-medium"
            : "text-muted-foreground hover:text-foreground"
        }`}
        title="System Preference"
      >
        <Laptop className="h-3.5 w-3.5" />
      </button>
    </div>
  );
}
