import { useState } from "react";

import useShowToast from "../../../Hooks/useShowToast";
import type { TaskResponseType } from "@repo/schemas";
import { updateTaskService } from "../Services/task.service";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { taskKeys } from "../Constants/taskKeys";
import { projectKeys } from "../../Projects/Constants/projectKeys";
interface props {
  tasks: TaskResponseType[];
  closeModal: () => void;
}

export default function useEditTask({ tasks, closeModal }: props) {
  const [selectedTask, setSelectedTask] = useState<TaskResponseType | null>(
    null,
  );

  const queryClient = useQueryClient();
  const {
    isOpen: showEditToast,
    showToast,
    closeToast: closeEditToast,
  } = useShowToast();

  const selectTaskToEdit = (id: string) => {
    const taskToEdit = tasks.find((task) => task._id === id);
    if (taskToEdit) setSelectedTask(taskToEdit);
  };

  const editTaskMutation = useMutation({
    mutationFn: (updatedTask: TaskResponseType) => {
      const payload = {
        ...updatedTask,
        categoryId:
          typeof updatedTask.categoryId === "object"
            ? (updatedTask.categoryId as any)._id
            : updatedTask.categoryId,
      };

      return updateTaskService(updatedTask._id, payload);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: taskKeys.all });
      queryClient.invalidateQueries({ queryKey: projectKeys.all });
      setSelectedTask(null);
      closeModal();
      showToast();
    },
    onError: (error) => {
      console.error("Error al actualizar tarea:", error);
    },
  });

  function updatedTask(dataUpdated: TaskResponseType) {
    editTaskMutation.mutate(dataUpdated);
  }
  /** Limpia la tarea seleccionada sin guardar cambios. */
  const clearSelectedTask = () => setSelectedTask(null);

  return {
    selectedTask,
    showEditToast,
    closeEditToast,
    selectTaskToEdit,
    updatedTask,
    clearSelectedTask,
  };
}
