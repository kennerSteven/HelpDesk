import { apiClient } from "../../../Config/axios";
import type { CategorySchemaType } from "@repo/schemas";

export async function createCategory(data: CategorySchemaType) {
  const response = await apiClient.post("/category/createCategory", data);
  return response.data;
}

export async function getCategories() {
  const response = await apiClient.get("/category/getCategories");
  return response.data;
}
