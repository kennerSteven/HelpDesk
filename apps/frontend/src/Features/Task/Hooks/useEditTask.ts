import { useState } from "react";
import { SetStorageItem } from "../../../Utils/Storage.utils";
import type { Dispatch, SetStateAction } from "react";
import useShowToast from "../../../Hooks/useShowToast";
import type { TaskResponseType } from "@repo/schemas";
import { updateTaskService } from "../Services/task.service";

interface props {
  tasks: TaskResponseType[];
  setTasks: Dispatch<SetStateAction<TaskResponseType[]>>;
  closeModal: () => void;
}

export default function useEditTask({ tasks, setTasks, closeModal }: props) {
  const [selectedTask, setSelectedTask] = useState<TaskResponseType | null>(
    null,
  );
  const {
    isOpen: showEditToast,
    showToast,
    closeToast: closeEditToast,
  } = useShowToast();

  /** Selecciona una tarea por su id para mostrarla en el formulario de edición. */
  const selectTaskToEdit = (id: string) => {
    const taskToEdit = tasks.find((task) => task._id === id);
    if (taskToEdit) setSelectedTask(taskToEdit);
  };

  /** Reemplaza la tarea editada, persiste la lista y cierra el modal. */
  const updateTask = async (updatedTask: TaskResponseType) => {
    try {
      // Extraemos el id string en caso de que categoryId sea un objeto poblado
      const payload = {
        ...updatedTask,
        categoryId:
          typeof updatedTask.categoryId === "object"
            ? updatedTask.categoryId._id
            : updatedTask.categoryId,
      };

      // Llamada al backend
      const response = await updateTaskService(updatedTask._id, payload as any);

      const updatedTasks = tasks.map((task) =>
        task._id === updatedTask._id ? response.details || updatedTask : task,
      );

      setTasks(updatedTasks);
      SetStorageItem("task", updatedTasks);
      setSelectedTask(null);
      closeModal();
      showToast();
    } catch (error) {
      console.error("Error al actualizar tarea:", error);
      // Aquí podrías agregar un toast de error si tuvieras uno
    }
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
