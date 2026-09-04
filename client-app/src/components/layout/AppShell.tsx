"use client";

import React from "react";
import { usePathname } from "next/navigation";
import { ProtectedRoute } from "@/features/auth/ProtectedRoute";
import { Sidebar } from "@/components/layout/Sidebar";
import { Header } from "@/components/layout/Header";

export function AppShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isAuthPage = pathname === "/login" || pathname === "/register";

  return (
    <ProtectedRoute>
      {isAuthPage ? (
        <div className="min-h-screen w-full bg-background">{children}</div>
      ) : (
        <div className="flex h-screen w-full overflow-hidden">
          <Sidebar />
          <div className="flex flex-1 flex-col overflow-y-auto">
            <Header />
            <main className="flex-1 p-6 space-y-6">{children}</main>
          </div>
        </div>
      )}
    </ProtectedRoute>
  );
}
