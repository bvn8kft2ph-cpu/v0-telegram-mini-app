// ═══════════════════════════════════════════════
// MOCK DATA - ORDERS
// ═══════════════════════════════════════════════

import type { Order } from "../types";

export const orders: Order[] = [
  {
    id: "FRG-2847",
    date: "25.03.2026",
    total: 465,
    subtotal: 515,
    discount: 50,
    discountCode: "WELCOME10",
    status: "delivered",
    items: 2,
    products: [
      { productId: 1, quantity: 1, price: 320 },
      { productId: 3, quantity: 1, price: 145 },
    ],
    tracking: "IL987654321",
    deliveredDate: "27.03.2026",
    invoiceNumber: "INV-2847-2026",
  },
  {
    id: "FRG-2912",
    date: "28.03.2026",
    total: 320,
    subtotal: 320,
    discount: 0,
    discountCode: null,
    status: "shipping",
    items: 1,
    products: [
      { productId: 1, quantity: 1, price: 320 },
    ],
    tracking: "IL123456789",
    deliveredDate: null,
    invoiceNumber: "INV-2912-2026",
  },
  {
    id: "FRG-2956",
    date: "30.03.2026",
    total: 580,
    subtotal: 655,
    discount: 75,
    discountCode: "SILVER15",
    status: "processing",
    items: 3,
    products: [
      { productId: 7, quantity: 1, price: 290 },
      { productId: 2, quantity: 1, price: 280 },
      { productId: 6, quantity: 1, price: 125 },
    ],
    tracking: null,
    deliveredDate: null,
    invoiceNumber: "INV-2956-2026",
  },
];
