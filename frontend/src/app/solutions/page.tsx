"use client";

import React from "react";
import Link from "next/link";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { buttonVariants } from "@/components/ui/button";
import { solutionsData } from "@/features/services/data";
import { ArrowRight, CheckCircle2, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";
import { useLanguage } from "@/i18n/LanguageContext";

export default function SolutionsPage() {
  const { locale, dict } = useLanguage();
  const t = dict.solutionsCatalog;
  const solutionsList = Object.values(solutionsData);

  return (
    <div className="min-h-screen bg-background text-foreground transition-colors duration-200 flex flex-col">
      <Navbar />

      <main className="flex-1 mx-auto max-w-7xl px-6 py-12 space-y-16">
        {/* Page Header */}
        <section className="text-center space-y-4 max-w-3xl mx-auto pt-4">
          <Badge variant="default" className="px-4 py-1.5 text-xs tracking-wider uppercase font-semibold">
            {t.badge}
          </Badge>
          <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl text-foreground">
            {t.title}
          </h1>
          <p className="text-base text-muted-foreground leading-relaxed">
            {t.subtitle}
          </p>
        </section>

        {/* Solutions Cards Grid */}
        <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {solutionsList.map((sol) => {
            const isBn = locale === "bn";
            const title = isBn ? sol.titleBn : sol.title;
            const categoryTag = isBn ? sol.categoryTagBn : sol.categoryTag;
            const shortDescription = isBn ? sol.shortDescriptionBn : sol.shortDescription;
            const deliverables = isBn ? sol.deliverablesBn : sol.deliverables;

            return (
              <Card key={sol.slug} className="flex flex-col justify-between space-y-4">
                <CardHeader className="space-y-3">
                  <div className="flex items-center justify-between">
                    <Badge variant="secondary" className="text-[11px]">
                      {categoryTag}
                    </Badge>
                    <Sparkles className="h-4 w-4 text-[#5B5CE2] dark:text-[#7C7EF2]" />
                  </div>
                  <CardTitle className="text-xl">{title}</CardTitle>
                  <CardDescription>{shortDescription}</CardDescription>
                </CardHeader>

                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <span className="text-xs font-semibold text-foreground uppercase tracking-wider">
                      {t.commonDeliverables}
                    </span>
                    <ul className="space-y-1.5 text-xs text-muted-foreground">
                      {deliverables.slice(0, 3).map((item, idx) => (
                        <li key={idx} className="flex items-center gap-2">
                          <CheckCircle2 className="h-3.5 w-3.5 text-emerald-500 shrink-0" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </CardContent>

                <CardFooter className="pt-0">
                  <Link
                    href={`/solutions/${sol.slug}`}
                    className={cn(
                      buttonVariants({ variant: "outline", size: "sm" }),
                      "w-full justify-between group"
                    )}
                  >
                    <span>{t.viewFullBreakdown}</span>
                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </Link>
                </CardFooter>
              </Card>
            );
          })}
        </section>
      </main>

      <Footer />
    </div>
  );
}

