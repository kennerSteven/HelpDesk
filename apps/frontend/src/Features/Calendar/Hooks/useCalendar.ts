import { useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import { getCalendar } from "../Services/calendar.service";
import { getAllTasks } from "../../Task/Services/task.service";
import { calendarKeys } from "../Constants/calendarKeys";
import { taskKeys } from "../../Task/Constants/taskKeys";
import type { CalendarEvent } from "../Types/types";

function formatCalendarEvents(
  calendarData: any[],
  tasksData: any[] = [],
): CalendarEvent[] {



  if (!Array.isArray(calendarData)) return [];

  const tasksMap = new Map<string, any>(
    Array.isArray(tasksData)
      ? tasksData.map((task: any) => [task._id, task])
      : [],
  );

  return calendarData.map((item: any) => {
    const taskFromMap =
      typeof item.taskId === "string" ? tasksMap.get(item.taskId) : null;
    const task =
      typeof item.taskId === "object" && item.taskId !== null
        ? item.taskId
        : taskFromMap || tasksMap.get(item._id);

    return {
      id: item._id,
      title: item.title || task?.name || "Tarea",
      date: item.date || task?.dateInit,
      start: item.date || task?.dateInit,
      allDay: true,
      category: task?.categoryId?.nameCategory || task?.category,
      priority: task?.priority,
      description: task?.description,
      status: task?.status,
    };
  });
}

export default function useCalendar() {
  const {
    data: rawCalendar = [],
    isError: isErrorCalendar,
    error: errorCalendar,
    isLoading: isLoadingCalendar,
    refetch: refetchCalendar,
  } = useQuery({
    queryKey: calendarKeys.all,
    queryFn: getCalendar,
  });

  const {
    data: dataTasks = [],
    isError: isErrorTasks,
    error: errorTasks,
    isLoading: isLoadingTasks,
    refetch: refetchTasks,
  } = useQuery({
    queryKey: taskKeys.all,
    queryFn: getAllTasks,
  });

  const dataCalendar: CalendarEvent[] = useMemo(() => {
    return formatCalendarEvents(rawCalendar, dataTasks);
  }, [rawCalendar, dataTasks]);

  return {
    dataCalendar,
    rawCalendar,
    isErrorCalendar,
    errorCalendar,
    isLoadingCalendar,
    refetchCalendar,

    dataTasks,
    isErrorTasks,
    errorTasks,
    isLoadingTasks,
    refetchTasks,
  };
}
