"use client";

import { Icons } from "../icons";
import type { Lang, DeliveryMethod, CustomerData } from "../../types";
import type { Translations } from "../../i18n/he";

interface CheckoutModalProps {
  styles: ReturnType<typeof import("../../hooks/useStyles").useStyles>;
  t: Translations;
  lang: Lang;
  c: ReturnType<typeof import("../../hooks/useStyles").useStyles>["colors"];
  isRTL: boolean;
  // Cart
  cartSubtotal: number;
  // Checkout state
  selectedDelivery: DeliveryMethod;
  setSelectedDelivery: (method: DeliveryMethod) => void;
  promoCode: string;
  setPromoCode: (code: string) => void;
  appliedPromo: string | null;
  applyPromoCode: () => void;
  paymentCount: number;
  setPaymentCount: (count: number) => void;
  showPaymentDropdown: boolean;
  setShowPaymentDropdown: (show: boolean) => void;
  termsAccepted: boolean;
  setTermsAccepted: (accepted: boolean) => void;
  customerData: CustomerData;
  updateCustomerData: (field: keyof CustomerData, value: string) => void;
  deliveryPrices: { boxit: number; courier: number; pickup: number };
  deliveryFee: number;
  promoDiscount: number;
  cartTotal: number;
  // Actions
  onClose: () => void;
  onBack: () => void;
}

export function CheckoutModal({
  styles,
  t,
  lang,
  c,
  isRTL,
  cartSubtotal,
  selectedDelivery,
  setSelectedDelivery,
  promoCode,
  setPromoCode,
  appliedPromo,
  applyPromoCode,
  paymentCount,
  setPaymentCount,
  showPaymentDropdown,
  setShowPaymentDropdown,
  termsAccepted,
  setTermsAccepted,
  customerData,
  updateCustomerData,
  deliveryPrices,
  deliveryFee,
  promoDiscount,
  cartTotal,
  onClose,
  onBack,
}: CheckoutModalProps) {
  return (
    <div style={styles.cartOverlay} onClick={onClose}>
      <div style={styles.cartModal} onClick={(e) => e.stopPropagation()}>
        {/* Header */}
        <div style={styles.cartHeader}>
          <button 
            style={{ background: "none", border: "none", cursor: "pointer", padding: 8, display: "flex", alignItems: "center", gap: 8 }}
            onClick={onBack}
          >
            <Icons.ArrowLeft size={20} color={c.text} />
            <span style={{ fontSize: 14, color: c.textSecondary, fontFamily: "'Heebo', sans-serif" }}>{t.back}</span>
          </button>
          <button 
            style={{ background: "none", border: "none", cursor: "pointer", padding: 8 }}
            onClick={onClose}
          >
            <Icons.Close size={24} color={c.text} />
          </button>
        </div>

        {/* Checkout Content */}
        <div style={styles.cartContent}>
          <h1 style={{ fontSize: 26, fontWeight: 600, fontFamily: "'Cormorant Garamond', serif", color: c.text, marginTop: 8, marginBottom: 8 }}>
            {t.checkoutTitle}
          </h1>

          {/* Customer Data Block */}
          <div style={styles.checkoutBlock}>
            <h2 style={styles.checkoutBlockTitle}>{t.customerData}</h2>
            <div style={styles.checkoutInputRow}>
              <div style={{ flex: 1 }}>
                <label style={styles.checkoutLabel}>{t.firstName} <span style={{ color: c.accent }}>*</span></label>
                <input 
                  type="text"
                  style={styles.checkoutInput}
                  value={customerData.firstName}
                  onChange={(e) => updateCustomerData("firstName", e.target.value)}
                />
              </div>
              <div style={{ flex: 1 }}>
                <label style={styles.checkoutLabel}>{t.lastName} <span style={{ color: c.accent }}>*</span></label>
                <input 
                  type="text"
                  style={styles.checkoutInput}
                  value={customerData.lastName}
                  onChange={(e) => updateCustomerData("lastName", e.target.value)}
                />
              </div>
            </div>
            <label style={styles.checkoutLabel}>{t.email} <span style={{ color: c.accent }}>*</span></label>
            <input 
              type="email"
              style={styles.checkoutInput}
              placeholder="user@example.com"
              value={customerData.email}
              onChange={(e) => updateCustomerData("email", e.target.value)}
            />
            <label style={styles.checkoutLabel}>{t.phone} <span style={{ color: c.accent }}>*</span></label>
            <input 
              type="tel"
              style={{ ...styles.checkoutInput, marginBottom: 0 }}
              placeholder="05X-XXX-XXXX"
              value={customerData.phone}
              onChange={(e) => updateCustomerData("phone", e.target.value)}
            />
          </div>

          {/* Delivery Block */}
          <div style={styles.checkoutBlock}>
            <h2 style={styles.checkoutBlockTitle}>{t.delivery}</h2>
            
            <div 
              style={styles.deliveryOption(selectedDelivery === "boxit")}
              onClick={() => setSelectedDelivery("boxit")}
            >
              <Icons.Radio size={20} color={c.accent} filled={selectedDelivery === "boxit"} />
              <div style={styles.deliveryOptionContent}>
                <p style={styles.deliveryOptionTitle}>{t.deliveryBoxit}</p>
                <p style={styles.deliveryOptionDesc}>
                  {"\u20AA"}25 ({t.freeFrom}{"\u20AA"}300)
                </p>
              </div>
              <span style={styles.deliveryOptionPrice}>
                {deliveryPrices.boxit === 0 ? t.freeDelivery : `${"\u20AA"}${deliveryPrices.boxit}`}
              </span>
            </div>

            <div 
              style={styles.deliveryOption(selectedDelivery === "courier")}
              onClick={() => setSelectedDelivery("courier")}
            >
              <Icons.Radio size={20} color={c.accent} filled={selectedDelivery === "courier"} />
              <div style={styles.deliveryOptionContent}>
                <p style={styles.deliveryOptionTitle}>{t.deliveryCourier}</p>
                <p style={styles.deliveryOptionDesc}>
                  {"\u20AA"}35 ({t.freeFrom}{"\u20AA"}400)
                </p>
              </div>
              <span style={styles.deliveryOptionPrice}>
                {deliveryPrices.courier === 0 ? t.freeDelivery : `${"\u20AA"}${deliveryPrices.courier}`}
              </span>
            </div>

            <div 
              style={styles.deliveryOption(selectedDelivery === "pickup")}
              onClick={() => setSelectedDelivery("pickup")}
            >
              <Icons.Radio size={20} color={c.accent} filled={selectedDelivery === "pickup"} />
              <div style={styles.deliveryOptionContent}>
                <p style={styles.deliveryOptionTitle}>{t.deliveryPickup}</p>
                <p style={styles.deliveryOptionDesc}>{t.freeDelivery}</p>
              </div>
              <span style={styles.deliveryOptionPrice}>{t.freeDelivery}</span>
            </div>
          </div>

          {/* Promo Code Block */}
          <div style={styles.checkoutBlock}>
            <h2 style={styles.checkoutBlockTitle}>{t.promoCode}</h2>
            <div style={styles.promoRow}>
              <input 
                type="text"
                style={styles.promoInput}
                placeholder={t.promoPlaceholder}
                value={promoCode}
                onChange={(e) => setPromoCode(e.target.value)}
              />
              <button style={styles.promoBtn} onClick={applyPromoCode}>
                {t.promoApply}
              </button>
            </div>
            {appliedPromo && (
              <p style={{ marginTop: 10, fontSize: 13, color: "#16a34a", fontFamily: "'Heebo', sans-serif" }}>
                {appliedPromo} (-10%)
              </p>
            )}
          </div>

          {/* Payment Count Block */}
          <div style={styles.checkoutBlock}>
            <h2 style={styles.checkoutBlockTitle}>{t.paymentCount}</h2>
            <div style={{ position: "relative" }}>
              <select
                style={styles.paymentSelect}
                value={paymentCount}
                onChange={(e) => setPaymentCount(Number(e.target.value))}
              >
                <option value={1}>{t.singlePayment}</option>
                <option value={2}>2 {t.payments}</option>
                <option value={3}>3 {t.payments}</option>
                <option value={4}>4 {t.payments}</option>
                <option value={6}>6 {t.payments}</option>
                <option value={12}>12 {t.payments}</option>
              </select>
            </div>
          </div>

          {/* Summary Block */}
          <div style={styles.checkoutBlock}>
            <div style={styles.summaryRow}>
              <span style={styles.summaryLabel}>{t.subtotal}</span>
              <span style={styles.summaryValue}>{"\u20AA"}{cartSubtotal}</span>
            </div>
            {promoDiscount > 0 && (
              <div style={styles.summaryRow}>
                <span style={styles.summaryLabel}>{t.orderDiscount}</span>
                <span style={{ ...styles.summaryValue, color: "#16a34a" }}>-{"\u20AA"}{promoDiscount}</span>
              </div>
            )}
            <div style={styles.summaryRow}>
              <span style={styles.summaryLabel}>{t.deliveryFee}</span>
              <span style={styles.summaryValue}>
                {deliveryFee === 0 ? t.freeDelivery : `${"\u20AA"}${deliveryFee}`}
              </span>
            </div>
            <div style={styles.summaryTotal}>
              <span style={styles.summaryTotalLabel}>{t.total}</span>
              <span style={styles.summaryTotalValue}>{"\u20AA"}{cartTotal}</span>
            </div>
            <p style={styles.summaryVat}>{t.inclVat}</p>
          </div>

          {/* Terms */}
          <div style={styles.termsRow}>
            <div 
              style={styles.termsCheckbox(termsAccepted)}
              onClick={() => setTermsAccepted(!termsAccepted)}
            >
              {termsAccepted && <Icons.Check size={14} color="#FFF" />}
            </div>
            <p style={styles.termsText}>{t.termsAgree}</p>
          </div>
        </div>

        {/* Proceed Button */}
        <button 
          style={termsAccepted ? styles.proceedBtn : styles.proceedBtnDisabled}
          disabled={!termsAccepted}
          onClick={() => {
            if (termsAccepted) {
              // Handle payment
              alert(lang === "he" ? "מעבר לתשלום..." : "Переход к оплате...");
            }
          }}
        >
          {t.proceedToPayment}
        </button>
      </div>
    </div>
  );
}
