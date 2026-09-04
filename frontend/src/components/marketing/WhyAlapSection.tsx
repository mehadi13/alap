"use client";

import React from "react";
import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Target, Wrench, FileCheck, Users, TrendingUp } from "lucide-react";
import { useLanguage } from "@/i18n/LanguageContext";

export function WhyAlapSection() {
  const { dict } = useLanguage();

  const diffs = [
    { icon: Target, title: dict.whyAlap.d1Title, description: dict.whyAlap.d1Desc },
    { icon: Wrench, title: dict.whyAlap.d2Title, description: dict.whyAlap.d2Desc },
    { icon: FileCheck, title: dict.whyAlap.d3Title, description: dict.whyAlap.d3Desc },
    { icon: Users, title: dict.whyAlap.d4Title, description: dict.whyAlap.d4Desc },
    { icon: TrendingUp, title: dict.whyAlap.d5Title, description: dict.whyAlap.d5Desc },
  ];

  return (
    <section className="py-12 space-y-10">
      <div className="text-center space-y-3 max-w-3xl mx-auto">
        <h2 className="text-3xl font-extrabold tracking-tight sm:text-4xl text-foreground">
          {dict.whyAlap.title}
        </h2>
        <p className="text-sm text-muted-foreground">
          {dict.whyAlap.subtitle}
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6">
        {diffs.map((diff, idx) => {
          const IconComp = diff.icon;
          return (
            <Card key={idx} className="space-y-2 text-center">
              <CardHeader className="items-center">
                <div className="h-10 w-10 rounded-lg bg-[#5B5CE2]/10 dark:bg-[#7C7EF2]/15 flex items-center justify-center text-[#5B5CE2] dark:text-[#7C7EF2] mb-2 border border-[#5B5CE2]/20 dark:border-[#7C7EF2]/30">
                  <IconComp className="h-5 w-5" />
                </div>
                <CardTitle className="text-base">{diff.title}</CardTitle>
                <CardDescription className="text-xs">{diff.description}</CardDescription>
              </CardHeader>
            </Card>
          );
        })}
      </div>
    </section>
  );
}
