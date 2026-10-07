import { z } from "zod";

export const CalendarEvent = z.object({
    date: z.string().min(1, "La fecha es requerida"),
     title: z.string().min(1, "el titulo es requerido"),
    taskId: z.string().optional(),
});

export type CalendarEvent = z.infer<typeof CalendarEvent>;
