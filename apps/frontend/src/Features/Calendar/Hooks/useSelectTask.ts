import { useState } from "react";
import useModal from "../../../Hooks/useModal";
import type { TaskResponseType } from "@repo/schemas";
import { getAllTasks } from "../../Task/Services/task.service";

export interface SelectTaskProps {
  onCloseParent?: () => void;
  selectedDate?: string;
  onTaskSelected?: (data: any) => void;
  onTasksSelected?: (data: any) => void;
}

export default function useSelectTask({
  onCloseParent,
  selectedDate,
  onTaskSelected,
  onTasksSelected,
}: SelectTaskProps) {
  const [existingTasks, setExistingTasks] = useState<TaskResponseType[]>(
    [],
  );
  const [searchTerm, setSearchTerm] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const {
    isOpen: isOpenCreateTask,
    openModal: openCreateTaskModal,
    closeModal: closeCreateTaskModal,
  } = useModal();

  const {
    isOpen: isOpenExistingTask,
    openModal: openExistingTaskModal,
    closeModal: closeExistingTaskModal,
  } = useModal();

  async function loadExistingTasks() {
    setIsLoading(true);
    setErrorMessage("");

    try {
      const tasks = await getAllTasks();
      setExistingTasks(tasks || []);
    } catch (error) {
      console.error("Error al cargar tareas existentes:", error);
      setExistingTasks([]);
      setErrorMessage("No se pudieron cargar las tareas. Inténtalo de nuevo.");
    } finally {
      setIsLoading(false);
    }
  }

  const handleTasksSelect = (tasks: TaskResponseType[]) => {
    onTasksSelected?.(tasks);
    onTaskSelected?.(tasks[0]);
    closeExistingTaskModal();
    onCloseParent?.();
  };

  return {
    isOpenCreateTask,
    openCreateTaskModal,
    closeCreateTaskModal,
    isOpenExistingTask,
    openExistingTaskModal,
    closeExistingTaskModal,
    existingTasks,
    setExistingTasks,
    searchTerm,
    setSearchTerm,
    isLoading,
    setIsLoading,
    errorMessage,
    setErrorMessage,
    loadExistingTasks,
    handleTasksSelect,
    selectedDate,
  };
}
