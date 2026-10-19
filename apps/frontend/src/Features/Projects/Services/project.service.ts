import { apiClient } from "../../../Config/axios";
import type { CreateProjectSchemaType, Filters } from "@repo/schemas";

export async function createProject(data: CreateProjectSchemaType) {
  const response = await apiClient.post("/project/createProject", data);
  return response.data;
}

// 1. Petición para traer los proyectos normalmente
export async function getProject() {
  const response = await apiClient.get("/project/getProjects");
  return response.data;
}

// 2. Petición para filtrar proyectos
export async function getProjectByFilters(filters: Filters | string) {
  const params: Record<string, any> = {};
  if (typeof filters === "string") {
    if (filters && filters !== "Todas") {
      params.status = filters;
    }
  } else if (filters) {
    if (filters.status && filters.status !== ("Todas" as any)) {
      params.status = filters.status;
    }
    if (filters.priority) {
      params.priority = filters.priority;
    }
  }
  const response = await apiClient.get("/project/getProjects", { params });
  return response.data;
}
