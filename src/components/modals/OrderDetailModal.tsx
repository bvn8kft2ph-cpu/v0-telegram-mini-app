"use client";

import { useState } from "react";
import { Icons } from "../icons";
import { products } from "../../data/products";
import type { Order, Lang } from "../../types";
import type { Translations } from "../../i18n/he";

interface OrderDetailModalProps {
  styles: ReturnType<typeof import("../../hooks/useStyles").useStyles>;
  t: Translations;
  lang: Lang;
  c: ReturnType<typeof import("../../hooks/useStyles").useStyles>["colors"];
  order: Order;
  onClose: () => void;
}

export function OrderDetailModal({
  styles,
  t,
  lang,
  c,
  order,
  onClose,
}: OrderDetailModalProps) {
  const [copied, setCopied] = useState(false);

  const copyTracking = async () => {
    if (order.tracking) {
      await navigator.clipboard.writeText(order.tracking);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div style={styles.cartOverlay} onClick={onClose}>
      <div style={styles.cartModal} onClick={(e) => e.stopPropagation()}>
        {/* Header */}
        <div style={styles.cartHeader}>
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <span style={{ fontSize: 18, fontWeight: 600, fontFamily: "'Heebo', sans-serif" }}>
              {t.orderDetails}
            </span>
            <span style={styles.orderStatus(order.status)}>
              {t.orderStatus[order.status as keyof typeof t.orderStatus]}
            </span>
          </div>
          <button 
            style={{ background: "none", border: "none", cursor: "pointer", padding: 8 }}
            onClick={onClose}
          >
            <Icons.Close size={24} color={c.text} />
          </button>
        </div>

        {/* Content */}
        <div style={styles.cartContent}>
          {/* Order ID and Date */}
          <div style={{ marginBottom: 20 }}>
            <p style={{ fontSize: 22, fontWeight: 700, fontFamily: "'Inter', sans-serif", marginBottom: 4 }}>
              {order.id}
            </p>
            <p style={{ fontSize: 13, color: c.textMuted, fontFamily: "'Heebo', sans-serif" }}>
              {order.date}
            </p>
          </div>

          {/* Products */}
          <div style={styles.orderDetailBlock}>
            <h3 style={styles.orderDetailTitle}>
              <Icons.Package size={18} color={c.text} />
              {t.orderProducts}
            </h3>
            {order.products.map((item, index) => {
              const product = products.find(p => p.id === item.productId);
              if (!product) return null;
              const isLast = index === order.products.length - 1;
              return (
                <div key={item.productId} style={isLast ? styles.orderProductItemLast : styles.orderProductItem}>
                  <div style={styles.orderProductImage(product.brand)} />
                  <div style={styles.orderProductInfo}>
                    <p style={styles.orderProductName}>
                      {lang === "he" ? product.name_he : product.name_ru}
                    </p>
                    <p style={styles.orderProductMeta}>
                      {item.quantity}x · {"\u20AA"}{item.price}
                    </p>
                  </div>
                  <span style={styles.orderProductPrice}>
                    {"\u20AA"}{item.price * item.quantity}
                  </span>
                </div>
              );
            })}
          </div>

          {/* Summary */}
          <div style={styles.orderDetailBlock}>
            <div style={styles.summaryRow}>
              <span style={styles.summaryLabel}>{t.orderSubtotal}</span>
              <span style={styles.summaryValue}>{"\u20AA"}{order.subtotal}</span>
            </div>
            {order.discount > 0 && (
              <div style={styles.summaryRow}>
                <span style={styles.summaryLabel}>{t.orderDiscount} ({order.discountCode})</span>
                <span style={{ ...styles.summaryValue, color: "#16a34a" }}>-{"\u20AA"}{order.discount}</span>
              </div>
            )}
            <div style={styles.summaryTotal}>
              <span style={styles.summaryTotalLabel}>{t.orderTotal}</span>
              <span style={styles.summaryTotalValue}>{"\u20AA"}{order.total}</span>
            </div>
          </div>

          {/* Tracking */}
          <div style={styles.orderDetailBlock}>
            <h3 style={styles.orderDetailTitle}>
              <Icons.Truck size={18} color={c.text} />
              {t.trackingNumber}
            </h3>
            {order.tracking ? (
              <div style={styles.trackingBlock}>
                <p style={styles.trackingLabel}>{t.trackingNumber}</p>
                <p style={styles.trackingNumber}>{order.tracking}</p>
                <p style={styles.trackingHint}>{t.trackingProof}</p>
                <button style={styles.copyBtn} onClick={copyTracking}>
                  <Icons.Copy size={14} color="#FFF" />
                  {copied ? t.copied : t.copyTracking}
                </button>
              </div>
            ) : (
              <p style={{ fontSize: 14, color: c.textMuted, fontFamily: "'Heebo', sans-serif" }}>
                {t.trackingAwait}
              </p>
            )}
          </div>

          {/* Delivery Date */}
          <div style={styles.orderDetailBlock}>
            <h3 style={styles.orderDetailTitle}>
              <Icons.Clock size={18} color={c.text} />
              {order.status === "delivered" ? t.deliveredOn : t.estimatedDelivery}
            </h3>
            <p style={{ fontSize: 16, fontWeight: 600, fontFamily: "'Inter', sans-serif" }}>
              {order.deliveredDate || (lang === "he" ? "2-4 ימי עסקים" : "2-4 рабочих дня")}
            </p>
          </div>

          {/* Invoice */}
          <div style={styles.orderDetailBlock}>
            <h3 style={styles.orderDetailTitle}>
              <Icons.FileText size={18} color={c.text} />
              {t.invoiceNumber}
            </h3>
            <p style={{ fontSize: 14, fontFamily: "'Inter', sans-serif", marginBottom: 12 }}>
              {order.invoiceNumber}
            </p>
            <button style={styles.invoiceBtn}>
              <Icons.Download size={18} color={c.text} />
              {t.downloadInvoice}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
