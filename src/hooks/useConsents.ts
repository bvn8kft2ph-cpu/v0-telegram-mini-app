"use client";

import { useState, useEffect, useCallback } from "react";
import type { Consents } from "../types";

const defaultConsents: Consents = {
  orders: true,
  procedures: true,
  marketing: false,
  photos: false,
};

export function useConsents() {
  const [consents, setConsents] = useState<Consents>(defaultConsents);
  const [mounted, setMounted] = useState(false);

  // Load from localStorage on mount
  useEffect(() => {
    setMounted(true);
    const saved = localStorage.getItem("freger-consents");
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (typeof parsed === "object" && parsed !== null) {
          setConsents({ ...defaultConsents, ...parsed });
        }
      } catch {
        // Invalid JSON, use default
      }
    }
  }, []);

  // Persist to localStorage
  useEffect(() => {
    if (mounted) {
      localStorage.setItem("freger-consents", JSON.stringify(consents));
    }
  }, [consents, mounted]);

  const toggleConsent = useCallback((key: keyof Consents) => {
    setConsents((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  }, []);

  const setConsent = useCallback((key: keyof Consents, value: boolean) => {
    setConsents((prev) => ({
      ...prev,
      [key]: value,
    }));
  }, []);

  return {
    consents,
    setConsents,
    toggleConsent,
    setConsent,
  };
}
