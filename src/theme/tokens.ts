// ═══════════════════════════════════════════════
// DESIGN TOKENS - Enhanced contrast & warmth
// ═══════════════════════════════════════════════

export const tokens = {
  light: {
    bg: "#FFFBF7",
    bgSecondary: "#F7F0E8",
    bgTertiary: "#EDE4D9",
    text: "#1F1A16",
    textSecondary: "#5C524A",
    textMuted: "#8B8078",
    accent: "#9C7B5C", // Rich warm bronze
    accentLight: "#C4A882",
    accentDark: "#7A5D42",
    card: "rgba(255, 255, 255, 0.95)",
    cardSolid: "#FFFFFF",
    cardElevated: "#FFFFFF",
    glass: "rgba(255, 251, 247, 0.92)",
    border: "rgba(31, 26, 22, 0.06)",
    borderStrong: "rgba(31, 26, 22, 0.12)",
    shadow: "0 4px 24px rgba(31, 26, 22, 0.08)",
    shadowDeep: "0 12px 48px rgba(31, 26, 22, 0.12)",
    shadowGlow: "0 0 60px rgba(156, 123, 92, 0.15)",
  },
  dark: {
    bg: "#0F0D0B",
    bgSecondary: "#1A1714",
    bgTertiary: "#252220",
    text: "#F5F0EB",
    textSecondary: "#B8AFA5",
    textMuted: "#6B635A",
    accent: "#C9A87C",
    accentLight: "#E0C9A3",
    accentDark: "#A08560",
    card: "rgba(37, 34, 32, 0.95)",
    cardSolid: "#1F1C19",
    cardElevated: "#2A2723",
    glass: "rgba(15, 13, 11, 0.95)",
    border: "rgba(245, 240, 235, 0.06)",
    borderStrong: "rgba(245, 240, 235, 0.12)",
    shadow: "0 4px 24px rgba(0, 0, 0, 0.3)",
    shadowDeep: "0 12px 48px rgba(0, 0, 0, 0.5)",
    shadowGlow: "0 0 60px rgba(201, 168, 124, 0.1)",
  },
};

export type TokenColors = typeof tokens.light;
