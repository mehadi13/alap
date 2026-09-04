"use client";

import React from "react";
import Link from "next/link";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { SolutionItem } from "@/features/services/data";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { buttonVariants } from "@/components/ui/button";
import { ArrowLeft, CheckCircle2, AlertTriangle, Users, Target, Rocket, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { useLanguage } from "@/i18n/LanguageContext";

interface SolutionDetailClientProps {
  solution: SolutionItem;
}

export default function SolutionDetailClient({ solution }: SolutionDetailClientProps) {
  const { locale, dict } = useLanguage();
  const t = dict.solutionsCatalog;
  const isBn = locale === "bn";

  const title = isBn ? solution.titleBn : solution.title;
  const categoryTag = isBn ? solution.categoryTagBn : solution.categoryTag;
  const shortDescription = isBn ? solution.shortDescriptionBn : solution.shortDescription;
  const problem = isBn ? solution.problemBn : solution.problem;
  const whoItsFor = isBn ? solution.whoItsForBn : solution.whoItsFor;
  const commonUseCases = isBn ? solution.commonUseCasesBn : solution.commonUseCases;
  const deliverables = isBn ? solution.deliverablesBn : solution.deliverables;
  const expectedOutcomes = isBn ? solution.expectedOutcomesBn : solution.expectedOutcomes;
  const exampleWorkflow = isBn ? solution.exampleWorkflowBn : solution.exampleWorkflow;

  return (
    <div className="min-h-screen bg-background text-foreground transition-colors duration-200 flex flex-col">
      <Navbar />

      <main className="flex-1 mx-auto max-w-5xl px-6 py-12 space-y-12">
        {/* Back Link */}
        <div>
          <Link
            href="/solutions"
            className={cn(buttonVariants({ variant: "ghost", size: "sm" }), "gap-2 text-muted-foreground")}
          >
            <ArrowLeft className="h-4 w-4" />
            <span>{t.backToSolutions}</span>
          </Link>
        </div>

        {/* Hero Banner */}
        <section className="space-y-4">
          <Badge variant="default" className="px-3 py-1 text-xs">
            {categoryTag}
          </Badge>
          <h1 className="text-3xl font-extrabold tracking-tight sm:text-5xl text-foreground">
            {title}
          </h1>
          <p className="text-lg text-muted-foreground leading-relaxed max-w-3xl">
            {shortDescription}
          </p>
        </section>

        <hr className="border-border" />

        {/* Problem Breakdown Card */}
        <Card className="border-rose-500/30 bg-rose-500/5 dark:border-rose-500/20 p-6">
          <div className="flex items-start gap-4">
            <div className="h-10 w-10 rounded-xl bg-rose-500/10 flex items-center justify-center text-rose-500 shrink-0 mt-1">
              <AlertTriangle className="h-5 w-5" />
            </div>
            <div className="space-y-2">
              <h3 className="text-lg font-bold text-foreground">{t.problemTitle}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {problem}
              </p>
            </div>
          </div>
        </Card>

        {/* Who It's For & Common Use Cases */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <Card className="space-y-4">
            <CardHeader className="flex flex-row items-center gap-3 space-y-0">
              <Users className="h-5 w-5 text-[#5B5CE2] dark:text-[#7C7EF2]" />
              <CardTitle className="text-lg">{t.whoItsForTitle}</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2.5 text-sm text-muted-foreground">
                {whoItsFor.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-2.5">
                    <CheckCircle2 className="h-4 w-4 text-[#5B5CE2] dark:text-[#7C7EF2] shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>

          <Card className="space-y-4">
            <CardHeader className="flex flex-row items-center gap-3 space-y-0">
              <Target className="h-5 w-5 text-[#5B5CE2] dark:text-[#7C7EF2]" />
              <CardTitle className="text-lg">{t.commonUseCasesTitle}</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2.5 text-sm text-muted-foreground">
                {commonUseCases.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-2.5">
                    <CheckCircle2 className="h-4 w-4 text-[#5B5CE2] dark:text-[#7C7EF2] shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </div>

        {/* Deliverables & Business Outcomes */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <Card className="space-y-4">
            <CardHeader className="flex flex-row items-center gap-3 space-y-0">
              <Rocket className="h-5 w-5 text-[#5B5CE2] dark:text-[#7C7EF2]" />
              <CardTitle className="text-lg">{t.whatAlapDeliversTitle}</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2.5 text-sm text-muted-foreground">
                {deliverables.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-2.5">
                    <CheckCircle2 className="h-4 w-4 text-emerald-500 shrink-0 mt-0.5" />
                    <span className="font-medium text-foreground">{item}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>

          <Card className="space-y-4">
            <CardHeader className="flex flex-row items-center gap-3 space-y-0">
              <CheckCircle2 className="h-5 w-5 text-emerald-500" />
              <CardTitle className="text-lg">{t.expectedOutcomesTitle}</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2.5 text-sm text-muted-foreground">
                {expectedOutcomes.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-2.5">
                    <CheckCircle2 className="h-4 w-4 text-emerald-500 shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </div>

        {/* Example Implementation Workflow */}
        <section className="space-y-6">
          <h3 className="text-2xl font-bold text-foreground">{t.exampleWorkflowTitle}</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {exampleWorkflow.map((wf, idx) => (
              <Card key={idx} className="space-y-2">
                <CardHeader>
                  <span className="text-xs font-mono font-bold text-[#5B5CE2] dark:text-[#7C7EF2]">
                    {t.stepPrefix} {wf.step}
                  </span>
                  <p className="text-sm font-medium text-foreground leading-relaxed pt-1">
                    {wf.text}
                  </p>
                </CardHeader>
              </Card>
            ))}
          </div>
        </section>

        {/* Action Callout */}
        <Card className="p-8 text-center space-y-6 bg-card border-border">
          <div className="space-y-2 max-w-xl mx-auto">
            <h3 className="text-2xl font-extrabold text-foreground">
              {t.readyToImplement} {title}?
            </h3>
            <p className="text-sm text-muted-foreground">
              {t.ctaSubtitle}
            </p>
          </div>
          <div>
            <Link
              href="/contact"
              className={cn(buttonVariants({ variant: "cta", size: "lg" }), "gap-2 px-8")}
            >
              <span>{t.ctaButton}</span>
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </Card>
      </main>

      <Footer />
    </div>
  );
}
