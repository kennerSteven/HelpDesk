import CalendarE from "../Models/CalendarEvent";
import { CalendarEvent } from "@repo/schemas";

async function createCalendarEvent(data: CalendarEvent) {
    const calendar = await CalendarE.create(data);
    return calendar;
}


async function GetCalendarEvent() {
    const calendar = await CalendarE.find()

    return calendar;
}


export { GetCalendarEvent, createCalendarEvent }