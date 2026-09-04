"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { Sparkles, ArrowRight } from "lucide-react";
import { useLanguage } from "@/i18n/LanguageContext";
import { useConsultationModal } from "@/features/consultation/ConsultationModal";

export function FinalCTASection() {
  const { dict } = useLanguage();
  const { openModal } = useConsultationModal();

  return (
    <section className="py-16 text-center space-y-6 max-w-4xl mx-auto rounded-3xl border border-border bg-card p-8 md:p-14">
      <div className="inline-flex items-center gap-2 text-xs font-semibold text-[#5B5CE2] dark:text-[#7C7EF2] uppercase tracking-wider">
        <Sparkles className="h-4 w-4" />
        <span>{dict.finalCta.tag}</span>
      </div>

      <h2 className="text-3xl font-extrabold tracking-tight sm:text-5xl text-foreground leading-[1.25]">
        <span className="block mb-1">{dict.finalCta.titleLine1}</span>
        <span className="block text-[#5B5CE2] dark:text-[#7C7EF2]">{dict.finalCta.titleLine2}</span>
      </h2>

      <p className="text-base text-muted-foreground max-w-2xl mx-auto leading-relaxed">
        {dict.finalCta.subtitle}
      </p>

      <div className="pt-4">
        <Button variant="cta" size="lg" className="gap-2 px-10 py-6 text-base" onClick={openModal}>
          <span>{dict.finalCta.button}</span>
          <ArrowRight className="h-5 w-5" />
        </Button>
      </div>
    </section>
  );
}
