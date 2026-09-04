"use client";

import * as React from "react";
import Link from "next/link";
import { Logo } from "@/components/shared/Logo";
import { MobileNav } from "@/components/layout/MobileNav";
import { Button } from "@/components/ui/button";
import { useConsultationModal } from "@/features/consultation/ConsultationModal";
import { useLanguage } from "@/i18n/LanguageContext";

export function Navbar() {
  const { dict } = useLanguage();
  const { openModal } = useConsultationModal();

  const navItems = [
    { title: dict.nav.solutions, href: "/solutions" },
    { title: dict.nav.howItWorks, href: "/how-it-works" },
    { title: dict.nav.contact, href: "/contact" },
  ];

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-background/90 backdrop-blur-md transition-colors duration-200">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-2.5">
        {/* Brand Logo */}
        <Logo variant="full" size="sm" />

        {/* Desktop Navigation Links */}
        <nav className="hidden md:flex items-center gap-6 text-xs font-semibold text-muted-foreground">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="transition-colors hover:text-foreground"
            >
              {item.title}
            </Link>
          ))}
        </nav>

        {/* Right Action CTA */}
        <div className="hidden md:flex items-center gap-3">
          <Button variant="cta" size="sm" className="h-8 text-xs px-3.5" onClick={openModal}>
            {dict.nav.talkToAlap}
          </Button>
        </div>

        {/* Mobile Navigation Trigger */}
        <MobileNav items={navItems} />
      </div>
    </header>
  );
}
