"use client";

import { Icons } from "../icons";
import type { Product, Lang, Theme } from "../../types";
import type { Translations } from "../../i18n/he";

interface CatalogSectionProps {
  styles: ReturnType<typeof import("../../hooks/useStyles").useStyles>;
  t: Translations;
  lang: Lang;
  theme: Theme;
  c: ReturnType<typeof import("../../hooks/useStyles").useStyles>["colors"];
  isRTL: boolean;
  // Products
  products: Product[];
  filteredProducts: Product[];
  featuredProducts: Product[];
  allBrands: string[];
  availableCategories: string[];
  selectedBrand: string | null;
  selectedCategory: string | null;
  setSelectedBrand: (brand: string | null) => void;
  setSelectedCategory: (category: string | null) => void;
  // Actions
  onProductClick: (product: Product) => void;
}

export function CatalogSection({
  styles,
  t,
  lang,
  c,
  isRTL,
  products,
  filteredProducts,
  featuredProducts,
  allBrands,
  availableCategories,
  selectedBrand,
  selectedCategory,
  setSelectedBrand,
  setSelectedCategory,
  onProductClick,
}: CatalogSectionProps) {
  const categoryLabels = styles.categoryLabels;

  return (
    <div>
      {/* Hero with atmospheric background */}
      <div style={styles.hero}>
        {/* Background photo */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img 
          src="/olga.jpg" 
          alt="" 
          style={styles.heroImage}
        />
        {/* Gradient overlay from transparent to bg */}
        <div style={styles.heroGradientOverlay} />
        {/* Gradient mesh background */}
        <div style={styles.heroMesh} />
        {/* Bokeh particles */}
        <div style={{
          ...styles.heroBokeh,
          width: 120,
          height: 120,
          top: "20%",
          left: "10%",
          background: `${c.accent}40`,
          animationDelay: "0s",
        }} />
        <div style={{
          ...styles.heroBokeh,
          width: 80,
          height: 80,
          top: "40%",
          right: "15%",
          background: `${c.accentLight}30`,
          animationDelay: "2s",
        }} />
        <div style={{
          ...styles.heroBokeh,
          width: 60,
          height: 60,
          bottom: "30%",
          left: "60%",
          background: `${c.accent}25`,
          animationDelay: "4s",
        }} />
        {/* Noise texture overlay */}
        <div style={styles.heroNoise} />
        {/* Content */}
        <div style={styles.heroContent}>
          <h1 style={styles.heroTitle}>{t.heroTitle}</h1>
          <p style={styles.heroSubtitle}>{t.heroSubtitle}</p>
        </div>
      </div>

      <div style={styles.section}>
        {/* Brand Filter Row - horizontal scroll pills */}
        <div style={styles.brandRow}>
          <button
            style={styles.brandPill(selectedBrand === null)}
            onClick={() => setSelectedBrand(null)}
          >
            {lang === "he" ? "הכל" : "Все"}
          </button>
          {allBrands.map((brand) => (
            <button
              key={brand}
              style={styles.brandPill(selectedBrand === brand)}
              onClick={() => setSelectedBrand(brand)}
            >
              {brand}
            </button>
          ))}
        </div>

        {/* Category Row - appears when brand is selected */}
        {selectedBrand && (
          <div style={{ ...styles.categoryRow, marginTop: 12 }}>
            <button
              style={styles.categoryPill(selectedCategory === null, false)}
              onClick={() => setSelectedCategory(null)}
            >
              {lang === "he" ? "כל הקטגוריות" : "Все категории"}
            </button>
            {["anti-age", "hydration", "cleansing"].map((cat) => {
              const isAvailable = availableCategories.includes(cat);
              return (
                <button
                  key={cat}
                  style={styles.categoryPill(selectedCategory === cat, !isAvailable)}
                  onClick={() => isAvailable && setSelectedCategory(cat)}
                  disabled={!isAvailable}
                >
                  {categoryLabels[cat][lang]}
                </button>
              );
            })}
          </div>
        )}

        {/* Results count */}
        <p style={{
          fontSize: 12,
          color: c.textMuted,
          fontFamily: "'Heebo', sans-serif",
          marginTop: 16,
          marginBottom: 24,
        }}>
          {lang === "he" 
            ? `${filteredProducts.length} מוצרים`
            : `${filteredProducts.length} ${filteredProducts.length === 1 ? "продукт" : filteredProducts.length < 5 ? "продукта" : "продуктов"}`
          }
        </p>

        {/* Curated Section */}
        <h2 style={styles.sectionTitle}>{t.curatedBy}</h2>

        {/* Quote Block */}
        <div style={styles.quoteBlock}>
          <div style={{
            position: "absolute",
            top: 12,
            [isRTL ? "right" : "left"]: 20,
            opacity: 0.15,
          }}>
            <span style={styles.sparkleIcon}>
              <Icons.Sparkle size={28} color={c.accent} />
            </span>
          </div>
          <p style={styles.quote}>
            {lang === "he" 
              ? "״סרום הרטינול הזה שינה את הטיפוח שלי. אני משתמשת בו כל ערב.״"
              : "«Эта сыворотка с ретинолом изменила мой уход. Я использую её каждый вечер.»"
            }
          </p>
          <p style={styles.quoteAuthor}>— {lang === "he" ? "אולגה פרגר" : "Ольга Фрегер"}</p>
        </div>

        {/* Bento Grid */}
        <div style={styles.bentoGrid}>
          {filteredProducts.slice(0, 6).map((product, index) => {
            const isLarge = index === 0 || index === 3;
            return (
              <div
                key={product.id}
                style={styles.productCard(isLarge, index)}
                onClick={() => onProductClick(product)}
              >
                <div style={styles.productImage(product.brand, isLarge)}>
                  {/* Product placeholder silhouette */}
                  <div style={{
                    position: "absolute",
                    inset: 0,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}>
                    {index % 2 === 0 
                      ? <Icons.ProductBottle size={isLarge ? 80 : 56} color="#FFF" />
                      : <Icons.ProductJar size={isLarge ? 80 : 56} color="#FFF" />
                    }
                  </div>
                  {/* Subtle shine effect */}
                  <div style={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    right: 0,
                    height: "50%",
                    background: "linear-gradient(180deg, rgba(255,255,255,0.15) 0%, transparent 100%)",
                  }} />
                </div>

                <div style={styles.productInfo}>
                  <p style={styles.productBrand}>{product.brand}</p>
                  <h3 style={styles.productName}>
                    {lang === "he" ? product.name_he : product.name_ru}
                  </h3>
                  <p style={styles.productPrice}>{"\u20AA"}{product.price}</p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Bestsellers Carousel */}
        <h2 style={{ ...styles.sectionTitle, marginTop: 44 }}>{t.bestsellers}</h2>
        <div style={styles.carousel}>
          {featuredProducts.map((product) => (
            <div
              key={product.id}
              style={styles.carouselCard}
              onClick={() => onProductClick(product)}
            >
              <div style={{ ...styles.productImage(product.brand, false), height: 150 }} />
              <div style={{ padding: 14 }}>
                <p style={{ ...styles.productBrand, fontSize: 9 }}>{product.brand}</p>
                <h3 style={{ ...styles.productName, fontSize: 15 }}>
                  {lang === "he" ? product.name_he : product.name_ru}
                </h3>
                <p style={{ ...styles.productPrice, fontSize: 15 }}>{"\u20AA"}{product.price}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
