"use client";

import React from "react";
import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Clock, MessageSquare, Copy, FileText, ShoppingCart, Unplug, Table } from "lucide-react";
import { useLanguage } from "@/i18n/LanguageContext";

export function ProblemSection() {
  const { dict } = useLanguage();

  const problems = [
    { icon: Clock, title: dict.problem.p1Title, description: dict.problem.p1Desc },
    { icon: MessageSquare, title: dict.problem.p2Title, description: dict.problem.p2Desc },
    { icon: Copy, title: dict.problem.p3Title, description: dict.problem.p3Desc },
    { icon: FileText, title: dict.problem.p4Title, description: dict.problem.p4Desc },
    { icon: ShoppingCart, title: dict.problem.p5Title, description: dict.problem.p5Desc },
    { icon: Unplug, title: dict.problem.p6Title, description: dict.problem.p6Desc },
    { icon: Table, title: dict.problem.p7Title, description: dict.problem.p7Desc },
  ];

  return (
    <section className="py-12 space-y-10">
      <div className="text-center space-y-3 max-w-3xl mx-auto">
        <h2 className="text-3xl font-extrabold tracking-tight sm:text-4xl text-foreground leading-[1.25]">
          <span className="block mb-1">{dict.problem.titleLine1}</span>
          <span className="block text-[#5B5CE2] dark:text-[#7C7EF2]">
            {dict.problem.titleLine2}
          </span>
        </h2>
        <p className="text-sm text-muted-foreground">
          {dict.problem.subtitle}
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {problems.map((prob, idx) => {
          const IconComp = prob.icon;
          return (
            <Card key={idx} className="space-y-2">
              <CardHeader>
                <div className="h-10 w-10 rounded-lg bg-[#5B5CE2]/10 dark:bg-[#7C7EF2]/15 flex items-center justify-center text-[#5B5CE2] dark:text-[#7C7EF2] mb-2 border border-[#5B5CE2]/20 dark:border-[#7C7EF2]/30">
                  <IconComp className="h-5 w-5" />
                </div>
                <CardTitle className="text-lg">{prob.title}</CardTitle>
                <CardDescription>{prob.description}</CardDescription>
              </CardHeader>
            </Card>
          );
        })}
      </div>
    </section>
  );
}
