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

const STATUS_LABELS: Record<string, string> = {
  pending: "⏳ Pending",
  confirmed: "✅ Confirmed",
  in_progress: "🔧 In Progress",
  completed: "🎉 Completed",
  cancelled: "❌ Cancelled",
};

const PERFORMANCE_METRICS = [
  { label: "This Month Revenue", value: "AED 4,280", change: "+12%", up: true },
  { label: "Jobs Completed", value: "23", change: "+5 vs last month", up: true },
  { label: "Avg. Rating", value: "4.8 ⭐", change: "↑ 0.1", up: true },
  { label: "Pending Jobs", value: "4", change: "2 today", up: true },
];

const QUICK_ACTIONS = [
  { icon: "📅", label: "View Schedule", desc: "See upcoming jobs" },
  { icon: "💬", label: "Customer Chat", desc: "Message customers" },
  { icon: "📊", label: "Earnings Report", desc: "Download CSV" },
  { icon: "🛠️", label: "Service Settings", desc: "Edit your offerings" },
];

export default function ProviderPortal() {
  const { user, isAuthenticated, isLoading, handleLogout } = useAuth();
  const router = useRouter();
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loadingBookings, setLoadingBookings] = useState(true);
  const [activeTab, setActiveTab] = useState<"dashboard" | "jobs" | "earnings" | "profile">("dashboard");
  const [activeFilter, setActiveFilter] = useState<"all" | "pending" | "confirmed" | "completed">("all");

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

  const filteredBookings = activeFilter === "all"
    ? bookings
    : bookings.filter((b) => b.status === activeFilter);

  const handleStatusUpdate = async (bookingId: number, status: string) => {
    try {
      await apiClient.put(`/bookings/${bookingId}`, { status });
      setBookings((prev) => prev.map((b) => b.id === bookingId ? { ...b, status: status as Booking["status"] } : b));
      toast.success(`Job status updated to ${status}`);
    } catch {
      toast.error("Failed to update status");
    }
  };

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
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-cyan-400 to-blue-600">
              <span className="text-sm font-black text-white">LA</span>
            </div>
            <div>
              <p className="text-xs text-slate-500">Provider Portal</p>
              <p className="text-sm font-semibold text-white">{user?.name ?? "Provider"}</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <span className="badge-green hidden text-xs sm:inline-flex">🟢 Available</span>
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
              {/* Profile */}
              <div className="flex flex-col items-center text-center">
                <div className="relative">
                  <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-cyan-400 to-blue-600 text-2xl font-black text-white">
                    {user?.name?.[0] ?? "P"}
                  </div>
                  <span className="absolute -bottom-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-green-500 text-[10px]">✓</span>
                </div>
                <h2 className="mt-3 text-base font-semibold text-white">{user?.name}</h2>
                <p className="text-xs text-slate-400">{user?.email}</p>
                <span className="mt-2 badge-blue text-xs">provider</span>
              </div>

              {/* KPIs strip */}
              <div className="mt-5 grid grid-cols-3 gap-2">
                {[
                  { label: "Jobs", value: bookings.length },
                  { label: "Rating", value: "4.8" },
                  { label: "Earnings", value: "4K+" },
                ].map((stat) => (
                  <div key={stat.label} className="rounded-xl bg-white/[0.04] p-2 text-center">
                    <p className="text-sm font-bold text-white">{stat.value}</p>
                    <p className="text-[10px] text-slate-500">{stat.label}</p>
                  </div>
                ))}
              </div>

              {/* Nav */}
              <nav className="mt-5 space-y-1">
                {(
                  [
                    { id: "dashboard" as const, icon: "📊", label: "Dashboard" },
                    { id: "jobs" as const, icon: "🔧", label: "My Jobs" },
                    { id: "earnings" as const, icon: "💰", label: "Earnings" },
                    { id: "profile" as const, icon: "👤", label: "Profile" },
                  ]
                ).map((item) => (
                  <button
                    key={item.id}
                    onClick={() => setActiveTab(item.id)}
                    className={`dash-nav-item w-full ${activeTab === item.id ? "active" : ""}`}
                  >
                    <span>{item.icon}</span>
                    <span>{item.label}</span>
                    {item.id === "jobs" && bookings.filter((b) => b.status === "pending").length > 0 && (
                      <span className="ml-auto flex h-4 w-4 items-center justify-center rounded-full bg-blue-500 text-[10px] text-white">
                        {bookings.filter((b) => b.status === "pending").length}
                      </span>
                    )}
                  </button>
                ))}
              </nav>

              {/* Availability toggle */}
              <div className="mt-5 rounded-xl border border-green-500/20 bg-green-900/10 p-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs text-slate-300">Availability</span>
                  <div className="flex h-5 w-9 cursor-pointer items-center rounded-full bg-green-500 px-0.5">
                    <div className="h-4 w-4 rounded-full bg-white shadow translate-x-4" />
                  </div>
                </div>
                <p className="mt-1 text-xs text-green-400">Currently accepting jobs</p>
              </div>
            </div>
          </aside>

          {/* Main */}
          <main className="lg:col-span-3 space-y-6">
            {/* Dashboard */}
            {activeTab === "dashboard" && (
              <>
                {/* Welcome */}
                <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-blue-900/60 to-[#0d2050] p-8">
                  <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_right,rgba(6,182,212,0.2)_0%,transparent_60%)]" />
                  <h2 className="relative text-2xl font-bold text-white">Good day, {user?.name?.split(" ")[0]}! 👋</h2>
                  <p className="relative mt-1 text-sm text-blue-200">You have {bookings.filter((b) => b.status === "pending").length} new job requests today.</p>
                  <button onClick={() => setActiveTab("jobs")} className="relative mt-4 inline-block btn-primary px-5 py-2.5 text-sm">
                    View New Requests →
                  </button>
                </div>

                {/* Performance metrics */}
                <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
                  {PERFORMANCE_METRICS.map((metric) => (
                    <div key={metric.label} className="stat-card">
                      <p className="text-xs text-slate-400">{metric.label}</p>
                      <p className="mt-2 text-2xl font-bold text-white">{metric.value}</p>
                      <p className={`mt-1 text-xs ${metric.up ? "text-green-400" : "text-red-400"}`}>{metric.change}</p>
                    </div>
                  ))}
                </div>

                {/* Recent jobs preview */}
                <div className="glass-card p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-base font-semibold text-white">Recent Jobs</h3>
                    <button onClick={() => setActiveTab("jobs")} className="text-xs text-blue-400 hover:text-blue-300">View all →</button>
                  </div>
                  {loadingBookings ? (
                    <div className="flex h-20 items-center justify-center"><div className="h-5 w-5 animate-spin rounded-full border-2 border-blue-500 border-t-transparent" /></div>
                  ) : bookings.slice(0, 3).length === 0 ? (
                    <p className="text-center text-sm text-slate-400 py-8">No jobs yet. Your bookings will appear here.</p>
                  ) : (
                    <div className="space-y-3">
                      {bookings.slice(0, 3).map((b) => (
                        <div key={b.id} className="flex items-center justify-between rounded-xl border border-white/5 p-3">
                          <div>
                            <p className="text-sm font-medium text-white">{b.service?.name ?? "Service"}</p>
                            <p className="text-xs text-slate-500">{b.address}</p>
                          </div>
                          <span className={STATUS_COLORS[b.status]}>{STATUS_LABELS[b.status]}</span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {/* Quick actions */}
                <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
                  {QUICK_ACTIONS.map((action) => (
                    <button key={action.label} className="glass-card flex flex-col items-center gap-2 p-5 text-center transition-all hover:border-blue-500/30 hover:-translate-y-1">
                      <span className="text-2xl">{action.icon}</span>
                      <p className="text-sm font-medium text-white">{action.label}</p>
                      <p className="text-xs text-slate-500">{action.desc}</p>
                    </button>
                  ))}
                </div>
              </>
            )}

            {/* Jobs */}
            {activeTab === "jobs" && (
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h2 className="text-xl font-bold text-white">My Jobs</h2>
                  <div className="flex rounded-xl border border-white/10 bg-white/5 p-1">
                    {(["all", "pending", "confirmed", "completed"] as const).map((f) => (
                      <button
                        key={f}
                        onClick={() => setActiveFilter(f)}
                        className={`rounded-lg px-3 py-1.5 text-xs font-medium capitalize transition-all ${activeFilter === f ? "bg-blue-600 text-white" : "text-slate-400 hover:text-white"}`}
                      >
                        {f}
                      </button>
                    ))}
                  </div>
                </div>
                {loadingBookings ? (
                  <div className="glass-card flex justify-center py-16">
                    <div className="h-6 w-6 animate-spin rounded-full border-2 border-blue-500 border-t-transparent" />
                  </div>
                ) : filteredBookings.length === 0 ? (
                  <div className="glass-card p-12 text-center">
                    <p className="text-4xl">🔧</p>
                    <p className="mt-3 font-medium text-white">No {activeFilter === "all" ? "" : activeFilter} jobs</p>
                  </div>
                ) : (
                  filteredBookings.map((booking) => (
                    <div key={booking.id} className="glass-card p-6">
                      <div className="flex flex-wrap items-start justify-between gap-4">
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="text-xs text-slate-500">Job #{booking.id}</span>
                            <span className={STATUS_COLORS[booking.status]}>{STATUS_LABELS[booking.status]}</span>
                          </div>
                          <h3 className="mt-1 text-base font-semibold text-white">{booking.service?.name ?? "Service Request"}</h3>
                          <p className="mt-1 text-sm text-slate-400">📍 {booking.address}</p>
                          <p className="text-sm text-slate-400">🗓️ {new Date(booking.scheduled_at).toLocaleDateString("en-AE", { weekday: "short", month: "short", day: "numeric", hour: "2-digit", minute: "2-digit" })}</p>
                          {booking.notes && <p className="mt-1 text-xs text-slate-500">📝 {booking.notes}</p>}
                        </div>
                        {booking.status === "pending" && (
                          <div className="flex gap-2">
                            <button
                              onClick={() => void handleStatusUpdate(booking.id, "confirmed")}
                              className="rounded-xl border border-green-500/30 bg-green-900/20 px-4 py-2 text-xs font-medium text-green-400 hover:bg-green-900/40 transition-all"
                            >
                              ✓ Accept Job
                            </button>
                            <button
                              onClick={() => void handleStatusUpdate(booking.id, "cancelled")}
                              className="rounded-xl border border-red-500/20 bg-red-900/10 px-3 py-2 text-xs text-red-400 hover:bg-red-900/20 transition-all"
                            >
                              Decline
                            </button>
                          </div>
                        )}
                        {booking.status === "confirmed" && (
                          <button
                            onClick={() => void handleStatusUpdate(booking.id, "in_progress")}
                            className="rounded-xl border border-blue-500/30 bg-blue-900/20 px-4 py-2 text-xs font-medium text-blue-300 hover:bg-blue-900/40 transition-all"
                          >
                            🔧 Start Job
                          </button>
                        )}
                        {booking.status === "in_progress" && (
                          <button
                            onClick={() => void handleStatusUpdate(booking.id, "completed")}
                            className="rounded-xl btn-primary px-4 py-2 text-xs"
                          >
                            🎉 Mark Complete
                          </button>
                        )}
                      </div>
                    </div>
                  ))
                )}
              </div>
            )}

            {/* Earnings */}
            {activeTab === "earnings" && (
              <div className="space-y-6">
                <h2 className="text-xl font-bold text-white">Earnings</h2>
                <div className="grid gap-4 sm:grid-cols-3">
                  {[
                    { label: "This Month", value: "AED 4,280", sub: "23 jobs completed", color: "from-blue-600/20 to-blue-900/10", border: "border-blue-500/20" },
                    { label: "Last Month", value: "AED 3,820", sub: "19 jobs completed", color: "from-cyan-600/20 to-cyan-900/10", border: "border-cyan-500/20" },
                    { label: "All Time", value: "AED 38,640", sub: "214 jobs completed", color: "from-purple-600/20 to-purple-900/10", border: "border-purple-500/20" },
                  ].map((e) => (
                    <div key={e.label} className={`stat-card bg-gradient-to-br ${e.color} border ${e.border}`}>
                      <p className="text-xs text-slate-400">{e.label}</p>
                      <p className="mt-2 text-3xl font-bold text-white">{e.value}</p>
                      <p className="mt-1 text-xs text-slate-400">{e.sub}</p>
                    </div>
                  ))}
                </div>

                <div className="glass-card p-6">
                  <h3 className="mb-4 text-base font-semibold text-white">Recent Payments</h3>
                  <div className="space-y-3">
                    {bookings.filter((b) => b.payment).map((b) => (
                      <div key={b.id} className="flex items-center justify-between rounded-xl border border-white/5 p-3">
                        <div>
                          <p className="text-sm font-medium text-white">{b.service?.name ?? "Service"}</p>
                          <p className="text-xs text-slate-500">{new Date(b.scheduled_at).toLocaleDateString("en-AE")}</p>
                        </div>
                        <p className="text-sm font-semibold text-cyan-300">AED {b.payment?.amount}</p>
                      </div>
                    ))}
                    {!bookings.some((b) => b.payment) && (
                      <p className="text-center text-sm text-slate-400 py-6">No payment records yet.</p>
                    )}
                  </div>
                </div>
              </div>
            )}

            {/* Profile */}
            {activeTab === "profile" && (
              <div className="glass-card p-8">
                <h2 className="mb-6 text-xl font-bold text-white">Provider Profile</h2>
                <div className="space-y-4">
                  {[
                    { label: "Business Name", value: user?.name, icon: "🏢" },
                    { label: "Email", value: user?.email, icon: "📧" },
                    { label: "Emirates Served", value: user?.emirate ?? "All emirates", icon: "🇦🇪" },
                    { label: "Verification Status", value: "✓ Verified", icon: "🛡️" },
                    { label: "Member Since", value: "March 2024", icon: "📅" },
                  ].map((field) => (
                    <div key={field.label} className="flex items-center gap-4 rounded-xl border border-white/8 bg-white/[0.03] px-4 py-3">
                      <span className="text-lg">{field.icon}</span>
                      <div>
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
