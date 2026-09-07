import { useState } from "react";
import { SetStorageItem } from "../../../Utils/Storage.utils";
import type { Dispatch, SetStateAction } from "react";
import type { TaskType } from "../Types/TaskTypes";
import useShowToast from "../../../Hooks/useShowToast";

interface props {
  tasks: TaskType[];
  setTasks: Dispatch<SetStateAction<TaskType[]>>;
  closeModal: () => void;
}

/**
 * Gestiona la selección y actualización de una tarea.
 * Los cambios se guardan en el estado local y en localStorage.
 */
export default function useEditTask({ tasks, setTasks, closeModal }: props) {
  const [selectedTask, setSelectedTask] = useState<TaskType | null>(null);
  const {
    isOpen: showEditToast,
    showToast,
    closeToast: closeEditToast,
  } = useShowToast();

  /** Selecciona una tarea por su id para mostrarla en el formulario de edición. */
  const selectTaskToEdit = (id: string) => {
    const taskToEdit = tasks.find((task) => task.id === id);
    if (taskToEdit) setSelectedTask(taskToEdit);
  };

  /** Reemplaza la tarea editada, persiste la lista y cierra el modal. */
  const updateTask = (updatedTask: TaskType) => {
    const updatedTasks = tasks.map((task) =>
      task.id === updatedTask.id ? updatedTask : task,
    );

    setTasks(updatedTasks);
    SetStorageItem("task", updatedTasks);
    setSelectedTask(null);
    closeModal();
    showToast();
  };

  /** Limpia la tarea seleccionada sin guardar cambios. */
  const clearSelectedTask = () => setSelectedTask(null);

  return {
    selectedTask,
    showEditToast,
    closeEditToast,
    selectTaskToEdit,
    updateTask,
    clearSelectedTask,
  };
}
