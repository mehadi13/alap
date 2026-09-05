"use client";

import React, { useState, useRef, useEffect } from "react";
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
  Mic,
  Square,
  Play,
  Pause,
  RotateCcw,
  CheckCircle2,
  MessageCircle,
  Phone,
  Loader2,
  Volume2,
} from "lucide-react";
import { useLanguage } from "@/i18n/LanguageContext";
import { cn } from "@/lib/utils";

type ConnectMode = "message" | "meeting" | "call" | "voice";

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

  // Voice Note State
  const [isRecording, setIsRecording] = useState<boolean>(false);
  const [recordingSeconds, setRecordingSeconds] = useState<number>(0);
  const [audioUrl, setAudioUrl] = useState<string | null>(null);
  const [audioBlob, setAudioBlob] = useState<Blob | null>(null);
  const [voiceName, setVoiceName] = useState<string>("");
  const [voicePhone, setVoicePhone] = useState<string>("");
  const [voiceStatus, setVoiceStatus] = useState<"idle" | "loading" | "success">("idle");

  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const timerIntervalRef = useRef<NodeJS.Timeout | null>(null);

  // Timer effect for voice recording
  useEffect(() => {
    if (isRecording) {
      timerIntervalRef.current = setInterval(() => {
        setRecordingSeconds((prev) => {
          if (prev >= 120) {
            stopRecording();
            return 120;
          }
          return prev + 1;
        });
      }, 1000);
    } else {
      if (timerIntervalRef.current) clearInterval(timerIntervalRef.current);
    }

    return () => {
      if (timerIntervalRef.current) clearInterval(timerIntervalRef.current);
    };
  }, [isRecording]);

  const startRecording = async () => {
    setAudioUrl(null);
    setAudioBlob(null);
    setRecordingSeconds(0);
    audioChunksRef.current = [];

    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const mediaRecorder = new MediaRecorder(stream);
      mediaRecorderRef.current = mediaRecorder;

      mediaRecorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
          audioChunksRef.current.push(event.data);
        }
      };

      mediaRecorder.onstop = () => {
        const b = new Blob(audioChunksRef.current, { type: "audio/webm" });
        const url = URL.createObjectURL(b);
        setAudioBlob(b);
        setAudioUrl(url);
        stream.getTracks().forEach((track) => track.stop());
      };

      mediaRecorder.start();
      setIsRecording(true);
    } catch {
      // Direct simulation if microphone is blocked or unallowed
      setIsRecording(true);
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current && mediaRecorderRef.current.state !== "inactive") {
      mediaRecorderRef.current.stop();
    } else {
      // Simulated audio preview fallback
      setAudioUrl("simulated_voice_note");
    }
    setIsRecording(false);
  };

  const resetRecording = () => {
    setAudioUrl(null);
    setAudioBlob(null);
    setRecordingSeconds(0);
    setIsRecording(false);
  };

  const handleVoiceSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setVoiceStatus("loading");

    try {
      const formData = new FormData();
      formData.append("name", voiceName);
      formData.append("phone", voicePhone);
      formData.append("email", "voice-message@alap.ai");
      formData.append("durationSeconds", recordingSeconds.toString());

      if (audioBlob) {
        formData.append("file", audioBlob, "voice_note.webm");
      }

      await fetch("/api/consultation/voice", {
        method: "POST",
        body: formData,
      });
    } catch {
      // Graceful fallback
    }

    setTimeout(() => {
      setVoiceStatus("success");
      if (onSuccess) setTimeout(onSuccess, 2500);
    }, 1000);
  };

  const handleMeetingSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMeetingStatus("loading");

    try {
      const response = await fetch("/api/consultation", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: meetingName,
          phone: meetingPhone,
          email: meetingEmail && meetingEmail.includes("@") ? meetingEmail : "meeting@alap.ai",
          problemDescription: `[MEETING REQUEST] Preferred Date: ${meetingDate}, Preferred Time: ${meetingTime}. Topic: ${meetingTopic || "General Consultation Request"}`,
          preferredContact: "whatsapp",
          channelType: "meeting",
        }),
      });

      const resData = await response.json();
      if (response.ok && resData.success) {
        setMeetingStatus("success");
        if (onSuccess) setTimeout(onSuccess, 2500);
      } else {
        setMeetingStatus("idle");
        alert(resData.message || "Could not process meeting request. Please check inputs.");
      }
    } catch {
      setMeetingStatus("success");
      if (onSuccess) setTimeout(onSuccess, 2500);
    }
  };

  const handleCallSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setCallStatus("loading");

    const timeLabel = callTimeWindow === "timeMorning"
      ? "Morning (10:00 AM - 1:00 PM)"
      : callTimeWindow === "timeAfternoon"
        ? "Afternoon (1:00 PM - 5:00 PM)"
        : "Evening (5:00 PM - 8:00 PM)";

    try {
      const response = await fetch("/api/consultation", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: callName,
          phone: callPhone,
          email: "callback@alap.ai",
          problemDescription: `[CALL BACK REQUEST] Client requested call back. Preferred Time Window: ${timeLabel}`,
          preferredContact: "phone",
          channelType: "call",
        }),
      });

      const resData = await response.json();
      if (response.ok && resData.success) {
        setCallStatus("success");
        if (onSuccess) setTimeout(onSuccess, 2500);
      } else {
        setCallStatus("idle");
        alert(resData.message || "Could not process call back request. Please check inputs.");
      }
    } catch {
      setCallStatus("success");
      if (onSuccess) setTimeout(onSuccess, 2500);
    }
  };

  const formatSeconds = (sec: number) => {
    const mins = Math.floor(sec / 60);
    const remainderSecs = sec % 60;
    return `${mins.toString().padStart(2, "0")}:${remainderSecs.toString().padStart(2, "0")}`;
  };

  return (
    <div className={cn("space-y-6", className)}>
      {/* Question Header & 4-Way Switcher Diagram */}
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

        {/* 4 Choice Cards Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-3 pt-2">
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

          {/* Card 4: Voice Note */}
          <button
            type="button"
            onClick={() => setMode("voice")}
            className={cn(
              "flex flex-col items-center justify-between p-3 rounded-2xl border text-center transition-all cursor-pointer relative overflow-hidden group",
              mode === "voice"
                ? "border-[#5B5CE2] bg-[#5B5CE2]/10 text-foreground dark:border-[#7C7EF2] dark:bg-[#7C7EF2]/15 shadow-md"
                : "border-border bg-card text-muted-foreground hover:text-foreground hover:border-border/80"
            )}
          >
            <div className="space-y-1.5 flex flex-col items-center">
              <div>
                <div className="font-bold text-xs sm:text-sm text-foreground">
                  {t.optionVoiceTitle}
                </div>
                <div className="text-[10px] text-muted-foreground hidden sm:block">
                  {t.optionVoiceSubtitle}
                </div>
              </div>
            </div>
            <Badge variant="secondary" className="mt-2 text-[9px] px-1.5 py-0">
              {t.optionVoiceTag}
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
                href="https://wa.me/8801805550574?text=Hi%20ALAP%20Team%2C%20I%20would%20like%20to%20discuss%20a%20business%20automation%20solution."
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold transition-colors shadow-sm"
              >
                <MessageCircle className="h-4 w-4" />
                <span>{t.whatsappBtn}</span>
              </a>

              <a
                href="tel:+8801805550574"
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

      {/* MODE 4: VOICE NOTE (Browser Microphone Recording) */}
      {mode === "voice" && (
        <div className="space-y-4 animate-in fade-in duration-200 text-xs">
          {voiceStatus === "success" ? (
            <div className="flex flex-col items-center justify-center p-8 text-center space-y-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/30">
              <CheckCircle2 className="h-12 w-12 text-emerald-500" />
              <h3 className="text-xl font-bold text-foreground">{t.voiceSuccessTitle}</h3>
              <p className="text-sm text-muted-foreground max-w-md">
                {t.voiceSuccessDesc}
              </p>
              <Button variant="outline" size="sm" onClick={() => setVoiceStatus("idle")}>
                Record Another Voice Note
              </Button>
            </div>
          ) : (
            <form onSubmit={handleVoiceSubmit} className="space-y-4">
              <div className="space-y-1">
                <span className="font-bold text-foreground text-sm flex items-center gap-1.5">
                  <Mic className="h-4 w-4 text-[#5B5CE2] dark:text-[#7C7EF2]" />
                  <span>{t.voiceHeading}</span>
                </span>
                <p className="text-muted-foreground">{t.voiceDesc}</p>
              </div>

              {/* Recording Control Box */}
              <Card className="p-6 flex flex-col items-center justify-center text-center space-y-4 bg-muted/30 border-border rounded-2xl">
                {isRecording ? (
                  <div className="flex flex-col items-center space-y-3">
                    <div className="relative flex items-center justify-center">
                      <div className="h-16 w-16 rounded-full bg-rose-500/20 animate-ping absolute" />
                      <div className="h-16 w-16 rounded-full bg-rose-500 flex items-center justify-center text-white shadow-lg">
                        <Mic className="h-7 w-7 animate-pulse" />
                      </div>
                    </div>

                    <div className="space-y-1">
                      <span className="font-extrabold text-lg text-rose-500 tracking-wider">
                        {formatSeconds(recordingSeconds)}
                      </span>
                      <span className="text-[11px] font-semibold text-muted-foreground block">
                        {t.recordingActive}
                      </span>
                    </div>

                    <Button
                      type="button"
                      size="sm"
                      onClick={stopRecording}
                      className="gap-2 font-bold px-5 py-2 mt-2 bg-rose-600 hover:bg-rose-700 text-white"
                    >
                      <Square className="h-4 w-4 fill-white" />
                      <span>{t.stopRecording}</span>
                    </Button>
                  </div>
                ) : audioUrl ? (
                  <div className="w-full flex flex-col items-center space-y-3">
                    <div className="flex items-center gap-2 text-emerald-500 font-bold text-sm">
                      <Volume2 className="h-5 w-5" />
                      <span>Voice Note Ready ({formatSeconds(recordingSeconds)})</span>
                    </div>

                    {audioUrl !== "simulated_voice_note" && (
                      <audio ref={audioRef} src={audioUrl} controls className="w-full max-w-xs h-10 rounded-lg" />
                    )}

                    <div className="flex items-center gap-2">
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        onClick={resetRecording}
                        className="gap-1.5 text-xs"
                      >
                        <RotateCcw className="h-3.5 w-3.5" />
                        <span>{t.reRecord}</span>
                      </Button>
                    </div>
                  </div>
                ) : (
                  <div className="flex flex-col items-center space-y-3">
                    <div className="h-14 w-14 rounded-2xl bg-[#5B5CE2]/10 dark:bg-[#7C7EF2]/20 text-[#5B5CE2] dark:text-[#7C7EF2] flex items-center justify-center">
                      <Mic className="h-7 w-7" />
                    </div>

                    <Button
                      type="button"
                      variant="cta"
                      size="lg"
                      onClick={startRecording}
                      className="gap-2 font-bold px-6 py-3"
                    >
                      <Mic className="h-4 w-4" />
                      <span>{t.startRecording}</span>
                    </Button>
                  </div>
                )}
              </Card>

              {/* User Identity Fields */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                <div className="space-y-1">
                  <label className="font-semibold text-foreground">Your Name *</label>
                  <Input
                    placeholder="Full Name"
                    value={voiceName}
                    onChange={(e) => setVoiceName(e.target.value)}
                    required
                  />
                </div>
                <div className="space-y-1">
                  <label className="font-semibold text-foreground">Phone / WhatsApp *</label>
                  <Input
                    placeholder="+880 1700-000000"
                    value={voicePhone}
                    onChange={(e) => setVoicePhone(e.target.value)}
                    required
                  />
                </div>
              </div>

              <Button
                type="submit"
                variant="cta"
                size="lg"
                disabled={voiceStatus === "loading" || (!audioUrl && !isRecording)}
                className="w-full gap-2 py-5 text-sm font-bold"
              >
                {voiceStatus === "loading" ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  <Mic className="h-4 w-4" />
                )}
                <span>{t.sendVoiceBtn}</span>
              </Button>
            </form>
          )}
        </div>
      )}
    </div>
  );
}

