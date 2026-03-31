"use client";

import { Icons } from "../icons";
import { products } from "../../data/products";
import type { Product, Lang } from "../../types";
import type { Translations } from "../../i18n/he";

interface ProductModalProps {
  styles: ReturnType<typeof import("../../hooks/useStyles").useStyles>;
  t: Translations;
  lang: Lang;
  c: ReturnType<typeof import("../../hooks/useStyles").useStyles>["colors"];
  product: Product;
  onClose: () => void;
  onAddToCart: (productId: number) => void;
  onProductClick: (product: Product) => void;
  isFavorite: boolean;
  onToggleFavorite: (productId: number) => void;
}

export function ProductModal({
  styles,
  t,
  lang,
  c,
  product,
  onClose,
  onAddToCart,
  onProductClick,
  isFavorite,
  onToggleFavorite,
}: ProductModalProps) {
  const relatedProducts = products
    .filter(p => p.id !== product.id && p.category === product.category)
    .slice(0, 3);

  return (
    <div style={{
      ...styles.modal,
      animation: "slideUp 0.5s cubic-bezier(0.16, 1, 0.3, 1)",
      display: "flex",
      flexDirection: "column" as const,
    }}>
      {/* Scrollable content area */}
      <div style={{ 
        flex: 1, 
        overflowY: "auto" as const,
        overflowX: "hidden" as const,
      }}>
        {/* Header with close/favorite buttons */}
        <div style={styles.modalHeader}>
          <button 
            style={{ 
              ...styles.iconBtn, 
              backgroundColor: "rgba(255,255,255,0.95)", 
              backdropFilter: "blur(10px)",
              boxShadow: "0 2px 12px rgba(0,0,0,0.1)",
            }}
            onClick={onClose}
          >
            <Icons.Close size={20} color="#1F1A16" />
          </button>
          <button 
            style={{ 
              ...styles.iconBtn, 
              backgroundColor: "rgba(255,255,255,0.95)", 
              backdropFilter: "blur(10px)",
              boxShadow: "0 2px 12px rgba(0,0,0,0.1)",
            }}
            onClick={() => onToggleFavorite(product.id)}
          >
            <Icons.Heart size={20} color="#1F1A16" filled={isFavorite} />
          </button>
        </div>

        {/* Product image */}
        <div style={{ ...styles.modalImage(product.brand), position: "relative" }}>
          <div style={{
            position: "absolute",
            inset: 0,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}>
            <Icons.ProductBottle size={100} color="#FFF" />
          </div>
          <div style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            height: "40%",
            background: "linear-gradient(180deg, rgba(255,255,255,0.2) 0%, transparent 100%)",
          }} />
        </div>

        {/* Content */}
        <div style={styles.modalContent}>
          <p style={styles.modalBrand}>{product.brand}</p>
          <h1 style={styles.modalName}>
            {lang === "he" ? product.name_he : product.name_ru}
          </h1>
          
          <div style={styles.modalPrice}>
            <span style={styles.modalPriceMain}>{"\u20AA"}{product.price}</span>
            {product.oldPrice && (
              <span style={styles.modalPriceOld}>{"\u20AA"}{product.oldPrice}</span>
            )}
          </div>

          <p style={styles.modalDesc}>
            {lang === "he" ? product.desc_he : product.desc_ru}
          </p>

          <h3 style={{ ...styles.sectionTitle, fontSize: 17, marginBottom: 14 }}>
            {t.ingredients}
          </h3>
          <div style={styles.ingredientPills}>
            {product.ingredients.map((ing) => (
              <span key={ing} style={styles.ingredientPill}>{ing}</span>
            ))}
          </div>

          {product.featured && (
            <div style={styles.recommendedBadge}>
              <Icons.Check size={18} color={c.accent} />
              <span style={{ fontSize: 14, fontFamily: "'Heebo', sans-serif", fontWeight: 500, color: c.accent }}>
                {t.recommended}
              </span>
            </div>
          )}

          <h3 style={{ ...styles.sectionTitle, fontSize: 17, marginTop: 36 }}>
            {t.completeRoutine}
          </h3>
          <div style={styles.carousel}>
            {relatedProducts.map((relatedProduct) => (
              <div
                key={relatedProduct.id}
                style={{ ...styles.carouselCard, minWidth: 150 }}
                onClick={() => onProductClick(relatedProduct)}
              >
                <div style={{ ...styles.productImage(relatedProduct.brand, false), height: 110 }} />
                <div style={{ padding: 12 }}>
                  <p style={{ ...styles.productBrand, fontSize: 8 }}>{relatedProduct.brand}</p>
                  <h3 style={{ ...styles.productName, fontSize: 14 }}>
                    {lang === "he" ? relatedProduct.name_he : relatedProduct.name_ru}
                  </h3>
                  <p style={{ ...styles.productPrice, fontSize: 14 }}>{"\u20AA"}{relatedProduct.price}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Fixed footer button */}
      <div style={{
        flexShrink: 0,
        paddingTop: 16,
        paddingLeft: 24,
        paddingRight: 24,
        paddingBottom: 28,
        backgroundColor: c.bg,
        borderTop: `1px solid ${c.border}`,
      }}>
        <button 
          style={{
            width: "100%",
            padding: 18,
            borderRadius: 20,
            backgroundColor: c.accent,
            color: "#FFF",
            border: "none",
            fontSize: 16,
            fontWeight: 600,
            fontFamily: "'Heebo', sans-serif",
            cursor: "pointer",
            boxShadow: `0 8px 32px ${c.accent}50`,
          }}
          onClick={() => {
            onAddToCart(product.id);
            onClose();
          }}
        >
          {t.addToCart} · {"\u20AA"}{product.price}
        </button>
      </div>
    </div>
  );
}
