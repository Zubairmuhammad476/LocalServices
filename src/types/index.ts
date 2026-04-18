// ─── RBAC Role System ─────────────────────────────────────────────────────────

export type UserRole =
  | 'SuperAdmin'
  | 'ContentEditor'
  | 'FinanceAdmin'
  | 'Vendor'
  | 'Customer';

export interface User {
  id: number;
  name: string;
  email: string;
  phone?: string;
  avatarUrl?: string;
  emirate?: string;
  isActive: boolean;
  /** New string-based role from the Phase 1 RBAC seeder */
  role: UserRole;
  /** Legacy Spatie array — kept for backward compat */
  roles: string[];
  emailVerifiedAt: string | null;
  createdAt: string;
}

export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
}

// ─── Booking Types ────────────────────────────────────────────────────────────

export type BookingStatus =
  | "pending"
  | "confirmed"
  | "in_progress"
  | "completed"
  | "cancelled"
  | "disputed";

export interface Booking {
  id: number;
  serviceId: number;
  customerId: number;
  providerId: number | null;
  status: BookingStatus;
  scheduledAt: string;
  completedAt: string | null;
  quotedPriceAed: string | null;
  finalPriceAed: string | null;
  address?: string;
  city?: string;
  emirate?: string;
  notes?: string;
  trackingToken: string;
  createdAt: string;
}

// ─── Payment Types ────────────────────────────────────────────────────────────

export type PaymentGateway = "tap" | "stripe" | "cash" | "bank_transfer";
export type PaymentStatus = "pending" | "processing" | "paid" | "failed" | "refunded";

export interface Payment {
  id: number;
  bookingId: number;
  amountAed: string;
  currency: "AED";
  gateway: PaymentGateway;
  status: PaymentStatus;
  transactionId: string | null;
  cardBrand: string | null;
  paidAt: string | null;
  refundedAt: string | null;
  refundAmountAed: string | null;
  createdAt: string;
}
