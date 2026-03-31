"use client";

import { useState, useCallback, useEffect } from "react";
import type { Section } from "../types";

export function useNavigation() {
  const [activeSection, setActiveSectionState] = useState<Section>("catalog");
  const [animateIn, setAnimateIn] = useState(true);

  const setActiveSection = useCallback((section: Section) => {
    setAnimateIn(false);
    // Small delay for exit animation
    setTimeout(() => {
      setActiveSectionState(section);
      setAnimateIn(true);
    }, 150);
  }, []);

  // Reset animation on mount
  useEffect(() => {
    setAnimateIn(true);
  }, []);

  return {
    activeSection,
    setActiveSection,
    animateIn,
  };
}
