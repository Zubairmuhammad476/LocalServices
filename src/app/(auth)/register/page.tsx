"use client";

import { useState, Suspense } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { cn } from "@/lib/utils";

function RegisterContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const defaultRole = searchParams.get("role") === "provider" ? "provider" : "customer";
  const { handleRegister } = useAuth();

  const [role, setRole] = useState<"customer" | "provider">(defaultRole);
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    emirate: "",
    password: "",
    password_confirmation: "",
  });
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const EMIRATES = [
    "Dubai", "Abu Dhabi", "Sharjah", "Ajman",
    "Ras Al Khaimah", "Fujairah", "Umm Al Quwain",
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (form.password !== form.password_confirmation) {
      setError("Passwords do not match.");
      return;
    }
    if (form.password.length < 8) {
      setError("Password must be at least 8 characters.");
      return;
    }

    setIsLoading(true);
    try {
      await handleRegister({ ...form, role });
      const destination = role === "provider" ? "/provider" : "/customer";
      router.push(destination);
    } catch (err: unknown) {
      const message =
        err instanceof Error ? err.message : "Registration failed. Please try again.";
      setError(message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className="min-h-screen flex items-center justify-center p-4 mesh-bg relative overflow-hidden">
      {/* Glow orbs */}
      <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-blue-600/15 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-cyan-600/10 rounded-full blur-[100px] pointer-events-none" />

      <div className="w-full max-w-lg relative z-10 animate-fade-up">
        <div className="text-center mb-8">
          <Link href="/" className="inline-block text-2xl font-display font-bold text-white mb-2">
            LocalServices<span className="gradient-text">AE</span>
          </Link>
          <p className="text-slate-400 text-sm">Create your account and get started in minutes.</p>
        </div>

        <div className="glass-card p-8">
          {/* Role toggle */}
          <div className="mb-6 flex rounded-xl border border-white/10 bg-white/5 p-1">
            {(["customer", "provider"] as const).map((r) => (
              <button
                key={r}
                type="button"
                onClick={() => setRole(r)}
                className={cn(
                  "flex-1 rounded-lg py-2.5 text-sm font-medium capitalize transition-all",
                  role === r
                    ? "bg-gradient-to-r from-blue-600 to-cyan-500 text-white shadow-lg"
                    : "text-slate-400 hover:text-white"
                )}
              >
                {r === "customer" ? "👤 Customer" : "🔧 Service Provider"}
              </button>
            ))}
          </div>

          <form onSubmit={handleSubmit} className="space-y-4" noValidate>
            <div className="grid grid-cols-2 gap-4">
              <div className="col-span-2">
                <label className="block text-xs font-medium text-slate-400 uppercase tracking-wide mb-1.5">
                  Full Name *
                </label>
                <input
                  type="text"
                  required
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  placeholder="Ahmed Al Rashidi"
                  className="w-full rounded-xl border border-white/10 bg-white/[0.04] px-4 py-3 text-sm text-white placeholder:text-slate-600 focus:border-blue-500/50 focus:outline-none focus:ring-2 focus:ring-blue-500/20 transition-all"
                />
              </div>

              <div className="col-span-2">
                <label className="block text-xs font-medium text-slate-400 uppercase tracking-wide mb-1.5">
                  Email Address *
                </label>
                <input
                  type="email"
                  required
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  placeholder="you@example.ae"
                  className="w-full rounded-xl border border-white/10 bg-white/[0.04] px-4 py-3 text-sm text-white placeholder:text-slate-600 focus:border-blue-500/50 focus:outline-none focus:ring-2 focus:ring-blue-500/20 transition-all"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-400 uppercase tracking-wide mb-1.5">
                  Phone
                </label>
                <input
                  type="tel"
                  value={form.phone}
                  onChange={(e) => setForm({ ...form, phone: e.target.value })}
                  placeholder="+971 50 123 4567"
                  className="w-full rounded-xl border border-white/10 bg-white/[0.04] px-4 py-3 text-sm text-white placeholder:text-slate-600 focus:border-blue-500/50 focus:outline-none focus:ring-2 focus:ring-blue-500/20 transition-all"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-400 uppercase tracking-wide mb-1.5">
                  Emirate
                </label>
                <select
                  value={form.emirate}
                  onChange={(e) => setForm({ ...form, emirate: e.target.value })}
                  className="w-full rounded-xl border border-white/10 bg-[#0d1530] px-4 py-3 text-sm text-white focus:border-blue-500/50 focus:outline-none transition-all"
                >
                  <option value="">Select emirate</option>
                  {EMIRATES.map((e) => (
                    <option key={e} value={e.toLowerCase().replace(/ /g, "-")}>{e}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-400 uppercase tracking-wide mb-1.5">
                  Password *
                </label>
                <input
                  type="password"
                  required
                  value={form.password}
                  onChange={(e) => setForm({ ...form, password: e.target.value })}
                  placeholder="Min. 8 characters"
                  className="w-full rounded-xl border border-white/10 bg-white/[0.04] px-4 py-3 text-sm text-white placeholder:text-slate-600 focus:border-blue-500/50 focus:outline-none focus:ring-2 focus:ring-blue-500/20 transition-all"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-400 uppercase tracking-wide mb-1.5">
                  Confirm Password *
                </label>
                <input
                  type="password"
                  required
                  value={form.password_confirmation}
                  onChange={(e) => setForm({ ...form, password_confirmation: e.target.value })}
                  placeholder="Re-enter password"
                  className="w-full rounded-xl border border-white/10 bg-white/[0.04] px-4 py-3 text-sm text-white placeholder:text-slate-600 focus:border-blue-500/50 focus:outline-none focus:ring-2 focus:ring-blue-500/20 transition-all"
                />
              </div>
            </div>

            {error && (
              <div className="rounded-xl bg-red-900/20 border border-red-500/30 p-3.5 flex gap-3">
                <span className="text-red-400 shrink-0">⚠</span>
                <p className="text-xs text-red-300">{error}</p>
              </div>
            )}

            {role === "provider" && (
              <div className="rounded-xl bg-blue-900/20 border border-blue-500/20 p-3.5 text-xs text-blue-300">
                🔧 Provider accounts are reviewed within 2 business days. You&apos;ll receive an email when approved.
              </div>
            )}

            <button
              type="submit"
              disabled={isLoading}
              className={cn(
                "btn-primary w-full py-3.5 flex items-center justify-center gap-2 mt-2",
                isLoading && "opacity-80 cursor-not-allowed"
              )}
            >
              {isLoading ? (
                <div className="h-5 w-5 rounded-full border-2 border-white/30 border-t-white animate-spin" />
              ) : (
                `Create ${role === "provider" ? "Provider" : "Customer"} Account →`
              )}
            </button>
          </form>

          <div className="mt-6 pt-5 border-t border-white/10 text-center">
            <p className="text-sm text-slate-400">
              Already have an account?{" "}
              <Link href="/login" className="text-blue-400 hover:text-blue-300 font-medium">
                Sign in
              </Link>
            </p>
          </div>
        </div>

        <p className="mt-5 text-center text-xs text-slate-500">
          By registering you agree to our{" "}
          <Link href="/terms" className="text-slate-400 hover:text-white underline">Terms of Service</Link>
          {" "}and{" "}
          <Link href="/privacy" className="text-slate-400 hover:text-white underline">Privacy Policy</Link>.
        </p>
      </div>
    </main>
  );
}

export default function RegisterPage() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center bg-[#060b19] text-white">Loading registration...</div>}>
      <RegisterContent />
    </Suspense>
  );
}
