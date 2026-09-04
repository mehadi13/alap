"use client";

import React from "react";
import { Badge } from "@/components/ui/badge";
import { ShoppingCart, Store, Stethoscope, GraduationCap, Building2, Plane, Utensils, Truck, Briefcase, Rocket } from "lucide-react";
import { useLanguage } from "@/i18n/LanguageContext";

export function TargetIndustriesSection() {
  const { dict } = useLanguage();

  const industries = [
    { icon: ShoppingCart, label: dict.targetIndustries.ecommerce },
    { icon: Store, label: dict.targetIndustries.onlineStores },
    { icon: Stethoscope, label: dict.targetIndustries.clinics },
    { icon: GraduationCap, label: dict.targetIndustries.education },
    { icon: Building2, label: dict.targetIndustries.realEstate },
    { icon: Plane, label: dict.targetIndustries.travel },
    { icon: Utensils, label: dict.targetIndustries.restaurants },
    { icon: Truck, label: dict.targetIndustries.distributors },
    { icon: Briefcase, label: dict.targetIndustries.services },
    { icon: Rocket, label: dict.targetIndustries.smes },
  ];

  return (
    <section className="py-12 space-y-8">
      <div className="text-center space-y-3 max-w-3xl mx-auto">
        <Badge variant="default" className="px-3 py-1 text-xs">
          {dict.targetIndustries.badge}
        </Badge>
        <h2 className="text-3xl font-extrabold tracking-tight sm:text-4xl text-foreground">
          {dict.targetIndustries.title}
        </h2>
        <p className="text-sm text-muted-foreground">
          {dict.targetIndustries.subtitle}
        </p>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
        {industries.map((ind, idx) => {
          const IconComp = ind.icon;
          return (
            <div
              key={idx}
              className="flex flex-col items-center justify-center p-4 rounded-xl border border-border bg-card text-center space-y-2 transition-all hover:border-[#5B5CE2]/40 dark:hover:border-[#7C7EF2]/40"
            >
              <IconComp className="h-6 w-6 text-[#5B5CE2] dark:text-[#7C7EF2]" />
              <span className="text-xs font-semibold text-foreground">{ind.label}</span>
            </div>
          );
        })}
      </div>
    </section>
  );
}
