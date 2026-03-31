"use client";

import React, { useRef, useEffect } from "react";
import { Icons } from "../icons";
import type { Service, BookingDay, TimeSlot, BookingStep } from "../../types";
import type { Translations } from "../../i18n/he";
import type { Lang } from "../../types";

interface BookingModalProps {
  styles: ReturnType<typeof import("../../hooks/useStyles").useStyles>;
  t: Translations;
  lang: Lang;
  c: ReturnType<typeof import("../../hooks/useStyles").useStyles>["colors"];
  isRTL: boolean;
  // Booking state
  service: Service;
  bookingStep: BookingStep;
  availableDays: BookingDay[];
  availableSlots: TimeSlot[];
  selectedDate: string | null;
  selectedDay: BookingDay | null;
  selectedTime: string | null;
  customerName: string;
  customerPhone: string;
  // Actions
  onClose: () => void;
  onSelectDate: (date: string) => void;
  onSelectTime: (time: string) => void;
  onConfirm: () => void;
  onReset: () => void;
  onGoBackToDate: () => void;
  onGoBackToTime: () => void;
  setCustomerName: (name: string) => void;
  setCustomerPhone: (phone: string) => void;
  onBackToServices: () => void;
}

const WHATSAPP_NUMBER = "972501234567"; // Replace with actual number

export function BookingModal({
  styles,
  t,
  lang,
  c,
  isRTL,
  service,
  bookingStep,
  availableDays,
  availableSlots,
  selectedDate,
  selectedDay,
  selectedTime,
  customerName,
  customerPhone,
  onClose,
  onSelectDate,
  onSelectTime,
  onConfirm,
  onReset,
  onGoBackToDate,
  onGoBackToTime,
  setCustomerName,
  setCustomerPhone,
  onBackToServices,
}: BookingModalProps) {
  const dateScrollRef = useRef<HTMLDivElement>(null);

  // Scroll to first available day on mount
  useEffect(() => {
    if (dateScrollRef.current && bookingStep === "select-date") {
      const firstAvailable = availableDays.findIndex((d) => !d.isClosed && d.slots.length > 0);
      if (firstAvailable > 0) {
        const scrollAmount = firstAvailable * 76; // 68px width + 8px gap
        dateScrollRef.current.scrollLeft = isRTL ? -scrollAmount : scrollAmount;
      }
    }
  }, [availableDays, bookingStep, isRTL]);

  const serviceName = lang === "he" ? service.name_he : service.name_ru;

  const formatDateLong = (day: BookingDay) => {
    if (lang === "he") {
      return `${day.dayNumber} ב${day.month_he}`;
    }
    return `${day.dayNumber} ${day.month_ru}`;
  };

  const getWhatsAppUrl = () => {
    const dateStr = selectedDay ? formatDateLong(selectedDay) : selectedDate;
    const message = lang === "he"
      ? `שלום, אני רוצה לאשר תור ל${serviceName} בתאריך ${dateStr} בשעה ${selectedTime}`
      : `Здравствуйте, хочу записаться на ${serviceName} на ${dateStr} в ${selectedTime}`;
    return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
  };

  const modalStyles = {
    overlay: {
      position: "fixed" as const,
      inset: 0,
      backgroundColor: "rgba(0, 0, 0, 0.6)",
      zIndex: 200,
      display: "flex",
      alignItems: "flex-end",
      justifyContent: "center",
      animation: "fadeIn 0.3s ease",
    },
    modal: {
      width: "100%",
      maxWidth: 430,
      maxHeight: "95vh",
      backgroundColor: c.bg,
      borderTopLeftRadius: 28,
      borderTopRightRadius: 28,
      overflow: "hidden",
      display: "flex",
      flexDirection: "column" as const,
      animation: "slideUp 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
    },
    header: {
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      padding: "20px 24px",
      borderBottom: `1px solid ${c.border}`,
      backgroundColor: c.cardSolid,
    },
    backBtn: {
      display: "flex",
      alignItems: "center",
      gap: 8,
      background: "none",
      border: "none",
      cursor: "pointer",
      padding: 8,
      marginInlineStart: -8,
    },
    content: {
      flex: 1,
      overflowY: "auto" as const,
      padding: "0 24px 24px",
    },
    serviceHeader: {
      background: service.gradient,
      padding: "24px 20px",
      margin: "0 -24px 24px",
      color: "#1F1A16",
    },
    serviceTitle: {
      fontSize: 24,
      fontWeight: 600,
      fontFamily: "'Cormorant Garamond', serif",
      marginBottom: 8,
    },
    serviceMeta: {
      display: "flex",
      alignItems: "center",
      gap: 16,
      fontSize: 14,
      fontFamily: "'Heebo', sans-serif",
      opacity: 0.8,
    },
    stepTitle: {
      fontSize: 18,
      fontWeight: 600,
      fontFamily: "'Cormorant Garamond', serif",
      color: c.accent,
      marginBottom: 20,
    },
    // Date picker
    dateScroller: {
      display: "flex",
      gap: 8,
      overflowX: "auto" as const,
      padding: "4px 0 16px",
      scrollSnapType: "x mandatory",
      WebkitOverflowScrolling: "touch" as const,
      msOverflowStyle: "none" as const,
      scrollbarWidth: "none" as const,
    },
    datePill: (active: boolean, closed: boolean) => ({
      minWidth: 68,
      padding: "12px 8px",
      borderRadius: 16,
      backgroundColor: closed
        ? c.bgTertiary
        : active
        ? c.accent
        : c.cardSolid,
      border: closed ? "none" : `1.5px solid ${active ? c.accent : c.borderStrong}`,
      cursor: closed ? "not-allowed" : "pointer",
      textAlign: "center" as const,
      scrollSnapAlign: "center" as const,
      opacity: closed ? 0.5 : 1,
      transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
    }),
    datePillDay: (active: boolean, closed: boolean) => ({
      fontSize: 12,
      fontWeight: 500,
      fontFamily: "'Heebo', sans-serif",
      color: closed ? c.textMuted : active ? "#FFF" : c.textSecondary,
      textDecoration: closed ? "line-through" : "none",
      marginBottom: 4,
    }),
    datePillNumber: (active: boolean, closed: boolean) => ({
      fontSize: 20,
      fontWeight: 600,
      fontFamily: "'Inter', sans-serif",
      color: closed ? c.textMuted : active ? "#FFF" : c.text,
    }),
    datePillLabel: {
      fontSize: 10,
      fontWeight: 500,
      fontFamily: "'Heebo', sans-serif",
      color: c.accent,
      marginBottom: 4,
    },
    // Time slots
    timeGrid: {
      display: "grid",
      gridTemplateColumns: "repeat(3, 1fr)",
      gap: 10,
    },
    timeSlot: (active: boolean, available: boolean, index: number) => ({
      padding: "16px 12px",
      borderRadius: 14,
      backgroundColor: !available
        ? c.bgTertiary
        : active
        ? c.accent
        : "transparent",
      border: !available
        ? "none"
        : `1.5px solid ${active ? c.accent : c.borderStrong}`,
      cursor: available ? "pointer" : "not-allowed",
      textAlign: "center" as const,
      fontSize: 15,
      fontWeight: 500,
      fontFamily: "'Inter', sans-serif",
      color: !available ? c.textMuted : active ? "#FFF" : c.text,
      opacity: available ? 1 : 0.5,
      transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
      animation: `scaleIn 0.3s ease ${index * 0.03}s both`,
    }),
    // Confirm step
    summaryCard: {
      backgroundColor: c.cardSolid,
      borderRadius: 20,
      overflow: "hidden",
      marginBottom: 24,
      border: `1px solid ${c.border}`,
    },
    summaryGradient: {
      height: 6,
      background: service.gradient,
    },
    summaryContent: {
      padding: 20,
    },
    summaryRow: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      padding: "12px 0",
      borderBottom: `1px solid ${c.border}`,
    },
    summaryLabel: {
      fontSize: 14,
      color: c.textSecondary,
      fontFamily: "'Heebo', sans-serif",
    },
    summaryValue: {
      fontSize: 15,
      fontWeight: 500,
      color: c.text,
      fontFamily: "'Heebo', sans-serif",
    },
    inputGroup: {
      marginBottom: 16,
    },
    inputLabel: {
      fontSize: 13,
      fontWeight: 500,
      fontFamily: "'Heebo', sans-serif",
      color: c.textSecondary,
      marginBottom: 8,
      display: "block",
    },
    input: {
      width: "100%",
      padding: "16px 18px",
      borderRadius: 14,
      backgroundColor: c.bgSecondary,
      border: `1px solid ${c.borderStrong}`,
      fontSize: 15,
      fontFamily: "'Heebo', sans-serif",
      color: c.text,
      outline: "none",
    },
    confirmBtn: (enabled: boolean) => ({
      width: "100%",
      padding: "18px 24px",
      borderRadius: 16,
      backgroundColor: enabled ? c.accent : c.bgTertiary,
      color: enabled ? "#FFF" : c.textMuted,
      border: "none",
      cursor: enabled ? "pointer" : "not-allowed",
      fontSize: 16,
      fontWeight: 600,
      fontFamily: "'Heebo', sans-serif",
      transition: "all 0.3s ease",
    }),
    disclaimer: {
      fontSize: 12,
      color: c.textMuted,
      fontFamily: "'Heebo', sans-serif",
      textAlign: "center" as const,
      marginTop: 16,
    },
    // Success step
    successIcon: {
      width: 80,
      height: 80,
      borderRadius: 40,
      backgroundColor: "#22C55E20",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      margin: "24px auto",
    },
    successTitle: {
      fontSize: 28,
      fontWeight: 600,
      fontFamily: "'Cormorant Garamond', serif",
      color: c.text,
      textAlign: "center" as const,
      marginBottom: 8,
    },
    successDesc: {
      fontSize: 14,
      color: c.textSecondary,
      fontFamily: "'Heebo', sans-serif",
      textAlign: "center" as const,
      marginBottom: 32,
    },
    whatsappBtn: {
      width: "100%",
      padding: "18px 24px",
      borderRadius: 16,
      backgroundColor: "#25D366",
      color: "#FFF",
      border: "none",
      cursor: "pointer",
      fontSize: 16,
      fontWeight: 600,
      fontFamily: "'Heebo', sans-serif",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      gap: 10,
      marginBottom: 12,
    },
    secondaryBtn: {
      width: "100%",
      padding: "16px 24px",
      borderRadius: 16,
      backgroundColor: "transparent",
      color: c.textSecondary,
      border: `1px solid ${c.borderStrong}`,
      cursor: "pointer",
      fontSize: 14,
      fontFamily: "'Heebo', sans-serif",
      marginBottom: 8,
    },
  };

  const renderDatePicker = () => (
    <>
      <h3 style={modalStyles.stepTitle}>{t.selectDate}</h3>
      <div ref={dateScrollRef} style={modalStyles.dateScroller}>
        {availableDays.map((day) => (
          <div
            key={day.date}
            style={modalStyles.datePill(selectedDate === day.date, day.isClosed)}
            onClick={() => !day.isClosed && day.slots.length > 0 && onSelectDate(day.date)}
          >
            {day.isTomorrow && (
              <div style={modalStyles.datePillLabel}>{t.tomorrow}</div>
            )}
            <div style={modalStyles.datePillDay(selectedDate === day.date, day.isClosed)}>
              {lang === "he" ? day.dayName_he : day.dayName_ru}
            </div>
            <div style={modalStyles.datePillNumber(selectedDate === day.date, day.isClosed)}>
              {day.isClosed ? "—" : day.dayNumber}
            </div>
          </div>
        ))}
      </div>
    </>
  );

  const renderTimeSlots = () => (
    <>
      <h3 style={modalStyles.stepTitle}>
        {t.selectTime} — {selectedDay && formatDateLong(selectedDay)}
      </h3>
      {availableSlots.length === 0 ? (
        <div style={{ textAlign: "center", padding: 40, color: c.textMuted }}>
          {t.noSlotsAvailable}
        </div>
      ) : (
        <div style={modalStyles.timeGrid}>
          {availableSlots.map((slot, index) => (
            <div
              key={slot.time}
              style={modalStyles.timeSlot(
                selectedTime === slot.time,
                slot.available,
                index
              )}
              onClick={() => slot.available && onSelectTime(slot.time)}
            >
              {slot.time}
              {selectedTime === slot.time && (
                <span style={{ marginInlineStart: 6 }}>
                  <Icons.Check size={14} color="#FFF" />
                </span>
              )}
            </div>
          ))}
        </div>
      )}
    </>
  );

  const renderConfirm = () => {
    const isValid = customerName.trim().length >= 2 && customerPhone.trim().length >= 9;

    return (
      <>
        <div style={modalStyles.summaryCard}>
          <div style={modalStyles.summaryGradient} />
          <div style={modalStyles.summaryContent}>
            <h3 style={{ ...modalStyles.stepTitle, marginBottom: 16 }}>{serviceName}</h3>
            <div style={modalStyles.summaryRow}>
              <span style={modalStyles.summaryLabel}>{t.selectDate}</span>
              <span style={modalStyles.summaryValue}>
                {selectedDay && formatDateLong(selectedDay)}
              </span>
            </div>
            <div style={modalStyles.summaryRow}>
              <span style={modalStyles.summaryLabel}>{t.selectTime}</span>
              <span style={modalStyles.summaryValue}>{selectedTime}</span>
            </div>
            <div style={modalStyles.summaryRow}>
              <span style={modalStyles.summaryLabel}>{t.duration}</span>
              <span style={modalStyles.summaryValue}>{service.duration} {lang === "he" ? "דק׳" : "мин"}</span>
            </div>
            <div style={{ ...modalStyles.summaryRow, borderBottom: "none" }}>
              <span style={modalStyles.summaryLabel}>{t.total}</span>
              <span style={{ ...modalStyles.summaryValue, color: c.accent, fontWeight: 600 }}>
                {"\u20AA"}{service.price}
              </span>
            </div>
          </div>
        </div>

        <div style={modalStyles.inputGroup}>
          <label style={modalStyles.inputLabel}>{t.yourName} *</label>
          <input
            type="text"
            style={modalStyles.input}
            value={customerName}
            onChange={(e) => setCustomerName(e.target.value)}
            placeholder={lang === "he" ? "השם שלך" : "Ваше имя"}
          />
        </div>

        <div style={modalStyles.inputGroup}>
          <label style={modalStyles.inputLabel}>{t.yourPhone} *</label>
          <input
            type="tel"
            style={modalStyles.input}
            value={customerPhone}
            onChange={(e) => setCustomerPhone(e.target.value)}
            placeholder="05X-XXX-XXXX"
          />
        </div>

        <button
          style={modalStyles.confirmBtn(isValid)}
          onClick={onConfirm}
          disabled={!isValid}
        >
          {t.confirmBooking}
        </button>

        <p style={modalStyles.disclaimer}>{t.bookingPending}</p>
      </>
    );
  };

  const renderSuccess = () => (
    <div style={{ textAlign: "center" }}>
      <div style={modalStyles.successIcon}>
        <Icons.Check size={40} color="#22C55E" />
      </div>
      <h2 style={modalStyles.successTitle}>{t.bookingConfirmed}</h2>
      <p style={modalStyles.successDesc}>{t.bookingConfirmedDesc}</p>

      <div style={{ ...modalStyles.summaryCard, marginBottom: 24 }}>
        <div style={modalStyles.summaryGradient} />
        <div style={modalStyles.summaryContent}>
          <div style={{ ...modalStyles.summaryRow, paddingTop: 4 }}>
            <span style={modalStyles.summaryLabel}>{serviceName}</span>
            <span style={modalStyles.summaryValue}>{"\u20AA"}{service.price}</span>
          </div>
          <div style={modalStyles.summaryRow}>
            <span style={modalStyles.summaryLabel}>{t.selectDate}</span>
            <span style={modalStyles.summaryValue}>
              {selectedDay && formatDateLong(selectedDay)}
            </span>
          </div>
          <div style={{ ...modalStyles.summaryRow, borderBottom: "none" }}>
            <span style={modalStyles.summaryLabel}>{t.selectTime}</span>
            <span style={modalStyles.summaryValue}>{selectedTime}</span>
          </div>
        </div>
      </div>

      <a
        href={getWhatsAppUrl()}
        target="_blank"
        rel="noopener noreferrer"
        style={{ textDecoration: "none" }}
      >
        <button style={modalStyles.whatsappBtn}>
          <Icons.WhatsApp size={20} color="#FFF" />
          {t.whatsappConfirm}
        </button>
      </a>

      <button style={modalStyles.secondaryBtn} onClick={onReset}>
        {t.bookAnother}
      </button>

      <button style={modalStyles.secondaryBtn} onClick={onBackToServices}>
        {t.backToServices}
      </button>
    </div>
  );

  const getBackAction = () => {
    switch (bookingStep) {
      case "select-date":
        return onClose;
      case "select-time":
        return onGoBackToDate;
      case "confirm":
        return onGoBackToTime;
      case "success":
        return onClose;
      default:
        return onClose;
    }
  };

  return (
    <div style={modalStyles.overlay} onClick={onClose}>
      <div style={modalStyles.modal} onClick={(e) => e.stopPropagation()}>
        {/* Header */}
        <div style={modalStyles.header}>
          <button style={modalStyles.backBtn} onClick={getBackAction()}>
            <Icons.ArrowLeft size={20} color={c.text} />
            <span style={{ fontSize: 14, color: c.textSecondary, fontFamily: "'Heebo', sans-serif" }}>
              {t.back}
            </span>
          </button>
          <button
            style={{ background: "none", border: "none", cursor: "pointer", padding: 8 }}
            onClick={onClose}
          >
            <Icons.Close size={24} color={c.text} />
          </button>
        </div>

        {/* Content */}
        <div style={modalStyles.content}>
          {/* Service Header */}
          {bookingStep !== "success" && (
            <div style={modalStyles.serviceHeader}>
              <h2 style={modalStyles.serviceTitle}>{serviceName}</h2>
              <div style={modalStyles.serviceMeta}>
                <span style={{ display: "flex", alignItems: "center", gap: 6 }}>
                  <Icons.Clock size={15} color="rgba(31, 26, 22, 0.7)" />
                  {service.duration} {t.duration}
                </span>
                <span style={{ fontWeight: 600 }}>{"\u20AA"}{service.price}</span>
              </div>
            </div>
          )}

          {/* Step Content */}
          {bookingStep === "select-date" && renderDatePicker()}
          {bookingStep === "select-time" && renderTimeSlots()}
          {bookingStep === "confirm" && renderConfirm()}
          {bookingStep === "success" && renderSuccess()}
        </div>
      </div>
    </div>
  );
}
