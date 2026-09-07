import { z } from "zod";

export const CreateTaskSchema = z.object({

  name: z.string().min(1, "El nombre es obligatorio"),
  description: z.string().optional(),
  dateInit: z.string().min(1, "La fecha de inicio es obligatoria"),
  dateFinish: z.string().min(1, "La fecha de fin es obligatoria"),
  priority: z.string().min(1, "Seleccione una prioridad"),
  categoryId: z.string()
});

export type CreateTaskSchemaType = z.infer<typeof CreateTaskSchema>;
