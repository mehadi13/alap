import * as React from "react";
import { cn } from "@/lib/utils";

export type TextareaProps = React.TextareaHTMLAttributes<HTMLTextAreaElement>;

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, ...props }, ref) => {
    return (
      <textarea
        className={cn(
          "flex min-h-[100px] w-full rounded-xl border border-[#E5E5E5] bg-[#FFFFFF] px-4 py-3 text-sm text-[#111111] shadow-xs ring-offset-white placeholder:text-[#6B6B6B] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#5B5CE2] focus-visible:border-[#5B5CE2] disabled:cursor-not-allowed disabled:opacity-50 dark:border-[#292929] dark:bg-[#141414] dark:text-[#F5F5F5] dark:placeholder:text-[#A3A3A3] dark:ring-offset-[#0A0A0A] dark:focus-visible:ring-[#7C7EF2] dark:focus-visible:border-[#7C7EF2]",
          className
        )}
        ref={ref}
        {...props}
      />
    );
  }
);
Textarea.displayName = "Textarea";

export { Textarea };
