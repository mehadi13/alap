"use client";

import React, { useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import { useAuth } from "./AuthContext";

const PUBLIC_ROUTES = ["/login", "/register"];

export function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { user, isLoading } = useAuth();
  const router = useRouter();
  const pathname = usePathname();

  const isPublicRoute = PUBLIC_ROUTES.includes(pathname);

  useEffect(() => {
    if (!isLoading) {
      if (!user && !isPublicRoute) {
        router.push("/login");
      } else if (user && isPublicRoute) {
        router.push("/");
      }
    }
  }, [user, isLoading, isPublicRoute, router]);

  // Show loading spinner while checking authentication state
  if (isLoading) {
    return (
      <div className="min-h-screen w-full flex items-center justify-center bg-background text-foreground">
        <div className="flex flex-col items-center gap-3">
          <div className="h-10 w-10 rounded-xl bg-[#5B5CE2] dark:bg-[#7C7EF2] animate-pulse flex items-center justify-center text-white font-black text-xl">
            A
          </div>
          <span className="text-xs font-semibold text-muted-foreground">
            Verifying Authentication...
          </span>
        </div>
      </div>
    );
  }

  // Hide content while redirection side-effects complete in useEffect
  if (!user && !isPublicRoute) {
    return null;
  }

  if (user && isPublicRoute) {
    return null;
  }

  return <>{children}</>;
}
