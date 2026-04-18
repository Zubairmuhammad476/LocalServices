export interface FaqItem {
  question: string;
  answer: string;
}

export interface ContentState {
  id?: number;
  service_id: number;
  
  // Hero Section
  h1_text: string;
  h2_subtext: string;
  
  // Body Content
  main_description: string;
  
  // SEO / Metadata
  cta_label: string;
  faq_data: FaqItem[];
  
  last_edited_by?: number;
  updated_at?: string;
}
