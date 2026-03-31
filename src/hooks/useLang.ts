"use client";

import { useState, useEffect, useCallback, useMemo } from "react";
import type { Lang } from "../types";
import { i18n } from "../i18n";

export function useLang() {
  const [lang, setLang] = useState<Lang>("ru");
  const [mounted, setMounted] = useState(false);

  // Load from localStorage on mount
  useEffect(() => {
    setMounted(true);
    const saved = localStorage.getItem("freger-lang") as Lang | null;
    if (saved && (saved === "he" || saved === "ru")) {
      setLang(saved);
    }
  }, []);

  // Persist to localStorage
  useEffect(() => {
    if (mounted) {
      localStorage.setItem("freger-lang", lang);
    }
  }, [lang, mounted]);

  const toggleLang = useCallback(() => {
    setLang((prev) => (prev === "he" ? "ru" : "he"));
  }, []);

  const t = useMemo(() => i18n[lang], [lang]);
  const isRTL = lang === "he";

  return {
    lang,
    setLang,
    toggleLang,
    t,
    isRTL,
    mounted,
  };
}
