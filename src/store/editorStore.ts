import { create } from 'zustand';
import type { ContentState } from '@/types/content';

export interface AcfFields {
  name: string;
  hero_h1: string;
  section_1_p: string;
  meta_title: string;
  meta_desc: string;
  image_alt: string;
  canonical_url: string;
  schema_type: string;
}

export type EditorTab = 'content' | 'media' | 'seo' | 'advanced';

interface EditorState {
  serviceId: number | null;
  fields: AcfFields;
  activeTab: EditorTab;
  isDirty: boolean;
  isSaving: boolean;
  lastSavedAt: string | null;

  setServiceId: (id: number) => void;
  setField: (key: keyof AcfFields, value: string) => void;
  setFields: (fields: Partial<AcfFields>) => void;
  setActiveTab: (tab: EditorTab) => void;
  setSaving: (saving: boolean) => void;
  setSaved: () => void;
  reset: () => void;
}

const defaultFields: AcfFields = {
  name: '',
  hero_h1: '',
  section_1_p: '',
  meta_title: '',
  meta_desc: '',
  image_alt: '',
  canonical_url: '',
  schema_type: 'Service',
};

export const useEditorStore = create<EditorState>((set) => ({
  serviceId: null,
  fields: { ...defaultFields },
  activeTab: 'content',
  isDirty: false,
  isSaving: false,
  lastSavedAt: null,

  setServiceId: (id) => set({ serviceId: id }),
  setField: (key, value) => set((state) => ({ 
    fields: { ...state.fields, [key]: value },
    isDirty: true 
  })),
  setFields: (newFields) => set((state) => ({ 
    fields: { ...state.fields, ...newFields },
    isDirty: true 
  })),
  setActiveTab: (tab) => set({ activeTab: tab }),
  setSaving: (saving) => set({ isSaving: saving }),
  setSaved: () => set({ 
    isDirty: false, 
    lastSavedAt: new Date().toISOString() 
  }),
  reset: () => set({ 
    serviceId: null, 
    fields: { ...defaultFields }, 
    isDirty: false, 
    lastSavedAt: null 
  }),
}));
