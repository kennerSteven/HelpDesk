import { useState } from "react";
import type { Dispatch, SetStateAction } from "react";
import { GetStorageItem, SetStorageItem } from "../../../Utils/Storage.utils";
import { useZodForm } from "../../../Hooks/useZodForm";
import useShowToast from "../../../Hooks/useShowToast";
import useModal from "../../../Hooks/useModal";
import type { TaskType } from "../Types/TaskTypes";

/**
 * Gestiona los filtros y las acciones principales de las tareas.
 * También controla la confirmación de eliminación y su notificación.
 */
export default function useTaskActions(
  tasks: TaskType[],
  setTasks: Dispatch<SetStateAction<TaskType[]>>,
) {
  const { useAppForm } = useZodForm();
  const { register, watch } = useAppForm();
  const {
    isOpen: showDelete,
    openModal: openDeleteModal,
    closeModal: closeDeleteModalState,
  } = useModal();
  const [selectedTask, setSelectedTask] = useState<TaskType[]>([]);
  const {
    isOpen: showDeleteToast,
    showToast,
    closeToast: closeDeleteToast,
  } = useShowToast();

  const categoryFilter = watch("categoryFilter");
  const priorityFilter = watch("priority");


  /** Limpia la tarea seleccionada para eliminar. */
  const clearDeleteSelection = () => {
    setSelectedTask([]);
  };

  const closeDeleteModal = () => {
    closeDeleteModalState();
    clearDeleteSelection();
  };

  /** Selecciona una tarea y abre el modal de confirmación. */
  const handleDelete = (id: string) => {
    const taskToDelete = tasks.find((task) => task.id === id);
    if (!taskToDelete) return;
    setSelectedTask([taskToDelete]);
    openDeleteModal();
   
  };

  /** Elimina la tarea por id, actualiza el estado y persiste la lista. */
  const deleteTask = (id: string) => {
    const remainingTasks = tasks.filter((task) => task.id !== id);
    setTasks(remainingTasks);
    SetStorageItem("task", remainingTasks);
    closeDeleteModal();
    showToast();
  };

  /** Recarga las tareas almacenadas en localStorage. */
  const refreshTasks = () => setTasks(GetStorageItem("task", []));

  return {
    register,
    categoryFilter,
    priorityFilter,
    selectedTask,
    showDelete,
    showDeleteToast,
    closeDeleteToast,
    handleDelete,
    deleteTask,
    closeDeleteModal,
    clearDeleteSelection,
    refreshTasks,
  };
}
