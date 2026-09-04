"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";

export type Role = "CLIENT" | "ADMIN";

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  company?: string;
  phone?: string;
  role: Role;
  createdAt?: string;
}

interface AuthContextType {
  user: UserProfile | null;
  token: string | null;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<{ success: boolean; message?: string }>;
  registerClient: (data: {
    name: string;
    email: string;
    password: string;
    company?: string;
    phone?: string;
  }) => Promise<{ success: boolean; message?: string }>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  token: null,
  isLoading: true,
  login: async () => ({ success: false }),
  registerClient: async () => ({ success: false }),
  logout: () => {},
});

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<UserProfile | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const router = useRouter();
  const pathname = usePathname();

  const API_BASE = "http://localhost:8080/api/v1/auth";

  // Check stored auth session
  useEffect(() => {
    const storedToken = localStorage.getItem("alap_auth_token");
    const storedUser = localStorage.getItem("alap_auth_user");

    if (storedToken && storedUser) {
      try {
        setToken(storedToken);
        setUser(JSON.parse(storedUser));
      } catch {
        localStorage.removeItem("alap_auth_token");
        localStorage.removeItem("alap_auth_user");
      }
    }
    setIsLoading(false);
  }, []);

  const login = async (email: string, password: string) => {
    try {
      const res = await fetch(`${API_BASE}/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      const data = await res.json();

      if (res.ok && data.success && data.data) {
        const authToken = data.data.token;
        const authUser = data.data.user;

        setToken(authToken);
        setUser(authUser);

        localStorage.setItem("alap_auth_token", authToken);
        localStorage.setItem("alap_auth_user", JSON.stringify(authUser));

        return { success: true };
      } else {
        return { success: false, message: data.message || "Invalid credentials" };
      }
    } catch {
      return { success: false, message: "Could not connect to authentication service." };
    }
  };

  const registerClient = async (regData: {
    name: string;
    email: string;
    password: string;
    company?: string;
    phone?: string;
  }) => {
    try {
      const res = await fetch(`${API_BASE}/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(regData),
      });
      const data = await res.json();

      if (res.ok && data.success && data.data) {
        const authToken = data.data.token;
        const authUser = data.data.user;

        setToken(authToken);
        setUser(authUser);

        localStorage.setItem("alap_auth_token", authToken);
        localStorage.setItem("alap_auth_user", JSON.stringify(authUser));

        return { success: true };
      } else {
        return { success: false, message: data.message || "Registration failed" };
      }
    } catch {
      return { success: false, message: "Could not connect to registration service." };
    }
  };

  const logout = () => {
    setToken(null);
    setUser(null);
    localStorage.removeItem("alap_auth_token");
    localStorage.removeItem("alap_auth_user");
    router.push("/login");
  };

  return (
    <AuthContext.Provider value={{ user, token, isLoading, login, registerClient, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
