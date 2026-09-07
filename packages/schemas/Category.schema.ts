import { z } from "zod";

export const CategorySchema = z.object({
  nameCategory: z.string().min(1, "La categoria es requerida"),
  descriptionCategory: z.string().optional(),
});

export type CategorySchemaType = z.infer<typeof CategorySchema>;
