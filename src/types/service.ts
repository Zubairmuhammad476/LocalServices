// ─── Service Types ────────────────────────────────────────────────────────────

export type DesignLayout =
  | "main_category_layout"
  | "city_hub_layout"
  | "standard_sub_service";

export type PricingModel = "fixed" | "hourly" | "quote_based" | "variable";

export interface Service {
  id: number;
  parentId: number | null;
  name: string;
  slug: string;
  description: string | null;
  designLayout: DesignLayout;
  basePrice: string | null;
  pricingModel: PricingModel;
  seoTitle: string | null;
  seoDescription: string | null;
  imageUrl: string | null;
  schemaMarkup: Record<string, unknown> | null;
  isActive: boolean;
  isSeoOptimized: boolean;
  active_image_url?: string | null;
  ai_image_url?: string | null;
  ai_prompt?: string | null;
  use_ai_image?: boolean;
  parent?: Service;
  children?: Service[];
  createdAt: string;
  updatedAt: string;
}

export interface ServicePageData {
  service: Service;
  breadcrumbs: Breadcrumb[];
  relatedServices: Service[];
}

export interface Breadcrumb {
  label: string;
  href: string;
}

export interface ServiceHierarchyItem extends Service {
  children: ServiceHierarchyItem[];
}

// ─── API Response Wrappers ───────────────────────────────────────────────────

export interface PaginatedResponse<T> {
  data: T[];
  meta: {
    currentPage: number;
    lastPage: number;
    perPage: number;
    total: number;
  };
}

export interface ApiResponse<T> {
  data: T;
  message?: string;
}
