"use client";

import { useState, useEffect, useCallback } from "react";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import apiClient from "@/lib/api";
import { toast } from "sonner";

interface Service {
  id: number;
  name: string;
  slug: string;
  seo_title: string;
  seo_description: string;
  design_layout: string;
  base_price: number;
  is_active: boolean;
  is_seo_optimized: boolean;
  json_ld_schema?: string;
  emirate?: string;
  category?: string;
  created_at: string;
}

interface PaginatedData {
  data: Service[];
  current_page: number;
  last_page: number;
  total: number;
  per_page: number;
  meta?: { total: number; last_page: number; current_page: number };
}

const LAYOUTS = ["standard", "showcase", "compact", "featured"] as const;
const EMIRATES = ["dubai", "abu-dhabi", "sharjah", "ajman", "ras-al-khaimah", "fujairah", "umm-al-quwain"];

const LAYOUT_COLORS: Record<string, string> = {
  standard: "badge-blue",
  showcase: "badge-green",
  compact: "badge-amber",
  featured: "badge-red",
};

export default function AdminSeoDashboard() {
  const { user, isAuthenticated, isLoading } = useAuth();
  const router = useRouter();

  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);
  const [totalServices, setTotalServices] = useState(0);
  const [totalPages, setTotalPages] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);
  const [search, setSearch] = useState("");
  const [filterLayout, setFilterLayout] = useState("");
  const [filterEmirate, setFilterEmirate] = useState("");
  const [editService, setEditService] = useState<Service | null>(null);
  const [editOpen, setEditOpen] = useState(false);
  const [deleteConfirm, setDeleteConfirm] = useState<number | null>(null);
  const [saving, setSaving] = useState(false);
  const [activeTab, setActiveTab] = useState<"all" | "optimized" | "pending">("all");

  // Stats
  const optimizedCount = services.filter((s) => s.is_seo_optimized).length;
  const activeCount = services.filter((s) => s.is_active).length;

  const fetchServices = useCallback(async () => {
    setLoading(true);
    try {
      const params: Record<string, string | number> = {
        page: currentPage,
        per_page: 20,
      };
      if (search) params.search = search;
      if (filterLayout) params.layout = filterLayout;
      if (filterEmirate) params.emirate = filterEmirate;
      if (activeTab === "optimized") params.seo_optimized = 1;
      if (activeTab === "pending") params.seo_optimized = 0;

      const res = await apiClient.get<PaginatedData>("/admin/services", { params });
      const payload = res.data;
      const items = payload.data ?? [];
      const total = payload.meta?.total ?? payload.total ?? items.length;
      const lastPage = payload.meta?.last_page ?? payload.last_page ?? 1;
      setServices(items);
      setTotalServices(total);
      setTotalPages(lastPage);
    } catch {
      toast.error("Failed to load services");
    } finally {
      setLoading(false);
    }
  }, [currentPage, search, filterLayout, filterEmirate, activeTab]);

  useEffect(() => {
    if (!isLoading && !isAuthenticated) router.push("/login");
  }, [isAuthenticated, isLoading, router]);

  useEffect(() => {
    if (isAuthenticated) {
      const t = setTimeout(fetchServices, 300);
      return () => clearTimeout(t);
    }
  }, [fetchServices, isAuthenticated, search]);

  const handleSave = async () => {
    if (!editService) return;
    setSaving(true);
    try {
      await apiClient.put(`/admin/services/${editService.id}`, editService);
      toast.success("Service updated successfully");
      setEditOpen(false);
      void fetchServices();
    } catch {
      toast.error("Failed to update service");
    } finally {
      setSaving(false);
    }
  };

  const handleDeactivate = async (id: number) => {
    try {
      await apiClient.delete(`/admin/services/${id}`);
      toast.success("Service deactivated");
      setDeleteConfirm(null);
      void fetchServices();
    } catch {
      toast.error("Failed to deactivate service");
    }
  };

  if (isLoading) return <div className="flex min-h-screen items-center justify-center bg-[#0a0f1e]"><div className="h-8 w-8 animate-spin rounded-full border-2 border-blue-500 border-t-transparent" /></div>;

  return (
    <div className="min-h-screen bg-[#080d1a] text-white">
      {/* Top nav */}
      <header className="border-b border-blue-500/10 bg-[#0a0f1e]/90 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-4">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-blue-600 to-cyan-400">
              <span className="text-sm font-black text-white">LA</span>
            </div>
            <div>
              <p className="text-xs text-slate-500">Admin Dashboard</p>
              <h1 className="text-sm font-bold text-white">SEO Control Center</h1>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <span className="hidden text-xs text-slate-400 sm:block">
              {user?.name} · {user?.email}
            </span>
            <span className="badge-blue text-xs">admin</span>
          </div>
        </div>
      </header>

      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        {/* Stat cards */}
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
          {[
            { label: "Total Services", value: totalServices.toLocaleString(), icon: "📋", color: "from-blue-600/20 to-blue-900/10", border: "border-blue-500/20" },
            { label: "SEO Optimized", value: `${optimizedCount} / ${services.length}`, icon: "✅", color: "from-green-600/20 to-green-900/10", border: "border-green-500/20" },
            { label: "Active Services", value: activeCount.toLocaleString(), icon: "🟢", color: "from-cyan-600/20 to-cyan-900/10", border: "border-cyan-500/20" },
            { label: "Current Page", value: `${currentPage} / ${totalPages}`, icon: "📖", color: "from-purple-600/20 to-purple-900/10", border: "border-purple-500/20" },
          ].map((stat) => (
            <div key={stat.label} className={`stat-card bg-gradient-to-br ${stat.color} border ${stat.border}`}>
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-xs text-slate-400">{stat.label}</p>
                  <p className="mt-1 text-3xl font-bold text-white">{stat.value}</p>
                </div>
                <span className="text-2xl">{stat.icon}</span>
              </div>
            </div>
          ))}
        </div>

        {/* Filters */}
        <div className="mt-8 glass-card p-5">
          <div className="flex flex-wrap items-center gap-3">
            {/* Search */}
            <div className="relative flex-1 min-w-[200px]">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500">🔍</span>
              <input
                type="text"
                value={search}
                onChange={(e) => { setSearch(e.target.value); setCurrentPage(1); }}
                placeholder="Search services..."
                className="w-full rounded-xl border border-white/10 bg-white/5 py-2.5 pl-9 pr-4 text-sm text-white placeholder-slate-500 focus:border-blue-500/40 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
              />
            </div>

            <select
              value={filterLayout}
              onChange={(e) => { setFilterLayout(e.target.value); setCurrentPage(1); }}
              className="rounded-xl border border-white/10 bg-[#0d1530] px-3 py-2.5 text-sm text-white focus:border-blue-500/40 focus:outline-none"
            >
              <option value="">All Layouts</option>
              {LAYOUTS.map((l) => <option key={l} value={l}>{l}</option>)}
            </select>

            <select
              value={filterEmirate}
              onChange={(e) => { setFilterEmirate(e.target.value); setCurrentPage(1); }}
              className="rounded-xl border border-white/10 bg-[#0d1530] px-3 py-2.5 text-sm text-white focus:border-blue-500/40 focus:outline-none"
            >
              <option value="">All Emirates</option>
              {EMIRATES.map((e) => <option key={e} value={e}>{e.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase())}</option>)}
            </select>

            {/* Tabs */}
            <div className="flex rounded-xl border border-white/10 bg-white/5 p-1">
              {(["all", "optimized", "pending"] as const).map((tab) => (
                <button
                  key={tab}
                  onClick={() => { setActiveTab(tab); setCurrentPage(1); }}
                  className={`rounded-lg px-3 py-1.5 text-xs font-medium capitalize transition-all ${
                    activeTab === tab ? "bg-blue-600 text-white" : "text-slate-400 hover:text-white"
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>

            <button
              onClick={() => void fetchServices()}
              className="rounded-xl border border-blue-500/30 px-4 py-2.5 text-sm font-medium text-blue-400 hover:bg-blue-500/10 transition-all"
            >
              ↻ Refresh
            </button>
          </div>
        </div>

        {/* Table */}
        <div className="mt-4 overflow-hidden rounded-2xl border border-blue-500/10 bg-[#0d1530]">
          {loading ? (
            <div className="flex items-center justify-center py-20">
              <div className="h-8 w-8 animate-spin rounded-full border-2 border-blue-500 border-t-transparent" />
              <span className="ml-3 text-sm text-slate-400">Loading services...</span>
            </div>
          ) : services.length === 0 ? (
            <div className="py-20 text-center text-slate-400">
              <p className="text-4xl">📭</p>
              <p className="mt-2 text-sm">No services found matching your filters.</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-white/5 bg-white/[0.02]">
                    {["ID", "Service Name", "Layout", "SEO Title", "Price (AED)", "SEO", "Status", "Actions"].map((h) => (
                      <th key={h} className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-slate-400">{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {services.map((service) => (
                    <tr key={service.id} className="data-table-row">
                      <td className="px-4 py-3 text-xs text-slate-500">#{service.id}</td>
                      <td className="px-4 py-3">
                        <p className="font-medium text-white">{service.name}</p>
                        <p className="text-xs text-slate-500">/{service.slug}</p>
                      </td>
                      <td className="px-4 py-3">
                        <span className={LAYOUT_COLORS[service.design_layout] ?? "badge-blue"}>
                          {service.design_layout}
                        </span>
                      </td>
                      <td className="max-w-[220px] px-4 py-3">
                        <p className="truncate text-xs text-slate-300">{service.seo_title || "—"}</p>
                        {service.seo_title && (
                          <div className="mt-1 h-1 w-full overflow-hidden rounded-full bg-white/10">
                            <div
                              className={`h-1 rounded-full ${service.seo_title.length > 70 ? "bg-red-400" : service.seo_title.length > 60 ? "bg-amber-400" : "bg-green-400"}`}
                              style={{ width: `${Math.min((service.seo_title.length / 70) * 100, 100)}%` }}
                            />
                          </div>
                        )}
                      </td>
                      <td className="px-4 py-3 text-sm text-cyan-300">
                        {service.base_price ? `AED ${service.base_price}` : "—"}
                      </td>
                      <td className="px-4 py-3">
                        <span className={service.is_seo_optimized ? "badge-green" : "badge-amber"}>
                          {service.is_seo_optimized ? "✓ Optimized" : "⚠ Pending"}
                        </span>
                      </td>
                      <td className="px-4 py-3">
                        <span className={service.is_active ? "badge-green" : "badge-red"}>
                          {service.is_active ? "Active" : "Inactive"}
                        </span>
                      </td>
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => { setEditService({ ...service }); setEditOpen(true); }}
                            className="rounded-lg border border-blue-500/30 px-2.5 py-1.5 text-xs font-medium text-blue-400 hover:bg-blue-500/10 transition-all"
                          >
                            Edit
                          </button>
                          <button
                            onClick={() => setDeleteConfirm(service.id)}
                            className="rounded-lg border border-red-500/20 px-2.5 py-1.5 text-xs font-medium text-red-400 hover:bg-red-500/10 transition-all"
                          >
                            Deactivate
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {/* Pagination */}
          {!loading && totalPages > 1 && (
            <div className="flex items-center justify-between border-t border-white/5 px-6 py-4">
              <p className="text-xs text-slate-400">
                Showing {(currentPage - 1) * 20 + 1}–{Math.min(currentPage * 20, totalServices)} of {totalServices} services
              </p>
              <div className="flex gap-1">
                <button
                  onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                  disabled={currentPage === 1}
                  className="rounded-xl border border-white/10 px-3 py-1.5 text-xs disabled:opacity-40 hover:bg-white/5"
                >← Prev</button>
                {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                  const page = Math.max(1, Math.min(currentPage - 2, totalPages - 4)) + i;
                  return (
                    <button
                      key={page}
                      onClick={() => setCurrentPage(page)}
                      className={`rounded-xl px-3 py-1.5 text-xs ${page === currentPage ? "bg-blue-600 text-white" : "border border-white/10 text-slate-400 hover:bg-white/5"}`}
                    >
                      {page}
                    </button>
                  );
                })}
                <button
                  onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                  disabled={currentPage === totalPages}
                  className="rounded-xl border border-white/10 px-3 py-1.5 text-xs disabled:opacity-40 hover:bg-white/5"
                >Next →</button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Edit Dialog */}
      {editOpen && editService && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4">
          <div className="glass-card w-full max-w-2xl max-h-[90vh] overflow-y-auto p-8">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-xl font-bold text-white">Edit Service</h2>
                <p className="text-xs text-slate-400">#{editService.id} · /{editService.slug}</p>
              </div>
              <button onClick={() => setEditOpen(false)} className="rounded-xl border border-white/10 p-2 text-slate-400 hover:text-white">✕</button>
            </div>

            <div className="space-y-4">
              <div>
                <label className="mb-1.5 flex justify-between text-xs font-medium text-slate-300">
                  SEO Title <span className={editService.seo_title?.length > 70 ? "text-red-400" : "text-slate-500"}>{editService.seo_title?.length ?? 0}/70</span>
                </label>
                <input
                  value={editService.seo_title ?? ""}
                  onChange={(e) => setEditService({ ...editService, seo_title: e.target.value })}
                  className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white focus:border-blue-500/40 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                />
              </div>

              <div>
                <label className="mb-1.5 flex justify-between text-xs font-medium text-slate-300">
                  Meta Description <span className={editService.seo_description?.length > 160 ? "text-red-400" : "text-slate-500"}>{editService.seo_description?.length ?? 0}/160</span>
                </label>
                <textarea
                  value={editService.seo_description ?? ""}
                  onChange={(e) => setEditService({ ...editService, seo_description: e.target.value })}
                  rows={3}
                  className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white resize-none focus:border-blue-500/40 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="mb-1.5 block text-xs font-medium text-slate-300">Layout</label>
                  <select
                    value={editService.design_layout}
                    onChange={(e) => setEditService({ ...editService, design_layout: e.target.value })}
                    className="w-full rounded-xl border border-white/10 bg-[#0d1530] px-4 py-3 text-sm text-white focus:border-blue-500/40 focus:outline-none"
                  >
                    {LAYOUTS.map((l) => <option key={l} value={l}>{l}</option>)}
                  </select>
                </div>
                <div>
                  <label className="mb-1.5 block text-xs font-medium text-slate-300">Base Price (AED)</label>
                  <input
                    type="number"
                    value={editService.base_price ?? ""}
                    onChange={(e) => setEditService({ ...editService, base_price: parseFloat(e.target.value) })}
                    className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white focus:border-blue-500/40 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                  />
                </div>
              </div>

              <div>
                <label className="mb-1.5 block text-xs font-medium text-slate-300">JSON-LD Schema</label>
                <textarea
                  value={editService.json_ld_schema ?? ""}
                  onChange={(e) => setEditService({ ...editService, json_ld_schema: e.target.value })}
                  rows={5}
                  placeholder='{"@context": "https://schema.org", "@type": "Service", ...}'
                  className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 font-mono text-xs text-green-300 resize-none focus:border-blue-500/40 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                />
              </div>

              <div className="flex gap-4">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={editService.is_active}
                    onChange={(e) => setEditService({ ...editService, is_active: e.target.checked })}
                    className="h-4 w-4 accent-blue-500"
                  />
                  <span className="text-sm text-slate-300">Active</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={editService.is_seo_optimized}
                    onChange={(e) => setEditService({ ...editService, is_seo_optimized: e.target.checked })}
                    className="h-4 w-4 accent-blue-500"
                  />
                  <span className="text-sm text-slate-300">SEO Optimized</span>
                </label>
              </div>
            </div>

            <div className="mt-6 flex gap-3">
              <button
                onClick={handleSave}
                disabled={saving}
                className="btn-primary flex-1 py-3 text-sm disabled:opacity-50"
              >
                {saving ? "Saving..." : "Save Changes"}
              </button>
              <button
                onClick={() => setEditOpen(false)}
                className="rounded-xl border border-white/10 px-6 py-3 text-sm text-slate-400 hover:text-white hover:bg-white/5 transition-all"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Deactivate confirm */}
      {deleteConfirm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4">
          <div className="glass-card w-full max-w-sm p-8 text-center">
            <span className="text-4xl">⚠️</span>
            <h2 className="mt-3 text-lg font-bold text-white">Deactivate Service?</h2>
            <p className="mt-2 text-sm text-slate-400">This will mark the service as inactive. No data will be deleted.</p>
            <div className="mt-6 flex gap-3">
              <button
                onClick={() => void handleDeactivate(deleteConfirm)}
                className="flex-1 rounded-xl bg-red-500/20 border border-red-500/30 py-2.5 text-sm font-medium text-red-400 hover:bg-red-500/30 transition-all"
              >
                Deactivate
              </button>
              <button
                onClick={() => setDeleteConfirm(null)}
                className="flex-1 rounded-xl border border-white/10 py-2.5 text-sm text-slate-400 hover:bg-white/5 transition-all"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
