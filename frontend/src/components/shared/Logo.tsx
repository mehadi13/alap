import React from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";

interface LogoProps {
  variant?: "full" | "bangla" | "english" | "mark";
  size?: "sm" | "md" | "lg" | "xl";
  className?: string;
  href?: string;
}

export function LogoMark({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 40 40"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={cn("h-8 w-8 text-[#5B5CE2] dark:text-[#7C7EF2]", className)}
    >
      {/* Outer rounded dialogue node */}
      <rect
        x="2"
        y="2"
        width="36"
        height="36"
        rx="10"
        fill="currentColor"
        fillOpacity="0.12"
      />
      {/* Interlocking dialogue curves forming 'A' */}
      <path
        d="M20 7L29 25H24.5L20 15.5L15.5 25H11L20 7Z"
        fill="url(#alap-accent-grad)"
      />
      <path
        d="M14 21.5H26C27.3807 21.5 28.5 22.6193 28.5 24C28.5 25.3807 27.3807 26.5 26 26.5H14C12.6193 26.5 11.5 25.3807 11.5 24C11.5 22.6193 12.6193 21.5 14 21.5Z"
        fill="url(#alap-accent-grad-sub)"
      />
      <circle cx="20" cy="30" r="2.5" fill="currentColor" />
      <defs>
        <linearGradient
          id="alap-accent-grad"
          x1="11"
          y1="7"
          x2="29"
          y2="25"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#5B5CE2" />
          <stop offset="1" stopColor="#4B4CCB" />
        </linearGradient>
        <linearGradient
          id="alap-accent-grad-sub"
          x1="11.5"
          y1="21.5"
          x2="28.5"
          y2="26.5"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#7C7EF2" />
          <stop offset="1" stopColor="#9294FF" />
        </linearGradient>
      </defs>
    </svg>
  );
}

export function Logo({
  variant = "full",
  size = "md",
  className,
  href = "/",
}: LogoProps) {
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

  const content = (
    <div
      className={cn(
        "inline-flex items-center font-bold tracking-tight text-[#111111] transition-opacity hover:opacity-90 dark:text-[#F5F5F5]",
        sizeClasses[size],
        className
      )}
    >
      <LogoMark className={markSizes[size]} />
      {variant !== "mark" && (
        <span className="flex items-center gap-1.5 font-sans">
          {(variant === "full" || variant === "bangla") && (
            <span className="font-extrabold text-[#111111] dark:text-[#F5F5F5]">
              আলাপ
            </span>
          )}
          {variant === "full" && (
            <span className="text-[#6B6B6B] dark:text-[#A3A3A3]">|</span>
          )}
          {(variant === "full" || variant === "english") && (
            <span className="font-black tracking-wider text-[#5B5CE2] dark:text-[#7C7EF2]">
              ALAP
            </span>
          )}
        </span>
      )}
    </div>
  );

  if (href) {
    return <Link href={href}>{content}</Link>;
  }

  return content;
}
