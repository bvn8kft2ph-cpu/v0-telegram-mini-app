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
