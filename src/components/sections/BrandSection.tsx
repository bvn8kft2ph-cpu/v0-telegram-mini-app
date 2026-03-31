"use client";

import { Icons } from "../icons";
import type { Lang } from "../../types";
import type { Translations } from "../../i18n/he";

interface BrandSectionProps {
  styles: ReturnType<typeof import("../../hooks/useStyles").useStyles>;
  t: Translations;
  lang: Lang;
  c: ReturnType<typeof import("../../hooks/useStyles").useStyles>["colors"];
  isRTL: boolean;
}

export function BrandSection({
  styles,
  t,
  lang,
  c,
  isRTL,
}: BrandSectionProps) {
  const brandCards = [
    {
      name: "Dermalosophy",
      desc: lang === "he" ? "טיפוח מתקדם לעור בוגר" : "Продвинутый уход для зрелой кожи",
    },
    {
      name: "ONmacabim",
      desc: lang === "he" ? "פתרונות מקצועיים לכל סוגי העור" : "Профессиональные решения для всех типов кожи",
    },
    {
      name: "Hikari",
      desc: lang === "he" ? "טיפוח טבעי ועדין" : "Натуральный и бережный уход",
    },
  ];

  return (
    <div>
      <div style={styles.brandHero}>
        <div style={styles.avatar}>
          {/* Animated gold ring */}
          <div style={styles.avatarRing} />
          <div style={styles.avatarInner}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/olga.jpg"
              alt="Ольга Фрегер"
              style={styles.avatarImage}
              onError={(e) => {
                (e.target as HTMLImageElement).style.display = 'none';
                (e.target as HTMLImageElement).nextElementSibling?.setAttribute('style', 'display: flex; width: 100%; height: 100%;');
              }}
            />
            <div style={{ ...styles.avatarPlaceholder, display: 'none' }}>О</div>
          </div>
        </div>
        <h1 style={styles.brandName}>
          {lang === "he" ? "אולגה פרגר" : "Ольга Фрегер"}
        </h1>
        <p style={styles.brandRole}>{t.aboutRole}</p>
        <p style={styles.brandPhilosophy}>{t.aboutPhilosophy}</p>

        {/* Stats */}
        <div style={styles.statsRow}>
          <div style={styles.stat}>
            <div style={styles.statNumber}>10+</div>
            <div style={styles.statLabel}>{t.yearsExp}</div>
          </div>
          <div style={styles.stat}>
            <div style={styles.statNumber}>3</div>
            <div style={styles.statLabel}>{t.brands}</div>
          </div>
          <div style={styles.stat}>
            <div style={styles.statNumber}>173+</div>
            <div style={styles.statLabel}>{t.products}</div>
          </div>
        </div>
      </div>

      <div style={styles.section}>
        {/* Brand Cards */}
        <div style={styles.brandCard}>
          {brandCards.map((brand, index) => (
            <div
              key={brand.name}
              style={{
                ...styles.brandCardItem,
                borderTop: index > 0 ? `1px solid ${c.border}` : "none",
              }}
            >
              <div style={styles.brandCardItemContent}>
                <h3 style={styles.brandCardName}>{brand.name}</h3>
                <p style={styles.brandCardDesc}>{brand.desc}</p>
              </div>
              <div style={styles.brandCardItemArrow}>
                <Icons.ChevronRight size={18} color={c.accent} />
              </div>
            </div>
          ))}
        </div>

        <button style={styles.contactBtn}>
          <Icons.Send size={18} color="#FFF" />
          {t.contactOlga}
        </button>

        <div style={styles.locationInfo}>
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <Icons.MapPin size={15} color={c.textMuted} />
            {t.location}
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <Icons.Clock size={15} color={c.textMuted} />
            {t.hours}
          </div>
        </div>

        {/* Map Links */}
        <div style={styles.mapLinksRow}>
          <a
            href="https://waze.com/ul?ll=31.6086,34.7643&navigate=yes"
            target="_blank"
            rel="noopener noreferrer"
            style={styles.mapLinkBtn}
            title={t.openInWaze}
          >
            <Icons.Waze size={26} />
          </a>
          <a
            href="https://maps.google.com/?q=31.6086,34.7643"
            target="_blank"
            rel="noopener noreferrer"
            style={styles.mapLinkBtn}
            title={t.openInGoogle}
          >
            <Icons.GoogleMaps size={26} />
          </a>
          <a
            href="https://maps.apple.com/?ll=31.6086,34.7643"
            target="_blank"
            rel="noopener noreferrer"
            style={styles.mapLinkBtn}
            title={t.openInApple}
          >
            <Icons.AppleMaps size={26} />
          </a>
        </div>

        {/* WhatsApp Link */}
        <a
          href="https://wa.me/972501234567?text=שלום%20אולגה"
          target="_blank"
          rel="noopener noreferrer"
          style={{ ...styles.whatsappBtn, textDecoration: "none" }}
        >
          <Icons.WhatsApp size={24} />
          {t.whatsappOlga}
        </a>
      </div>
    </div>
  );
}
