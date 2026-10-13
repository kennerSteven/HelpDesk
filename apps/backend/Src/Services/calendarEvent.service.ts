import CalendarE from "../Models/CalendarEvent";
import { CalendarEvent } from "@repo/schemas";
import { CalendarOnlyDate } from "@repo/schemas";
async function createCalendarEvent(data: CalendarEvent) {
  const calendar = await CalendarE.create(data);
  return calendar;
}

async function GetCalendarEvent() {
  const calendar = await CalendarE.find().populate({
    path: "taskId",
    populate: { path: "categoryId" },
  });
  return calendar;
}



export { GetCalendarEvent, createCalendarEvent };
