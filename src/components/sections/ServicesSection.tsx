"use client";

import { Icons } from "../icons";
import { services } from "../../data/services";
import type { Lang, Service } from "../../types";
import type { Translations } from "../../i18n/he";

interface ServicesSectionProps {
  styles: ReturnType<typeof import("../../hooks/useStyles").useStyles>;
  t: Translations;
  lang: Lang;
  c: ReturnType<typeof import("../../hooks/useStyles").useStyles>["colors"];
  onBookService: (service: Service) => void;
}

export function ServicesSection({
  styles,
  t,
  lang,
  c,
  onBookService,
}: ServicesSectionProps) {
  return (
    <div>
      {/* Hero */}
      <div style={{ ...styles.hero, height: 300 }}>
        <div style={{
          position: "absolute",
          inset: 0,
          background: `linear-gradient(180deg, ${c.bgSecondary} 0%, ${c.accent}20 100%)`,
        }} />
        <div style={{
          position: "absolute",
          inset: 0,
          background: `radial-gradient(ellipse at 50% 80%, ${c.accent}30 0%, transparent 60%)`,
        }} />
        <div style={{
          position: "absolute",
          inset: 0,
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
          opacity: 0.04,
        }} />
        <div style={{ ...styles.heroContent, bottom: 40 }}>
          <h1 style={{ ...styles.heroTitle, fontSize: 40 }}>{t.servicesTitle}</h1>
          <p style={styles.heroSubtitle}>{t.servicesSubtitle}</p>
        </div>
      </div>

      <div style={styles.section}>
        {services.map((service, index) => (
          <div key={service.id} style={styles.serviceCard(index)}>
            <div style={styles.serviceGradient(service.gradient)}>
              <h3 style={styles.serviceName}>
                {lang === "he" ? service.name_he : service.name_ru}
              </h3>
              <div style={styles.serviceMeta}>
                <span style={{ display: "flex", alignItems: "center", gap: 6 }}>
                  <Icons.Clock size={15} color="rgba(31, 26, 22, 0.6)" />
                  {service.duration} {t.duration}
                </span>
                <span style={{ fontWeight: 700 }}>{"\u20AA"}{service.price}</span>
              </div>
              <p style={styles.serviceDesc}>
                {lang === "he" ? service.desc_he : service.desc_ru}
              </p>
              <button 
                style={styles.bookBtn}
                onClick={() => onBookService(service)}
              >
                {t.bookNow}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
