import { z } from "zod";

export const PROJECT_COLORS = [
  "RED",
  "BLUE",
  "YELLOW",
  "GREEN",
  "PURPLE",
] as const;

export const CreateProjectSchema = z.object({
  nameProject: z
    .string({ message: "El nombre del proyecto es obligatorio" })
    .min(1, "El nombre del proyecto es obligatorio"),
  descriptionProject: z.string().optional(),
  dateInit: z
    .string({ message: "La fecha de inicio es obligatoria" })
    .min(1, "La fecha de inicio es obligatoria"),
  dateFinish: z
    .string({ message: "La fecha estimada de finalización es obligatoria" })
    .min(1, "La fecha estimada de finalización es obligatoria"),
  color: z.enum(PROJECT_COLORS).optional(),
  tasks: z.array(z.string()).optional(),
  status: z
    .enum(["ALL", "PENDING", "IN_PROGRESS", "COMPLETED"])
    .default("PENDING"),
  priority: z.enum(["LOW", "MEDIUM", "HIGH"]).default("MEDIUM").optional(),
});

export type CreateProjectSchemaType = z.infer<typeof CreateProjectSchema>;
export type ProjectSchemaType = CreateProjectSchemaType;
export type ProjectStatus = z.infer<typeof CreateProjectSchema>["status"];
export type ProjectPriority = z.infer<typeof CreateProjectSchema>["priority"];

export type Filters = {
  status?: ProjectStatus;
  priority?: ProjectPriority;
};
