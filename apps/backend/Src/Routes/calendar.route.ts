import { Router } from "express";

import Validate from "../Middleware/Validate.middleware";
import { CalendarEvent } from "@repo/schemas";
import { CreateCalendarController, GetAllCaalendar } from "../Controllers/Calendar.controller";

const route = Router();

route.post("/createCalendar", Validate(CalendarEvent), CreateCalendarController);
route.get("/getCalendar", GetAllCaalendar);
export default route;
