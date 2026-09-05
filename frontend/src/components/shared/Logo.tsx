"use client";

import React from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { useLanguage } from "@/i18n/LanguageContext";

interface LogoProps {
  variant?: "full" | "bangla" | "english" | "mark";
  size?: "sm" | "md" | "lg" | "xl";
  className?: string;
  href?: string;
}

export function LogoMark({ className }: { className?: string }) {
  return (
    <div className={cn("relative inline-flex items-center justify-center shrink-0 overflow-hidden rounded-xl bg-white dark:bg-card p-1 border border-border/80 shadow-xs", className)}>
      <img src="/logo.png" alt="ALAP Logo" className="h-full w-full object-contain" />
    </div>
  );
}

export function Logo({
  variant = "full",
  size = "md",
  className,
  href = "/",
}: LogoProps) {
  const { locale } = useLanguage();

  const sizeClasses = {
    sm: "text-lg space-x-2",
    md: "text-xl space-x-2.5",
    lg: "text-2xl space-x-3",
    xl: "text-3xl space-x-3.5",
  };

  const markSizes = {
    sm: "h-6 w-6",
    md: "h-8 w-8",
    lg: "h-10 w-10",
    xl: "h-12 w-12",
  };

  const showBangla = variant === "bangla" || (variant === "full" && locale === "bn");
  const showEnglish = variant === "english" || (variant === "full" && locale !== "bn");

  const content = (
    <div
      className={cn(
        "inline-flex items-center font-bold tracking-tight transition-opacity hover:opacity-90",
        sizeClasses[size],
        className
      )}
    >
      <LogoMark className={markSizes[size]} />
      {variant !== "mark" && (
        <span className="flex items-center font-black text-[#5B5CE2] dark:text-[#7C7EF2] tracking-tight">
          {showBangla && <span className="font-tiro font-bold">আলাপ</span>}
          {showEnglish && <span className="font-sf">ALAP</span>}
        </span>
      )}
    </div>
  );

  if (href) {
    return <Link href={href}>{content}</Link>;
  }

  return content;
}
