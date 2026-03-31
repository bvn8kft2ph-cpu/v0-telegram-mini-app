"use client";

import { useState, useCallback, useMemo } from "react";
import { products } from "../data/products";
import type { Product } from "../types";

export function useProducts() {
  const [selectedBrand, setSelectedBrand] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const handleBrandSelect = useCallback((brand: string | null) => {
    setSelectedBrand(brand);
    setSelectedCategory(null); // Reset category when brand changes
  }, []);

  const handleCategorySelect = useCallback((category: string | null) => {
    setSelectedCategory(category);
  }, []);

  // Available categories based on selected brand
  const availableCategories = useMemo(() => {
    const filtered = selectedBrand
      ? products.filter((p) => p.brand === selectedBrand)
      : products;

    const categories = new Set(filtered.map((p) => p.category));
    return Array.from(categories);
  }, [selectedBrand]);

  // Filtered products
  const filteredProducts = useMemo(() => {
    let result = products;

    if (selectedBrand) {
      result = result.filter((p) => p.brand === selectedBrand);
    }

    if (selectedCategory) {
      result = result.filter((p) => p.category === selectedCategory);
    }

    return result;
  }, [selectedBrand, selectedCategory]);

  // Featured products
  const featuredProducts = useMemo(() => {
    return products.filter((p) => p.featured);
  }, []);

  // All brands
  const allBrands = useMemo(() => {
    return Array.from(new Set(products.map((p) => p.brand)));
  }, []);

  return {
    products,
    selectedBrand,
    setSelectedBrand: handleBrandSelect,
    selectedCategory,
    setSelectedCategory: handleCategorySelect,
    filteredProducts,
    availableCategories,
    featuredProducts,
    allBrands,
  };
}
