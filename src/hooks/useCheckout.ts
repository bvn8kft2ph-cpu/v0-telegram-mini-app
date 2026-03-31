"use client";

import { useState, useCallback, useMemo } from "react";
import type { DeliveryMethod, CustomerData } from "../types";

interface UseCheckoutProps {
  cartSubtotal: number;
}

export function useCheckout({ cartSubtotal }: UseCheckoutProps) {
  const [selectedDelivery, setSelectedDelivery] = useState<DeliveryMethod>("boxit");
  const [promoCode, setPromoCode] = useState("");
  const [appliedPromo, setAppliedPromo] = useState<string | null>(null);
  const [paymentCount, setPaymentCount] = useState(1);
  const [showPaymentDropdown, setShowPaymentDropdown] = useState(false);
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [customerData, setCustomerData] = useState<CustomerData>({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
  });

  // Delivery prices based on subtotal
  const deliveryPrices = useMemo(
    () => ({
      boxit: cartSubtotal >= 300 ? 0 : 25,
      courier: cartSubtotal >= 400 ? 0 : 35,
      pickup: 0,
    }),
    [cartSubtotal]
  );

  const deliveryFee = deliveryPrices[selectedDelivery];

  // Promo discount (10% if valid code)
  const promoDiscount = useMemo(() => {
    return appliedPromo ? Math.round(cartSubtotal * 0.1) : 0;
  }, [appliedPromo, cartSubtotal]);

  // Total calculation
  const cartTotal = useMemo(() => {
    return cartSubtotal - promoDiscount + deliveryFee;
  }, [cartSubtotal, promoDiscount, deliveryFee]);

  const applyPromoCode = useCallback(() => {
    const code = promoCode.toUpperCase();
    if (code === "WELCOME10" || code === "SILVER15") {
      setAppliedPromo(code);
    }
  }, [promoCode]);

  const updateCustomerData = useCallback(
    (field: keyof CustomerData, value: string) => {
      setCustomerData((prev) => ({ ...prev, [field]: value }));
    },
    []
  );

  const resetCheckout = useCallback(() => {
    setSelectedDelivery("boxit");
    setPromoCode("");
    setAppliedPromo(null);
    setPaymentCount(1);
    setTermsAccepted(false);
    setCustomerData({ firstName: "", lastName: "", email: "", phone: "" });
  }, []);

  return {
    // State
    selectedDelivery,
    setSelectedDelivery,
    promoCode,
    setPromoCode,
    appliedPromo,
    paymentCount,
    setPaymentCount,
    showPaymentDropdown,
    setShowPaymentDropdown,
    termsAccepted,
    setTermsAccepted,
    customerData,
    updateCustomerData,
    // Computed
    deliveryPrices,
    deliveryFee,
    promoDiscount,
    cartTotal,
    // Actions
    applyPromoCode,
    resetCheckout,
  };
}
