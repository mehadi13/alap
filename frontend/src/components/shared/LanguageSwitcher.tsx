"use client";

import * as React from "react";
import { Globe } from "lucide-react";
import { cn } from "@/lib/utils";
import { useLanguage } from "@/i18n/LanguageContext";

interface LanguageSwitcherProps {
  className?: string;
}

export function LanguageSwitcher({ className }: LanguageSwitcherProps) {
  const { locale, setLocale } = useLanguage();

  return (
    <div
      className={cn(
        "inline-flex items-center gap-1 rounded-full border border-border bg-muted p-1 text-xs font-semibold shadow-xs",
        className
      )}
    >
      {/* <Globe className="h-3.5 w-3.5 ml-1 text-muted-foreground" /> */}
      <button
        type="button"
        onClick={() => setLocale("en")}
        className={cn(
          "rounded-full px-2.5 py-0.5 transition-all",
          locale === "en"
            ? "bg-card text-foreground shadow-xs"
            : "text-muted-foreground hover:text-foreground"
        )}
      >
        EN
      </button>
      <button
        type="button"
        onClick={() => setLocale("bn")}
        className={cn(
          "rounded-full px-2.5 py-0.5 transition-all font-sans",
          locale === "bn"
            ? "bg-card text-foreground shadow-xs"
            : "text-muted-foreground hover:text-foreground"
        )}
      >
        বাং
      </button>
    </div>
  );
}
