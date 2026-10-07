import { apiClient } from "../../../Config/axios";
import type { TaskResponseType } from "@repo/schemas";

export async function createTask(data: TaskResponseType) {
  const response = await apiClient.post("/tasks/createTask", data);
  return response.data;
}

export async function getAllTasks() {
  const response = await apiClient.get("/tasks/getTasks");
  return response.data;
}

export async function updateTaskService(
  id: string,
  data: Partial<TaskResponseType>,
) {
  const response = await apiClient.put(`/tasks/updateTask/${id}`, data);
  return response.data;
}

export async function deleteTaskService(id: string) {
  const response = await apiClient.delete(`/tasks/deleteTask/${id}`);
  return response.data;
}

export async function deleteTasksBulkService(ids: string[]) {
  const response = await apiClient.post("/tasks/deleteTasks/bulk", { ids });
  return response.data;
}
