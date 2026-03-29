import axios, { type AxiosInstance } from "axios";
import type {
  ApiResponse,
  PaginatedResponse,
  Service,
  ServiceHierarchyItem,
} from "@/types/service";

// ─── Axios Client ─────────────────────────────────────────────────────────────

const apiClient: AxiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:8000/api",
  // withCredentials omitted — we use Bearer token auth, not Sanctum cookie sessions
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
    "X-Requested-With": "XMLHttpRequest",
  },
});

// ─── Request Interceptor — always inject Bearer token from localStorage ───────

apiClient.interceptors.request.use((config) => {
  if (typeof window !== "undefined") {
    const token = localStorage.getItem("auth_token");
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
  }
  return config;
});

// ─── Response Interceptors ────────────────────────────────────────────────────

apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Redirect to login on unauthenticated
      if (typeof window !== "undefined") {
        window.location.href = "/login";
      }
    }
    return Promise.reject(error);
  }
);

// ─── Service API Calls ────────────────────────────────────────────────────────

/**
 * Fetch paginated list of services. Prefix: get* (read-only)
 */
export async function getServices(page = 1): Promise<PaginatedResponse<Service>> {
  const { data } = await apiClient.get("/services", { params: { page } });
  return data;
}

/**
 * Fetch a single service by slug. Used in ISR page generation.
 */
export async function getServiceBySlug(slug: string): Promise<Service | null> {
  try {
    const { data } = await apiClient.get<ApiResponse<Service>>(`/services/${slug}`);
    return data.data;
  } catch {
    return null;
  }
}

/**
 * Fetch the full service hierarchy for navigation and sitemaps.
 */
export async function getServiceHierarchy(): Promise<ServiceHierarchyItem[]> {
  const { data } = await apiClient.get<ApiResponse<ServiceHierarchyItem[]>>("/services/hierarchy");
  return data.data;
}

/**
 * Fetch top service slugs for Next.js generateStaticParams (pre-renders top 500).
 */
export async function getTopServiceSlugs(limit = 500): Promise<string[]> {
  const { data } = await apiClient.get<ApiResponse<string[]>>("/services/slugs", {
    params: { limit },
  });
  return data.data;
}

export default apiClient;
