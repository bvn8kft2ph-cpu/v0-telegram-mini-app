"use client";

import React, { createContext, useContext, useState, ReactNode } from "react";
import type { Lang, Theme, Section, CartItem, CustomerData, DeliveryMethod, Consents } from "../types";
import type { Product, Order } from "../types";
import { tokens, brandGradients } from "../theme";
import { getTranslations } from "../i18n";
import { products } from "../data/products";

interface AppContextType {
  // Theme & Language
  theme: Theme;
  setTheme: (theme: Theme) => void;
  lang: Lang;
  setLang: (lang: Lang) => void;
  isRTL: boolean;
  c: typeof tokens.light;
  t: ReturnType<typeof getTranslations>;
  
  // Navigation
  activeSection: Section;
  setActiveSection: (section: Section) => void;
  
  // Cart
  cart: CartItem[];
  setCart: React.Dispatch<React.SetStateAction<CartItem[]>>;
  showCart: boolean;
  setShowCart: (show: boolean) => void;
  showCheckout: boolean;
  setShowCheckout: (show: boolean) => void;
  addToCart: (productId: number) => void;
  updateCartQuantity: (productId: number, delta: number) => void;
  removeFromCart: (productId: number) => void;
  clearCart: () => void;
  cartSubtotal: number;
  cartTotal: number;
  cartItemCount: number;
  deliveryFee: number;
  promoDiscount: number;
  
  // Delivery & Promo
  selectedDelivery: DeliveryMethod;
  setSelectedDelivery: (method: DeliveryMethod) => void;
  promoCode: string;
  setPromoCode: (code: string) => void;
  appliedPromo: string | null;
  applyPromoCode: () => void;
  
  // Payment
  paymentCount: number;
  setPaymentCount: (count: number) => void;
  showPaymentDropdown: boolean;
  setShowPaymentDropdown: (show: boolean) => void;
  termsAccepted: boolean;
  setTermsAccepted: (accepted: boolean) => void;
  
  // Customer
  customerData: CustomerData;
  setCustomerData: React.Dispatch<React.SetStateAction<CustomerData>>;
  
  // Products
  selectedProduct: Product | null;
  setSelectedProduct: (product: Product | null) => void;
  selectedBrand: string | null;
  setSelectedBrand: (brand: string | null) => void;
  selectedCategory: string | null;
  setSelectedCategory: (category: string | null) => void;
  handleBrandSelect: (brand: string | null) => void;
  
  // Orders
  expandedOrders: boolean;
  setExpandedOrders: (expanded: boolean) => void;
  selectedOrder: Order | null;
  setSelectedOrder: (order: Order | null) => void;
  
  // Favorites
  favorites: number[];
  setFavorites: React.Dispatch<React.SetStateAction<number[]>>;
  expandedFavorites: boolean;
  setExpandedFavorites: (expanded: boolean) => void;
  
  // Consents
  consents: Consents;
  setConsents: React.Dispatch<React.SetStateAction<Consents>>;
  
  // Animation
  animateIn: boolean;
  
  // Gradients helper
  getBrandGradient: (brand: string) => string;
}

const AppContext = createContext<AppContextType | null>(null);

export function AppProvider({ children }: { children: ReactNode }) {
  // Theme & Language
  const [theme, setTheme] = useState<Theme>("dark");
  const [lang, setLang] = useState<Lang>("ru");
  const isRTL = lang === "he";
  const c = tokens[theme];
  const t = getTranslations(lang);
  
  // Navigation
  const [activeSection, setActiveSection] = useState<Section>("catalog");
  const [animateIn, setAnimateIn] = useState(true);
  
  // Cart
  const [cart, setCart] = useState<CartItem[]>([{ productId: 2, quantity: 1 }]);
  const [showCart, setShowCart] = useState(false);
  const [showCheckout, setShowCheckout] = useState(false);
  
  // Delivery & Promo
  const [selectedDelivery, setSelectedDelivery] = useState<DeliveryMethod>("boxit");
  const [promoCode, setPromoCode] = useState("");
  const [appliedPromo, setAppliedPromo] = useState<string | null>(null);
  
  // Payment
  const [paymentCount, setPaymentCount] = useState(1);
  const [showPaymentDropdown, setShowPaymentDropdown] = useState(false);
  const [termsAccepted, setTermsAccepted] = useState(false);
  
  // Customer
  const [customerData, setCustomerData] = useState<CustomerData>({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
  });
  
  // Products
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [selectedBrand, setSelectedBrand] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  
  // Orders
  const [expandedOrders, setExpandedOrders] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  
  // Favorites
  const [favorites, setFavorites] = useState<number[]>([1, 4, 7]);
  const [expandedFavorites, setExpandedFavorites] = useState(false);
  
  // Consents
  const [consents, setConsents] = useState<Consents>({
    orders: true,
    procedures: true,
    marketing: false,
    photos: false,
  });
  
  // Cart calculations
  const cartItems = cart.map(item => {
    const product = products.find(p => p.id === item.productId);
    return product ? { ...item, product } : null;
  }).filter(Boolean) as { productId: number; quantity: number; product: Product }[];
  
  const cartSubtotal = cartItems.reduce((sum, item) => sum + (item.product.price * item.quantity), 0);
  
  const deliveryPrices = {
    boxit: cartSubtotal >= 300 ? 0 : 25,
    courier: cartSubtotal >= 400 ? 0 : 35,
    pickup: 0,
  };
  
  const deliveryFee = deliveryPrices[selectedDelivery];
  const promoDiscount = appliedPromo ? Math.round(cartSubtotal * 0.1) : 0;
  const cartTotal = cartSubtotal - promoDiscount + deliveryFee;
  const cartItemCount = cart.reduce((sum, item) => sum + item.quantity, 0);
  
  // Cart functions
  const addToCart = (productId: number) => {
    setCart(prev => {
      const existing = prev.find(item => item.productId === productId);
      if (existing) {
        return prev.map(item =>
          item.productId === productId
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prev, { productId, quantity: 1 }];
    });
  };
  
  const updateCartQuantity = (productId: number, delta: number) => {
    setCart(prev => {
      return prev.map(item => {
        if (item.productId === productId) {
          const newQty = item.quantity + delta;
          return newQty > 0 ? { ...item, quantity: newQty } : item;
        }
        return item;
      }).filter(item => item.quantity > 0);
    });
  };
  
  const removeFromCart = (productId: number) => {
    setCart(prev => prev.filter(item => item.productId !== productId));
  };
  
  const clearCart = () => setCart([]);
  
  const applyPromoCode = () => {
    if (promoCode.toUpperCase() === "WELCOME10" || promoCode.toUpperCase() === "SILVER15") {
      setAppliedPromo(promoCode.toUpperCase());
    }
  };
  
  const handleBrandSelect = (brand: string | null) => {
    setSelectedBrand(brand);
    setSelectedCategory(null);
  };
  
  const getBrandGradient = (brand: string) => {
    return brandGradients[theme][brand as keyof typeof brandGradients.light] || brandGradients[theme]["Dermalosophy"];
  };
  
  return (
    <AppContext.Provider value={{
      theme, setTheme,
      lang, setLang,
      isRTL, c, t,
      activeSection, setActiveSection,
      cart, setCart,
      showCart, setShowCart,
      showCheckout, setShowCheckout,
      addToCart, updateCartQuantity, removeFromCart, clearCart,
      cartSubtotal, cartTotal, cartItemCount, deliveryFee, promoDiscount,
      selectedDelivery, setSelectedDelivery,
      promoCode, setPromoCode,
      appliedPromo, applyPromoCode,
      paymentCount, setPaymentCount,
      showPaymentDropdown, setShowPaymentDropdown,
      termsAccepted, setTermsAccepted,
      customerData, setCustomerData,
      selectedProduct, setSelectedProduct,
      selectedBrand, setSelectedBrand,
      selectedCategory, setSelectedCategory,
      handleBrandSelect,
      expandedOrders, setExpandedOrders,
      selectedOrder, setSelectedOrder,
      favorites, setFavorites,
      expandedFavorites, setExpandedFavorites,
      consents, setConsents,
      animateIn,
      getBrandGradient,
    }}>
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("useApp must be used within AppProvider");
  }
  return context;
}
