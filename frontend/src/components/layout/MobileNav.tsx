"use client";

import * as React from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useConsultationModal } from "@/features/consultation/ConsultationModal";

interface NavItem {
  title: string;
  href: string;
}

interface MobileNavProps {
  items: NavItem[];
}

export function MobileNav({ items }: MobileNavProps) {
  const [isOpen, setIsOpen] = React.useState(false);
  const { openModal } = useConsultationModal();

  const handleCtaClick = () => {
    setIsOpen(false);
    openModal();
  };

  return (
    <div className="md:hidden">
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="inline-flex items-center justify-center rounded-xl p-1.5 text-foreground hover:bg-muted focus:outline-none"
        aria-label="Toggle Navigation Menu"
      >
        {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
      </button>

      {isOpen && (
        <div className="fixed inset-0 top-[53px] z-50 flex flex-col bg-background/98 backdrop-blur-xl p-6 border-t border-border animate-in fade-in slide-in-from-top-2">
          <nav className="flex flex-col space-y-4 pt-4">
            {items.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setIsOpen(false)}
                className="text-base font-bold text-foreground hover:text-[#5B5CE2] dark:hover:text-[#7C7EF2] py-2 transition-colors border-b border-border/50"
              >
                {item.title}
              </Link>
            ))}
          </nav>

          <div className="mt-auto space-y-4 pt-6 border-t border-border">
            <Button
              variant="cta"
              size="lg"
              className="w-full justify-center"
              onClick={handleCtaClick}
            >
              Talk to ALAP
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
