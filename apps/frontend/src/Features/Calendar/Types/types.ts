import type { TaskResponseType } from "@repo/schemas";

export interface CalendarEvent {
  id: string;
  title: string;
  date?: string;
  start?: string;
  end?: string;
  allDay?: boolean;
  category?: string;
  categoryName?: string;
  priority?: string;
  description?: string;
  status?: string;
}

export interface SelectedDateInfo {
  dateStr: string;
  dayName: string;
}

export type TypeCalendarIncludeDateBetween = Partial<TaskResponseType> & {
  calendarId: string;
  calendarDate: string;
  calendarTitle?: string;
  daysBetween: number;
  status?: string;
};