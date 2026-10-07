import axios from "axios";
import type { CalendarEvent } from "@repo/schemas";

const API_URL = "http://localhost:3000/api/calendar/createCalendar";

export async function createCalendar(data: CalendarEvent) {
  const response = await axios.post(API_URL, data);

  return response.data;
}

const API_URL_GET = "http://localhost:3000/api/calendar/getCalendar";

export async function getCalendar() {
  const response = await axios.get(API_URL_GET);

  return response.data;
}
