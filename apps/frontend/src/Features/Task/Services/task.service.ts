
import axios from "axios";
import type { TaskType } from "../Types/TaskTypes";

const API_URL = "http://localhost:3000/api/tasks";

export async function createTask(data: TaskType) {
  const response = await axios.post(API_URL, data);

  return response.data;
}
