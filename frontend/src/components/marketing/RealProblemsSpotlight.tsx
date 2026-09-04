"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { MessageCircleQuestion, ArrowRight } from "lucide-react";
import { useLanguage } from "@/i18n/LanguageContext";
import { useConsultationModal } from "@/features/consultation/ConsultationModal";

export function RealProblemsSpotlight() {
  const { dict } = useLanguage();
  const { openModal } = useConsultationModal();

  const quotes = [
    dict.realProblems.q1,
    dict.realProblems.q2,
    dict.realProblems.q3,
    dict.realProblems.q4,
    dict.realProblems.q5,
  ];

  return (
    <section className="py-12 rounded-3xl border border-border bg-card p-8 md:p-12 space-y-8">
      <div className="text-center space-y-3 max-w-3xl mx-auto">
        <div className="inline-flex items-center gap-2 text-xs font-semibold text-[#5B5CE2] dark:text-[#7C7EF2] uppercase tracking-wider">
          <MessageCircleQuestion className="h-4 w-4" />
          <span>{dict.realProblems.tag}</span>
        </div>
        <h2 className="text-3xl font-extrabold tracking-tight sm:text-4xl text-foreground">
          {dict.realProblems.title}
        </h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 max-w-5xl mx-auto">
        {quotes.map((q, idx) => (
          <div
            key={idx}
            className="p-5 rounded-2xl border border-border/80 bg-background text-sm font-medium italic text-muted-foreground leading-relaxed flex items-center justify-center text-center"
          >
            {q}
          </div>
        ))}
      </div>

      <div className="text-center pt-4">
        <Button variant="cta" size="lg" className="gap-2 px-8" onClick={openModal}>
          <span>{dict.realProblems.cta}</span>
          <ArrowRight className="h-4 w-4" />
        </Button>
      </div>
    </section>
  );
}
