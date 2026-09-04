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

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const isClient = useIsClient();

  if (!isClient) {
    return (
      <div className="h-8 w-8 rounded-lg border border-border bg-muted/50 animate-pulse" />
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
