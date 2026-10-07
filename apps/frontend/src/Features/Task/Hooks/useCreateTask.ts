import { createTask } from "../Services/task.service";
import type { TaskType } from "../Types/TaskTypes";

export default function useCreateTask() {
  async function HandleSubmit(data: TaskType) {
    console.log("Data de crear tarea", data);

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
