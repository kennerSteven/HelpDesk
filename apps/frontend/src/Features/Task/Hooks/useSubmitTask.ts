import { createTask } from "../Services/task.service";
import type { TaskResponseType } from "@repo/schemas";

export default function useSubmitTask() {
  async function HandleSubmit(data: TaskResponseType) {
    try {
      const newTask = await createTask(data);

      if (!newTask) {
        return console.log("Fallo");
      }

      console.log("tarea creada", newTask);
    } catch (error) {
      console.log("Error al intentar tarea", error);
    }
  }
  return {
    HandleSubmit,
  };
}
