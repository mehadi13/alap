import React from "react";

export function SkipToContent() {
  return (
    <a
      href="#main-content"
      className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-50 focus:rounded-xl focus:bg-[#5B5CE2] focus:px-4 focus:py-2.5 focus:text-xs focus:font-bold focus:text-white focus:shadow-xl focus:outline-none focus:ring-2 focus:ring-white dark:focus:bg-[#7C7EF2]"
    >
      Skip to main content
    </a>
  );
}
