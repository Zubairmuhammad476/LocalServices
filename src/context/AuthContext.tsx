"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";
import apiClient from "@/lib/api";
import type { User, UserRole } from "@/types/index";

// ─── Types ─────────────────────────────────────────────────────────────────────

interface AuthContextValue {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  handleLogin: (email: string, password: string) => Promise<void>;
  handleRegister: (data: RegisterPayload) => Promise<void>;
  handleLogout: () => Promise<void>;
  hasRole: (role: UserRole) => boolean;
}

interface RegisterPayload {
  name: string;
  email: string;
  password: string;
  password_confirmation: string;
  phone?: string;
  emirate?: string;
  role?: string;
}

// ─── Context ─────────────────────────────────────────────────────────────────

const AuthContext = createContext<AuthContextValue | null>(null);

// ─── Provider ─────────────────────────────────────────────────────────────────

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Load token from localStorage and verify on mount
  useEffect(() => {
    const token = localStorage.getItem("auth_token");
    if (token) {
      apiClient.defaults.headers.common["Authorization"] = `Bearer ${token}`;
      apiClient
        .get("/auth/profile")
        .then((res) => setUser(res.data.user))
        .catch(() => localStorage.removeItem("auth_token"))
        .finally(() => setIsLoading(false));
    } else {
      setIsLoading(false);
    }
  }, []);

  const handleLogin = useCallback(async (email: string, password: string) => {
    const { data } = await apiClient.post("/auth/login", { email, password });
    localStorage.setItem("auth_token", data.token);
    apiClient.defaults.headers.common["Authorization"] = `Bearer ${data.token}`;
    setUser(data.user);
  }, []);

  const handleRegister = useCallback(async (payload: RegisterPayload) => {
    const { data } = await apiClient.post("/auth/register", payload);
    localStorage.setItem("auth_token", data.token);
    apiClient.defaults.headers.common["Authorization"] = `Bearer ${data.token}`;
    setUser(data.user);
  }, []);

  const handleLogout = useCallback(async () => {
    await apiClient.post("/auth/logout").catch(() => {});
    localStorage.removeItem("auth_token");
    delete apiClient.defaults.headers.common["Authorization"];
    setUser(null);
  }, []);

  const hasRole = useCallback(
    (role: UserRole) => user?.roles.includes(role) ?? false,
    [user]
  );

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        isLoading,
        handleLogin,
        handleRegister,
        handleLogout,
        hasRole,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

// ─── Hook ─────────────────────────────────────────────────────────────────────

export function useAuth(): AuthContextValue {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used inside <AuthProvider>");
  return ctx;
}
