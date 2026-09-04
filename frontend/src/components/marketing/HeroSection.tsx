"use client";

import React from "react";
import Link from "next/link";
import { ArrowRight, Sparkles, CheckCircle2 } from "lucide-react";
import { Button, buttonVariants } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useLanguage } from "@/i18n/LanguageContext";
import { useConsultationModal } from "@/features/consultation/ConsultationModal";
import { cn } from "@/lib/utils";

export function HeroSection() {
  const { dict } = useLanguage();
  const { openModal } = useConsultationModal();

  return (
    <section className="relative py-12 md:py-20 text-center space-y-8 max-w-5xl mx-auto px-4">
      <Badge variant="default" className="px-4 py-1.5 text-xs tracking-wider uppercase font-semibold">
        {dict.hero.badge}
      </Badge>

      <h1 className="text-3xl font-extrabold tracking-tight sm:text-4xl md:text-5xl lg:text-[3.25rem] text-foreground leading-[1.2] max-w-5xl mx-auto">
        <span className="block mb-1 sm:mb-2">{dict.hero.titleLine1}</span>
        <span className="block text-[#5B5CE2] dark:text-[#7C7EF2]">
          {dict.hero.titleLine2}
        </span>
      </h1>

      <p className="text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
        {dict.hero.subtitle}
      </p>

      <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
        <Button variant="cta" size="lg" className="gap-2 text-base px-8 py-6" onClick={openModal}>
          <Sparkles className="h-5 w-5" />
          <span>{dict.hero.ctaPrimary}</span>
          <ArrowRight className="h-5 w-5 ml-1" />
        </Button>
        <Link
          href="/solutions"
          className={cn(buttonVariants({ variant: "secondary", size: "lg" }), "text-base px-8 py-6")}
        >
          {dict.hero.ctaSecondary}
        </Link>
      </div>

      <div className="flex flex-wrap items-center justify-center gap-6 pt-6 text-xs text-muted-foreground">
        <div className="flex items-center gap-2">
          <CheckCircle2 className="h-4 w-4 text-[#5B5CE2] dark:text-[#7C7EF2]" />
          <span>{dict.hero.benefit1}</span>
        </div>
        <div className="flex items-center gap-2">
          <CheckCircle2 className="h-4 w-4 text-[#5B5CE2] dark:text-[#7C7EF2]" />
          <span>{dict.hero.benefit2}</span>
        </div>
      </div>
    </section>
  );
}
