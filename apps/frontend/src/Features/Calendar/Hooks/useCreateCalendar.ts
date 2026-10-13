import { useState, useMemo } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import type { TaskResponseType } from "@repo/schemas";
import { getAllTasks } from "../../Task/Services/task.service";
import { createCalendar } from "../Services/calendar.service";
import { taskKeys } from "../../Task/Constants/taskKeys";
import { calendarKeys } from "../Constants/calendarKeys";

interface UseCreateCalendarProps {
  selectedDate: string;
  onTasksSelect?: (tasks: TaskResponseType[]) => void;
}

export default function useCreateCalendar({
  selectedDate,
  onTasksSelect,
}: UseCreateCalendarProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedTasks, setSelectedTasks] = useState<TaskResponseType[]>([]);
  const queryClient = useQueryClient();

  // 1. Obtener tareas directamente desde la caché de TanStack Query
  const {
    data: tasks = [],
    isLoading: isLoadingTasks,
    error: tasksError,
  } = useQuery<TaskResponseType[]>({
    queryKey: taskKeys.all,
    queryFn: getAllTasks,
  });

  // 2. Filtrado reactivo según el término de búsqueda
  const filteredTasks: TaskResponseType[] = useMemo(() => {
    if (!searchTerm.trim()) return tasks;
    return tasks.filter((task) =>
      task.name?.toLowerCase().includes(searchTerm.toLowerCase()),
    );
  }, [tasks, searchTerm]);

  // 3. Selección y deselección de tareas
  const toggleTask = (task: TaskResponseType) => {
    const taskId = task._id;
    setSelectedTasks((currentTasks) =>
      currentTasks.some((selectedTask) => selectedTask._id === taskId)
        ? currentTasks.filter((selectedTask) => selectedTask._id !== taskId)
        : [...currentTasks, task],
    );
  };

  const isTaskSelected = (taskId: string) => {
    return selectedTasks.some((task) => task._id === taskId);
  };

  // 4. Mutación para persistir los eventos en el calendario
  const createCalendarMutation = useMutation({
    mutationFn: async (task: TaskResponseType) => {
      const calendarData = {
        date: selectedDate,
        title: task.name,
        taskId: task._id,
      };
      return await createCalendar(calendarData);
    },
    onSuccess: () => {
      // Invalida la query de calendario para refrescar los eventos en toda la app
      queryClient.invalidateQueries({ queryKey: calendarKeys.all });
    },
    onError: (error) => {
      console.error("Error al crear evento en el calendario:", error);
    },
  });

  // 5. Confirmar selección: guarda en base de datos y ejecuta callback
  const handleConfirmSelection = async () => {
    if (selectedTasks.length === 0) return;

    try {
      await Promise.all(
        selectedTasks.map((task) => createCalendarMutation.mutateAsync(task)),
      );

      onTasksSelect?.(selectedTasks);
      setSelectedTasks([]);
    } catch (error) {
      console.error("Error al guardar eventos en el calendario:", error);
    }
  };

  return {
    tasks,
    filteredTasks,
    searchTerm,
    setSearchTerm,
    isLoading: isLoadingTasks,
    errorMessage: tasksError?.message,
    selectedTasks,
    setSelectedTasks,
    toggleTask,
    isTaskSelected,
    handleConfirmSelection,
    isCreating: createCalendarMutation.isPending,
  };
}
