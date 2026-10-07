import { apiClient } from "../../../Config/axios";
import type { CalendarEvent } from "@repo/schemas";

export async function createCalendar(data: CalendarEvent) {
  const response = await apiClient.post("/calendar/createCalendar", data);
  return response.data;
}

export async function getCalendar() {
  const response = await apiClient.get("/calendar/getCalendar");
  return response.data;
}
