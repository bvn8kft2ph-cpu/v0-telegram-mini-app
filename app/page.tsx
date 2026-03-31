"use client";

import { useState, useEffect, useRef } from "react";

// Hooks
import { useTheme } from "../src/hooks/useTheme";
import { useLang } from "../src/hooks/useLang";
import { useCart } from "../src/hooks/useCart";
import { useProducts } from "../src/hooks/useProducts";
import { useModals } from "../src/hooks/useModals";
import { useFavorites } from "../src/hooks/useFavorites";
import { useConsents } from "../src/hooks/useConsents";
import { useCheckout } from "../src/hooks/useCheckout";
import { useStyles } from "../src/hooks/useStyles";
import { useBooking } from "../src/hooks/useBooking";

// Components
import { Icons } from "../src/components/icons";
import { CatalogSection, ServicesSection, BrandSection, ProfileSection } from "../src/components/sections";
import { ProductModal, CartModal, CheckoutModal, OrderDetailModal, BookingModal } from "../src/components/modals";

// Types
import type { Section } from "../src/types";

// ═══════════════════════════════════════════════
// FREGER COSMETICS — TELEGRAM MINI APP
// Luxury Beauty Digital Boutique v2.0
// Modular Architecture with Clean Orchestration
// ═══════════════════════════════════════════════

export default function App() {
  // ─────────────────────────────────────────────────
  // HOOKS
  // ─────────────────────────────────────────────────
  const { theme, setTheme, colors: c, mounted: themeMounted } = useTheme();
  const { lang, setLang, t, isRTL, mounted: langMounted } = useLang();
  const cart = useCart();
  const productsHook = useProducts();
  const modals = useModals();
  const favorites = useFavorites();
  const consents = useConsents();
  const checkout = useCheckout({ cartSubtotal: cart.cartSubtotal });
  const booking = useBooking();

  // ─────────────────────────────────────────────────
  // LOCAL STATE
  // ─────────────────────────────────────────────────
  const [activeSection, setActiveSection] = useState<Section>("catalog");
  const [animateIn, setAnimateIn] = useState(true);
  const [expandedBookings, setExpandedBookings] = useState(false);
  const mainRef = useRef<HTMLElement>(null);

  // Compute mounted state
  const mounted = themeMounted && langMounted;

  // Get styles with current theme, lang, and animation state
  const styles = useStyles(theme, lang, animateIn);

  // ─────────────────────────────────────────────────
  // EFFECTS
  // ─────────────────────────────────────────────────
  
  // Section change animation
  useEffect(() => {
    setAnimateIn(false);
    const timer = setTimeout(() => {
      setAnimateIn(true);
      if (mainRef.current) {
        mainRef.current.scrollTo({ top: 0, behavior: "smooth" });
      }
    }, 50);
    return () => clearTimeout(timer);
  }, [activeSection]);

  // ─────────────────────────────────────────────────
  // HANDLERS
  // ─────────────────────────────────────────────────
  
  const handleBackToCatalog = () => {
    modals.closeCart();
    setActiveSection("catalog");
  };

  // ─────────────────────────────────────────────────
  // RENDER
  // ─────────────────────────────────────────────────
  
  if (!mounted) return null;

  return (
    <>
      <link
        href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;1,400&family=Heebo:wght@300;400;500;600&family=Inter:wght@400;500;600;700&display=swap"
        rel="stylesheet"
      />
      <style>{`
        * { box-sizing: border-box; margin: 0; padding: 0; }
        body { overflow: hidden; }
        @keyframes slideUp {
          from { transform: translateY(100%); opacity: 0; }
          to { transform: translateY(0); opacity: 1; }
        }
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes scaleIn {
          from { transform: scale(0.95); opacity: 0; }
          to { transform: scale(1); opacity: 1; }
        }
        @keyframes bokehFloat {
          0%, 100% { transform: translate(0, 0) scale(1); }
          33% { transform: translate(10px, -15px) scale(1.1); }
          66% { transform: translate(-5px, 10px) scale(0.95); }
        }
        @keyframes shimmer {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }
        @keyframes avatarGlow {
          0%, 100% { opacity: 0.5; transform: scale(1); }
          50% { opacity: 1; transform: scale(1.05); }
        }
        @keyframes sparkle {
          0%, 100% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.7; transform: scale(1.1); }
        }
        @keyframes progressFill {
          from { width: 0; }
          to { width: var(--progress-width, 40%); }
        }
        ::-webkit-scrollbar { display: none; }
        button:active { transform: scale(0.97); }
      `}</style>

      <div style={styles.app}>
        {/* Header */}
        <header style={styles.header}>
          <div style={styles.logo}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img 
              src="/logo.png" 
              alt="Freger" 
              style={styles.logoImage}
              onError={(e) => {
                (e.target as HTMLImageElement).style.display = 'none';
                (e.target as HTMLImageElement).nextElementSibling?.setAttribute('style', 'display: flex;');
              }}
            />
            <span style={{ ...styles.logoPlaceholder, display: 'none' }}>F</span>
          </div>
          <div style={styles.headerActions}>
            <button 
              style={styles.langToggle}
              onClick={() => setLang(lang === "he" ? "ru" : "he")}
            >
              {lang === "he" ? "RU" : "HE"}
            </button>
            <button 
              style={styles.iconBtn}
              onClick={() => setTheme(theme === "light" ? "dark" : "light")}
            >
              {theme === "light" ? (
                <Icons.Moon size={20} color={c.text} />
              ) : (
                <Icons.Sun size={20} color={c.text} />
              )}
            </button>
            <button 
              style={{ ...styles.iconBtn, position: "relative" }}
              onClick={modals.openCart}
            >
              <Icons.Cart size={20} color={c.text} />
              {cart.cartItemCount > 0 && (
                <span style={styles.cartBadge}>{cart.cartItemCount}</span>
              )}
            </button>
          </div>
        </header>

        {/* Main Content */}
        <main style={styles.main} ref={mainRef}>
          {activeSection === "catalog" && (
            <CatalogSection
              styles={styles}
              t={t}
              lang={lang}
              theme={theme}
              c={c}
              isRTL={isRTL}
              products={productsHook.products}
              filteredProducts={productsHook.filteredProducts}
              featuredProducts={productsHook.featuredProducts}
              allBrands={productsHook.allBrands}
              availableCategories={productsHook.availableCategories}
              selectedBrand={productsHook.selectedBrand}
              selectedCategory={productsHook.selectedCategory}
              setSelectedBrand={productsHook.setSelectedBrand}
              setSelectedCategory={productsHook.setSelectedCategory}
              onProductClick={modals.openProduct}
            />
          )}
          {activeSection === "services" && (
            <ServicesSection
              styles={styles}
              t={t}
              lang={lang}
              c={c}
              onBookService={booking.openBooking}
            />
          )}
          {activeSection === "brand" && (
            <BrandSection
              styles={styles}
              t={t}
              lang={lang}
              c={c}
              isRTL={isRTL}
            />
          )}
          {activeSection === "profile" && (
            <ProfileSection
              styles={styles}
              t={t}
              lang={lang}
              theme={theme}
              c={c}
              isRTL={isRTL}
              favorites={favorites.favorites}
              consents={consents.consents}
              expandedOrders={modals.expandedOrders}
              expandedFavorites={modals.expandedFavorites}
              setTheme={setTheme}
              setLang={setLang}
              setConsents={consents.setConsents}
              toggleExpandedOrders={modals.toggleExpandedOrders}
              toggleExpandedFavorites={modals.toggleExpandedFavorites}
              onOrderClick={modals.openOrder}
              addToCart={cart.addToCart}
              upcomingBookings={booking.upcomingBookings}
              expandedBookings={expandedBookings}
              toggleExpandedBookings={() => setExpandedBookings(!expandedBookings)}
              onCancelBooking={booking.cancelBooking}
            />
          )}
        </main>

        {/* Navigation */}
        <nav style={styles.nav}>
          {[
            { id: "catalog" as Section, Icon: Icons.Catalog, label: t.navCatalog },
            { id: "services" as Section, Icon: Icons.Services, label: t.navServices },
            { id: "brand" as Section, Icon: Icons.Brand, label: t.navBrand },
            { id: "profile" as Section, Icon: Icons.Profile, label: t.navProfile },
          ].map((item) => {
            const { Icon } = item;
            const isActive = activeSection === item.id;
            return (
              <button
                key={item.id}
                style={styles.navItem(isActive)}
                onClick={() => setActiveSection(item.id)}
              >
                <Icon
                  size={20}
                  color={isActive ? "#FFF" : c.textSecondary}
                  filled={isActive}
                />
                <span style={{ 
                  fontSize: 10, 
                  fontWeight: isActive ? 600 : 500,
                  marginTop: 2,
                }}>{item.label}</span>
              </button>
            );
          })}
        </nav>

        {/* Product Modal */}
        {modals.selectedProduct && (
          <ProductModal
            styles={styles}
            t={t}
            lang={lang}
            c={c}
            product={modals.selectedProduct}
            onClose={modals.closeProduct}
            onAddToCart={cart.addToCart}
            onProductClick={modals.openProduct}
            isFavorite={favorites.isFavorite(modals.selectedProduct.id)}
            onToggleFavorite={favorites.toggleFavorite}
          />
        )}

        {/* Cart Modal */}
        {modals.showCart && !modals.showCheckout && (
          <CartModal
            styles={styles}
            t={t}
            lang={lang}
            c={c}
            cartItems={cart.cartItems}
            cartSubtotal={cart.cartSubtotal}
            onClose={modals.closeCart}
            onCheckout={modals.openCheckout}
            onClearCart={cart.clearCart}
            onUpdateQuantity={cart.updateCartQuantity}
            onBackToCatalog={handleBackToCatalog}
          />
        )}

        {/* Checkout Modal */}
        {modals.showCart && modals.showCheckout && (
          <CheckoutModal
            styles={styles}
            t={t}
            lang={lang}
            c={c}
            isRTL={isRTL}
            cartSubtotal={cart.cartSubtotal}
            selectedDelivery={checkout.selectedDelivery}
            setSelectedDelivery={checkout.setSelectedDelivery}
            promoCode={checkout.promoCode}
            setPromoCode={checkout.setPromoCode}
            appliedPromo={checkout.appliedPromo}
            applyPromoCode={checkout.applyPromoCode}
            paymentCount={checkout.paymentCount}
            setPaymentCount={checkout.setPaymentCount}
            showPaymentDropdown={checkout.showPaymentDropdown}
            setShowPaymentDropdown={checkout.setShowPaymentDropdown}
            termsAccepted={checkout.termsAccepted}
            setTermsAccepted={checkout.setTermsAccepted}
            customerData={checkout.customerData}
            updateCustomerData={checkout.updateCustomerData}
            deliveryPrices={checkout.deliveryPrices}
            deliveryFee={checkout.deliveryFee}
            promoDiscount={checkout.promoDiscount}
            cartTotal={checkout.cartTotal}
            onClose={modals.closeCart}
            onBack={modals.closeCheckout}
          />
        )}

        {/* Order Detail Modal */}
        {modals.selectedOrder && (
          <OrderDetailModal
            styles={styles}
            t={t}
            lang={lang}
            c={c}
            order={modals.selectedOrder}
            onClose={modals.closeOrder}
          />
        )}

        {/* Booking Modal */}
        {booking.selectedService && (
          <BookingModal
            styles={styles}
            t={t}
            lang={lang}
            c={c}
            isRTL={isRTL}
            service={booking.selectedService}
            bookingStep={booking.bookingStep}
            availableDays={booking.availableDays}
            availableSlots={booking.availableSlots}
            selectedDate={booking.selectedDate}
            selectedDay={booking.selectedDay}
            selectedTime={booking.selectedTime}
            customerName={booking.customerName}
            customerPhone={booking.customerPhone}
            onClose={booking.closeBooking}
            onSelectDate={booking.selectDate}
            onSelectTime={booking.selectTime}
            onConfirm={booking.confirmBooking}
            onReset={booking.resetBooking}
            onGoBackToDate={booking.goBackToDate}
            onGoBackToTime={booking.goBackToTime}
            setCustomerName={booking.setCustomerName}
            setCustomerPhone={booking.setCustomerPhone}
            onBackToServices={() => {
              booking.closeBooking();
              setActiveSection("services");
            }}
          />
        )}
      </div>
    </>
  );
}
