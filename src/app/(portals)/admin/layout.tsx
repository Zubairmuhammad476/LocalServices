import AdminLayout from '@/components/admin/AdminLayout';

/**
 * Phase 1 – All admin portal routes are wrapped in the new AdminLayout.
 * This enforces:
 *  - Light theme (portal.css)
 *  - Sticky translucent header
 *  - RBAC-filtered sidebar (per NAV_ITEMS access matrix)
 *  - Auth guard + role redirect
 */
export default function Layout({ children }: { children: React.ReactNode }) {
  return <AdminLayout>{children}</AdminLayout>;
}
