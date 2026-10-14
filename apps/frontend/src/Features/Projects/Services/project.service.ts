import { apiClient } from "../../../Config/axios";
import type { CreateProjectSchemaType } from "@repo/schemas";

export async function createProject(data: CreateProjectSchemaType) {
  const response = await apiClient.post("/project/createProject", data);
  return response.data;
}

export async function getProject() {
  const response = await apiClient.get("/project/getProjects");
  return response.data;
}
