"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { useAuth } from "@/features/auth/AuthContext";
import { ThemeToggle } from "@/components/shared/ThemeToggle";
import { Lock, Mail, User, Building2, Phone, AlertCircle, ArrowRight, ShieldCheck, UserCheck } from "lucide-react";

export default function RegisterPage() {
  const { registerClient } = useAuth();
  const router = useRouter();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [company, setCompany] = useState("");
  const [phone, setPhone] = useState("");

  const [errorMsg, setErrorMsg] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg("");
    setIsSubmitting(true);

    const res = await registerClient({
      name,
      email,
      password,
      company,
      phone,
    });

    setIsSubmitting(false);

    if (res.success) {
      router.push("/");
    } else {
      setErrorMsg(res.message || "Registration failed. Please check your information.");
    }
  };

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col justify-between p-6 transition-colors duration-200">
      {/* Header */}
      <div className="flex items-center justify-between max-w-6xl w-full mx-auto">
        <div className="flex items-center gap-3">
          <div className="h-9 w-9 rounded-xl bg-[#5B5CE2] dark:bg-[#7C7EF2] flex items-center justify-center text-white font-black text-lg shadow-sm">
            A
          </div>
          <div>
            <span className="font-extrabold text-lg text-foreground tracking-tight">ALAP</span>
            <span className="text-[10px] uppercase font-bold tracking-wider px-1.5 py-0.5 rounded-md bg-[#5B5CE2]/10 text-[#5B5CE2] dark:bg-[#7C7EF2]/20 dark:text-[#7C7EF2] ml-1">
              Client Portal
            </span>
          </div>
        </div>

        <ThemeToggle />
      </div>

      {/* Register Card */}
      <div className="w-full max-w-lg mx-auto my-auto py-6 space-y-6">
        <Card className="p-8 space-y-6 shadow-xl border-border">
          <div className="space-y-2 text-center">
            <Badge variant="success" className="px-3 py-1 text-[11px] font-semibold uppercase tracking-wider">
              CLIENT Role Registration Only
            </Badge>
            <h1 className="text-2xl font-extrabold text-foreground tracking-tight">
              Create Client Account
            </h1>
            <p className="text-xs text-muted-foreground">
              Register your business profile to view solution contracts, request automation services, and access client portal tools.
            </p>
          </div>

          {/* RBAC Rule Alert Banner */}
          <div className="flex items-start gap-3 p-3.5 rounded-xl bg-[#5B5CE2]/10 border border-[#5B5CE2]/30 dark:bg-[#7C7EF2]/15 dark:border-[#7C7EF2]/30 text-xs text-foreground">
            <UserCheck className="h-4 w-4 text-[#5B5CE2] dark:text-[#7C7EF2] shrink-0 mt-0.5" />
            <div className="space-y-0.5 leading-relaxed">
              <span className="font-bold">Standard Role Assignment:</span>
              <p className="text-muted-foreground">
                Self-registration automatically assigns the <strong className="text-foreground">CLIENT</strong> role. Administrative (<strong className="text-foreground">ADMIN</strong>) access is granted internally by ALAP system administrators.
              </p>
            </div>
          </div>

          {errorMsg && (
            <div className="flex items-center gap-2 p-3 rounded-xl bg-rose-500/10 border border-rose-500/30 text-xs text-rose-600 dark:text-rose-400">
              <AlertCircle className="h-4 w-4 shrink-0" />
              <span>{errorMsg}</span>
            </div>
          )}

          <form onSubmit={handleRegister} className="space-y-4 text-xs">
            <div className="space-y-1">
              <label className="font-semibold text-foreground flex items-center gap-1.5">
                <User className="h-3.5 w-3.5 text-[#5B5CE2] dark:text-[#7C7EF2]" />
                <span>Full Name *</span>
              </label>
              <Input
                placeholder="e.g. Tanvir Ahmed"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="font-semibold text-foreground flex items-center gap-1.5">
                  <Mail className="h-3.5 w-3.5 text-[#5B5CE2] dark:text-[#7C7EF2]" />
                  <span>Email Address *</span>
                </label>
                <Input
                  type="email"
                  placeholder="name@company.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>

              <div className="space-y-1">
                <label className="font-semibold text-foreground flex items-center gap-1.5">
                  <Lock className="h-3.5 w-3.5 text-[#5B5CE2] dark:text-[#7C7EF2]" />
                  <span>Password *</span>
                </label>
                <Input
                  type="password"
                  placeholder="Min 6 characters"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  minLength={6}
                  required
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="font-semibold text-foreground flex items-center gap-1.5">
                  <Building2 className="h-3.5 w-3.5 text-[#5B5CE2] dark:text-[#7C7EF2]" />
                  <span>Company Name</span>
                </label>
                <Input
                  placeholder="e.g. Metro E-Store"
                  value={company}
                  onChange={(e) => setCompany(e.target.value)}
                />
              </div>

              <div className="space-y-1">
                <label className="font-semibold text-foreground flex items-center gap-1.5">
                  <Phone className="h-3.5 w-3.5 text-[#5B5CE2] dark:text-[#7C7EF2]" />
                  <span>Phone Number</span>
                </label>
                <Input
                  placeholder="+880 1700-000000"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                />
              </div>
            </div>

            <Button
              type="submit"
              variant="cta"
              size="lg"
              disabled={isSubmitting}
              className="w-full gap-2 font-bold py-5 mt-2"
            >
              <span>Create Client Account</span>
              <ArrowRight className="h-4 w-4" />
            </Button>
          </form>

          {/* Login Prompt */}
          <div className="text-center text-xs text-muted-foreground pt-2 border-t border-border">
            Already have an account?{" "}
            <Link href="/login" className="font-bold text-[#5B5CE2] dark:text-[#7C7EF2] hover:underline">
              Sign In
            </Link>
          </div>
        </Card>
      </div>

      {/* Footer */}
      <div className="text-center text-xs text-muted-foreground py-4">
        © 2026 ALAP Business Automation & Digital Solutions.
      </div>
    </div>
  );
}
