"use client";

import { useState, useEffect, useCallback } from "react";

export function useFavorites() {
  const [favorites, setFavorites] = useState<number[]>([]);
  const [mounted, setMounted] = useState(false);

  // Load from localStorage on mount
  useEffect(() => {
    setMounted(true);
    const saved = localStorage.getItem("freger-favorites");
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed)) {
          setFavorites(parsed);
        }
      } catch {
        // Invalid JSON, use default
      }
    }
  }, []);

  // Persist to localStorage
  useEffect(() => {
    if (mounted) {
      localStorage.setItem("freger-favorites", JSON.stringify(favorites));
    }
  }, [favorites, mounted]);

  const toggleFavorite = useCallback((productId: number) => {
    setFavorites((prev) => {
      if (prev.includes(productId)) {
        return prev.filter((id) => id !== productId);
      }
      return [...prev, productId];
    });
  }, []);

  const isFavorite = useCallback(
    (productId: number) => {
      return favorites.includes(productId);
    },
    [favorites]
  );

  const addFavorite = useCallback((productId: number) => {
    setFavorites((prev) => {
      if (prev.includes(productId)) return prev;
      return [...prev, productId];
    });
  }, []);

  const removeFavorite = useCallback((productId: number) => {
    setFavorites((prev) => prev.filter((id) => id !== productId));
  }, []);

  return {
    favorites,
    setFavorites,
    toggleFavorite,
    isFavorite,
    addFavorite,
    removeFavorite,
  };
}
