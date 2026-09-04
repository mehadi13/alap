"use client";

import React from "react";
import Link from "next/link";
import { Card, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { buttonVariants } from "@/components/ui/button";
import { Headset, TrendingUp, ShoppingBag, Workflow, Cpu, Code2, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { useLanguage } from "@/i18n/LanguageContext";

export function SolutionsGrid() {
  const { dict } = useLanguage();

  const solutions = [
    {
      icon: Headset,
      title: dict.solutions.s1Title,
      description: dict.solutions.s1Desc,
      href: "/solutions/customer-support-automation",
    },
    {
      icon: TrendingUp,
      title: dict.solutions.s2Title,
      description: dict.solutions.s2Desc,
      href: "/solutions/sales-automation",
    },
    {
      icon: ShoppingBag,
      title: dict.solutions.s3Title,
      description: dict.solutions.s3Desc,
      href: "/solutions/ecommerce-automation",
    },
    {
      icon: Workflow,
      title: dict.solutions.s4Title,
      description: dict.solutions.s4Desc,
      href: "/solutions/workflow-automation",
    },
    {
      icon: Cpu,
      title: dict.solutions.s5Title,
      description: dict.solutions.s5Desc,
      href: "/solutions/ai-business-solutions",
    },
    {
      icon: Code2,
      title: dict.solutions.s6Title,
      description: dict.solutions.s6Desc,
      href: "/solutions/custom-digital-solutions",
    },
  ];

  return (
    <section className="py-12 space-y-10">
      <div className="text-center space-y-3 max-w-3xl mx-auto">
        <h2 className="text-3xl font-extrabold tracking-tight sm:text-4xl text-foreground">
          {dict.solutions.title}
        </h2>
        <p className="text-sm text-muted-foreground">
          {dict.solutions.subtitle}
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {solutions.map((sol, idx) => {
          const IconComp = sol.icon;
          return (
            <Card key={idx} className="flex flex-col justify-between space-y-4">
              <CardHeader>
                <div className="h-10 w-10 rounded-lg bg-[#5B5CE2]/10 dark:bg-[#7C7EF2]/15 flex items-center justify-center text-[#5B5CE2] dark:text-[#7C7EF2] mb-2 border border-[#5B5CE2]/20 dark:border-[#7C7EF2]/30">
                  <IconComp className="h-5 w-5" />
                </div>
                <CardTitle>{sol.title}</CardTitle>
                <CardDescription>{sol.description}</CardDescription>
              </CardHeader>
              <CardFooter className="pt-0">
                <Link
                  href={sol.href}
                  className={cn(
                    buttonVariants({ variant: "ghost", size: "sm" }),
                    "w-full justify-between hover:text-[#5B5CE2]"
                  )}
                >
                  <span>{dict.solutions.learnMore}</span>
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </CardFooter>
            </Card>
          );
        })}
      </div>

      <div className="text-center pt-4">
        <Link
          href="/solutions"
          className={cn(buttonVariants({ variant: "outline", size: "lg" }), "gap-2")}
        >
          <span>{dict.solutions.exploreCatalog}</span>
          <ArrowRight className="h-4 w-4" />
        </Link>
      </div>
    </section>
  );
}
