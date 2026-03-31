"use client";

import React from "react";
import { useApp } from "../../context/AppContext";
import { useStyles } from "../../hooks/useStyles";
import { Icons } from "../icons";

export function Header() {
  const { 
    theme, setTheme, 
    lang, setLang, 
    isRTL, 
    cartItemCount, 
    setShowCart 
  } = useApp();
  
  const styles = useStyles(theme, lang);

  return (
    <header style={styles.header}>
      {/* Logo */}
      <div style={styles.logo}>
        <span style={styles.logoPlaceholder}>F</span>
      </div>
      
      {/* Actions */}
      <div style={styles.headerActions}>
        {/* Language Toggle */}
        <button
          onClick={() => setLang(lang === "he" ? "ru" : "he")}
          style={styles.langToggle}
        >
          {lang === "he" ? "RU" : "HE"}
        </button>
        
        {/* Theme Toggle */}
        <button
          onClick={() => setTheme(theme === "light" ? "dark" : "light")}
          style={styles.iconBtn}
        >
          {theme === "light" ? (
            <Icons.Moon size={22} color={styles.colors.text} />
          ) : (
            <Icons.Sun size={22} color={styles.colors.text} />
          )}
        </button>
        
        {/* Cart */}
        <button
          onClick={() => setShowCart(true)}
          style={{ ...styles.iconBtn, position: "relative" }}
        >
          <Icons.Cart size={24} color={styles.colors.text} />
          {cartItemCount > 0 && (
            <span style={styles.cartBadge}>{cartItemCount}</span>
          )}
        </button>
      </div>
    </header>
  );
}

export default Header;
