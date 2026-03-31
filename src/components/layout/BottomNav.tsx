"use client";

import React from "react";
import { useApp } from "../../context/AppContext";
import { useStyles } from "../../hooks/useStyles";
import { Icons } from "../icons";
import type { Section } from "../../types";

const navItems: { id: Section; Icon: typeof Icons.Catalog }[] = [
  { id: "catalog", Icon: Icons.Catalog },
  { id: "services", Icon: Icons.Services },
  { id: "brand", Icon: Icons.Brand },
  { id: "profile", Icon: Icons.Profile },
];

export function BottomNav() {
  const { 
    theme, lang, t,
    activeSection, setActiveSection 
  } = useApp();
  
  const styles = useStyles(theme, lang);
  
  const navLabels: Record<Section, string> = {
    catalog: t.navCatalog,
    services: t.navServices,
    brand: t.navBrand,
    profile: t.navProfile,
  };

  return (
    <nav style={styles.nav}>
      {navItems.map(({ id, Icon }) => {
        const active = activeSection === id;
        return (
          <button
            key={id}
            onClick={() => setActiveSection(id)}
            style={styles.navItem(active)}
          >
            <Icon 
              size={22} 
              color={active ? "#FFF" : styles.colors.textSecondary} 
              filled={active} 
            />
            <span>{navLabels[id]}</span>
          </button>
        );
      })}
    </nav>
  );
}

export default BottomNav;
