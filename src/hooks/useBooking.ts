// ═══════════════════════════════════════════════
// SERVICE BOOKING HOOK
// ═══════════════════════════════════════════════

"use client";

import { useState, useCallback, useMemo, useEffect } from "react";
import type { Service, BookingDay, TimeSlot, ServiceBooking, BookingStep } from "../types";
import { generateBookingDays } from "../data/bookingSlots";

const STORAGE_KEY = "freger-bookings";

function loadBookings(): ServiceBooking[] {
  if (typeof window === "undefined") return [];
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    return saved ? JSON.parse(saved) : [];
  } catch {
    return [];
  }
}

function saveBookings(bookings: ServiceBooking[]): void {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(bookings));
  } catch {
    // Ignore storage errors
  }
}

export function useBooking() {
  // State
  const [selectedService, setSelectedService] = useState<Service | null>(null);
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [customerName, setCustomerName] = useState("");
  const [customerPhone, setCustomerPhone] = useState("");
  const [bookingStep, setBookingStep] = useState<BookingStep>("select-date");
  const [myBookings, setMyBookings] = useState<ServiceBooking[]>([]);
  const [mounted, setMounted] = useState(false);

  // Load bookings from localStorage
  useEffect(() => {
    setMyBookings(loadBookings());
    setMounted(true);
  }, []);

  // Save bookings to localStorage
  useEffect(() => {
    if (mounted) {
      saveBookings(myBookings);
    }
  }, [myBookings, mounted]);

  // Generate available days based on service duration
  const availableDays = useMemo<BookingDay[]>(() => {
    if (!selectedService) return [];
    return generateBookingDays(selectedService.duration);
  }, [selectedService]);

  // Get available slots for selected date
  const availableSlots = useMemo<TimeSlot[]>(() => {
    if (!selectedDate) return [];
    const day = availableDays.find((d) => d.date === selectedDate);
    return day?.slots || [];
  }, [selectedDate, availableDays]);

  // Get selected day info
  const selectedDay = useMemo<BookingDay | null>(() => {
    if (!selectedDate) return null;
    return availableDays.find((d) => d.date === selectedDate) || null;
  }, [selectedDate, availableDays]);

  // Actions
  const openBooking = useCallback((service: Service) => {
    setSelectedService(service);
    setSelectedDate(null);
    setSelectedTime(null);
    setCustomerName("");
    setCustomerPhone("");
    setBookingStep("select-date");
  }, []);

  const closeBooking = useCallback(() => {
    setSelectedService(null);
    setSelectedDate(null);
    setSelectedTime(null);
    setBookingStep("select-date");
  }, []);

  const selectDate = useCallback((date: string) => {
    setSelectedDate(date);
    setSelectedTime(null);
    setBookingStep("select-time");
  }, []);

  const selectTime = useCallback((time: string) => {
    setSelectedTime(time);
    setBookingStep("confirm");
  }, []);

  const goBackToDate = useCallback(() => {
    setSelectedTime(null);
    setBookingStep("select-date");
  }, []);

  const goBackToTime = useCallback(() => {
    setBookingStep("select-time");
  }, []);

  const confirmBooking = useCallback(() => {
    if (!selectedService || !selectedDate || !selectedTime || !customerName || !customerPhone) {
      return;
    }

    const newBooking: ServiceBooking = {
      id: `BK${Date.now()}`,
      serviceId: selectedService.id,
      serviceName_he: selectedService.name_he,
      serviceName_ru: selectedService.name_ru,
      date: selectedDate,
      time: selectedTime,
      status: "pending",
      customerName,
      customerPhone,
      createdAt: new Date().toISOString(),
    };

    setMyBookings((prev) => [newBooking, ...prev]);
    setBookingStep("success");
  }, [selectedService, selectedDate, selectedTime, customerName, customerPhone]);

  const resetBooking = useCallback(() => {
    setSelectedDate(null);
    setSelectedTime(null);
    setCustomerName("");
    setCustomerPhone("");
    setBookingStep("select-date");
  }, []);

  const cancelBooking = useCallback((bookingId: string) => {
    setMyBookings((prev) =>
      prev.map((b) =>
        b.id === bookingId ? { ...b, status: "cancelled" as const } : b
      )
    );
  }, []);

  // Get upcoming bookings (not cancelled, future dates)
  const upcomingBookings = useMemo(() => {
    const today = new Date().toISOString().split("T")[0];
    return myBookings
      .filter((b) => b.status !== "cancelled" && b.date >= today)
      .sort((a, b) => a.date.localeCompare(b.date) || a.time.localeCompare(b.time));
  }, [myBookings]);

  return {
    // State
    selectedService,
    selectedDate,
    selectedTime,
    customerName,
    setCustomerName,
    customerPhone,
    setCustomerPhone,
    bookingStep,
    availableDays,
    availableSlots,
    selectedDay,
    myBookings,
    upcomingBookings,
    mounted,
    // Actions
    openBooking,
    closeBooking,
    selectDate,
    selectTime,
    goBackToDate,
    goBackToTime,
    confirmBooking,
    resetBooking,
    cancelBooking,
  };
}
