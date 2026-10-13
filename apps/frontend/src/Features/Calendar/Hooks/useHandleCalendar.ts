import { useState, useMemo, useEffect } from "react";
import type { DateClickArg } from "@fullcalendar/interaction";
import type { EventClickArg } from "@fullcalendar/core";
import useModal from "../../../Hooks/useModal";
import type { CalendarEvent } from "../Types/types";
import useCalendarApi from "./useCalendarApi";

interface UseHandleCalendarOptions {
  onAssignmentSuccess?: () => void;
  onDeleteSuccess?: () => void;
}

export default function useHandleCalendar(
  initialEvents: CalendarEvent[] = [],
  options?: UseHandleCalendarOptions,
) {
  const api = useCalendarApi();
  const { openModal, isOpen, closeModal } = useModal();

  const [events, setEvents] = useState<CalendarEvent[]>(initialEvents);

  useEffect(() => {
    if (initialEvents && initialEvents.length > 0) {
      setEvents(initialEvents);
    }
  }, [initialEvents]);

  const selectedDayEvents = useMemo(() => {
    if (!api.selectedDateInfo?.dateStr) return [];
    return events.filter((ev) => {
      const eventDate = ev.date || ev.start;
      return eventDate && eventDate.startsWith(api.selectedDateInfo.dateStr);
    });
  }, [events, api.selectedDateInfo]);

  const handleDateClick = (arg: DateClickArg) => {
    api.handleSelectDateOnly(arg.dateStr);
    openModal();
  };

  const handleEventClick = (arg: EventClickArg) => {
    const shouldDelete = confirm(
      `¿Deseas eliminar la tarea "${arg.event.title}" del calendario?`,
    );
    if (shouldDelete) {
      setEvents((prev) => prev.filter((event) => event.id !== arg.event.id));
      options?.onDeleteSuccess?.();
    }
  };

  const handleTasksSelected = (tasks: any[]) => {
    const selectedDate = api.selectedDateInfo?.dateStr;
    if (!selectedDate) return;

    const newEvents: CalendarEvent[] = tasks.map((task) => {
      const taskId = task._id || task.id || String(Date.now());
      return {
        id: taskId,
        title: task.name || task.title,
        date: selectedDate,
        start: selectedDate,
        allDay: true,
        category: task.category || task.categoryId?.nameCategory,
        priority: task.priority,
        description: task.description,
        status: task.status,
      };
    });

    setEvents((currentEvents) => [...currentEvents, ...newEvents]);
    options?.onAssignmentSuccess?.();
  };

  return {
    // API FullCalendar y Navegación
    calendarRef: api.calendarRef,
    currentView: api.currentView,
    setCurrentView: api.setCurrentView,
    calendarTitle: api.calendarTitle,
    selectedDateInfo: api.selectedDateInfo,
    setSelectedDateInfo: api.setSelectedDateInfo,
    handleDatesSet: api.handleDatesSet,
    handleNextMonth: api.handleNextMonth,
    handlePrevMonth: api.handlePrevMonth,
    handleToday: api.handleToday,
    handleChangeView: api.handleChangeView,
    handleSelectDateOnly: api.handleSelectDateOnly,

    // Estado y manejadores de eventos
    events,
    setEvents,
    selectedDayEvents,
    handleDateClick,
    handleEventClick,
    handleTasksSelected,

    // Modal de selección de tareas
    isOpen,
    openModal,
    closeModal,
  };
}
