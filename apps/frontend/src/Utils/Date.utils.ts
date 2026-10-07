/**
 * Date utility functions for date formatting, preset calculations,
 * and localized display strings.
 */

/**
 * Formats a Date object to YYYY-MM-DD in local time
 */
export const formatLocalDate = (date: Date): string => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
};

/**
 * Returns today's date formatted as YYYY-MM-DD
 */
export const getTodayString = (): string => formatLocalDate(new Date());

/**
 * Returns tomorrow's date formatted as YYYY-MM-DD
 */
export const getTomorrowString = (): string => {
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  return formatLocalDate(tomorrow);
};

/**
 * Formats a date string (YYYY-MM-DD) or Date object into a readable Spanish header
 * e.g., "Miércoles, 16 de Septiembre"
 */
export const formatSpanishDate = (dateInput: string | Date): string => {
  let date: Date;
  if (typeof dateInput === "string") {
    const parts = dateInput.split("-");
    if (parts.length === 3) {
      date = new Date(Number(parts[0]), Number(parts[1]) - 1, Number(parts[2]));
    } else {
      date = new Date(dateInput);
    }
  } else {
    date = dateInput;
  }

  const formatted = date.toLocaleDateString("es-ES", {
    weekday: "long",
    day: "numeric",
    month: "long",
  });

  return formatted.charAt(0).toUpperCase() + formatted.slice(1);
};

/**
 * Checks if a date string is today
 */
export const isDateToday = (dateStr?: string): boolean => {
  if (!dateStr) return false;
  return dateStr.startsWith(getTodayString());
};
