import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap rounded-xl text-sm font-semibold transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#5B5CE2] dark:focus-visible:ring-[#7C7EF2] disabled:pointer-events-none disabled:opacity-50 active:scale-[0.98]",
  {
    variants: {
      variant: {
        default:
          "bg-[#111111] text-[#FFFFFF] hover:bg-[#222222] dark:bg-[#FFFFFF] dark:text-[#111111] dark:hover:bg-[#E5E5E5] shadow-xs",
        cta: "bg-[#5B5CE2] text-[#FFFFFF] hover:bg-[#4B4CCB] dark:bg-[#7C7EF2] dark:text-[#FFFFFF] dark:hover:bg-[#9294FF] shadow-xs",
        secondary:
          "border border-[#E5E5E5] bg-[#F3F3F3] text-[#111111] hover:bg-[#EAEAEA] dark:border-[#292929] dark:bg-[#1C1C1C] dark:text-[#F5F5F5] dark:hover:bg-[#252525]",
        outline:
          "border border-[#E5E5E5] bg-[#FFFFFF] text-[#111111] hover:bg-[#F8F8F8] dark:border-[#292929] dark:bg-[#0A0A0A] dark:text-[#F5F5F5] dark:hover:bg-[#141414]",
        ghost:
          "text-[#6B6B6B] hover:bg-[#F3F3F3] hover:text-[#111111] dark:text-[#A3A3A3] dark:hover:bg-[#1C1C1C] dark:hover:text-[#F5F5F5]",
        link: "text-[#5B5CE2] underline-offset-4 hover:underline dark:text-[#7C7EF2]",
      },
      size: {
        default: "h-10 px-5 py-2",
        sm: "h-8 rounded-lg px-3 text-xs",
        lg: "h-12 rounded-xl px-8 text-base",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, ...props }, ref) => {
    return (
      <button
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";

export { Button, buttonVariants };
