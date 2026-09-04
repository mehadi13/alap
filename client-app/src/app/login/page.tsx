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
import { Lock, Mail, AlertCircle, ArrowRight } from "lucide-react";

export default function LoginPage() {
  const { login } = useAuth();
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg("");
    setIsSubmitting(true);

    const res = await login(email, password);
    setIsSubmitting(false);

    if (res.success) {
      router.push("/");
    } else {
      setErrorMsg(res.message || "Invalid credentials. Please try again.");
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
              Client App
            </span>
          </div>
        </div>

        <ThemeToggle />
      </div>

      {/* Login Card */}
      <div className="w-full max-w-md mx-auto my-auto space-y-6">
        <Card className="p-8 space-y-6 shadow-xl border-border">
          <div className="space-y-2 text-center">
            <Badge variant="accent" className="px-3 py-1 text-[11px] font-semibold uppercase tracking-wider">
              Standard RBAC Portal
            </Badge>
            <h1 className="text-2xl font-extrabold text-foreground tracking-tight">
              Sign In to ALAP
            </h1>
            <p className="text-xs text-muted-foreground">
              Enter your account credentials to access your client dashboard or admin controls.
            </p>
          </div>

          {errorMsg && (
            <div className="flex items-center gap-2 p-3 rounded-xl bg-rose-500/10 border border-rose-500/30 text-xs text-rose-600 dark:text-rose-400">
              <AlertCircle className="h-4 w-4 shrink-0" />
              <span>{errorMsg}</span>
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-4 text-xs">
            <div className="space-y-1">
              <label className="font-semibold text-foreground flex items-center gap-1.5">
                <Mail className="h-3.5 w-3.5 text-[#5B5CE2] dark:text-[#7C7EF2]" />
                <span>Email Address</span>
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
              <div className="flex items-center justify-between">
                <label className="font-semibold text-foreground flex items-center gap-1.5">
                  <Lock className="h-3.5 w-3.5 text-[#5B5CE2] dark:text-[#7C7EF2]" />
                  <span>Password</span>
                </label>
              </div>
              <Input
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            <Button
              type="submit"
              variant="cta"
              size="lg"
              disabled={isSubmitting}
              className="w-full gap-2 font-bold py-5 mt-2"
            >
              <span>Sign In</span>
              <ArrowRight className="h-4 w-4" />
            </Button>
          </form>

          {/* Registration Prompt */}
          <div className="text-center text-xs text-muted-foreground pt-2 border-t border-border">
            Don&apos;t have a client account?{" "}
            <Link href="/register" className="font-bold text-[#5B5CE2] dark:text-[#7C7EF2] hover:underline">
              Register as Client
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
