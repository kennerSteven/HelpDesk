import Task from "../Models/Task";

export interface TaskType {
  name: string;
  description?: string;
  dateInit: string;
  dateFinish: string;
  priority: "HIGH" | "MEDIUM" | "LOW";
  categoryId: string;
}

export async function CreateTask(data: TaskType) {
  const task = await Task.create(data);
  return task;
}
