// ═══════════════════════════════════════════════
// FREGER COSMETICS — MODULAR EXPORTS
// All types, components, hooks and utilities
// ═══════════════════════════════════════════════

// Types
export * from "./types";

// Theme
export { tokens, brandGradients, FONT_HEADING, FONT_BODY, FONT_MONO } from "./theme";
export type { TokenColors, BrandName } from "./theme";

// i18n
export { he, ru, i18n, getTranslations } from "./i18n";
export type { Translations } from "./i18n";

// Data
export { products, services, orders } from "./data";

// Icons
export { Icons } from "./components/icons";
export * from "./components/icons";

// Context & Hooks
export { AppProvider, useApp } from "./context";
export { useStyles } from "./hooks";

// Layout Components
export { Header, BottomNav } from "./components/layout";
