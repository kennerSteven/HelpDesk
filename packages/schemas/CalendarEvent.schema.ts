import { z } from "zod";
import { TaskResponseSchema } from "./Task.schema";

export const CalendarEvent = z.object({
  date: z.string().min(1, "La fecha es requerida"),
  title: z.string().min(1, "el titulo es requerido"),
  taskId: z.string().optional(),
});

export const CalendarResponseItemSchema = z.object({
  _id: z.string(),
  date: z.string(),
  title: z.string().optional(),
  taskId: TaskResponseSchema.optional(),
});

export type CalendarCompleteResponse = z.infer<
  typeof CalendarResponseItemSchema
>;
export type CalendarEvent = z.infer<typeof CalendarEvent>;
export type CalendarOnlyDate = z.infer<Pick<CalendarEvent, "date">>;
