"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Sparkles, CheckCircle2, AlertCircle, Loader2 } from "lucide-react";
import { useLanguage } from "@/i18n/LanguageContext";

const formSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Valid email address is required"),
  phone: z.string().min(6, "Valid phone number is required"),
  company: z.string().optional(),
  businessType: z.string().optional(),
  problemDescription: z.string().min(10, "Please describe your problem (at least 10 characters)"),
  preferredContact: z.enum(["email", "phone", "whatsapp"]),
  website: z.string().optional(),
  teamSize: z.string().optional(),
});

type FormValues = z.infer<typeof formSchema>;

interface ConsultationFormProps {
  onSuccess?: () => void;
  className?: string;
}

export function ConsultationForm({ onSuccess, className }: ConsultationFormProps) {
  const { locale, dict } = useLanguage();
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState<string>("");

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      company: "",
      businessType: "",
      problemDescription: "",
      preferredContact: "whatsapp",
      website: "",
      teamSize: "",
    },
  });

  const onSubmit = async (data: FormValues) => {
    setStatus("loading");
    setErrorMessage("");

    try {
      const response = await fetch("/api/consultation", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      const resData = await response.json();

      if (response.ok && resData.success) {
        setStatus("success");
        reset();
        if (onSuccess) {
          setTimeout(onSuccess, 3000);
        }
      } else {
        setStatus("error");
        setErrorMessage(resData.message || "Failed to submit request. Please try again.");
      }
    } catch {
      setStatus("error");
      setErrorMessage("Network error occurred. Please check your internet connection.");
    }
  };

  if (status === "success") {
    return (
      <div className="flex flex-col items-center justify-center p-8 text-center space-y-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/30">
        <CheckCircle2 className="h-12 w-12 text-emerald-500" />
        <h3 className="text-xl font-bold text-foreground">{dict.forms.successTitle}</h3>
        <p className="text-sm text-muted-foreground max-w-md">
          {dict.forms.successDesc}
        </p>
        <Button variant="outline" size="sm" onClick={() => setStatus("idle")}>
          {dict.forms.anotherInquiry}
        </Button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={`space-y-4 ${className || ""}`}>
      {status === "error" && (
        <div className="flex items-center gap-2 p-3 rounded-xl bg-rose-500/10 border border-rose-500/30 text-xs text-rose-600 dark:text-rose-400">
          <AlertCircle className="h-4 w-4 shrink-0" />
          <span>{errorMessage}</span>
        </div>
      )}

      {/* Name & Phone */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="space-y-1">
          <label className="text-xs font-semibold text-foreground">{dict.forms.fullName}</label>
          <Input placeholder="e.g. Tanvir Ahmed" {...register("name")} />
          {errors.name && <p className="text-[11px] text-rose-500">{errors.name.message}</p>}
        </div>

        <div className="space-y-1">
          <label className="text-xs font-semibold text-foreground">{dict.forms.phone}</label>
          <Input placeholder="+880 1700-000000" {...register("phone")} />
          {errors.phone && <p className="text-[11px] text-rose-500">{errors.phone.message}</p>}
        </div>
      </div>

      {/* Email & Company */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="space-y-1">
          <label className="text-xs font-semibold text-foreground">{dict.forms.email}</label>
          <Input type="email" placeholder="name@company.com" {...register("email")} />
          {errors.email && <p className="text-[11px] text-rose-500">{errors.email.message}</p>}
        </div>

        <div className="space-y-1">
          <label className="text-xs font-semibold text-foreground">{dict.forms.company}</label>
          <Input placeholder="Company / Business Name" {...register("company")} />
        </div>
      </div>

      {/* Preferred Contact & Business Type */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="space-y-1">
          <label className="text-xs font-semibold text-foreground">{dict.forms.industry}</label>
          <Input placeholder="e.g. E-Commerce, Clinic, Real Estate" {...register("businessType")} />
        </div>

        <div className="space-y-1">
          <label className="text-xs font-semibold text-foreground">{dict.forms.contactMethod}</label>
          <select
            {...register("preferredContact")}
            className="flex h-11 w-full rounded-xl border border-[#E5E5E5] bg-[#FFFFFF] px-4 text-sm text-[#111111] dark:border-[#292929] dark:bg-[#141414] dark:text-[#F5F5F5] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#5B5CE2]"
          >
            <option value="whatsapp">{locale === "bn" ? "হোয়াটসঅ্যাপ মেসেজ" : "WhatsApp Message"}</option>
            <option value="phone">{locale === "bn" ? "ফোন কল" : "Phone Call"}</option>
            <option value="email">{locale === "bn" ? "ইমেইল" : "Email"}</option>
          </select>
        </div>
      </div>

      {/* Problem Description */}
      <div className="space-y-1">
        <label className="text-xs font-semibold text-foreground">
          {dict.forms.problemLabel}
        </label>
        <Textarea
          placeholder={dict.forms.problemPlaceholder}
          {...register("problemDescription")}
        />
        {errors.problemDescription && (
          <p className="text-[11px] text-rose-500">{errors.problemDescription.message}</p>
        )}
      </div>

      {/* Submit Button */}
      <Button
        type="submit"
        variant="cta"
        size="lg"
        disabled={status === "loading"}
        className="w-full gap-2 text-base font-bold py-6 mt-2"
      >
        {status === "loading" ? (
          <>
            <Loader2 className="h-5 w-5 animate-spin" />
            <span>{dict.forms.submitting}</span>
          </>
        ) : (
          <>
            <Sparkles className="h-5 w-5" />
            <span>{dict.forms.submitButton}</span>
          </>
        )}
      </Button>
    </form>
  );
}
