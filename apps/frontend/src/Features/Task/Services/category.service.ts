import axios from "axios";
import type { CategorySchemaType } from "@repo/schemas";

const API_URL = "http://localhost:3000/api/category/createCategory";

export async function createCategory(data: CategorySchemaType) {
  const response = await axios.post(API_URL, data);

  return response.data;
}

const API_URL_GET = "http://localhost:3000/api/category/getCategories";

export async function getCategories() {
  const response = await axios.get(API_URL_GET);

  return response.data;
}
