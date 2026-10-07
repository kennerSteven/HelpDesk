
import axios from "axios";
import type { TaskType } from "../Types/TaskTypes";

const API_URL = "http://localhost:3000/api/tasks/createTask";

export async function createTask(data: TaskType) {
  const response = await axios.post(API_URL, data);

  return response.data;
}



const API_URL_GET = "http://localhost:3000/api/tasks/getTasks";

export async function getAllTasks() {
  const response = await axios.get(API_URL_GET);

  return response.data;
}
