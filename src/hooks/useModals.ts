"use client";

import { useState, useCallback } from "react";
import type { Product, Order } from "../types";

export function useModals() {
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [showCart, setShowCart] = useState(false);
  const [showCheckout, setShowCheckout] = useState(false);
  const [expandedOrders, setExpandedOrders] = useState(false);
  const [expandedFavorites, setExpandedFavorites] = useState(false);

  // Product modal
  const openProduct = useCallback((product: Product) => {
    setSelectedProduct(product);
  }, []);

  const closeProduct = useCallback(() => {
    setSelectedProduct(null);
  }, []);

  // Order modal
  const openOrder = useCallback((order: Order) => {
    setSelectedOrder(order);
  }, []);

  const closeOrder = useCallback(() => {
    setSelectedOrder(null);
  }, []);

  // Cart modal
  const openCart = useCallback(() => {
    setShowCart(true);
    setShowCheckout(false);
  }, []);

  const closeCart = useCallback(() => {
    setShowCart(false);
    setShowCheckout(false);
  }, []);

  // Checkout modal
  const openCheckout = useCallback(() => {
    setShowCheckout(true);
  }, []);

  const closeCheckout = useCallback(() => {
    setShowCheckout(false);
  }, []);

  // Toggle expandables
  const toggleExpandedOrders = useCallback(() => {
    setExpandedOrders((prev) => !prev);
  }, []);

  const toggleExpandedFavorites = useCallback(() => {
    setExpandedFavorites((prev) => !prev);
  }, []);

  return {
    // State
    selectedProduct,
    selectedOrder,
    showCart,
    showCheckout,
    expandedOrders,
    expandedFavorites,
    // Actions
    openProduct,
    closeProduct,
    openOrder,
    closeOrder,
    openCart,
    closeCart,
    openCheckout,
    closeCheckout,
    toggleExpandedOrders,
    toggleExpandedFavorites,
    setExpandedOrders,
    setExpandedFavorites,
  };
}
