import {
  createCalendarEvent,
  GetCalendarEvent,
} from "../Services/calendarEvent.service";
import { Request, Response } from "express";

export async function CreateCalendarController(req: Request, res: Response) {
  try {
    const calendar = await createCalendarEvent(req.body);
    res
      .status(201)
      .json({ message: "Calendario creado con exito", info: calendar });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error al crear calendario", error: error });
  }
}

export async function GetAllCaalendar(__: any, res: Response) {
  try {
    const calendar = await GetCalendarEvent();

    // if (calendar.length === 0) {
    //   throw new Error("Sin calendario de eventos");
    //   return;
    // }
    return res.status(200).json(calendar);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error al cargar calendarios", error: error });
  }
}
