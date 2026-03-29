"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { cn } from "@/lib/utils";

export default function LoginPage() {
  const router = useRouter();
  const { handleLogin } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsLoading(true);

    try {
      await handleLogin(email, password);
      router.push("/");
    } catch (err: unknown) {
      const message =
        err instanceof Error ? err.message : "Invalid credentials. Please try again.";
      setError(message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className="min-h-screen flex items-center justify-center p-4 mesh-bg relative overflow-hidden">
      {/* Premium Background Elements */}
      <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-blue-600/20 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-cyan-600/10 rounded-full blur-[100px] pointer-events-none" />
      
      <div className="w-full max-w-md relative z-10 animate-fade-up">
        <div className="text-center mb-8">
          <Link href="/" className="inline-block text-2xl font-display font-bold text-white mb-2">
            LocalServices<span className="gradient-text">AE</span>
          </Link>
          <p className="text-slate-400 text-sm">Welcome back. Enter your details to continue.</p>
        </div>

        <div className="glass-card p-8">
          <form onSubmit={handleSubmit} className="space-y-5" noValidate>
            <div>
              <label htmlFor="email" className="block text-xs font-medium text-slate-400 uppercase tracking-wide mb-1.5">
                Email Address
              </label>
              <input
                id="email"
                type="email"
                autoComplete="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                className="w-full rounded-lg bg-white/[0.04] border border-white/10 px-4 py-2.5 text-sm text-white placeholder:text-slate-600 focus:border-blue-500/50 focus:outline-none focus:ring-2 focus:ring-blue-500/20 transition-all input-glow"
              />
            </div>

            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label htmlFor="password" className="block text-xs font-medium text-slate-400 uppercase tracking-wide">
                  Password
                </label>
                <Link href="/forgot-password" className="text-xs text-blue-400 hover:text-blue-300">
                  Forgot password?
                </Link>
              </div>
              <input
                id="password"
                type="password"
                autoComplete="current-password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full rounded-lg bg-white/[0.04] border border-white/10 px-4 py-2.5 text-sm text-white placeholder:text-slate-600 focus:border-blue-500/50 focus:outline-none focus:ring-2 focus:ring-blue-500/20 transition-all input-glow"
              />
            </div>

            {error && (
              <div className="rounded-lg bg-red-900/20 border border-red-500/30 p-3 flex gap-3 animate-slide-in-up">
                <span className="text-red-400 shrink-0">⚠</span>
                <p className="text-xs text-red-300">{error}</p>
              </div>
            )}

            <button
              type="submit"
              disabled={isLoading}
              className={cn(
                "btn-primary w-full py-3 h-12 flex items-center justify-center",
                isLoading && "opacity-80 cursor-not-allowed"
              )}
            >
              {isLoading ? (
                <div className="h-5 w-5 rounded-full border-2 border-white/30 border-t-white animate-spin" />
              ) : (
                "Sign In →"
              )}
            </button>
          </form>

          <div className="mt-8 pt-6 border-t border-white/10 text-center">
            <p className="text-sm text-slate-400">
               Don't have an account?{" "}
              <Link href="/register" className="text-blue-400 hover:text-blue-300 font-medium">
                Create one
              </Link>
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}
