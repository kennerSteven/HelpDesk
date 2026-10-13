import { useState } from "react";
import type { TaskResponseType } from "@repo/schemas";
import { getAllTasks } from "../../Task/Services/task.service";
import { taskKeys } from "../../Task/Constants/taskKeys";
import { useQuery } from "@tanstack/react-query";

export interface SelectTaskProps {
  onCloseParent?: () => void;
  onTaskCreated?: () => void;
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
  const [searchTerm, setSearchTerm] = useState("");



  const {
    data: Tasks = [],
    error,
    isLoading,
    isError,
  } = useQuery({
    queryKey: taskKeys.all,
    queryFn: getAllTasks,
  });

  console.log("Tareas existitnes cargadas", Tasks);

  const handleTasksSelect = (tasks: TaskResponseType[]) => {
    onTasksSelected?.(tasks);
    onTaskSelected?.(tasks[0]);
    onCloseParent?.();
  };

  return {
    Tasks,
    error,
    isError,

    searchTerm,
    setSearchTerm,
    isLoading,
    handleTasksSelect,
    selectedDate,
  };
}
