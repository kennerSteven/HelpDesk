import type { CreateTaskSchemaType } from "@repo/schemas";

export const mockTaskWithSteps: CreateTaskSchemaType = {
  name: "Aprender Jest",
  description: "Aprender a realizar pruebas unitarias con Jest y TypeScript",
  priority: "HIGH",
  status: "PENDING",              
  categoryId: "6ac661b47c4bdf261e1a0305", 
  dateInit: "2026-10-14",
  dateFinish: "2026-10-20",
  steps: [
    {
      name: "Instalar Jest",
      status: "DONE",
    },
    {
      name: "Configurar TypeScript",
      status: "PENDING",
    },
    {
      name: "Crear pruebas unitarias",
      status: "PENDING",
    },
  ],
};

export const mockTaskWithoutSteps: CreateTaskSchemaType = {
  name: "Repasar TypeScript",
  description: "Repasar interfaces, tipos y genéricos",
  priority: "MEDIUM",
  status: "PENDING",             
  categoryId: "64f1a2b3c4d5e6f7a8b9c0d1", 
  dateInit: "2026-10-14",
  dateFinish: "2026-10-18",
  steps: [],
};
