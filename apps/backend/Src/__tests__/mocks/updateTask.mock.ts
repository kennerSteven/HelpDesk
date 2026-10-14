import type { CreateTaskSchemaType } from "@repo/schemas";

// ID proporcionado para la prueba de actualización
export const mockUpdateTaskId = "6ac6a278707550b716e644ae";

// Payload parcial con los datos a actualizar
export const mockUpdateTaskPayload: Partial<CreateTaskSchemaType> = {
  name: "Tarea Actualizada con Jest",
  description: "Descripción modificada durante la prueba de integración",
  priority: "HIGH",
  status: "COMPLETED",
};
