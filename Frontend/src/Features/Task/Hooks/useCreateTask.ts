import { GetStorageItem, SetStorageItem } from "../../../Utils/Storage.utils";
import type { TaskType } from "../Types/TaskTypes";
export default function useCreateTask() {
  function HandleSubmit(data: TaskType) {
    const taskData = GetStorageItem("task", []);
    const taskWithId: TaskType = {
      ...data,
      id: crypto.randomUUID(),
    };
    const updatedTask = [...taskData, taskWithId];
    SetStorageItem("task", updatedTask);
  }
  return {
    HandleSubmit,
  };
}
