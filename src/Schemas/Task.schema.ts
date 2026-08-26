import { z } from "zod";

export const CreateTaskSchema = z.object({
  name: z.string().min(1, "El nombre es obligatorio"),
  description: z.string().optional(),
  dateInit: z.string().min(1, "La fecha de inicio es obligatoria"),
  dateFinish: z.string().min(1, "La fecha de fin es obligatoria"),
  photo: z.string().optional(),
  priority: z.string().min(1, "Seleccione una prioridad"),
  status: z.string().min(1, "Seleccione un estado"),
  category: z.string().min(1, "La categoría es obligatoria"),
});