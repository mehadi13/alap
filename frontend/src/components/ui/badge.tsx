import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold transition-all focus:outline-none focus:ring-2 focus:ring-[#5B5CE2]",
  {
    variants: {
      variant: {
        default:
          "border border-[#5B5CE2]/20 bg-[#5B5CE2]/10 text-[#5B5CE2] dark:bg-[#7C7EF2]/15 dark:text-[#7C7EF2] dark:border-[#7C7EF2]/30",
        secondary:
          "border border-[#E5E5E5] bg-[#F3F3F3] text-[#111111] dark:bg-[#1C1C1C] dark:text-[#F5F5F5] dark:border-[#292929]",
        destructive:
          "border border-rose-200 bg-rose-50 text-rose-700 dark:bg-rose-950/60 dark:text-rose-300 dark:border-rose-800/60",
        success:
          "border border-emerald-500/30 bg-emerald-500/10 text-emerald-600 dark:bg-emerald-500/20 dark:text-emerald-400 dark:border-emerald-500/40",
        outline:
          "border border-[#E5E5E5] text-[#6B6B6B] dark:border-[#292929] dark:text-[#A3A3A3] dark:bg-[#141414]",
        gradient:
          "bg-accent-gradient text-white border-none shadow-xs",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return (
    <div className={cn(badgeVariants({ variant }), className)} {...props} />
  );
}

export { Badge, badgeVariants };
