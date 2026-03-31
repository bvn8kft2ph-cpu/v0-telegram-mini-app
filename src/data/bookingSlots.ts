// ═══════════════════════════════════════════════
// BOOKING SLOTS GENERATOR
// ═══════════════════════════════════════════════

import type { BookingDay, TimeSlot } from "../types";

const hebrewDayNames = ["א׳", "ב׳", "ג׳", "ד׳", "ה׳", "ו׳", "ש׳"];
const russianDayNames = ["Вс", "Пн", "Вт", "Ср", "Чт", "Пт", "Сб"];

const hebrewMonths = [
  "ינואר", "פברואר", "מרץ", "אפריל", "מאי", "יוני",
  "יולי", "אוגוסט", "ספטמבר", "אוקטובר", "נובמבר", "דצמבר"
];

const russianMonths = [
  "января", "февраля", "марта", "апреля", "мая", "июня",
  "июля", "августа", "сентября", "октября", "ноября", "декабря"
];

function generateTimeSlots(
  startHour: number,
  endHour: number,
  intervalMinutes: number,
  unavailabilityRate: number = 0.2
): TimeSlot[] {
  const slots: TimeSlot[] = [];
  
  for (let hour = startHour; hour < endHour; hour++) {
    for (let minute = 0; minute < 60; minute += intervalMinutes) {
      // Don't add slots that would end after closing time
      if (hour === endHour - 1 && minute + intervalMinutes > 60) continue;
      
      const time = `${hour.toString().padStart(2, "0")}:${minute.toString().padStart(2, "0")}`;
      const available = Math.random() > unavailabilityRate;
      slots.push({ time, available });
    }
  }
  
  return slots;
}

export function generateBookingDays(serviceDuration: number = 30): BookingDay[] {
  const days: BookingDay[] = [];
  const today = new Date();
  const intervalMinutes = serviceDuration >= 45 ? 60 : 30;
  
  for (let i = 1; i <= 14; i++) {
    const date = new Date(today);
    date.setDate(today.getDate() + i);
    
    const dayOfWeek = date.getDay(); // 0 = Sunday, 6 = Saturday
    const isSaturday = dayOfWeek === 6;
    const isFriday = dayOfWeek === 5;
    
    let slots: TimeSlot[] = [];
    
    if (isSaturday) {
      // Saturday - closed
      slots = [];
    } else if (isFriday) {
      // Friday - 09:00-14:00
      slots = generateTimeSlots(9, 14, intervalMinutes);
    } else {
      // Sunday-Thursday - 09:00-19:00
      slots = generateTimeSlots(9, 19, intervalMinutes);
    }
    
    days.push({
      date: date.toISOString().split("T")[0],
      dayName_he: hebrewDayNames[dayOfWeek],
      dayName_ru: russianDayNames[dayOfWeek],
      dayNumber: date.getDate(),
      month_he: hebrewMonths[date.getMonth()],
      month_ru: russianMonths[date.getMonth()],
      isToday: false,
      isTomorrow: i === 1,
      isClosed: isSaturday,
      slots,
    });
  }
  
  return days;
}

// Pre-generate slots for display (will be regenerated per service)
export const defaultBookingDays = generateBookingDays(30);
