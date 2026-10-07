import { useMemo, useState } from "react";
import type { Dispatch, SetStateAction } from "react";
import { GetStorageItem, SetStorageItem } from "../../../Utils/Storage.utils";
import { useZodForm } from "../../../Hooks/useZodForm";
import useShowToast from "../../../Hooks/useShowToast";
import useModal from "../../../Hooks/useModal";

import type { TaskResponseType } from "@repo/schemas";
import {
  deleteTaskService,
  deleteTasksBulkService,
} from "../Services/task.service";

/**
 * Gestiona los filtros y las acciones principales de las tareas.
 * También controla la confirmación de eliminación y su notificación.
 */
export default function useTaskActions(
  tasks: TaskResponseType[],
  setTasks: Dispatch<SetStateAction<TaskResponseType[]>>,
) {
  const { useAppForm } = useZodForm();
  const { register, watch } = useAppForm();
  const [search, setSearch] = useState("");
  const {
    isOpen: showDelete,
    openModal: openDeleteModal,
    closeModal: closeDeleteModalState,
  } = useModal();
  const [selectedTask, setSelectedTask] = useState<TaskResponseType[]>([]);
  const [tasksToDelete, setTasksToDelete] = useState<string[]>([]);
  console.log("Tarea o tareas seleccionada", selectedTask);
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
    const taskToDelete = tasks.find((task) => task._id === id);
    if (!taskToDelete) return;
    setSelectedTask([taskToDelete]);
    openDeleteModal();
  };

  const handleBulkDelete = () => {
    // Convertimos los IDs seleccionados en sus objetos completos
    // para que el Modal pueda mostrar qué tareas se van a borrar
    const tasksToDeleteObjects = tasks.filter((task) =>
      tasksToDelete.includes(task._id),
    );
    if (tasksToDeleteObjects.length === 0) return;

    setSelectedTask(tasksToDeleteObjects);
    openDeleteModal();
  };

  const toggleTaskSelection = (id: string) => {
    setTasksToDelete((prevIds) => {
      if (prevIds.includes(id)) {
        return prevIds.filter((selectedId) => selectedId !== id);
      }

      return [...prevIds, id];
    });
    console.log("Id seleccionados", tasksToDelete);
  };

  const clearTaskSelection = () => {
    setTasksToDelete([]);
  };

  /** Elimina una sola tarea llamando a la API */
  const confirmDeleteTask = async (id: string) => {
    try {
      await deleteTaskService(id);
      const remainingTasks = tasks.filter((task) => task._id !== id);
      setTasks(remainingTasks);
      SetStorageItem("task", remainingTasks);
      closeDeleteModal();
      showToast();
    } catch (error) {
      console.error("Error eliminando tarea", error);
    }
  };

  /** Elimina varias tareas llamando a la API masiva */
  const confirmDeleteBulk = async () => {
    try {
      await deleteTasksBulkService(tasksToDelete);
      const remainingTasks = tasks.filter(
        (task) => !tasksToDelete.includes(task._id),
      );
      setTasks(remainingTasks);
      SetStorageItem("task", remainingTasks);
      setTasksToDelete([]); // Limpiar selección
      closeDeleteModal();
      showToast();
    } catch (error) {
      console.error("Error eliminando tareas", error);
    }
  };

  /** Recarga las tareas almacenadas en localStorage. */
  const refreshTasks = () => setTasks(GetStorageItem("task", []));

  const filteredTask = useMemo(() => {
    return tasks.filter((task) => {
      const matchesCategory =
        !categoryFilter || task.categoryId === categoryFilter;

      const matchesPriority =
        !priorityFilter || task.priority === priorityFilter;

      const searchInput = !search || task.name === search;

      return matchesCategory && matchesPriority && searchInput;
    });
  }, [tasks, search, categoryFilter, priorityFilter]);

  return {
    toggleTaskSelection,
    tasksToDelete,
    handleBulkDelete,
    register,
    filteredTask,
    selectedTask,
    showDelete,
    showDeleteToast,
    closeDeleteToast,
    handleDelete,

    closeDeleteModal,
    clearDeleteSelection,
    clearTaskSelection,
    refreshTasks,
    confirmDeleteTask,
    confirmDeleteBulk,
  };
}
