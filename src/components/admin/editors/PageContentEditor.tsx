'use client';

import React, { useEffect, useRef } from 'react';
import { useEditorStore, EditorTab } from '@/store/editorStore';
import apiClient from '@/lib/api';
import { toast } from 'sonner';

interface PageContentEditorProps {
  serviceId: number;
  initialData: any;
  onClose: () => void;
}

export default function PageContentEditor({ serviceId, initialData, onClose }: PageContentEditorProps) {
  const store = useEditorStore();
  const autoSaveTimer = useRef<NodeJS.Timeout | null>(null);

  // Initialize store on mount
  useEffect(() => {
    store.reset();
    store.setServiceId(serviceId);
    
    // Parse Initial Data
    // We map the database fields to our ACF structure
    store.setFields({
      name: initialData?.name || '',
      hero_h1: initialData?.h1_override || '',
      section_1_p: initialData?.description || '',
      meta_title: initialData?.seo_title || initialData?.name || '',
      meta_desc: initialData?.seo_description || '',
      image_alt: initialData?.image_alt_text || '',
      canonical_url: initialData?.canonical_url || '',
      schema_type: typeof initialData?.schema_markup === 'string' 
        ? (JSON.parse(initialData.schema_markup || '{}')['@type'] || 'Service')
        : 'Service',
    });

    // Load any existing draft
    const fetchDraft = async () => {
      try {
        const { data } = await apiClient.get(`/admin/services/${serviceId}/draft`);
        if (data.draft) {
          store.setFields(data.draft.content_data);
          toast.info('Restored from autosaved draft.');
        }
      } catch (e) {
        // No draft exists yet
      }
    };
    fetchDraft();

    return () => store.reset();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [serviceId]);

  // Debounced Auto-Save
  useEffect(() => {
    if (store.isDirty && !store.isSaving) {
      if (autoSaveTimer.current) clearTimeout(autoSaveTimer.current);
      
      autoSaveTimer.current = setTimeout(async () => {
        store.setSaving(true);
        try {
          await apiClient.post(`/admin/services/${serviceId}/draft`, {
            content_data: store.fields
          });
          store.setSaved();
          toast.success('Draft auto-saved', { position: 'bottom-right' });
        } catch (e) {
          toast.error('Auto-save failed');
          store.setSaving(false);
        }
      }, 60000); // Save every 60s of inactivity while dirty
    }
    
    return () => {
      if (autoSaveTimer.current) clearTimeout(autoSaveTimer.current);
    };
  }, [store.fields, store.isDirty, store.isSaving, serviceId, store]);

  // Manual Full Save
  const handlePublish = async () => {
    store.setSaving(true);
    try {
      await apiClient.post(`/admin/services/${serviceId}/content`, {
        // Map ACF fields back to standard table columns + JSON blobs where appropriate
        name: store.fields.name,
        h1_override: store.fields.hero_h1,
        description: store.fields.section_1_p,
        seo_title: store.fields.meta_title,
        seo_description: store.fields.meta_desc,
        image_alt_text: store.fields.image_alt,
        canonical_url: store.fields.canonical_url,
        // Publish will also clear the draft
        clear_draft: true
      });
      store.setSaved();
      toast.success('Service updated successfully');
      onClose();
    } catch (e) {
      toast.error('Failed to publish changes');
      store.setSaving(false);
    }
  };

  const tabs: { id: EditorTab; label: string; icon: string }[] = [
    { id: 'content', label: 'Content', icon: '📝' },
    { id: 'media', label: 'Media', icon: '🖼️' },
    { id: 'seo', label: 'SEO', icon: '🔍' },
    { id: 'advanced', label: 'Advanced', icon: '⚙️' },
  ];

  return (
    <div className="flex flex-col h-full bg-[var(--portal-bg)] text-[var(--portal-text)]">
      
      {/* ── Editor Header ── */}
      <div className="flex items-center justify-between border-b border-[var(--portal-border)] px-6 py-4 bg-[var(--portal-surface)]">
        <div>
          <h2 className="text-lg font-bold">Dynamic Page Editor</h2>
          <p className="text-xs text-[var(--portal-text-muted)]">ACF Mapping Mode active. Changes adjust template text without touching CSS.</p>
        </div>
        <div className="flex items-center gap-3">
          <span className="text-xs text-[var(--portal-text-light)] mr-2">
            {store.isSaving ? 'Saving...' : store.isDirty ? 'Unsaved changes' : `Saved ${store.lastSavedAt ? new Date(store.lastSavedAt).toLocaleTimeString() : ''}`}
          </span>
          <button 
            onClick={onClose}
            className="portal-btn-ghost hover:bg-red-50 hover:text-red-600 border-none"
          >
            Cancel
          </button>
          <button 
            onClick={handlePublish}
            disabled={store.isSaving}
            className="portal-btn-primary shadow-lg shadow-blue-500/20"
          >
            Publish Live
          </button>
        </div>
      </div>

      {/* ── Tabs Navigation ── */}
      <div className="flex px-6 border-b border-[var(--portal-border)] bg-[var(--portal-surface)]">
        {tabs.map(tab => (
          <button
            key={tab.id}
            onClick={() => store.setActiveTab(tab.id)}
            className={`flex items-center gap-2 px-5 py-3 text-sm font-medium border-b-2 transition-colors ${
              store.activeTab === tab.id 
                ? 'border-[var(--portal-primary)] text-[var(--portal-primary)]' 
                : 'border-transparent text-[var(--portal-text-muted)] hover:text-[var(--portal-text)] hover:border-[var(--portal-border)]'
            }`}
          >
            <span>{tab.icon}</span>
            {tab.label}
          </button>
        ))}
      </div>

      {/* ── Tab Content Area ── */}
      <div className="flex-1 overflow-y-auto p-6 md:p-8">
        <div className="max-w-4xl mx-auto space-y-6">

          {/* 1. CONTENT TAB */}
          {store.activeTab === 'content' && (
            <div className="space-y-8 animate-fade-in">
              <div className="portal-card">
                <h3 className="text-sm font-bold text-[var(--portal-text)] uppercase tracking-wider mb-5 pb-2 border-b border-[var(--portal-border-sm)]">Hero Section</h3>
                <div className="space-y-5">
                  <div>
                    <label className="block text-xs font-semibold text-[var(--portal-text-muted)] mb-1.5">Service Display Name</label>
                    <input 
                      type="text" 
                      value={store.fields.name}
                      onChange={(e) => store.setField('name', e.target.value)}
                      className="portal-input font-bold text-lg"
                      placeholder="e.g. Cleaning Services"
                    />
                  </div>
                  <div>
                    <div className="flex justify-between items-center mb-1.5">
                      <label className="block text-xs font-semibold text-[var(--portal-text-muted)]">Hero H1 Headline (Optional Override)</label>
                    </div>
                    <input 
                      type="text" 
                      value={store.fields.hero_h1}
                      onChange={(e) => store.setField('hero_h1', e.target.value)}
                      className="portal-input text-md"
                      placeholder="e.g. Premium Cleaning Services in Dubai"
                    />
                  </div>
                </div>
              </div>

              <div className="portal-card">
                <h3 className="text-sm font-bold text-[var(--portal-text)] uppercase tracking-wider mb-5 pb-2 border-b border-[var(--portal-border-sm)]">Body Content</h3>
                <div className="space-y-5">
                  <div>
                    <label className="block text-xs font-semibold text-[var(--portal-text-muted)] mb-1.5">Main About/Description Text (Displays below grid)</label>
                    <textarea 
                      rows={12}
                      value={store.fields.section_1_p}
                      onChange={(e) => store.setField('section_1_p', e.target.value)}
                      className="portal-input leading-relaxed"
                      placeholder="Type the detailed main body content. Describe the service."
                    />
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* 2. MEDIA TAB */}
          {store.activeTab === 'media' && (
            <div className="space-y-8 animate-fade-in">
              <div className="portal-card text-center p-12 border-dashed border-2">
                <div className="w-16 h-16 mx-auto bg-blue-50 text-blue-500 rounded-full flex items-center justify-center mb-4">
                  <span className="text-2xl">📸</span>
                </div>
                <h3 className="font-bold text-lg mb-2">Service Image Asset</h3>
                <p className="text-[var(--portal-text-muted)] text-sm mb-6 max-w-md mx-auto">Upload the primary high-resolution imagery for this service. WebP format is automatically generated.</p>
                <button className="portal-btn-primary">Browse Files</button>
              </div>

              <div className="portal-card">
                 <div>
                    <label className="block text-xs font-semibold text-[var(--portal-text-muted)] mb-1.5">Image Alt Text (SEO)</label>
                    <input 
                      type="text" 
                      value={store.fields.image_alt}
                      onChange={(e) => store.setField('image_alt', e.target.value)}
                      className="portal-input"
                      placeholder="Describe the image context for screen readers and search engines..."
                    />
                  </div>
              </div>
            </div>
          )}

          {/* 3. SEO TAB */}
          {store.activeTab === 'seo' && (
            <div className="space-y-8 animate-fade-in">
              <div className="portal-card bg-blue-50/50 border-blue-100 mb-6">
                <h3 className="text-sm font-bold text-blue-800 flex items-center gap-2 mb-2"><span className="text-xl">✨</span> AI Snippet Preview</h3>
                <div className="bg-white p-4 rounded-lg shadow-sm border border-slate-200">
                  <div className="text-[#1a0dab] text-xl font-medium cursor-pointer hover:underline mb-1 truncate">
                    {store.fields.meta_title || 'Enter a meta title...'}
                  </div>
                  <div className="text-[#006621] text-sm mb-1">
                    https://localservices.ae/services/...
                  </div>
                  <div className="text-[#545454] text-sm line-clamp-2">
                    {store.fields.meta_desc || 'No meta description provided. Search engines will automatically grab random text from your page.'}
                  </div>
                </div>
              </div>

              <div className="portal-card space-y-5">
                <div>
                  <div className="flex justify-between items-end mb-1.5">
                    <label className="text-xs font-semibold text-[var(--portal-text-muted)]">Meta Title</label>
                    <span className={`text-[10px] font-mono ${store.fields.meta_title.length > 60 ? 'text-red-500' : 'text-green-500'}`}>
                      {store.fields.meta_title.length} / 60
                    </span>
                  </div>
                  <input 
                    type="text" 
                    value={store.fields.meta_title}
                    onChange={(e) => store.setField('meta_title', e.target.value)}
                    className="portal-input"
                  />
                </div>
                <div>
                  <div className="flex justify-between items-end mb-1.5">
                    <label className="text-xs font-semibold text-[var(--portal-text-muted)]">Meta Description</label>
                    <span className={`text-[10px] font-mono ${store.fields.meta_desc.length > 160 ? 'text-red-500' : 'text-slate-400'}`}>
                      {store.fields.meta_desc.length} / 160
                    </span>
                  </div>
                  <textarea 
                    rows={3}
                    value={store.fields.meta_desc}
                    onChange={(e) => store.setField('meta_desc', e.target.value)}
                    className="portal-input"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-[var(--portal-text-muted)] mb-1.5">Canonical URL</label>
                  <input 
                    type="text" 
                    value={store.fields.canonical_url}
                    onChange={(e) => store.setField('canonical_url', e.target.value)}
                    className="portal-input font-mono text-xs"
                    placeholder="Leave blank to self-reference"
                  />
                </div>
              </div>
            </div>
          )}

          {/* 4. ADVANCED TAB */}
          {store.activeTab === 'advanced' && (
            <div className="space-y-8 animate-fade-in">
              <div className="portal-card space-y-5">
                <h3 className="text-sm font-bold text-[var(--portal-text)] uppercase tracking-wider mb-5 pb-2 border-b border-[var(--portal-border-sm)]">Structured Data (JSON-LD)</h3>
                <div>
                  <label className="block text-xs font-semibold text-[var(--portal-text-muted)] mb-1.5">Schema Entity Type</label>
                  <select 
                    value={store.fields.schema_type}
                    onChange={(e) => store.setField('schema_type', e.target.value)}
                    className="portal-input appearance-none bg-white font-medium"
                  >
                    <option value="Service">Service</option>
                    <option value="LocalBusiness">LocalBusiness</option>
                    <option value="Product">Product</option>
                    <option value="FAQPage">FAQPage</option>
                  </select>
                </div>
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}
