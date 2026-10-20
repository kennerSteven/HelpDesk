import { useMemo, useState } from "react";

import { useZodForm } from "../../../Hooks/useZodForm";
import useShowToast from "../../../Hooks/useShowToast";
import useModal from "../../../Hooks/useModal";
import type { TaskResponseType } from "@repo/schemas";
import { deleteTaskService } from "../Services/task.service";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { taskKeys } from "../Constants/taskKeys";

export default function useTaskActions(tasks: TaskResponseType[]) {
  const { useAppForm } = useZodForm();
  const { register, watch } = useAppForm();
  const [search] = useState("");

  const queryClient = useQueryClient();
  const {
    isOpen: showDelete,
    openModal: openDeleteModal,
    closeModal: closeDeleteModalState,
  } = useModal();

  const [selectedTask, setSelectedTask] = useState<TaskResponseType[]>([]);
  const [tasksToDelete, setTasksToDelete] = useState<string[]>([]);

  const {
    isOpen: showDeleteToast,
    showToast,
    closeToast: closeDeleteToast,
  } = useShowToast();

  const categoryFilter = watch("categoryFilter");
  const priorityFilter = watch("priority");
  const safeTasks = Array.isArray(tasks) ? tasks : [];

  const clearDeleteSelection = () => {
    setSelectedTask([]);
  };

  const closeDeleteModal = () => {
    closeDeleteModalState();
    clearDeleteSelection();
  };

  const handleDelete = (id: string) => {
    const taskToDelete = safeTasks.find((task) => task._id === id);
    if (!taskToDelete) return;
    setSelectedTask([taskToDelete]);
    openDeleteModal();
  };

  const handleBulkDelete = () => {
    const tasksToDeleteObjects = safeTasks.filter((task) =>
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

  const deleteMutation = useMutation({
    mutationFn: deleteTaskService,

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: taskKeys.all,
      });
      closeDeleteModal();
      showToast();
    },
    onError: (error) => {
      console.error("Error al eliminar la tarea:", error);
    },
  });

  const confirmDeleteTask = async (id: string) => {
    deleteMutation.mutate(id);
  };

  const filteredTask = useMemo(() => {
    return safeTasks.filter((task) => {
      const taskCatId =
        typeof task.categoryId === "object" && task.categoryId !== null
          ? (task.categoryId as any)._id
          : task.categoryId;

      const matchesCategory = !categoryFilter || taskCatId === categoryFilter;

      const matchesPriority =
        !priorityFilter || task.priority === priorityFilter;

      const searchInput =
        !search || task.name?.toLowerCase().includes(search.toLowerCase());

      return matchesCategory && matchesPriority && searchInput;
    });
  }, [safeTasks, search, categoryFilter, priorityFilter]);

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
    confirmDeleteTask,
  };
}
