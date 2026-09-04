"use client";

import React from "react";
import Link from "next/link";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { HowItWorksSection } from "@/components/marketing/HowItWorksSection";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { buttonVariants } from "@/components/ui/button";
import {
  MessageSquarePlus,
  PhoneCall,
  MapPin,
  DraftingCompass,
  FileCheck2,
  Code2,
  Rocket,
  CheckCircle2,
  ArrowRight,
  ShieldCheck,
} from "lucide-react";
import { useLanguage } from "@/i18n/LanguageContext";

const stepIcons = [
  MessageSquarePlus,
  PhoneCall,
  MapPin,
  DraftingCompass,
  FileCheck2,
  Code2,
  Rocket,
];

export default function HowItWorksPage() {
  const { dict } = useLanguage();
  const t = dict.howItWorksPage;

  return (
    <div className="min-h-screen bg-background text-foreground transition-colors duration-200 flex flex-col">
      <Navbar />

      <main className="flex-1 mx-auto max-w-7xl px-6 py-12 space-y-16">
        {/* Page Hero */}
        <section className="text-center space-y-4 max-w-3xl mx-auto pt-4">
          <Badge variant="default" className="px-4 py-1.5 text-xs tracking-wider uppercase font-semibold">
            {t.badge}
          </Badge>
          <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl text-foreground leading-tight">
            {t.title}
          </h1>
          <p className="text-base text-muted-foreground leading-relaxed">
            {t.subtitle}
          </p>
        </section>

        {/* Interactive React Flow Diagram */}
        <HowItWorksSection />

        <hr className="border-border" />

        {/* Detailed 7-Step Breakdown */}
        <section className="space-y-10">
          <div className="text-center space-y-2 max-w-2xl mx-auto">
            <h2 className="text-3xl font-extrabold text-foreground">{t.stepByStepTitle}</h2>
            <p className="text-sm text-muted-foreground">
              {t.stepByStepSubtitle}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {t.steps.map((step, idx) => {
              const IconComp = stepIcons[idx] || MessageSquarePlus;
              return (
                <Card key={step.num} className="p-6 space-y-4 flex flex-col justify-between">
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-3xl font-mono font-black text-[#5B5CE2] dark:text-[#7C7EF2]">
                        {step.num}
                      </span>
                      <div className="h-9 w-9 rounded-lg bg-[#5B5CE2]/10 text-[#5B5CE2] dark:bg-[#7C7EF2]/15 dark:text-[#7C7EF2] flex items-center justify-center border border-[#5B5CE2]/20 dark:border-[#7C7EF2]/30">
                        <IconComp className="h-4 w-4" />
                      </div>
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-foreground">{step.title}</h3>
                      <p className="text-xs font-medium text-[#5B5CE2] dark:text-[#7C7EF2]">
                        {step.subtitle}
                      </p>
                    </div>
                    <p className="text-xs text-muted-foreground leading-relaxed">
                      {step.description}
                    </p>
                  </div>
                </Card>
              );
            })}

            {/* Final Outcome Card */}
            <Card className="p-6 space-y-4 border-[#5B5CE2]/30 bg-[#5B5CE2]/5 dark:border-[#7C7EF2]/30 dark:bg-[#7C7EF2]/5 flex flex-col justify-between">
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold uppercase tracking-wider text-emerald-600 dark:text-emerald-400">
                    {t.resultTag}
                  </span>
                  <ShieldCheck className="h-6 w-6 text-emerald-500" />
                </div>
                <h3 className="text-lg font-bold text-foreground">{t.resultTitle}</h3>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  {t.resultDesc}
                </p>
              </div>
              <Link
                href="/contact"
                className={buttonVariants({ variant: "cta", size: "sm" })}
              >
                <span>{dict.nav.talkToAlap}</span>
                <ArrowRight className="h-4 w-4 ml-1" />
              </Link>
            </Card>
          </div>
        </section>

        {/* Principles Callout */}
        <section className="rounded-3xl border border-border bg-card p-8 md:p-12 space-y-8">
          <div className="text-center space-y-2 max-w-2xl mx-auto">
            <h2 className="text-2xl font-bold text-foreground">{t.whyTitle}</h2>
            <p className="text-xs text-muted-foreground">
              {t.whySubtitle}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-xs text-muted-foreground">
            <div className="space-y-2 p-4 rounded-xl bg-background border border-border">
              <div className="flex items-center gap-2 font-bold text-foreground text-sm">
                <CheckCircle2 className="h-4 w-4 text-[#5B5CE2] dark:text-[#7C7EF2]" />
                <span>{t.p1Title}</span>
              </div>
              <p className="leading-relaxed">
                {t.p1Desc}
              </p>
            </div>

            <div className="space-y-2 p-4 rounded-xl bg-background border border-border">
              <div className="flex items-center gap-2 font-bold text-foreground text-sm">
                <CheckCircle2 className="h-4 w-4 text-[#5B5CE2] dark:text-[#7C7EF2]" />
                <span>{t.p2Title}</span>
              </div>
              <p className="leading-relaxed">
                {t.p2Desc}
              </p>
            </div>

            <div className="space-y-2 p-4 rounded-xl bg-background border border-border">
              <div className="flex items-center gap-2 font-bold text-foreground text-sm">
                <CheckCircle2 className="h-4 w-4 text-[#5B5CE2] dark:text-[#7C7EF2]" />
                <span>{t.p3Title}</span>
              </div>
              <p className="leading-relaxed">
                {t.p3Desc}
              </p>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}

