"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import apiClient from "@/lib/api";
import { toast } from "sonner";
import { useVirtualizer } from "@tanstack/react-virtual";
import PowerEditorSlideover from "@/components/admin/PowerEditorSlideover";

// ─── Types ────────────────────────────────────────────────────────────────────

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
  schema_markup?: string | object;
  emirate?: string;
  category?: string;
  created_at: string;
  // New SEO fields
  canonical_url?: string;
  no_index?: boolean;
  redirect_to?: string;
  h1_override?: string;
  image_alt_text?: string;
  llms_txt_content?: string;
  seo_keywords?: string[];
}

interface PaginatedData {
  data: Service[];
  current_page: number;
  last_page: number;
  total: number;
  per_page: number;
  meta?: { total: number; last_page: number; current_page: number; currentPage?: number; lastPage?: number; perPage?: number };
}

interface RedirectEntry {
  id: number;
  from_path: string;
  to_path: string;
  http_code: number;
  created_at: string;
}

interface SitemapInfo {
  total_urls: number;
  total_services: number;
  optimized: number;
  last_generated: string;
  sitemap_url: string;
}

// ─── Constants ────────────────────────────────────────────────────────────────

const LAYOUTS = ["standard", "showcase", "compact", "featured"] as const;
const EMIRATES = ["dubai", "abu-dhabi", "sharjah", "ajman", "ras-al-khaimah", "fujairah", "umm-al-quwain"];
const LAYOUT_COLORS: Record<string, string> = {
  standard: "badge-blue",
  showcase: "badge-green",
  compact: "badge-amber",
  featured: "badge-red",
};

const SCHEMA_TYPES = ["Service", "LocalBusiness", "Article", "Product", "FAQPage", "HowTo"] as const;

const SCHEMA_TEMPLATES: Record<string, object> = {
  Service: {
    "@context": "https://schema.org",
    "@type": "Service",
    "name": "",
    "description": "",
    "provider": { "@type": "LocalBusiness", "name": "LocalServices AE" },
    "areaServed": { "@type": "Country", "name": "AE" },
  },
  LocalBusiness: {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "name": "",
    "description": "",
    "address": { "@type": "PostalAddress", "addressCountry": "AE" },
    "telephone": "",
    "url": "",
  },
  Article: {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": "",
    "description": "",
    "author": { "@type": "Organization", "name": "LocalServices AE" },
  },
  Product: {
    "@context": "https://schema.org",
    "@type": "Product",
    "name": "",
    "description": "",
    "offers": { "@type": "Offer", "priceCurrency": "AED" },
  },
  FAQPage: {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [{ "@type": "Question", "name": "Question?", "acceptedAnswer": { "@type": "Answer", "text": "Answer." } }],
  },
  HowTo: {
    "@context": "https://schema.org",
    "@type": "HowTo",
    "name": "",
    "description": "",
    "step": [{ "@type": "HowToStep", "text": "Step 1" }],
  },
};

type NavPanel = "services" | "sitemap" | "robots" | "redirects" | "llms";

// ─── Main Component ───────────────────────────────────────────────────────────

export default function AdminSeoDashboard() {
  const { user, isAuthenticated, isLoading } = useAuth();
  const router = useRouter();

  // Navigation
  const [activePanel, setActivePanel] = useState<NavPanel>("services");

  // Services state
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

  // Power Module State
  const [powerEditorSlug, setPowerEditorSlug] = useState<string | null>(null);

  const [deleteConfirm, setDeleteConfirm] = useState<number | null>(null);
  const [saving, setSaving] = useState(false);
  const [activeTab, setActiveTab] = useState<"all" | "optimized" | "pending">("all");

  // Sitemap state
  const [sitemapInfo, setSitemapInfo] = useState<SitemapInfo | null>(null);
  const [sitemapLoading, setSitemapLoading] = useState(false);

  // Robots state
  const [robotsContent, setRobotsContent] = useState("");
  const [robotsSaving, setRobotsSaving] = useState(false);

  // Redirects state
  const [redirects, setRedirects] = useState<RedirectEntry[]>([]);
  const [redirectForm, setRedirectForm] = useState({ from_path: "", to_path: "", http_code: 301 });
  const [redirectSaving, setRedirectSaving] = useState(false);

  // llms.txt state
  const [llmsContent, setLlmsContent] = useState("");
  const [llmsSaving, setLlmsSaving] = useState(false);

  // Schema type selection in modal
  const [schemaTypeSelected, setSchemaTypeSelected] = useState<string>("Service");

  // Auto-Optimization Engine state
  const [optStatus, setOptStatus] = useState<"idle" | "running">("idle");
  const [optPercentage, setOptPercentage] = useState<number>(0);
  const [optLoading, setOptLoading] = useState<boolean>(false);

  // Stats
  const optimizedCount = services.filter((s) => s.is_seo_optimized).length;
  const activeCount = services.filter((s) => s.is_active).length;

  // ─── Auth Guard ─────────────────────────────────────────────────────────────

  useEffect(() => {
    if (!isLoading && !isAuthenticated) router.push("/login");
  }, [isAuthenticated, isLoading, router]);

  // ─── Services Fetch ──────────────────────────────────────────────────────────

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
      const lastPage = payload.meta?.last_page ?? payload.meta?.lastPage ?? payload.last_page ?? 1;
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
    if (isAuthenticated) {
      const t = setTimeout(fetchServices, 300);
      return () => clearTimeout(t);
    }
  }, [fetchServices, isAuthenticated, search]);

  // ─── Virtualization Setup ──────────────────────────────────────────────────
  const tableContainerRef = useRef<HTMLDivElement>(null);

  const rowVirtualizer = useVirtualizer({
    count: services.length,
    getScrollElement: () => tableContainerRef.current,
    estimateSize: () => 64, // Approximately 64px per row height
    overscan: 5,
  });

  // ─── Auto-Optimization Hooks ────────────────────────────────────────────────

  const fetchOptStatus = useCallback(async () => {
    try {
      const res = await apiClient.get<{ status: string; percentage: number }>("/admin/services/auto-optimize/status");
      setOptStatus(res.data.status as "idle" | "running");
      setOptPercentage(res.data.percentage);
    } catch {
      setOptStatus("idle");
    }
  }, []);

  const handleCsvUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const formData = new FormData();
    formData.append("file", file);
    try {
      toast.loading("Reading CSV Keywords...", { id: "csv" });
      await apiClient.post("/admin/services/import-keywords", formData);
      toast.success("Keywords Imported Successfully!", { id: "csv" });
      fetchServices();
    } catch {
      toast.error("Failed to upload keywords.", { id: "csv" });
    }
  };

  const startOptimization = async () => {
    setOptLoading(true);
    try {
      await apiClient.post("/admin/services/auto-optimize/start");
      toast.success("Optimization queue started.");
      fetchOptStatus();
    } catch {
      toast.error("Failed to start optimization or already running.");
    } finally {
      setOptLoading(false);
    }
  };

  const stopOptimization = async () => {
    setOptLoading(true);
    try {
      await apiClient.post("/admin/services/auto-optimize/stop");
      toast.info("Optimization batch halted.");
      fetchOptStatus();
    } catch {
      toast.error("Failed to halt optimization process.");
    } finally {
      setOptLoading(false);
    }
  };

  // Poll status while running
  useEffect(() => {
    if (!isAuthenticated) return;
    fetchOptStatus();
    let interval: NodeJS.Timeout | undefined;
    if (optStatus === "running") {
      interval = setInterval(fetchOptStatus, 3000); // Check every 3 seconds
    }
    return () => { if (interval) clearInterval(interval); };
  }, [optStatus, fetchOptStatus, isAuthenticated]);

  // ─── Component Helpers ─────────────────────────────────────────────────────

  const fetchSitemapInfo = useCallback(async () => {
    setSitemapLoading(true);
    try {
      const res = await apiClient.get<{ total_urls: number; total_services: number; optimized: number; last_generated: string; sitemap_url: string }>("/admin/sitemap");
      setSitemapInfo(res.data);
    } catch {
      toast.error("Failed to load sitemap info");
    } finally {
      setSitemapLoading(false);
    }
  }, []);

  const fetchRobots = useCallback(async () => {
    try {
      const res = await apiClient.get<{ content: string }>("/admin/robots");
      setRobotsContent(res.data.content);
    } catch {
      toast.error("Failed to load robots.txt");
    }
  }, []);

  const fetchRedirects = useCallback(async () => {
    try {
      const res = await apiClient.get<{ data: RedirectEntry[] }>("/admin/redirects");
      setRedirects(res.data.data);
    } catch {
      toast.error("Failed to load redirects");
    }
  }, []);

  const fetchLlms = useCallback(async () => {
    try {
      const res = await apiClient.get<{ content: string }>("/admin/llms-txt");
      setLlmsContent(res.data.content);
    } catch {
      toast.error("Failed to load llms.txt");
    }
  }, []);

  // Panel activation triggers data fetching
  useEffect(() => {
    if (!isAuthenticated) return;
    if (activePanel === "sitemap") fetchSitemapInfo();
    if (activePanel === "robots") fetchRobots();
    if (activePanel === "redirects") fetchRedirects();
    if (activePanel === "llms") fetchLlms();
  }, [activePanel, isAuthenticated, fetchSitemapInfo, fetchRobots, fetchRedirects, fetchLlms]);

  // ─── Service Actions ─────────────────────────────────────────────────────────

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

  // ─── Robots Actions ──────────────────────────────────────────────────────────

  const saveRobots = async () => {
    setRobotsSaving(true);
    try {
      await apiClient.post("/admin/robots", { content: robotsContent });
      toast.success("robots.txt saved successfully");
    } catch {
      toast.error("Failed to save robots.txt");
    } finally {
      setRobotsSaving(false);
    }
  };

  // ─── Redirects Actions ───────────────────────────────────────────────────────

  const createRedirect = async () => {
    if (!redirectForm.from_path || !redirectForm.to_path) {
      toast.error("Both From and To paths are required");
      return;
    }
    setRedirectSaving(true);
    try {
      await apiClient.post("/admin/redirects", redirectForm);
      toast.success("Redirect created");
      setRedirectForm({ from_path: "", to_path: "", http_code: 301 });
      void fetchRedirects();
    } catch {
      toast.error("Failed to create redirect (path may already exist)");
    } finally {
      setRedirectSaving(false);
    }
  };

  const deleteRedirect = async (id: number) => {
    try {
      await apiClient.delete(`/admin/redirects/${id}`);
      toast.success("Redirect deleted");
      void fetchRedirects();
    } catch {
      toast.error("Failed to delete redirect");
    }
  };

  // ─── llms.txt Actions ────────────────────────────────────────────────────────

  const saveLlms = async () => {
    setLlmsSaving(true);
    try {
      await apiClient.post("/admin/llms-txt", { content: llmsContent });
      toast.success("llms.txt saved successfully");
    } catch {
      toast.error("Failed to save llms.txt");
    } finally {
      setLlmsSaving(false);
    }
  };

  // ─── Schema Auto-generate ────────────────────────────────────────────────────

  const applySchemaTemplate = (type: string) => {
    if (!editService) return;
    const template = { ...SCHEMA_TEMPLATES[type] } as Record<string, unknown>;
    if ("name" in template) template.name = editService.name;
    if ("description" in template) template.description = editService.seo_description ?? "";
    setEditService({
      ...editService,
      schema_markup: JSON.stringify(template, null, 2),
    });
    setSchemaTypeSelected(type);
  };

  if (isLoading) return (
    <div className="flex min-h-screen items-center justify-center bg-[#0a0f1e]">
      <div className="h-8 w-8 animate-spin rounded-full border-2 border-blue-500 border-t-transparent" />
    </div>
  );

  // ─── Render ──────────────────────────────────────────────────────────────────

  return (
    <div className="min-h-screen bg-[#080d1a] text-white">
      {/* Top nav */}
      <header className="border-b border-blue-500/10 bg-[#0a0f1e]/90 backdrop-blur-xl sticky top-0 z-40">
        <div className="mx-auto flex max-w-[1600px] items-center justify-between px-4 py-4 sm:px-6">
          <div className="flex items-center gap-4">
            <div
              className="flex h-9 w-9 items-center justify-center rounded-xl shadow-lg"
              style={{ background: "linear-gradient(135deg, #0062FF, #22d3ee)", boxShadow: "0 4px 16px rgba(0,98,255,0.35)" }}
            >
              <span className="text-sm font-black text-white">LA</span>
            </div>
            <div>
              <p className="text-xs text-slate-500">Admin Dashboard</p>
              <h1 className="text-sm font-bold text-white" style={{ fontFamily: "var(--font-display)" }}>SEO Control Center</h1>
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

      <div className="mx-auto flex max-w-[1600px]">
        {/* Left Sidebar */}
        <aside className="w-56 shrink-0 border-r border-blue-500/10 bg-[#0a0f1e]/60 min-h-[calc(100vh-65px)] p-4 sticky top-[65px] h-[calc(100vh-65px)] overflow-y-auto">
          <p className="mb-3 text-[10px] font-semibold uppercase tracking-widest text-slate-500">Navigation</p>
          <nav className="space-y-1">
            {[
              { id: "services" as NavPanel, label: "Services", icon: "📋", desc: "SEO editor" },
              { id: "sitemap" as NavPanel, label: "Sitemap", icon: "🗺️", desc: "XML sitemap" },
              { id: "robots" as NavPanel, label: "Robots.txt", icon: "🤖", desc: "Crawler rules" },
              { id: "redirects" as NavPanel, label: "301 Redirects", icon: "🔀", desc: "URL redirects" },
              { id: "llms" as NavPanel, label: "llms.txt", icon: "🤖", desc: "AI discovery" },
            ].map((item) => (
              <button
                key={item.id}
                id={`nav-${item.id}`}
                onClick={() => setActivePanel(item.id)}
                className={`dash-nav-item w-full text-left ${activePanel === item.id ? "active" : ""}`}
              >
                <span className="text-base">{item.icon}</span>
                <div className="min-w-0">
                  <p className="text-sm font-medium truncate">{item.label}</p>
                  <p className="text-[10px] text-slate-500 truncate">{item.desc}</p>
                </div>
              </button>
            ))}
          </nav>

          <div className="mt-6 rounded-xl border border-blue-500/20 bg-blue-500/5 p-3">
            <p className="text-xs font-semibold text-blue-300">Quick Stats</p>
            <div className="mt-2 space-y-1.5">
              <div className="flex justify-between text-xs">
                <span className="text-slate-400">Total</span>
                <span className="font-medium text-white">{totalServices.toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-xs">
                <span className="text-slate-400">Optimized</span>
                <span className="font-medium text-green-400">{optimizedCount}</span>
              </div>
              <div className="flex justify-between text-xs">
                <span className="text-slate-400">Active</span>
                <span className="font-medium text-cyan-400">{activeCount}</span>
              </div>
            </div>
          </div>
        </aside>

        {/* Main content */}
        <main className="flex-1 min-w-0 p-6">

          {/* ── SERVICES PANEL ── */}
          {activePanel === "services" && (
            <div>
              {/* Stat cards */}
              <div className="grid grid-cols-2 gap-4 sm:grid-cols-4 mb-6">
                {[
                  { label: "Total Services", value: totalServices.toLocaleString(), icon: "📋", color: "from-blue-600/20 to-blue-900/10", border: "border-blue-500/20" },
                  { label: "SEO Optimized", value: `${optimizedCount} / ${services.length}`, icon: "✅", color: "from-green-600/20 to-green-900/10", border: "border-green-500/20" },
                  { label: "Active Services", value: activeCount.toLocaleString(), icon: "🟢", color: "from-cyan-600/20 to-cyan-900/10", border: "border-cyan-500/20" },
                  { label: "Page", value: `${currentPage} / ${totalPages}`, icon: "📖", color: "from-purple-600/20 to-purple-900/10", border: "border-purple-500/20" },
                ].map((stat) => (
                  <div key={stat.label} className={`stat-card bg-gradient-to-br ${stat.color} border ${stat.border}`}>
                    <div className="flex items-start justify-between">
                      <div>
                        <p className="text-xs text-slate-400">{stat.label}</p>
                        <p className="mt-1 text-3xl font-bold text-white" style={{ fontFamily: "var(--font-display)" }}>{stat.value}</p>
                      </div>
                      <span className="text-2xl">{stat.icon}</span>
                    </div>
                  </div>
                ))}
              </div>

              {/* ── Auto-Optimization Control Panel ── */}
              <div className="glass-card mb-6 overflow-hidden relative border-blue-500/20">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-900/10 to-[#0a1532]" />
                <div className="relative p-5 flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div className="flex items-start gap-4">
                    <div className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl shadow-lg ${optStatus === 'running' ? 'bg-gradient-to-tr from-cyan-400 to-blue-500 animate-pulse' : 'bg-slate-800 border border-slate-700'}`}>
                      <span className="text-xl">{optStatus === 'running' ? '⚡' : '⏸️'}</span>
                    </div>
                    <div>
                      <h3 className="text-sm font-bold text-white flex items-center gap-2" style={{ fontFamily: "var(--font-display)" }}>
                        AI Auto-Optimization Engine
                        {optStatus === 'running' && <span className="flex h-2 w-2 rounded-full bg-cyan-400 animate-ping" />}
                      </h3>
                      <p className="text-xs text-slate-400 mt-1 max-w-lg">
                        Automatically processes unoptimized services in the background using Gemini. Queues batches of jobs while strictly adhering to rate limits (5 req/min).
                      </p>
                    </div>
                  </div>

                  <div className="flex flex-col md:items-end gap-2 shrink-0 md:min-w-[200px]">
                    {optStatus === 'running' ? (
                      <>
                        <button
                          onClick={stopOptimization}
                          disabled={optLoading}
                          className="flex h-9 items-center justify-center rounded-xl bg-red-500/10 px-4 text-sm font-semibold text-red-500 transition-all hover:bg-red-500/20 disabled:opacity-50"
                        >
                          {optLoading ? "Halting..." : "Stop Optimization"}
                        </button>
                        <div className="w-full relative mt-1">
                          <div className="flex justify-between text-[10px] text-cyan-300 font-medium mb-1">
                            <span>Processing Batch</span>
                            <span>{Math.round(optPercentage)}%</span>
                          </div>
                          <div className="h-1.5 w-full bg-slate-800 rounded-full overflow-hidden">
                            <div className="h-full bg-cyan-400 transition-all duration-500" style={{ width: `${optPercentage}%` }} />
                          </div>
                        </div>
                      </>
                    ) : (
                      <>
                        <button
                          onClick={startOptimization}
                          disabled={optLoading}
                          className="btn-primary flex h-10 items-center justify-center px-6 text-sm font-bold transition-all disabled:opacity-50"
                        >
                          {optLoading ? "Starting..." : "Start Auto-Optimization ▶"}
                        </button>
                        <p className="text-[10px] text-slate-500 text-right">Idling. Awaiting admin permission.</p>
                      </>
                    )}
                  </div>
                </div>
              </div>

              {/* Filters */}
              <div className="glass-card p-5 mb-4">
                <div className="flex flex-wrap items-center gap-3">
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

                  <div className="flex rounded-xl border border-white/10 bg-white/5 p-1">
                    {(["all", "optimized", "pending"] as const).map((tab) => (
                      <button
                        key={tab}
                        onClick={() => { setActiveTab(tab); setCurrentPage(1); }}
                        className={`rounded-lg px-3 py-1.5 text-xs font-medium capitalize transition-all ${activeTab === tab ? "bg-blue-600 text-white" : "text-slate-400 hover:text-white"}`}
                      >
                        {tab}
                      </button>
                    ))}
                  </div>

                  <label className="flex h-[42px] cursor-pointer items-center justify-center rounded-xl border border-blue-500/20 bg-blue-500/10 px-4 text-sm font-medium text-blue-400 transition-all hover:bg-blue-500/20">
                    <svg className="mr-2 h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                    </svg>
                    <span>CSV Keywords</span>
                    <input type="file" className="hidden" accept=".csv" onChange={handleCsvUpload} />
                  </label>

                  <button
                    onClick={() => void fetchServices()}
                    className="rounded-xl border border-blue-500/30 px-4 py-2.5 text-sm font-medium text-blue-400 hover:bg-blue-500/10 transition-all"
                  >
                    ↻ Refresh
                  </button>
                </div>
              </div>

              {/* Table */}
              <div className="overflow-hidden rounded-2xl border border-blue-500/10 bg-[#0d1530]">
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
                  <div 
                    ref={tableContainerRef} 
                    className="overflow-auto border-t border-white/5" 
                    style={{ height: "600px", position: "relative" }}
                  >
                    <table className="w-full text-sm block">
                      <thead className="block border-b border-white/5 bg-[#0d1530] sticky top-0 z-10 w-full backdrop-blur-md">
                        <tr className="flex w-full">
                          <th className="flex-[0.5] px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-slate-400">ID</th>
                          <th className="flex-[1.5] px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-slate-400">Service Name</th>
                          <th className="flex-[0.8] px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-slate-400">Layout</th>
                          <th className="flex-[1.5] px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-slate-400">SEO Title</th>
                          <th className="flex-[0.8] px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-slate-400">Price (AED)</th>
                          <th className="flex-[0.9] px-4 py-3 text-center text-xs font-semibold uppercase tracking-wider text-slate-400">Alt Text</th>
                          <th className="flex-[1.0] px-4 py-3 text-center text-xs font-semibold uppercase tracking-wider text-slate-400">SEO</th>
                          <th className="flex-[0.6] px-4 py-3 text-center text-xs font-semibold uppercase tracking-wider text-slate-400">Status</th>
                          <th className="flex-[1.6] px-4 py-3 text-center text-xs font-semibold uppercase tracking-wider text-slate-400">Actions</th>
                        </tr>
                      </thead>
                      <tbody 
                        className="block w-full relative" 
                        style={{ height: `${rowVirtualizer.getTotalSize()}px` }}
                      >
                        {rowVirtualizer.getVirtualItems().map((virtualRow) => {
                          const service = services[virtualRow.index];
                          return (
                          <tr 
                            key={service.id} 
                            className="absolute top-0 left-0 w-full flex items-center data-table-row border-b border-white/5 hover:bg-white/[0.02] transition-colors"
                            style={{
                              height: `${virtualRow.size}px`,
                              transform: `translateY(${virtualRow.start}px)`,
                            }}
                          >
                            <td className="flex-[0.5] px-4 py-2 text-xs text-slate-500">#{service.id}</td>
                            <td className="flex-[1.5] px-4 py-2 overflow-hidden">
                              <p className="font-medium text-white truncate">{service.name}</p>
                              <p className="text-[10px] text-slate-500 truncate">/{service.slug}</p>
                              {service.no_index && <span className="text-[10px] text-red-400 font-medium">noindex</span>}
                            </td>
                            <td className="flex-[0.8] px-4 py-2">
                              <span className={`${LAYOUT_COLORS[service.design_layout] ?? "badge-blue"} scale-90 origin-left inline-block`}>
                                {service.design_layout}
                              </span>
                            </td>
                            <td className="flex-[1.5] px-4 py-2 overflow-hidden">
                              <p className="truncate text-[11px] text-slate-300">{service.seo_title || "—"}</p>
                              {service.seo_title && (
                                <div className="mt-1 h-1 w-full overflow-hidden rounded-full bg-white/10">
                                  <div
                                    className={`h-1 rounded-full ${service.seo_title.length > 70 ? "bg-red-400" : service.seo_title.length > 60 ? "bg-amber-400" : "bg-green-400"}`}
                                    style={{ width: `${Math.min((service.seo_title.length / 70) * 100, 100)}%` }}
                                  />
                                </div>
                              )}
                            </td>
                            <td className="flex-[0.8] px-4 py-2 text-xs text-cyan-300">
                              {service.base_price ? `AED ${service.base_price}` : "—"}
                            </td>
                            <td className="flex-[0.9] px-4 py-2 text-center">
                              {service.image_alt_text ? (
                                <span className="badge-green text-[9px] px-2 py-1">✓ Set</span>
                              ) : (
                                <span className="badge-amber text-[9px] px-2 py-1">⚠ Missing</span>
                              )}
                            </td>
                            <td className="flex-[1.0] px-4 py-2 text-center">
                              <span className={`${service.is_seo_optimized ? "text-green-400" : "text-amber-400"} text-[10px] font-medium`}>
                                {service.is_seo_optimized ? "✓ Optimized" : "⚠ Pending"}
                              </span>
                            </td>
                            <td className="flex-[0.6] px-4 py-2 flex justify-center">
                              <div className={`h-2.5 w-2.5 rounded-full ${service.is_active ? "bg-green-500" : "bg-red-500"}`} title={service.is_active ? "Active" : "Inactive"} />
                            </td>
                            <td className="flex-[1.6] px-2 py-2">
                              <div className="flex items-center justify-center gap-1 opacity-60 hover:opacity-100 transition-opacity">
                                <button
                                  onClick={() => setPowerEditorSlug(service.slug)}
                                  className="rounded bg-purple-500/10 p-1.5 text-purple-400 hover:bg-purple-500/20 text-xs" title="SEO Power Tools"
                                >⚡ Power</button>
                                <button
                                  onClick={() => { setEditService({ ...service }); setEditOpen(true); }}
                                  className="rounded bg-blue-500/10 p-1.5 text-blue-400 hover:bg-blue-500/20 text-xs" title="Edit"
                                >✏️ Edit</button>
                                <button
                                  onClick={() => setDeleteConfirm(service.id)}
                                  className="rounded bg-red-500/10 p-1.5 text-red-400 hover:bg-red-500/20 text-xs" title="Deactivate"
                                >🗑️</button>
                              </div>
                            </td>
                          </tr>
                          );
                        })}
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
          )}

          {/* ── SITEMAP PANEL ── */}
          {activePanel === "sitemap" && (
            <div>
              <div className="mb-6">
                <h2 className="text-xl font-bold text-white">🗺️ XML Sitemap Manager</h2>
                <p className="mt-1 text-sm text-slate-400">Dynamically generated from all active services in the database.</p>
              </div>

              {sitemapLoading ? (
                <div className="flex justify-center py-20"><div className="h-8 w-8 animate-spin rounded-full border-2 border-blue-500 border-t-transparent" /></div>
              ) : (
                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                  <div className="glass-card p-6 col-span-full sm:col-span-1">
                    <p className="text-xs text-slate-400 mb-1">Total URLs</p>
                    <p className="text-4xl font-bold text-white">{sitemapInfo?.total_urls ?? "—"}</p>
                    <p className="mt-1 text-xs text-slate-500">{sitemapInfo?.total_services ?? 0} services + homepage</p>
                  </div>
                  <div className="glass-card p-6">
                    <p className="text-xs text-slate-400 mb-1">SEO Optimized</p>
                    <p className="text-4xl font-bold text-green-400">{sitemapInfo?.optimized ?? "—"}</p>
                    <p className="mt-1 text-xs text-slate-500">Higher priority in sitemap</p>
                  </div>
                  <div className="glass-card p-6">
                    <p className="text-xs text-slate-400 mb-1">Last Generated</p>
                    <p className="text-sm font-semibold text-white">{sitemapInfo?.last_generated ? new Date(sitemapInfo.last_generated).toLocaleString() : "—"}</p>
                    <p className="mt-1 text-xs text-slate-500">Generated dynamically on request</p>
                  </div>
                </div>
              )}

              <div className="mt-6 glass-card p-6">
                <h3 className="text-sm font-semibold text-white mb-4">Actions</h3>
                <div className="flex flex-wrap gap-3">
                  <a
                    href="http://localhost:8000/api/admin/sitemap.xml"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="rounded-xl border border-blue-500/30 px-5 py-2.5 text-sm font-medium text-blue-400 hover:bg-blue-500/10 transition-all"
                  >
                    🔍 Preview XML Sitemap
                  </a>
                  <button
                    onClick={() => {
                      void fetchSitemapInfo();
                      toast.success("Sitemap data refreshed!");
                    }}
                    className="rounded-xl bg-gradient-to-r from-blue-600 to-cyan-500 px-5 py-2.5 text-sm font-semibold text-white hover:opacity-90 transition-all shadow-lg shadow-blue-500/25"
                  >
                    ↻ Refresh Stats
                  </button>
                  <button
                    onClick={() => {
                      void navigator.clipboard.writeText("http://localhost:8000/api/admin/sitemap.xml");
                      toast.success("Sitemap URL copied!");
                    }}
                    className="rounded-xl border border-white/10 px-5 py-2.5 text-sm font-medium text-slate-300 hover:bg-white/5 transition-all"
                  >
                    📋 Copy URL
                  </button>
                </div>

                <div className="mt-4 rounded-xl border border-white/5 bg-white/[0.02] p-4">
                  <p className="text-xs text-slate-400 mb-2">Sitemap Endpoint</p>
                  <code className="text-xs text-green-400 font-mono">http://localhost:8000/api/admin/sitemap.xml</code>
                  <p className="mt-2 text-xs text-slate-500">For production, configure this to point to your domain. Submit to Google Search Console and Bing Webmaster tools.</p>
                </div>
              </div>
            </div>
          )}

          {/* ── ROBOTS PANEL ── */}
          {activePanel === "robots" && (
            <div>
              <div className="mb-6">
                <h2 className="text-xl font-bold text-white">🤖 Robots.txt Editor</h2>
                <p className="mt-1 text-sm text-slate-400">Control which bots can crawl your site and which URLs to block.</p>
              </div>

              <div className="glass-card p-6">
                <div className="flex items-center justify-between mb-4">
                  <p className="text-sm font-medium text-white">robots.txt content</p>
                  <div className="flex gap-2">
                    <button
                      onClick={() => setRobotsContent("User-agent: *\nAllow: /\n\nSitemap: http://localhost:3000/sitemap.xml\n")}
                      className="rounded-lg border border-white/10 px-3 py-1.5 text-xs text-slate-400 hover:bg-white/5 transition-all"
                    >
                      Reset to Default
                    </button>
                  </div>
                </div>
                <textarea
                  id="robots-editor"
                  value={robotsContent}
                  onChange={(e) => setRobotsContent(e.target.value)}
                  rows={16}
                  className="w-full rounded-xl border border-white/10 bg-[#080d1a] px-4 py-3 font-mono text-xs text-green-300 resize-none focus:border-blue-500/40 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                  placeholder={"User-agent: *\nAllow: /\n\nSitemap: https://yourdomain.com/sitemap.xml"}
                />
                <div className="mt-4 flex gap-3">
                  <button
                    id="save-robots-btn"
                    onClick={saveRobots}
                    disabled={robotsSaving}
                    className="btn-primary px-6 py-2.5 text-sm disabled:opacity-50"
                  >
                    {robotsSaving ? "Saving..." : "💾 Save robots.txt"}
                  </button>
                </div>

                <div className="mt-4 rounded-xl border border-amber-500/20 bg-amber-500/5 p-4">
                  <p className="text-xs font-semibold text-amber-300">⚠️ Common Rules</p>
                  <div className="mt-2 space-y-1 text-xs text-slate-400">
                    <p><code className="text-amber-200">Disallow: /admin</code> — Block admin pages from bots</p>
                    <p><code className="text-amber-200">Disallow: /api/</code> — Block API endpoints</p>
                    <p><code className="text-amber-200">Allow: /</code> — Allow all public pages</p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* ── REDIRECTS PANEL ── */}
          {activePanel === "redirects" && (
            <div>
              <div className="mb-6">
                <h2 className="text-xl font-bold text-white">🔀 301 Redirect Manager</h2>
                <p className="mt-1 text-sm text-slate-400">Manage permanent URL redirects to preserve SEO juice and avoid 404 errors.</p>
              </div>

              {/* Add form */}
              <div className="glass-card p-6 mb-6">
                <h3 className="text-sm font-semibold text-white mb-4">Add New Redirect</h3>
                <div className="grid gap-4 sm:grid-cols-3">
                  <div>
                    <label className="mb-1.5 block text-xs font-medium text-slate-300">From Path</label>
                    <input
                      id="redirect-from"
                      type="text"
                      value={redirectForm.from_path}
                      onChange={(e) => setRedirectForm({ ...redirectForm, from_path: e.target.value })}
                      placeholder="/old-service-name"
                      className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-2.5 text-sm text-white placeholder-slate-500 focus:border-blue-500/40 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                    />
                  </div>
                  <div>
                    <label className="mb-1.5 block text-xs font-medium text-slate-300">To Path / URL</label>
                    <input
                      id="redirect-to"
                      type="text"
                      value={redirectForm.to_path}
                      onChange={(e) => setRedirectForm({ ...redirectForm, to_path: e.target.value })}
                      placeholder="/new-service-name"
                      className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-2.5 text-sm text-white placeholder-slate-500 focus:border-blue-500/40 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                    />
                  </div>
                  <div>
                    <label className="mb-1.5 block text-xs font-medium text-slate-300">HTTP Code</label>
                    <select
                      value={redirectForm.http_code}
                      onChange={(e) => setRedirectForm({ ...redirectForm, http_code: parseInt(e.target.value) })}
                      className="w-full rounded-xl border border-white/10 bg-[#0d1530] px-4 py-2.5 text-sm text-white focus:border-blue-500/40 focus:outline-none"
                    >
                      <option value={301}>301 — Permanent</option>
                      <option value={302}>302 — Temporary</option>
                    </select>
                  </div>
                </div>
                <button
                  id="add-redirect-btn"
                  onClick={createRedirect}
                  disabled={redirectSaving}
                  className="btn-primary mt-4 px-6 py-2.5 text-sm disabled:opacity-50"
                >
                  {redirectSaving ? "Adding..." : "➕ Add Redirect"}
                </button>
              </div>

              {/* Redirects table */}
              <div className="overflow-hidden rounded-2xl border border-blue-500/10 bg-[#0d1530]">
                {redirects.length === 0 ? (
                  <div className="py-16 text-center">
                    <p className="text-3xl">🔀</p>
                    <p className="mt-2 text-sm text-slate-400">No redirects configured yet.</p>
                  </div>
                ) : (
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="border-b border-white/5 bg-white/[0.02]">
                          {["From", "To", "Code", "Created", "Action"].map((h) => (
                            <th key={h} className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-slate-400">{h}</th>
                          ))}
                        </tr>
                      </thead>
                      <tbody>
                        {redirects.map((r) => (
                          <tr key={r.id} className="data-table-row">
                            <td className="px-4 py-3 font-mono text-xs text-blue-300">{r.from_path}</td>
                            <td className="px-4 py-3 font-mono text-xs text-green-300">{r.to_path}</td>
                            <td className="px-4 py-3">
                              <span className={r.http_code === 301 ? "badge-green" : "badge-amber"}>{r.http_code}</span>
                            </td>
                            <td className="px-4 py-3 text-xs text-slate-400">
                              {new Date(r.created_at).toLocaleDateString()}
                            </td>
                            <td className="px-4 py-3">
                              <button
                                onClick={() => void deleteRedirect(r.id)}
                                className="rounded-lg border border-red-500/20 px-2.5 py-1 text-xs font-medium text-red-400 hover:bg-red-500/10 transition-all"
                              >
                                Delete
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* ── LLMS.TXT PANEL ── */}
          {activePanel === "llms" && (
            <div>
              <div className="mb-6">
                <h2 className="text-xl font-bold text-white">🤖 llms.txt Generator</h2>
                <p className="mt-1 text-sm text-slate-400">Manage your AI-discovery file that helps large language models understand your site.</p>
              </div>

              <div className="glass-card p-6">
                <div className="flex items-center justify-between mb-4">
                  <p className="text-sm font-medium text-white">llms.txt content</p>
                  <a
                    href="https://llmstxt.org/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs text-blue-400 hover:text-blue-300"
                  >
                    📖 llmstxt.org spec ↗
                  </a>
                </div>
                <textarea
                  id="llms-editor"
                  value={llmsContent}
                  onChange={(e) => setLlmsContent(e.target.value)}
                  rows={20}
                  className="w-full rounded-xl border border-white/10 bg-[#080d1a] px-4 py-3 font-mono text-xs text-cyan-300 resize-none focus:border-blue-500/40 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                  placeholder={"# Site Name\n\n> Description for LLMs\n\nOptional links:"}
                />
                <div className="mt-4 flex gap-3">
                  <button
                    id="save-llms-btn"
                    onClick={saveLlms}
                    disabled={llmsSaving}
                    className="btn-primary px-6 py-2.5 text-sm disabled:opacity-50"
                  >
                    {llmsSaving ? "Saving..." : "💾 Save llms.txt"}
                  </button>
                </div>

                <div className="mt-4 rounded-xl border border-blue-500/20 bg-blue-500/5 p-4">
                  <p className="text-xs font-semibold text-blue-300">📌 llms.txt Format</p>
                  <div className="mt-2 text-xs text-slate-400 space-y-1">
                    <p><code className="text-cyan-300"># Site Name</code> — H1 with your site name</p>
                    <p><code className="text-cyan-300">&gt; Description</code> — Blockquote with key description</p>
                    <p><code className="text-cyan-300">## Section</code> — Sections for different topics</p>
                    <p><code className="text-cyan-300">- [Link](url)</code> — Important links for AI context</p>
                  </div>
                </div>

                <div className="mt-3 rounded-xl border border-white/5 bg-white/[0.02] p-4 text-xs text-slate-500">
                  Saved to storage and served at <code className="text-cyan-400">/llms.txt</code> via the Next.js public folder.
                </div>
              </div>
            </div>
          )}

        </main>
      </div>

      {/* ── EDIT SERVICE MODAL ── */}
      {editOpen && editService && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4">
          <div className="glass-card w-full max-w-3xl max-h-[90vh] overflow-y-auto p-8">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-xl font-bold text-white">Edit Service</h2>
                <p className="text-xs text-slate-400">#{editService.id} · /{editService.slug}</p>
              </div>
              <button onClick={() => setEditOpen(false)} className="rounded-xl border border-white/10 p-2 text-slate-400 hover:text-white">✕</button>
            </div>

            <div className="space-y-5">
              {/* SEO Title */}
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

              {/* Meta Description */}
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

              {/* H1 Override & Image Alt Text */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="mb-1.5 block text-xs font-medium text-slate-300">H1 Override</label>
                  <input
                    value={editService.h1_override ?? ""}
                    onChange={(e) => setEditService({ ...editService, h1_override: e.target.value })}
                    placeholder="Leave blank to use service name"
                    className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white focus:border-blue-500/40 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                  />
                </div>
                <div>
                  <label className="mb-1.5 flex justify-between text-xs font-medium text-slate-300">
                    Image Alt Text
                    {!editService.image_alt_text && <span className="text-amber-400">⚠ Recommended</span>}
                  </label>
                  <input
                    value={editService.image_alt_text ?? ""}
                    onChange={(e) => setEditService({ ...editService, image_alt_text: e.target.value })}
                    placeholder="Describe the service image for SEO..."
                    className={`w-full rounded-xl border px-4 py-3 text-sm text-white focus:outline-none focus:ring-2 focus:ring-blue-500/20 ${!editService.image_alt_text ? "border-amber-500/40 bg-amber-500/5" : "border-white/10 bg-white/5"}`}
                  />
                </div>
              </div>

              {/* Manual SEO Keywords */}
              <div>
                <label className="mb-1.5 flex justify-between text-xs font-medium text-slate-300">
                  Target Keywords (Comma Separated)
                </label>
                <input
                  value={Array.isArray(editService.seo_keywords) ? editService.seo_keywords.join(", ") : ""}
                  onChange={(e) => {
                    const str = e.target.value;
                    const keywordsArray = str.split(',').map(k => k.trim()).filter(k => k.length > 0);
                    setEditService({ ...editService, seo_keywords: keywordsArray });
                  }}
                  placeholder="e.g. electrician dubai, 24/7 repair, emergency electrical"
                  className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white focus:border-blue-500/40 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                />
              </div>

              {/* URL Slug & Canonical */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="mb-1.5 block text-xs font-medium text-slate-300">URL Slug</label>
                  <input
                    value={editService.slug ?? ""}
                    onChange={(e) => setEditService({ ...editService, slug: e.target.value })}
                    className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 font-mono text-sm text-cyan-300 focus:border-blue-500/40 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                  />
                </div>
                <div>
                  <label className="mb-1.5 block text-xs font-medium text-slate-300">Canonical URL</label>
                  <input
                    type="url"
                    value={editService.canonical_url ?? ""}
                    onChange={(e) => setEditService({ ...editService, canonical_url: e.target.value })}
                    placeholder="https://... (blank = self)"
                    className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white focus:border-blue-500/40 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                  />
                </div>
              </div>

              {/* Redirect To */}
              <div>
                <label className="mb-1.5 block text-xs font-medium text-slate-300">Redirect To (301)</label>
                <input
                  type="text"
                  value={editService.redirect_to ?? ""}
                  onChange={(e) => setEditService({ ...editService, redirect_to: e.target.value })}
                  placeholder="/new-slug or https://... (leave blank for no redirect)"
                  className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white focus:border-blue-500/40 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                />
              </div>

              {/* Layout & Price */}
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

              {/* Schema.org type + JSON-LD */}
              <div>
                <div className="mb-2 flex items-center justify-between">
                  <label className="text-xs font-medium text-slate-300">Schema.org / JSON-LD</label>
                  <div className="flex items-center gap-2">
                    <select
                      value={schemaTypeSelected}
                      onChange={(e) => { setSchemaTypeSelected(e.target.value); }}
                      className="rounded-lg border border-white/10 bg-[#0d1530] px-2 py-1 text-xs text-white focus:outline-none"
                    >
                      {SCHEMA_TYPES.map((t) => <option key={t} value={t}>{t}</option>)}
                    </select>
                    <button
                      onClick={() => applySchemaTemplate(schemaTypeSelected)}
                      className="rounded-lg border border-blue-500/30 px-2.5 py-1 text-xs text-blue-400 hover:bg-blue-500/10 transition-all"
                    >
                      ✨ Generate
                    </button>
                  </div>
                </div>
                <textarea
                  value={typeof editService.schema_markup === 'object' ? JSON.stringify(editService.schema_markup, null, 2) : (editService.schema_markup ?? editService.json_ld_schema ?? "")}
                  onChange={(e) => setEditService({ ...editService, schema_markup: e.target.value })}
                  rows={7}
                  placeholder='{"@context": "https://schema.org", "@type": "Service", ...}'
                  className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 font-mono text-xs text-green-300 resize-none focus:border-blue-500/40 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                />
              </div>

              {/* Checkboxes */}
              <div className="flex flex-wrap gap-6">
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
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={editService.no_index ?? false}
                    onChange={(e) => setEditService({ ...editService, no_index: e.target.checked })}
                    className="h-4 w-4 accent-red-500"
                  />
                  <span className="text-sm text-slate-300">No-Index <span className="text-xs text-red-400">(hides from Google)</span></span>
                </label>
              </div>
            </div>

            <div className="mt-6 flex gap-3">
              <button
                id="save-service-btn"
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
                id="confirm-deactivate-btn"
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
      
      <PowerEditorSlideover serviceSlug={powerEditorSlug} onClose={() => setPowerEditorSlug(null)} />
    </div>
  );
}
