import { z } from "zod";

export const StepSchema = z.object({
  name: z
    .string({ message: "El nombre del paso es obligatorio" })
    .min(1, "El nombre del paso es obligatorio"),
  description: z.string().optional(),
  status: z.enum(["PENDING", "DONE"]),
});

export type StepType = z.infer<typeof StepSchema>;

export const CreateTaskSchema = z.object({
  name: z
    .string({ message: "El nombre es obligatorio" })
    .min(1, "El nombre es obligatorio"),
  description: z.string().optional(),
  dateInit: z
    .string({ message: "La fecha de inicio es obligatoria" })
    .min(1, "La fecha de inicio es obligatoria"),

  status: z.enum(["PENDING", "COMPLETED", "EXPIRED"]).default("PENDING"),

  dateFinish: z
    .string({ message: "La fecha de fin es obligatoria" })
    .min(1, "La fecha de fin es obligatoria"),
  priority: z.enum(["HIGH", "MEDIUM", "LOW"]),
  categoryId: z
    .string({ message: "Seleccione una categoría" })
    .min(1, "Seleccione una categoría"),
  projectId: z.string().optional(),
  showSteps: z.boolean().optional(),
  steps: z.array(StepSchema).optional(),
});

export type priority = "HIGH" | "MEDIUM" | "LOW" | null;
export type status = "PENDING" | "COMPLETED" | "EXPIRED";

export const TaskResponseSchema = CreateTaskSchema.extend({
  _id: z.string(),
  categoryId: z.object({
    _id: z.string(),
    nameCategory: z.string(),
  }),
});

export type TaskResponseType = z.infer<typeof TaskResponseSchema>;
export type CreateTaskSchemaType = z.infer<typeof CreateTaskSchema>;
