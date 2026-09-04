"use client";

import React, { useState } from "react";
import { ConsultationForm } from "@/features/consultation/ConsultationForm";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import {
  MessageSquare,
  Calendar,
  PhoneCall,
  CheckCircle2,
  MessageCircle,
  Phone,
  Loader2,
} from "lucide-react";
import { useLanguage } from "@/i18n/LanguageContext";
import { cn } from "@/lib/utils";

type ConnectMode = "message" | "meeting" | "call";

interface TalkToAlapConnectProps {
  onSuccess?: () => void;
  className?: string;
  defaultMode?: ConnectMode;
}

export function TalkToAlapConnect({
  onSuccess,
  className,
  defaultMode = "message",
}: TalkToAlapConnectProps) {
  const { dict } = useLanguage();
  const t = dict.connectOptions;
  const [mode, setMode] = useState<ConnectMode>(defaultMode);

  // Meeting Form State
  const [meetingDate, setMeetingDate] = useState<string>("Tomorrow");
  const [meetingTime, setMeetingTime] = useState<string>("11:30 AM");
  const [meetingName, setMeetingName] = useState<string>("");
  const [meetingPhone, setMeetingPhone] = useState<string>("");
  const [meetingEmail, setMeetingEmail] = useState<string>("");
  const [meetingTopic, setMeetingTopic] = useState<string>("");
  const [meetingStatus, setMeetingStatus] = useState<"idle" | "loading" | "success">("idle");

  // Call Back Form State
  const [callName, setCallName] = useState<string>("");
  const [callPhone, setCallPhone] = useState<string>("");
  const [callTimeWindow, setCallTimeWindow] = useState<string>("timeMorning");
  const [callStatus, setCallStatus] = useState<"idle" | "loading" | "success">("idle");

  const handleMeetingSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMeetingStatus("loading");

    try {
      await fetch("/api/consultation", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: meetingName,
          phone: meetingPhone,
          email: meetingEmail || "not-provided@alap.ai",
          problemDescription: `[MEETING REQUEST] Date: ${meetingDate}, Time: ${meetingTime}. Topic: ${meetingTopic}`,
          preferredContact: "whatsapp",
        }),
      });
    } catch {
      // Fallback grace
    }

    setTimeout(() => {
      setMeetingStatus("success");
      if (onSuccess) setTimeout(onSuccess, 2500);
    }, 1000);
  };

  const handleCallSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setCallStatus("loading");

    try {
      await fetch("/api/consultation", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: callName,
          phone: callPhone,
          email: "callback@alap.ai",
          problemDescription: `[CALL BACK REQUEST] Preferred Time: ${callTimeWindow}`,
          preferredContact: "phone",
        }),
      });
    } catch {
      // Fallback grace
    }

    setTimeout(() => {
      setCallStatus("success");
      if (onSuccess) setTimeout(onSuccess, 2500);
    }, 1000);
  };

  return (
    <div className={cn("space-y-6", className)}>
      {/* Question Header & 3-Way Switcher Diagram */}
      <div className="space-y-3 text-center">
        <span className="text-xs font-bold uppercase tracking-wider text-[#5B5CE2] dark:text-[#7C7EF2]">
          Talk To ALAP
        </span>
        <h3 className="text-xl sm:text-2xl font-extrabold text-foreground">
          {t.heading}
        </h3>
        <p className="text-xs text-muted-foreground leading-relaxed max-w-md mx-auto">
          {t.subtitle}
        </p>

        {/* 3 Choice Cards */}
        <div className="grid grid-cols-3 gap-2 sm:gap-3 pt-2">
          {/* Card 1: Message */}
          <button
            type="button"
            onClick={() => setMode("message")}
            className={cn(
              "flex flex-col items-center justify-between p-3 rounded-2xl border text-center transition-all cursor-pointer relative overflow-hidden group",
              mode === "message"
                ? "border-[#5B5CE2] bg-[#5B5CE2]/10 text-foreground dark:border-[#7C7EF2] dark:bg-[#7C7EF2]/15 shadow-md"
                : "border-border bg-card text-muted-foreground hover:text-foreground hover:border-border/80"
            )}
          >
            <div className="space-y-1.5 flex flex-col items-center">
              <div
                className={cn(
                  "h-9 w-9 rounded-xl flex items-center justify-center transition-colors",
                  mode === "message"
                    ? "bg-[#5B5CE2] text-white dark:bg-[#7C7EF2]"
                    : "bg-muted text-muted-foreground group-hover:text-foreground"
                )}
              >
                <MessageSquare className="h-4 w-4" />
              </div>
              <div>
                <div className="font-bold text-xs sm:text-sm text-foreground">
                  {t.optionMessageTitle}
                </div>
                <div className="text-[10px] text-muted-foreground hidden sm:block">
                  {t.optionMessageSubtitle}
                </div>
              </div>
            </div>
            <Badge variant="secondary" className="mt-2 text-[9px] px-1.5 py-0">
              {t.optionMessageTag}
            </Badge>
          </button>

          {/* Card 2: Meeting */}
          <button
            type="button"
            onClick={() => setMode("meeting")}
            className={cn(
              "flex flex-col items-center justify-between p-3 rounded-2xl border text-center transition-all cursor-pointer relative overflow-hidden group",
              mode === "meeting"
                ? "border-[#5B5CE2] bg-[#5B5CE2]/10 text-foreground dark:border-[#7C7EF2] dark:bg-[#7C7EF2]/15 shadow-md"
                : "border-border bg-card text-muted-foreground hover:text-foreground hover:border-border/80"
            )}
          >
            <div className="space-y-1.5 flex flex-col items-center">
              <div
                className={cn(
                  "h-9 w-9 rounded-xl flex items-center justify-center transition-colors",
                  mode === "meeting"
                    ? "bg-[#5B5CE2] text-white dark:bg-[#7C7EF2]"
                    : "bg-muted text-muted-foreground group-hover:text-foreground"
                )}
              >
                <Calendar className="h-4 w-4" />
              </div>
              <div>
                <div className="font-bold text-xs sm:text-sm text-foreground">
                  {t.optionMeetingTitle}
                </div>
                <div className="text-[10px] text-muted-foreground hidden sm:block">
                  {t.optionMeetingSubtitle}
                </div>
              </div>
            </div>
            <Badge variant="secondary" className="mt-2 text-[9px] px-1.5 py-0">
              {t.optionMeetingTag}
            </Badge>
          </button>

          {/* Card 3: Call */}
          <button
            type="button"
            onClick={() => setMode("call")}
            className={cn(
              "flex flex-col items-center justify-between p-3 rounded-2xl border text-center transition-all cursor-pointer relative overflow-hidden group",
              mode === "call"
                ? "border-[#5B5CE2] bg-[#5B5CE2]/10 text-foreground dark:border-[#7C7EF2] dark:bg-[#7C7EF2]/15 shadow-md"
                : "border-border bg-card text-muted-foreground hover:text-foreground hover:border-border/80"
            )}
          >
            <div className="space-y-1.5 flex flex-col items-center">
              <div
                className={cn(
                  "h-9 w-9 rounded-xl flex items-center justify-center transition-colors",
                  mode === "call"
                    ? "bg-[#5B5CE2] text-white dark:bg-[#7C7EF2]"
                    : "bg-muted text-muted-foreground group-hover:text-foreground"
                )}
              >
                <PhoneCall className="h-4 w-4" />
              </div>
              <div>
                <div className="font-bold text-xs sm:text-sm text-foreground">
                  {t.optionCallTitle}
                </div>
                <div className="text-[10px] text-muted-foreground hidden sm:block">
                  {t.optionCallSubtitle}
                </div>
              </div>
            </div>
            <Badge variant="secondary" className="mt-2 text-[9px] px-1.5 py-0">
              {t.optionCallTag}
            </Badge>
          </button>
        </div>
      </div>

      <hr className="border-border" />

      {/* Dynamic Content Views */}
      {/* MODE 1: MESSAGE (Inquiry Form) */}
      {mode === "message" && (
        <div className="space-y-4 animate-in fade-in duration-200">
          <div className="flex items-center justify-between text-xs">
            <span className="font-bold text-foreground">💬 Send Problem Description</span>
            <span className="text-muted-foreground">Detailed Technical Review</span>
          </div>
          <ConsultationForm onSuccess={onSuccess} />
        </div>
      )}

      {/* MODE 2: MEETING (Interactive Calendar / Slot Scheduler) */}
      {mode === "meeting" && (
        <div className="space-y-4 animate-in fade-in duration-200">
          {meetingStatus === "success" ? (
            <div className="flex flex-col items-center justify-center p-8 text-center space-y-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/30">
              <CheckCircle2 className="h-12 w-12 text-emerald-500" />
              <h3 className="text-xl font-bold text-foreground">{t.meetingSuccessTitle}</h3>
              <p className="text-sm text-muted-foreground max-w-md">
                {t.meetingSuccessDesc}
              </p>
              <Button variant="outline" size="sm" onClick={() => setMeetingStatus("idle")}>
                Schedule Another Meeting
              </Button>
            </div>
          ) : (
            <form onSubmit={handleMeetingSubmit} className="space-y-4 text-xs">
              <div className="space-y-1">
                <span className="font-bold text-foreground text-sm flex items-center gap-1.5">
                  <Calendar className="h-4 w-4 text-[#5B5CE2] dark:text-[#7C7EF2]" />
                  <span>{t.meetingHeading}</span>
                </span>
              </div>

              {/* Date Selection */}
              <div className="space-y-1.5">
                <label className="font-semibold text-foreground">{t.selectDate}</label>
                <div className="grid grid-cols-3 gap-2">
                  {["Today", "Tomorrow", "Day After"].map((d) => (
                    <button
                      key={d}
                      type="button"
                      onClick={() => setMeetingDate(d)}
                      className={cn(
                        "py-2 px-3 rounded-xl border text-xs font-semibold transition-all",
                        meetingDate === d
                          ? "border-[#5B5CE2] bg-[#5B5CE2] text-white dark:border-[#7C7EF2] dark:bg-[#7C7EF2]"
                          : "border-border bg-card text-muted-foreground hover:text-foreground"
                      )}
                    >
                      {d}
                    </button>
                  ))}
                </div>
              </div>

              {/* Time Slots Selection */}
              <div className="space-y-1.5">
                <label className="font-semibold text-foreground">{t.selectTime}</label>
                <div className="grid grid-cols-4 gap-2">
                  {["10:00 AM", "11:30 AM", "02:30 PM", "05:00 PM"].map((slot) => (
                    <button
                      key={slot}
                      type="button"
                      onClick={() => setMeetingTime(slot)}
                      className={cn(
                        "py-2 px-2 rounded-xl border text-[11px] font-semibold text-center transition-all",
                        meetingTime === slot
                          ? "border-[#5B5CE2] bg-[#5B5CE2] text-white dark:border-[#7C7EF2] dark:bg-[#7C7EF2]"
                          : "border-border bg-card text-muted-foreground hover:text-foreground"
                      )}
                    >
                      {slot}
                    </button>
                  ))}
                </div>
              </div>

              {/* Input Fields */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                <div className="space-y-1">
                  <label className="font-semibold text-foreground">Your Name *</label>
                  <Input
                    placeholder="Full Name"
                    value={meetingName}
                    onChange={(e) => setMeetingName(e.target.value)}
                    required
                  />
                </div>
                <div className="space-y-1">
                  <label className="font-semibold text-foreground">Phone / WhatsApp *</label>
                  <Input
                    placeholder="+880 1700-000000"
                    value={meetingPhone}
                    onChange={(e) => setMeetingPhone(e.target.value)}
                    required
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="font-semibold text-foreground">Email Address</label>
                <Input
                  type="email"
                  placeholder="name@company.com"
                  value={meetingEmail}
                  onChange={(e) => setMeetingEmail(e.target.value)}
                />
              </div>

              <div className="space-y-1">
                <label className="font-semibold text-foreground">{t.discussionTopic}</label>
                <Textarea
                  placeholder={t.topicPlaceholder}
                  value={meetingTopic}
                  onChange={(e) => setMeetingTopic(e.target.value)}
                />
              </div>

              <Button
                type="submit"
                variant="cta"
                size="lg"
                disabled={meetingStatus === "loading"}
                className="w-full gap-2 py-5 text-sm font-bold"
              >
                {meetingStatus === "loading" ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  <Calendar className="h-4 w-4" />
                )}
                <span>{t.confirmMeeting}</span>
              </Button>
            </form>
          )}
        </div>
      )}

      {/* MODE 3: CALL (Immediate / Scheduled Call) */}
      {mode === "call" && (
        <div className="space-y-6 animate-in fade-in duration-200 text-xs">
          {/* Instant Call / WhatsApp Box */}
          <Card className="p-5 space-y-3 bg-[#5B5CE2]/5 dark:bg-[#7C7EF2]/10 border-[#5B5CE2]/30 dark:border-[#7C7EF2]/30">
            <div className="flex items-center justify-between">
              <span className="font-bold text-foreground text-sm flex items-center gap-2">
                <PhoneCall className="h-4 w-4 text-[#5B5CE2] dark:text-[#7C7EF2]" />
                <span>{t.instantTitle}</span>
              </span>
              <Badge variant="success" className="text-[10px]">
                Available Now
              </Badge>
            </div>
            <p className="text-muted-foreground leading-relaxed">{t.instantDesc}</p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
              <a
                href="https://wa.me/880170000000?text=Hi%20ALAP%20Team%2C%20I%20would%20like%20to%20discuss%20a%20business%20automation%20solution."
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold transition-colors shadow-sm"
              >
                <MessageCircle className="h-4 w-4" />
                <span>{t.whatsappBtn}</span>
              </a>

              <a
                href="tel:+880170000000"
                className="flex items-center justify-center gap-2 py-3 px-4 rounded-xl border border-border bg-background hover:bg-muted text-foreground font-bold transition-colors shadow-xs"
              >
                <Phone className="h-4 w-4 text-[#5B5CE2] dark:text-[#7C7EF2]" />
                <span>{t.phoneBtn}</span>
              </a>
            </div>
          </Card>

          {/* Schedule Call Back Form */}
          <div className="space-y-3 pt-2">
            <div className="space-y-0.5">
              <h4 className="font-bold text-foreground text-sm">{t.callbackTitle}</h4>
              <p className="text-muted-foreground">{t.callbackDesc}</p>
            </div>

            {callStatus === "success" ? (
              <div className="flex items-center gap-3 p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-600 dark:text-emerald-400">
                <CheckCircle2 className="h-5 w-5 shrink-0" />
                <div>
                  <div className="font-bold">{t.callbackSuccessTitle}</div>
                  <div className="text-[11px]">{t.callbackSuccessDesc}</div>
                </div>
              </div>
            ) : (
              <form onSubmit={handleCallSubmit} className="space-y-3">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div className="space-y-1">
                    <label className="font-semibold text-foreground">Your Name *</label>
                    <Input
                      placeholder="Full Name"
                      value={callName}
                      onChange={(e) => setCallName(e.target.value)}
                      required
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="font-semibold text-foreground">Phone Number *</label>
                    <Input
                      placeholder="+880 1700-000000"
                      value={callPhone}
                      onChange={(e) => setCallPhone(e.target.value)}
                      required
                    />
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="font-semibold text-foreground">{t.preferredTime}</label>
                  <select
                    value={callTimeWindow}
                    onChange={(e) => setCallTimeWindow(e.target.value)}
                    className="flex h-11 w-full rounded-xl border border-border bg-background px-4 text-xs text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                  >
                    <option value="timeMorning">{t.timeMorning}</option>
                    <option value="timeAfternoon">{t.timeAfternoon}</option>
                    <option value="timeEvening">{t.timeEvening}</option>
                  </select>
                </div>

                <Button
                  type="submit"
                  variant="cta"
                  className="w-full gap-2 py-5 text-xs font-bold"
                  disabled={callStatus === "loading"}
                >
                  {callStatus === "loading" ? (
                    <Loader2 className="h-4 w-4 animate-spin" />
                  ) : (
                    <PhoneCall className="h-4 w-4" />
                  )}
                  <span>{t.requestCallbackBtn}</span>
                </Button>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
