import { z } from "zod";

export const CreateUserSchema = z.object({
  name: z.string().min(1, "El nombre es obligatorio"),
  password: z.string().min(1, "La contraseña es obligatoria"),
  role: z.string().min(1, "El rol es obligatorio"),
});

export const LoginSchema = z.object({
  name: z.string().min(1, "El nombre es obligatorio"),
  password: z.string().min(1, "La contraseña es obligatoria"),
});
