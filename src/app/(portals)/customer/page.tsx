"use client";

import { useState, useEffect } from "react";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import apiClient from "@/lib/api";
import { toast } from "sonner";

interface Booking {
  id: number;
  service_id: number;
  status: "pending" | "confirmed" | "in_progress" | "completed" | "cancelled";
  scheduled_at: string;
  address: string;
  notes?: string;
  service?: { name: string; slug: string };
  payment?: { status: string; amount: number };
}

const STATUS_COLORS: Record<string, string> = {
  pending: "badge-amber",
  confirmed: "badge-blue",
  in_progress: "badge-blue",
  completed: "badge-green",
  cancelled: "badge-red",
};

const STATUS_ICONS: Record<string, string> = {
  pending: "⏳",
  confirmed: "✅",
  in_progress: "🔧",
  completed: "🎉",
  cancelled: "❌",
};

const QUICK_SERVICES = [
  { icon: "🧹", name: "Deep Cleaning", price: "AED 200", rating: 4.9 },
  { icon: "❄️", name: "AC Service", price: "AED 150", rating: 4.8 },
  { icon: "🔧", name: "Plumbing", price: "AED 180", rating: 4.7 },
  { icon: "⚡", name: "Electrical", price: "AED 200", rating: 4.9 },
  { icon: "🛡️", name: "Pest Control", price: "AED 250", rating: 4.6 },
  { icon: "🌿", name: "Gardening", price: "AED 160", rating: 4.8 },
];

export default function CustomerPortal() {
  const { user, isAuthenticated, isLoading, handleLogout } = useAuth();
  const router = useRouter();
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loadingBookings, setLoadingBookings] = useState(true);
  const [activeTab, setActiveTab] = useState<"overview" | "bookings" | "history" | "profile">("overview");

  useEffect(() => {
    if (!isLoading && !isAuthenticated) router.push("/login");
  }, [isAuthenticated, isLoading, router]);

  useEffect(() => {
    if (!isAuthenticated) return;
    setLoadingBookings(true);
    apiClient.get<{ data: Booking[] }>("/bookings")
      .then(({ data }) => setBookings(data.data ?? []))
      .catch(() => setBookings([]))
      .finally(() => setLoadingBookings(false));
  }, [isAuthenticated]);

  const activeBookings = bookings.filter((b) => ["pending", "confirmed", "in_progress"].includes(b.status));
  const completedBookings = bookings.filter((b) => b.status === "completed");

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#0a0f1e]">
        <div className="h-8 w-8 animate-spin rounded-full border-2 border-blue-500 border-t-transparent" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#080d1a] text-white">
      {/* Header */}
      <header className="border-b border-blue-500/10 bg-[#0a0f1e]/90 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-blue-500 to-cyan-400">
              <span className="text-sm font-black text-white">LA</span>
            </div>
            <div>
              <p className="text-xs text-slate-500">Customer Portal</p>
              <p className="text-sm font-semibold text-white">Welcome back, {user?.name?.split(" ")[0]}!</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <a href="/" className="text-xs text-slate-400 hover:text-white transition-colors">← Home</a>
            <button onClick={() => void handleLogout()} className="rounded-xl border border-white/10 px-3 py-1.5 text-xs text-slate-400 hover:text-white hover:bg-white/5 transition-all">Sign out</button>
          </div>
        </div>
      </header>

      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="grid gap-8 lg:grid-cols-4">
          {/* Sidebar */}
          <aside className="lg:col-span-1">
            <div className="glass-card p-6">
              {/* Avatar */}
              <div className="flex flex-col items-center text-center">
                <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-500 to-cyan-400 text-2xl font-black text-white">
                  {user?.name?.[0] ?? "U"}
                </div>
                <h2 className="mt-3 text-base font-semibold text-white">{user?.name}</h2>
                <p className="text-xs text-slate-400">{user?.email}</p>
                <span className="mt-2 badge-blue text-xs">Customer</span>
              </div>

              {/* Stats */}
              <div className="mt-6 grid grid-cols-2 gap-3">
                <div className="rounded-xl bg-white/[0.04] p-3 text-center">
                  <p className="text-xl font-bold text-white">{bookings.length}</p>
                  <p className="text-xs text-slate-500">Total Jobs</p>
                </div>
                <div className="rounded-xl bg-white/[0.04] p-3 text-center">
                  <p className="text-xl font-bold text-white">{completedBookings.length}</p>
                  <p className="text-xs text-slate-500">Completed</p>
                </div>
              </div>

              {/* Nav */}
              <nav className="mt-6 space-y-1">
                {(
                  [
                    { id: "overview" as const, icon: "🏠", label: "Overview" },
                    { id: "bookings" as const, icon: "📅", label: "Active Bookings" },
                    { id: "history" as const, icon: "📋", label: "History" },
                    { id: "profile" as const, icon: "👤", label: "My Profile" },
                  ]
                ).map((item) => (
                  <button
                    key={item.id}
                    onClick={() => setActiveTab(item.id)}
                    className={`dash-nav-item w-full ${activeTab === item.id ? "active" : ""}`}
                  >
                    <span>{item.icon}</span>
                    <span>{item.label}</span>
                  </button>
                ))}
              </nav>
            </div>
          </aside>

          {/* Main content */}
          <main className="lg:col-span-3">
            {/* Overview */}
            {activeTab === "overview" && (
              <div className="space-y-6">
                {/* Hero greeting */}
                <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-blue-900/60 to-[#0d2050] p-8">
                  <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_right,rgba(6,182,212,0.15)_0%,transparent_60%)]" />
                  <h2 className="relative text-2xl font-bold text-white">
                    Ready for Your Next Service?
                  </h2>
                  <p className="relative mt-2 text-sm text-blue-200">Browse 3,619+ verified services across all UAE emirates.</p>
                  <a href="/services/dubai" className="relative mt-4 inline-block btn-primary px-6 py-2.5 text-sm">
                    Browse Services →
                  </a>
                </div>

                {/* Active booking alert */}
                {activeBookings.length > 0 && (
                  <div className="glass-card border-blue-500/30 bg-blue-900/10 p-5">
                    <p className="text-sm font-medium text-blue-300">
                      📅 You have {activeBookings.length} active booking{activeBookings.length > 1 ? "s" : ""}
                    </p>
                    <button onClick={() => setActiveTab("bookings")} className="mt-2 text-xs text-blue-400 hover:text-blue-300 underline">
                      View all active bookings →
                    </button>
                  </div>
                )}

                {/* Quick book */}
                <div className="glass-card p-6">
                  <h3 className="mb-4 text-base font-semibold text-white">Quick Book</h3>
                  <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
                    {QUICK_SERVICES.map((s) => (
                      <a
                        key={s.name}
                        href={`/services/${s.name.toLowerCase().replace(/ /g, "-")}`}
                        className="group flex flex-col gap-2 rounded-xl border border-white/8 bg-white/[0.03] p-4 text-center transition-all hover:border-blue-500/30 hover:bg-blue-900/10"
                      >
                        <span className="text-2xl">{s.icon}</span>
                        <span className="text-xs font-medium text-white group-hover:text-blue-300">{s.name}</span>
                        <span className="text-xs text-blue-400">{s.price}</span>
                      </a>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Active Bookings */}
            {activeTab === "bookings" && (
              <div className="space-y-4">
                <h2 className="text-xl font-bold text-white">Active Bookings</h2>
                {loadingBookings ? (
                  <div className="glass-card flex items-center justify-center py-16">
                    <div className="h-6 w-6 animate-spin rounded-full border-2 border-blue-500 border-t-transparent" />
                  </div>
                ) : activeBookings.length === 0 ? (
                  <div className="glass-card p-12 text-center">
                    <p className="text-4xl">📭</p>
                    <p className="mt-3 text-base font-medium text-white">No active bookings</p>
                    <p className="mt-1 text-sm text-slate-400">Ready to book your first service?</p>
                    <a href="/services/dubai" className="mt-4 inline-block btn-primary px-6 py-2.5 text-sm">Browse Services</a>
                  </div>
                ) : (
                  activeBookings.map((booking) => (
                    <div key={booking.id} className="glass-card p-6">
                      <div className="flex items-start justify-between">
                        <div>
                          <span className="text-xs text-slate-500">Booking #{booking.id}</span>
                          <h3 className="mt-0.5 text-base font-semibold text-white">
                            {booking.service?.name ?? "Service"}
                          </h3>
                          <p className="mt-1 text-sm text-slate-400">📍 {booking.address}</p>
                          <p className="text-sm text-slate-400">🗓️ {new Date(booking.scheduled_at).toLocaleDateString("en-AE", { weekday: "long", month: "long", day: "numeric", hour: "2-digit", minute: "2-digit" })}</p>
                        </div>
                        <span className={`${STATUS_COLORS[booking.status]} flex items-center gap-1.5`}>
                          {STATUS_ICONS[booking.status]} {booking.status.replace(/_/g, " ")}
                        </span>
                      </div>
                    </div>
                  ))
                )}
              </div>
            )}

            {/* History */}
            {activeTab === "history" && (
              <div className="space-y-4">
                <h2 className="text-xl font-bold text-white">Service History</h2>
                {completedBookings.length === 0 ? (
                  <div className="glass-card p-12 text-center">
                    <p className="text-4xl">📋</p>
                    <p className="mt-3 text-base font-medium text-white">No completed services yet</p>
                  </div>
                ) : (
                  completedBookings.map((booking) => (
                    <div key={booking.id} className="glass-card p-6">
                      <div className="flex items-center justify-between">
                        <div>
                          <h3 className="font-medium text-white">{booking.service?.name ?? "Service"}</h3>
                          <p className="text-xs text-slate-400">{new Date(booking.scheduled_at).toLocaleDateString("en-AE")}</p>
                        </div>
                        <div className="text-right">
                          <span className="badge-green">Completed</span>
                          {booking.payment && <p className="mt-1 text-sm text-cyan-300">AED {booking.payment.amount}</p>}
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>
            )}

            {/* Profile */}
            {activeTab === "profile" && (
              <div className="glass-card p-8">
                <h2 className="mb-6 text-xl font-bold text-white">My Profile</h2>
                <div className="space-y-4">
                  {[
                    { label: "Full Name", value: user?.name, icon: "👤" },
                    { label: "Email Address", value: user?.email, icon: "📧" },
                    { label: "Emirates", value: user?.emirate ?? "Not set", icon: "🇦🇪" },
                    { label: "Account Role", value: user?.roles?.join(", ") ?? "customer", icon: "🎭" },
                  ].map((field) => (
                    <div key={field.label} className="flex items-center gap-4 rounded-xl border border-white/8 bg-white/[0.03] px-4 py-3">
                      <span className="text-lg">{field.icon}</span>
                      <div className="flex-1">
                        <p className="text-xs text-slate-500">{field.label}</p>
                        <p className="text-sm text-white">{field.value}</p>
                      </div>
                    </div>
                  ))}
                </div>
                <button className="mt-6 btn-primary px-6 py-2.5 text-sm">Edit Profile</button>
              </div>
            )}
          </main>
        </div>
      </div>
    </div>
  );
}
