"use client";

import React from "react";
import { Icons } from "../icons";
import { orders } from "../../data/orders";
import { products } from "../../data/products";
import type { Lang, Theme, Order, Consents } from "../../types";
import type { Translations } from "../../i18n/he";

interface ProfileSectionProps {
  styles: ReturnType<typeof import("../../hooks/useStyles").useStyles>;
  t: Translations;
  lang: Lang;
  theme: Theme;
  c: ReturnType<typeof import("../../hooks/useStyles").useStyles>["colors"];
  isRTL: boolean;
  // State
  favorites: number[];
  consents: Consents;
  expandedOrders: boolean;
  expandedFavorites: boolean;
  // Actions
  setTheme: (theme: Theme) => void;
  setLang: (lang: Lang) => void;
  setConsents: React.Dispatch<React.SetStateAction<Consents>>;
  toggleExpandedOrders: () => void;
  toggleExpandedFavorites: () => void;
  onOrderClick: (order: Order) => void;
  addToCart: (productId: number) => void;
}

export function ProfileSection({
  styles,
  t,
  lang,
  theme,
  c,
  isRTL,
  favorites,
  consents,
  expandedOrders,
  expandedFavorites,
  setTheme,
  setLang,
  setConsents,
  toggleExpandedOrders,
  toggleExpandedFavorites,
  onOrderClick,
  addToCart,
}: ProfileSectionProps) {
  return (
    <div style={styles.section}>
      {/* Welcome */}
      <div style={styles.welcomeCard}>
        <p style={styles.welcomeText}>{t.welcomeBack}</p>
        <h1 style={styles.userName}>Ko</h1>
      </div>

      {/* Loyalty Card */}
      <div style={styles.loyaltyCard}>
        {/* Shimmer effect */}
        <div style={styles.loyaltyShimmer} />
        {/* Decorative element */}
        <div style={{
          position: "absolute",
          top: -20,
          [isRTL ? "left" : "right"]: -20,
          width: 100,
          height: 100,
          borderRadius: 50,
          background: "rgba(255,255,255,0.1)",
        }} />
        <p style={styles.loyaltyLevel}>
          <Icons.Star size={12} color="#FFF" /> {t.loyaltyLevel}
        </p>
        <h2 style={styles.loyaltyName}>{t.silver}</h2>
        <div style={styles.progressBar}>
          <div style={{
            ...styles.progressFill,
            animation: "progressFill 1.5s ease-out forwards",
            "--progress-width": "40%",
          } as React.CSSProperties} />
        </div>
        <p style={styles.progressText}>{"\u20AA"}1,500 {t.toNextLevel}</p>
      </div>

      {/* Orders */}
      <div style={styles.ordersSection}>
        <div 
          style={styles.ordersHeader}
          onClick={toggleExpandedOrders}
        >
          <span style={styles.ordersTitle}>
            <Icons.Package size={20} color={c.text} />
            {t.myOrders}
          </span>
          <div style={{ 
            transform: expandedOrders ? "rotate(180deg)" : "rotate(0deg)",
            transition: "transform 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
          }}>
            <Icons.ChevronDown size={20} color={c.textMuted} />
          </div>
        </div>
        {expandedOrders && orders.map((order) => (
          <div 
            key={order.id} 
            style={{ ...styles.orderItem, cursor: "pointer" }}
            onClick={() => onOrderClick(order)}
          >
            <div style={styles.orderInfo}>
              <span style={styles.orderId}>{order.id}</span>
              <span style={styles.orderDate}>{order.date} · {order.items} {lang === "he" ? "פריטים" : "товара"} · {"\u20AA"}{order.total}</span>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
              <span style={styles.orderStatus(order.status)}>
                {t.orderStatus[order.status as keyof typeof t.orderStatus]}
              </span>
              <Icons.ChevronRight size={18} color={c.textMuted} />
            </div>
          </div>
        ))}
      </div>

      {/* Favorites */}
      <div style={styles.ordersSection}>
        <div 
          style={styles.ordersHeader}
          onClick={toggleExpandedFavorites}
        >
          <span style={styles.ordersTitle}>
            <Icons.Heart size={20} color={c.text} filled={favorites.length > 0} />
            {t.favorites}
            {favorites.length > 0 && (
              <span style={{
                marginInlineStart: 8,
                fontSize: 12,
                color: c.textMuted,
                fontWeight: 400,
              }}>
                ({favorites.length})
              </span>
            )}
          </span>
          <div style={{
            transform: expandedFavorites ? "rotate(180deg)" : "rotate(0deg)",
            transition: "transform 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
          }}>
            <Icons.ChevronDown size={20} color={c.textMuted} />
          </div>
        </div>
        
        {expandedFavorites && favorites.length > 0 && (
          <>
            {favorites.map((productId) => {
              const product = products.find(p => p.id === productId);
              if (!product) return null;
              return (
                <div key={productId} style={styles.favoriteItem}>
                  <div style={styles.favoriteImage(product.brand)} />
                  <div style={styles.favoriteInfo}>
                    <p style={styles.favoriteName}>
                      {lang === "he" ? product.name_he : product.name_ru}
                    </p>
                    <span style={styles.favoritePrice}>{"\u20AA"}{product.price}</span>
                  </div>
                  <button 
                    style={styles.favoriteAddBtn}
                    onClick={(e) => {
                      e.stopPropagation();
                      addToCart(productId);
                    }}
                  >
                    {t.addToCart}
                  </button>
                </div>
              );
            })}
            
            {/* Soft reminder */}
            <div style={styles.favoriteReminder}>
              <div style={styles.favoriteReminderIcon}>
                <Icons.Heart size={18} color={c.accent} filled />
              </div>
              <p style={styles.favoriteReminderText}>
                {t.addToCartReminder}
              </p>
            </div>
          </>
        )}
        
        {expandedFavorites && favorites.length === 0 && (
          <div style={{
            padding: "24px 0",
            textAlign: "center",
            color: c.textMuted,
            fontSize: 14,
            fontFamily: "'Heebo', sans-serif",
          }}>
            {t.emptyFavorites}
          </div>
        )}
      </div>

      {/* Settings */}
      <h2 style={{ ...styles.sectionTitle, marginTop: 36 }}>{t.settings}</h2>
      
      <div style={styles.settingsItem}>
        <span style={styles.settingsLabel}>{t.language}</span>
        <div style={styles.themeToggle}>
          <button 
            style={styles.themeBtn(lang === "he")}
            onClick={() => setLang("he")}
          >
            {"\u05E2\u05D1\u05E8\u05D9\u05EA"}
          </button>
          <button 
            style={styles.themeBtn(lang === "ru")}
            onClick={() => setLang("ru")}
          >
            {"\u0420\u0443\u0441\u0441\u043A\u0438\u0439"}
          </button>
        </div>
      </div>

      <div style={styles.settingsItem}>
        <span style={styles.settingsLabel}>{t.theme}</span>
        <div style={styles.themeToggle}>
          <button
            style={styles.themeBtn(theme === "light")}
            onClick={() => setTheme("light")}
          >
            {t.light}
          </button>
          <button
            style={styles.themeBtn(theme === "dark")}
            onClick={() => setTheme("dark")}
          >
            {t.dark}
          </button>
        </div>
      </div>

      {/* Consents Block */}
      <div style={styles.consentsCard}>
        <h3 style={styles.consentsTitle}>{t.consents}</h3>
        
        <div 
          style={styles.consentItem}
          onClick={() => setConsents(prev => ({ ...prev, orders: !prev.orders }))}
        >
          <div style={styles.consentCheckbox(consents.orders)}>
            {consents.orders && <Icons.Check size={14} color="#FFF" />}
          </div>
          <span style={styles.consentLabel}>{t.consentOrders}</span>
        </div>
        
        <div 
          style={styles.consentItem}
          onClick={() => setConsents(prev => ({ ...prev, procedures: !prev.procedures }))}
        >
          <div style={styles.consentCheckbox(consents.procedures)}>
            {consents.procedures && <Icons.Check size={14} color="#FFF" />}
          </div>
          <span style={styles.consentLabel}>{t.consentProcedures}</span>
        </div>
        
        <div 
          style={styles.consentItem}
          onClick={() => setConsents(prev => ({ ...prev, marketing: !prev.marketing }))}
        >
          <div style={styles.consentCheckbox(consents.marketing)}>
            {consents.marketing && <Icons.Check size={14} color="#FFF" />}
          </div>
          <span style={styles.consentLabel}>{t.consentMarketing}</span>
        </div>
        
        <div 
          style={styles.consentItemLast}
          onClick={() => setConsents(prev => ({ ...prev, photos: !prev.photos }))}
        >
          <div style={styles.consentCheckbox(consents.photos)}>
            {consents.photos && <Icons.Check size={14} color="#FFF" />}
          </div>
          <span style={styles.consentLabel}>{t.consentPhotos}</span>
        </div>
      </div>

      <div style={{
        textAlign: "center",
        marginTop: 44,
        fontSize: 13,
        color: c.textMuted,
        fontFamily: "'Heebo', sans-serif",
      }}>
        <p>{t.help} · v2.0.0</p>
      </div>
    </div>
  );
}
