// ═══════════════════════════════════════════════
// FREGER COSMETICS — TYPE DEFINITIONS
// ═══════════════════════════════════════════════

export type Lang = "he" | "ru";
export type Theme = "light" | "dark";
export type Section = "catalog" | "services" | "brand" | "profile";

export interface Product {
  id: number;
  name_he: string;
  name_ru: string;
  brand: "Dermalosophy" | "ONmacabim" | "Hikari";
  category: "anti-age" | "hydration" | "cleansing";
  price: number;
  oldPrice: number | null;
  desc_he: string;
  desc_ru: string;
  ingredients: string[];
  featured: boolean;
}

export interface Service {
  id: number;
  name_he: string;
  name_ru: string;
  duration: number;
  price: number;
  desc_he: string;
  desc_ru: string;
  gradient: string;
}

export interface OrderProduct {
  productId: number;
  quantity: number;
  price: number;
}

export interface Order {
  id: string;
  date: string;
  total: number;
  subtotal: number;
  discount: number;
  discountCode: string | null;
  status: "delivered" | "shipping" | "processing";
  items: number;
  products: OrderProduct[];
  tracking: string | null;
  deliveredDate: string | null;
  invoiceNumber: string;
}

export interface CartItem {
  productId: number;
  quantity: number;
}

export interface CustomerData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
}

export type DeliveryMethod = "boxit" | "courier" | "pickup";

export interface Consents {
  orders: boolean;
  procedures: boolean;
  marketing: boolean;
  photos: boolean;
}

// ─────────────────────────────────────────────────
// SERVICE BOOKING
// ─────────────────────────────────────────────────

export interface TimeSlot {
  time: string;       // "09:00", "10:30", etc.
  available: boolean;
}

export interface BookingDay {
  date: string;        // ISO date "2026-04-01"
  dayName_he: string;  // "א׳", "ב׳", etc.
  dayName_ru: string;  // "Вс", "Пн", etc.
  dayNumber: number;   // 1-31
  month_he: string;    // "אפריל"
  month_ru: string;    // "апреля"
  isToday: boolean;
  isTomorrow: boolean;
  isClosed: boolean;   // Saturday
  slots: TimeSlot[];
}

export interface ServiceBooking {
  id: string;
  serviceId: number;
  serviceName_he: string;
  serviceName_ru: string;
  date: string;
  time: string;
  status: "confirmed" | "pending" | "cancelled";
  customerName: string;
  customerPhone: string;
  createdAt: string;
}

export type BookingStep = "select-date" | "select-time" | "confirm" | "success";
