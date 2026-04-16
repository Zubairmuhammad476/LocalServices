import { useState, useEffect } from "react";
import apiClient from "@/lib/api";

type PowerEditorProps = {
  serviceSlug: string | null;
  onClose: () => void;
};

export default function PowerEditorSlideover({ serviceSlug, onClose }: PowerEditorProps) {
  const [activeTab, setActiveTab] = useState<"ai" | "analytics" | "tech" | "market">("ai");
  const [powerData, setPowerData] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  // A/B Test Local Toggle State
  const [abEnabled, setAbEnabled] = useState(false);

  useEffect(() => {
    if (!serviceSlug) return;
    const fetchPowerData = async () => {
      setLoading(true);
      try {
        const { data } = await apiClient.get(`/admin/services/${serviceSlug}/power-data`);
        setPowerData(data);
        setAbEnabled(data.module_analytics?.ab_tester?.enabled || false);
      } catch (err) {
        console.error("Failed to load power data", err);
      } finally {
        setLoading(false);
      }
    };
    fetchPowerData();
  }, [serviceSlug]);

  if (!serviceSlug) return null;

  return (
    <>
      <div 
        className="fixed inset-0 z-40 bg-[#0a0f1e]/80 backdrop-blur-sm transition-opacity" 
        onClick={onClose} 
      />
      <div className="fixed inset-y-0 right-0 z-50 w-full max-w-2xl border-l border-blue-500/20 bg-[#0a1532] shadow-2xl overflow-hidden flex flex-col transform transition-transform duration-300">
        
        <div className="flex items-center justify-between border-b border-white/10 px-6 py-4 bg-[#060c1d]">
          <div>
            <h2 className="text-lg font-bold text-white flex items-center gap-2">
              <span className="text-xl">⚡</span> SEO Power Module
            </h2>
            <p className="text-xs text-slate-400 mt-1">Editing capabilities for: <span className="text-blue-400 font-mono">{serviceSlug}</span></p>
          </div>
          <button onClick={onClose} className="rounded-full bg-white/5 p-2 text-slate-400 hover:bg-white/10 hover:text-white transition-colors">
            ✕
          </button>
        </div>

        <div className="flex border-b border-white/10 px-6 bg-[#060c1d]">
          {[
            { id: "ai", label: "AI & Content" },
            { id: "analytics", label: "Analytics & A/B" },
            { id: "tech", label: "Tech & Schema" },
            { id: "market", label: "Social & Score" },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`px-4 py-3 text-sm font-semibold transition-colors border-b-2 ${
                activeTab === tab.id ? "border-blue-500 text-blue-400" : "border-transparent text-slate-500 hover:text-slate-300"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {loading ? (
            <div className="flex flex-col items-center justify-center h-40 space-y-3">
              <span className="animate-spin text-3xl text-blue-500">⚙️</span>
              <p className="text-sm text-slate-400 animate-pulse">Running advanced heuristics...</p>
            </div>
          ) : !powerData ? (
            <div className="text-center text-red-400 text-sm py-10">Data loading failed.</div>
          ) : (
            <>
              {/* ── MODULE A: AI INTEL ── */}
              {activeTab === "ai" && (
                <div className="animate-fade-in space-y-6">
                  {/* Arabic Meta Sync */}
                  <div className="glass-card p-4">
                    <h3 className="text-sm font-bold text-white mb-2">5. Arabic-English Meta Sync</h3>
                    <p className="text-xs text-slate-400 mb-3">Auto-translated via Gemini.</p>
                    <div className="rounded bg-slate-900/50 p-3 border border-slate-800">
                      <p className="text-sm text-right font-arabic text-emerald-400">{powerData.module_ai.language_sync?.ar_title}</p>
                      <p className="text-xs text-right mt-1 text-slate-500">{powerData.module_ai.language_sync?.ar_description}</p>
                    </div>
                  </div>

                  {/* Semantic Entities */}
                  <div className="glass-card p-4">
                    <h3 className="text-sm font-bold text-white mb-2">11. Semantic Entity Injector</h3>
                    <div className="flex gap-2 flex-wrap mt-2">
                      {powerData.module_ai.semantic_entities?.suggested_entities?.map((ent: string) => (
                        <span key={ent} className="badge-purple text-xs">+{ent}</span>
                      ))}
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="glass-card p-4 border-l-2 border-l-blue-500">
                      <h3 className="text-xs font-bold text-slate-300">7. Bulk Image Vision</h3>
                      <p className="text-[10px] text-slate-500 mt-1 mb-2">Auto Alt-Text via Gemini</p>
                      <span className="text-xs text-blue-300 bg-blue-500/10 px-2 py-1 rounded">Enabled automatically on upload.</span>
                    </div>
                    <div className="glass-card p-4 border-l-2 border-l-emerald-500">
                      <h3 className="text-xs font-bold text-slate-300">20. Keyword Density</h3>
                      <p className="text-2xl font-bold text-white mt-1">{powerData.module_ai.keyword_density?.density_percentage}%</p>
                      <span className="text-[10px] text-emerald-400">Optimal Range ✅</span>
                    </div>
                  </div>
                </div>
              )}

              {/* ── MODULE B: ANALYTICS ── */}
              {activeTab === "analytics" && (
                <div className="animate-fade-in space-y-6">
                  {/* A/B Tester */}
                  <div className="glass-card p-5 border-blue-500/30">
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <h3 className="text-sm font-bold text-white">1. A/B Meta Tester</h3>
                        <p className="text-xs text-slate-400">Split-test Title tags.</p>
                      </div>
                      <label className="relative inline-flex cursor-pointer items-center">
                        <input type="checkbox" className="peer sr-only" checked={abEnabled} onChange={(e) => setAbEnabled(e.target.checked)} />
                        <div className="peer h-6 w-11 rounded-full bg-slate-700 after:absolute after:left-[2px] after:top-[2px] after:h-5 after:w-5 after:rounded-full after:border after:border-gray-300 after:bg-white after:transition-all after:content-[''] peer-checked:bg-blue-600 peer-checked:after:translate-x-full peer-checked:after:border-white peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-800"></div>
                      </label>
                    </div>
                    
                    <div className="space-y-3">
                      <div>
                        <p className="text-xs font-semibold text-slate-300 mb-1">Variant A (Control)</p>
                        <div className="text-sm bg-black/40 p-2 rounded text-slate-400 border border-transparent">Current Service Title</div>
                      </div>
                      {abEnabled && (
                        <div>
                          <p className="text-xs font-semibold text-blue-400 mb-1">Variant B (Test)</p>
                          <input type="text" defaultValue={powerData.module_analytics.ab_tester?.title_b} placeholder="E.g. #1 Trusted Cleaning - Hire Now" className="w-full text-sm bg-blue-900/10 p-2 rounded text-white border border-blue-500/30 focus:outline-none focus:ring-1 focus:ring-blue-500" />
                        </div>
                      )}
                    </div>
                  </div>

                  {/* GSC Gaps */}
                  <div className="grid grid-cols-2 gap-4">
                    <div className="glass-card p-4">
                      <h3 className="text-xs font-bold text-slate-300 mb-2">4. GSC Gaps (7d)</h3>
                      <div className="flex justify-between items-baseline">
                        <p className="text-sm text-slate-400">Impressions</p>
                        <p className="text-lg font-bold text-white">{powerData.module_analytics.gsc_gaps?.impressions_7d}</p>
                      </div>
                      <div className="flex justify-between items-baseline mt-1">
                        <p className="text-sm text-slate-400">Avg CTR</p>
                        <p className="text-lg font-bold text-amber-400">{powerData.module_analytics.gsc_gaps?.ctr}%</p>
                      </div>
                    </div>
                    <div className="glass-card p-4">
                      <h3 className="text-xs font-bold text-slate-300 mb-2">12. PageSpeed Core</h3>
                      <div className="flex h-12 w-12 items-center justify-center rounded-full border-4 border-emerald-500 mx-auto mt-2">
                        <span className="font-bold text-emerald-400">{powerData.module_analytics.pagespeed?.performance}</span>
                      </div>
                    </div>
                  </div>
                  
                  {/* Content Decay Alert */}
                  <div className="glass-card p-4 border border-amber-500/20 bg-amber-500/5">
                    <h3 className="text-sm font-bold text-amber-400">3. Content Decay Alert</h3>
                    <p className="text-xs text-slate-300 mt-1">{powerData.module_analytics.content_decay?.recommendation}</p>
                    <p className="text-xs text-slate-500 mt-1">Last updated: {powerData.module_analytics.content_decay?.days_since_update} days ago</p>
                  </div>
                </div>
              )}

              {/* ── MODULE C: TECH SEO ── */}
              {activeTab === "tech" && (
                <div className="animate-fade-in space-y-6">
                  {/* Internal Link Finder */}
                  <div className="glass-card p-4">
                    <h3 className="text-sm font-bold text-white mb-2">2. Internal Link Suggestions</h3>
                    <p className="text-xs text-slate-400 mb-3">Sibling pages within the same cluster:</p>
                    <ul className="space-y-2">
                      {powerData.module_structural.internal_links?.suggested_links?.map((srv: any) => (
                        <li key={srv.slug} className="text-xs bg-slate-900/50 p-2 rounded flex justify-between">
                          <span className="text-slate-300">{srv.name}</span>
                          <span className="text-blue-400 cursor-pointer hover:underline">Link 🔗</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* 404 & Sitemap */}
                  <div className="grid grid-cols-2 gap-4">
                    <div className="glass-card p-4">
                      <h3 className="text-xs font-bold text-slate-300">8. 404 Auto-Redirect</h3>
                      <p className="text-[10px] text-slate-500 mt-1 mb-1">If deactivated, points to:</p>
                      <p className="text-xs font-mono text-purple-400 break-all">{powerData.module_structural.auto_redirect || 'Active (N/A)'}</p>
                    </div>
                    <div className="glass-card p-4">
                      <h3 className="text-xs font-bold text-slate-300">13. XML Priority</h3>
                      <label className="text-[10px] text-slate-500 mt-1 block mb-1">Slider (0.1 - 1.0)</label>
                      <input type="range" min="0.1" max="1.0" step="0.1" defaultValue={powerData.module_structural.sitemap_priority} className="w-full accent-blue-500" />
                      <div className="text-center mt-1 text-lg font-bold text-white">{powerData.module_structural.sitemap_priority}</div>
                    </div>
                  </div>
                </div>
              )}

              {/* ── MODULE D: SOCIAL & SCORES ── */}
              {activeTab === "market" && (
                <div className="animate-fade-in space-y-6">
                  {/* SEO Score */}
                  <div className="flex gap-6 items-center p-6 glass-card bg-gradient-to-r from-blue-900/20 to-transparent">
                    <div className="relative h-24 w-24">
                      <svg className="h-full w-full" viewBox="0 0 36 36">
                        <path className="text-slate-700" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="currentColor" strokeWidth="3" />
                        <path className="text-blue-500" strokeDasharray={`${powerData.module_marketing.seo_score}, 100`} d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="currentColor" strokeWidth="3" />
                      </svg>
                      <div className="absolute inset-0 flex flex-col justify-center items-center">
                        <span className="text-2xl font-bold text-white">{powerData.module_marketing.seo_score}</span>
                        <span className="text-[8px] text-slate-400">SCORE</span>
                      </div>
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-white">10. Overall SEO Credit Score</h3>
                      <p className="text-xs text-slate-400 mt-1">Based on semantic completeness, markup, and image optimization.</p>
                    </div>
                  </div>

                  {/* UTM Generator */}
                  <div className="glass-card p-4">
                    <h3 className="text-sm font-bold text-white mb-2">14. WhatsApp UTM Array</h3>
                    <div className="bg-black/50 p-2 rounded border border-slate-700">
                      <code className="text-[10px] text-green-400 break-all">{powerData.module_marketing.utm_link}</code>
                    </div>
                  </div>

                 {/* Social Preview */}
                 <div className="glass-card p-4">
                    <h3 className="text-sm font-bold text-white mb-3">17. Social OG Preview</h3>
                    <div className="border border-slate-700 rounded-lg overflow-hidden bg-[#1e2732] max-w-sm">
                      <div className="h-32 bg-slate-800 flex items-center justify-center">
                        <span className="text-slate-600 text-sm">Image: {powerData.module_marketing.social_og?.og_image}</span>
                      </div>
                      <div className="p-3">
                        <p className="text-[10px] text-slate-400 uppercase tracking-wide">localservices.ae</p>
                        <p className="text-sm font-semibold text-white mt-1 leading-snug">{powerData.module_marketing.social_og?.og_title}</p>
                        <p className="text-xs text-slate-400 mt-1 line-clamp-1">{powerData.module_marketing.social_og?.og_description}</p>
                      </div>
                    </div>
                  </div>

                </div>
              )}
            </>
          )}
        </div>

        {/* Footer */}
        <div className="border-t border-white/10 px-6 py-4 bg-[#060c1d] flex justify-end">
          <button onClick={onClose} className="px-5 py-2 text-sm font-medium text-slate-300 hover:text-white transition-colors">
            Close Panel
          </button>
        </div>
      </div>
    </>
  );
}
