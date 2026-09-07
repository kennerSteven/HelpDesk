import { z } from "zod";

export const CreateTaskSchema = z.object({
  id: z.string().uuid().optional(),
  name: z.string().min(1, "El nombre es obligatorio"),
  description: z.string().optional(),
  dateInit: z.string().min(1, "La fecha de inicio es obligatoria"),
  dateFinish: z.string().min(1, "La fecha de fin es obligatoria"),
  photo: z.string().optional(),
  priority: z.string().min(1, "Seleccione una prioridad"),

  category: z.string().min(1, "La categoría es obligatoria"),
});