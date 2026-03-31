"use client";

import { Icons } from "../icons";
import type { Lang, Section } from "../../types";
import type { Translations } from "../../i18n/he";

interface CartItem {
  productId: number;
  quantity: number;
  product: {
    id: number;
    name_he: string;
    name_ru: string;
    brand: string;
    price: number;
  };
}

interface CartModalProps {
  styles: ReturnType<typeof import("../../hooks/useStyles").useStyles>;
  t: Translations;
  lang: Lang;
  c: ReturnType<typeof import("../../hooks/useStyles").useStyles>["colors"];
  cartItems: CartItem[];
  cartSubtotal: number;
  onClose: () => void;
  onCheckout: () => void;
  onClearCart: () => void;
  onUpdateQuantity: (productId: number, delta: number) => void;
  onBackToCatalog: () => void;
}

export function CartModal({
  styles,
  t,
  lang,
  c,
  cartItems,
  cartSubtotal,
  onClose,
  onCheckout,
  onClearCart,
  onUpdateQuantity,
  onBackToCatalog,
}: CartModalProps) {
  return (
    <div style={styles.cartOverlay} onClick={onClose}>
      <div style={styles.cartModal} onClick={(e) => e.stopPropagation()}>
        {/* Header */}
        <div style={styles.cartHeader}>
          <span style={styles.cartTitle}>{t.cartTitle}</span>
          <button 
            style={{ background: "none", border: "none", cursor: "pointer", padding: 8 }}
            onClick={onClose}
          >
            <Icons.Close size={24} color={c.text} />
          </button>
        </div>

        {/* Cart Content */}
        <div style={styles.cartContent}>
          {cartItems.length === 0 ? (
            <div style={{ padding: "60px 0", textAlign: "center" }}>
              <Icons.Cart size={48} color={c.textMuted} />
              <p style={{ marginTop: 16, fontSize: 16, color: c.textMuted, fontFamily: "'Heebo', sans-serif" }}>
                {t.cartEmpty}
              </p>
            </div>
          ) : (
            cartItems.map((item) => (
              <div key={item.productId} style={styles.cartItem}>
                <div style={styles.cartItemImage(item.product.brand)} />
                <div style={styles.cartItemInfo}>
                  <p style={styles.cartItemName}>
                    {lang === "he" ? item.product.name_he : item.product.name_ru}
                  </p>
                  <span style={styles.cartItemPrice}>
                    {"\u20AA"}{(item.product.price * item.quantity).toFixed(2)}
                  </span>
                  <div style={styles.cartQuantity}>
                    <button 
                      style={styles.cartQuantityBtn}
                      onClick={() => onUpdateQuantity(item.productId, -1)}
                    >
                      <Icons.Minus size={16} color="#FFF" />
                    </button>
                    <span style={styles.cartQuantityValue}>{item.quantity}</span>
                    <button 
                      style={styles.cartQuantityBtn}
                      onClick={() => onUpdateQuantity(item.productId, 1)}
                    >
                      <Icons.Plus size={16} color="#FFF" />
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        {cartItems.length > 0 && (
          <div style={styles.cartFooter}>
            <div style={styles.cartTotalRow}>
              <span style={styles.cartTotalLabel}>{t.total}:</span>
              <span style={styles.cartTotalValue}>{"\u20AA"}{cartSubtotal}</span>
            </div>
            <button 
              style={styles.cartCheckoutBtn}
              onClick={onCheckout}
            >
              {t.checkout}
            </button>
            <button 
              style={styles.cartClearBtn}
              onClick={onClearCart}
            >
              {t.cartClearAll}
            </button>
            <button 
              style={styles.cartBackBtn}
              onClick={onBackToCatalog}
            >
              {t.cartBackToCatalog}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
