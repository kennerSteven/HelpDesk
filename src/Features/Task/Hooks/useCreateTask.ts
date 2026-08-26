import { GetStorageItem, SetStorageItem } from "../../../Utils/Storage.utils";
import type { TaskType } from "../Types/TaskTypes";
export default function useCreateTask() {
  function HandleSubmit(data: TaskType) {
    const taskData = GetStorageItem("task", []);
    const updatedTask = [...taskData, data];
    SetStorageItem("task", updatedTask);
  }
  return {
    HandleSubmit,
  };
}
