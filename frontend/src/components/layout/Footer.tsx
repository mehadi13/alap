"use client";

import React from "react";
import Link from "next/link";
import { Logo } from "@/components/shared/Logo";
import { ThemeToggle } from "@/components/shared/ThemeToggle";
import { LanguageSwitcher } from "@/components/shared/LanguageSwitcher";
import { useLanguage } from "@/i18n/LanguageContext";

export function Footer() {
  const { dict } = useLanguage();

  return (
    <footer className="border-t border-border bg-background py-12 text-sm text-muted-foreground transition-colors duration-200">
      <div className="mx-auto max-w-7xl px-6 space-y-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand Info */}
          <div className="space-y-4 md:col-span-1">
            <Logo variant="full" size="md" />
            <p className="text-xs leading-relaxed max-w-xs text-muted-foreground">
              {dict.footer.tagline}
            </p>
          </div>

          {/* Solutions Links */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-foreground">
              {dict.footer.solutionsHeading}
            </h4>
            <ul className="space-y-2 text-xs">
              <li><Link href="/solutions#customer-support" className="hover:text-foreground transition-colors">{dict.solutions.s1Title}</Link></li>
              <li><Link href="/solutions#sales-automation" className="hover:text-foreground transition-colors">{dict.solutions.s2Title}</Link></li>
              <li><Link href="/solutions#ecommerce" className="hover:text-foreground transition-colors">{dict.solutions.s3Title}</Link></li>
              <li><Link href="/solutions#workflow" className="hover:text-foreground transition-colors">{dict.solutions.s4Title}</Link></li>
              <li><Link href="/solutions#ai-solutions" className="hover:text-foreground transition-colors">{dict.solutions.s5Title}</Link></li>
            </ul>
          </div>

          {/* Company Links */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-foreground">
              {dict.footer.companyHeading}
            </h4>
            <ul className="space-y-2 text-xs">
              <li><Link href="/how-it-works" className="hover:text-foreground transition-colors">{dict.nav.howItWorks}</Link></li>
              <li><Link href="/contact" className="hover:text-foreground transition-colors">{dict.nav.talkToAlap}</Link></li>
              <li><Link href="/privacy" className="hover:text-foreground transition-colors">{dict.footer.privacy}</Link></li>
              <li><Link href="/terms" className="hover:text-foreground transition-colors">{dict.footer.terms}</Link></li>
            </ul>
          </div>

          {/* Preferences */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-foreground">
              {dict.footer.preferencesHeading}
            </h4>
            <p className="text-xs text-muted-foreground">Switch language or visual mode:</p>
            <div className="flex flex-wrap items-center gap-3 pt-1">
              <ThemeToggle />
              <LanguageSwitcher />
            </div>
          </div>
        </div>

        <div className="pt-8 border-t border-border flex flex-col sm:flex-row items-center justify-between gap-4 text-xs">
          <p>© {new Date().getFullYear()} ALAP (আলাপ). {dict.footer.rights}</p>
          <p className="text-muted-foreground">Business Automation & Digital Solutions Company</p>
        </div>
      </div>
    </footer>
  );
}
