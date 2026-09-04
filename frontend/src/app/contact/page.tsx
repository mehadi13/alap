"use client";

import React from "react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { TalkToAlapConnect } from "@/features/consultation/TalkToAlapConnect";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Mail, Phone, MapPin, MessageSquare, Clock } from "lucide-react";
import { useLanguage } from "@/i18n/LanguageContext";

export default function ContactPage() {
  const { dict } = useLanguage();
  const t = dict.contactPage;

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

        {/* Contact Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 max-w-6xl mx-auto">
          {/* Left Column: Form & Connection Options */}
          <Card className="lg:col-span-7 p-6 sm:p-8 space-y-6">
            <TalkToAlapConnect />
          </Card>

          {/* Right Column: Contact Info & Details */}
          <div className="lg:col-span-5 space-y-6">
            <Card className="p-6 space-y-6">
              <h3 className="text-lg font-bold text-foreground">{t.infoTitle}</h3>

              <div className="space-y-4 text-xs">
                <div className="flex items-start gap-3">
                  <div className="h-8 w-8 rounded-lg bg-[#5B5CE2]/10 text-[#5B5CE2] dark:bg-[#7C7EF2]/15 dark:text-[#7C7EF2] flex items-center justify-center shrink-0">
                    <Mail className="h-4 w-4" />
                  </div>
                  <div>
                    <div className="font-semibold text-foreground">{t.emailLabel}</div>
                    <div className="text-muted-foreground pt-0.5">hello@alap.ai</div>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="h-8 w-8 rounded-lg bg-[#5B5CE2]/10 text-[#5B5CE2] dark:bg-[#7C7EF2]/15 dark:text-[#7C7EF2] flex items-center justify-center shrink-0">
                    <Phone className="h-4 w-4" />
                  </div>
                  <div>
                    <div className="font-semibold text-foreground">{t.phoneLabel}</div>
                    <div className="text-muted-foreground pt-0.5">+880 1700-000000</div>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="h-8 w-8 rounded-lg bg-[#5B5CE2]/10 text-[#5B5CE2] dark:bg-[#7C7EF2]/15 dark:text-[#7C7EF2] flex items-center justify-center shrink-0">
                    <MapPin className="h-4 w-4" />
                  </div>
                  <div>
                    <div className="font-semibold text-foreground">{t.locationLabel}</div>
                    <div className="text-muted-foreground pt-0.5">{t.locationValue}</div>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="h-8 w-8 rounded-lg bg-[#5B5CE2]/10 text-[#5B5CE2] dark:bg-[#7C7EF2]/15 dark:text-[#7C7EF2] flex items-center justify-center shrink-0">
                    <Clock className="h-4 w-4" />
                  </div>
                  <div>
                    <div className="font-semibold text-foreground">{t.hoursLabel}</div>
                    <div className="text-muted-foreground pt-0.5">{t.hoursValue}</div>
                  </div>
                </div>
              </div>
            </Card>

            <Card className="p-6 space-y-4 bg-muted border-border">
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#5B5CE2] dark:text-[#7C7EF2]">
                <MessageSquare className="h-4 w-4" />
                <span>{t.immediateTitle}</span>
              </div>
              <p className="text-xs text-muted-foreground leading-relaxed">
                {t.immediateSubtitle}
              </p>
            </Card>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}

