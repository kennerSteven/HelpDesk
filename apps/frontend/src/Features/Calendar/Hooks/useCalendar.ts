import { useRef, useState, useMemo } from "react";
import type { DateClickArg } from "@fullcalendar/interaction";
import type { EventClickArg } from "@fullcalendar/core";
import useModal from "../../../Hooks/useModal";
import useShowToast from "../../../Hooks/useShowToast";
import { formatSpanishDate, getTodayString } from "../../../Utils/Date.utils";

export interface CalendarEvent {
  id: string;
  title: string;
  date?: string;
  start?: string;
  end?: string;
  allDay?: boolean;
  category?: string;
  categoryName?: string;
  priority?: string;
  description?: string;
  status?: string;
}

export interface SelectedDateInfo {
  dateStr: string;
  dayName: string;
}

/**
 * useCalendar Hook
 * 
 * Gestiona el estado y la lógica de interacción para el componente Calendar:
 * - Eventos cargados y filtrado en tiempo real por búsqueda
 * - Estado de navegación del calendario (Mes/Semana/Día, Hoy, Anterior, Siguiente)
 * - Título dinámico del calendario (e.g., "Septiembre 2026" o "26 de septiembre")
 * - Día actualmente seleccionado para la tarjeta de Agenda de la barra lateral
 * - Navegación automática de fecha al cambiar a vista Día o Semana
 * - Modales de planificación y creación de tareas
 * - Notificaciones Toast de asignación y eliminación
 */
export default function useCalendar(initialEvents: CalendarEvent[] = []) {
  // Modal para planificar/seleccionar tarea en una fecha
  const { openModal, isOpen, closeModal } = useModal();

  // Modal para el botón CTA "Nueva tarea" del encabezado
  const {
    isOpen: isOpenCreateTask,
    openModal: openCreateTaskModal,
    closeModal: closeCreateTaskModal,
  } = useModal();

  // Toasts de confirmación
  const {
    isOpen: showAssignmentToast,
    showToast: showAssignmentSuccess,
    closeToast: closeAssignmentToast,
  } = useShowToast();

  const {
    isOpen: showDeleteToast,
    showToast: showDeleteSuccess,
    closeToast: closeDeleteToast,
  } = useShowToast();

  const calendarRef = useRef<any | null>(null);

  // Lista de eventos
  const [events, setEvents] = useState<CalendarEvent[]>(initialEvents);

  // Filtro de búsqueda


  // Vista activa del calendario: "dayGridMonth" | "timeGridWeek" | "timeGridDay"
  const [currentView, setCurrentView] = useState<"dayGridMonth" | "timeGridWeek" | "timeGridDay">("dayGridMonth");

  // Título del período actual mostrado por FullCalendar
  const [calendarTitle, setCalendarTitle] = useState("");

  // Día seleccionado por defecto (inicia con el día de hoy)
  const [selectedDateInfo, setSelectedDateInfo] = useState<SelectedDateInfo>(() => {
    const todayStr = getTodayString();
    return {
      dateStr: todayStr,
      dayName: formatSpanishDate(todayStr),
    };
  });

  


  // Eventos del día seleccionado para la Agenda Lateral
  const selectedDayEvents = useMemo(() => {
    if (!selectedDateInfo?.dateStr) return [];
    return events.filter((ev) => {
      const eventDate = ev.date || ev.start;
      return eventDate && eventDate.startsWith(selectedDateInfo.dateStr);
    });
  }, [events, selectedDateInfo]);

  /**
   * Callback ejecutado cada vez que FullCalendar cambia de rango de fechas o vista
   */
  const handleDatesSet = (dateInfo: any) => {
    if (dateInfo?.view?.title) {
      const rawTitle = dateInfo.view.title;
      const formattedTitle = rawTitle.charAt(0).toUpperCase() + rawTitle.slice(1);
      setCalendarTitle(formattedTitle);
    }
    if (dateInfo?.view?.type) {
      setCurrentView(dateInfo.view.type);
    }
  };

  /**
   * Manejador al hacer clic en una celda de fecha en el calendario
   */
  const handleDateClick = (arg: DateClickArg) => {
    const dayName = formatSpanishDate(arg.date);
    setSelectedDateInfo({
      dateStr: arg.dateStr,
      dayName,
    });
    openModal();
  };

  /**
   * Permite actualizar la fecha seleccionada sin abrir el modal inmediatamente
   */
  const handleSelectDateOnly = (dateStr: string) => {
    const dayName = formatSpanishDate(dateStr);
    setSelectedDateInfo({
      dateStr,
      dayName,
    });
  };

  /**
   * Manejador al hacer clic en un evento existente
   */
  const handleEventClick = (arg: EventClickArg) => {
    const shouldDelete = confirm(`¿Deseas eliminar la tarea "${arg.event.title}" del calendario?`);
    if (shouldDelete) {
      setEvents((prev) => prev.filter((event) => event.id !== arg.event.id));
      showDeleteSuccess();
    }
  };

  /**
   * Asignar tareas seleccionadas a la fecha activa
   */
  const handleTasksSelected = (tasks: any[]) => {
    const selectedDate = selectedDateInfo?.dateStr;
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
      };
    });

    setEvents((currentEvents) => [...currentEvents, ...newEvents]);
    showAssignmentSuccess();
  };

  /**
   * Navegación a mes/semana/día siguiente
   */
  const handleNextMonth = () => {
    const api = calendarRef.current?.getApi();
    api?.next();
  };

  /**
   * Navegación a mes/semana/día anterior
   */
  const handlePrevMonth = () => {
    const api = calendarRef.current?.getApi();
    api?.prev();
  };

  /**
   * Volver al día de hoy
   */
  const handleToday = () => {
    const api = calendarRef.current?.getApi();
    api?.today();
    const todayStr = getTodayString();
    setSelectedDateInfo({
      dateStr: todayStr,
      dayName: formatSpanishDate(todayStr),
    });
  };

  /**
   * Cambiar de vista (Mes / Semana / Día) con navegación a la fecha activa
   */
  const handleChangeView = (viewName: "dayGridMonth" | "timeGridWeek" | "timeGridDay") => {
    setCurrentView(viewName);
    const api = calendarRef.current?.getApi();
    if (api) {
      api.changeView(viewName);
      // Al cambiar a vista de Día o Semana, saltar a la fecha seleccionada para que las tareas sean visibles de inmediato
      if (viewName === "timeGridDay" || viewName === "timeGridWeek") {
        const targetDate = selectedDateInfo?.dateStr || getTodayString();
        api.gotoDate(targetDate);
      }
    }
  };

  return {
    calendarRef,
    events,

    setEvents,
    currentView,
    calendarTitle,
    selectedDateInfo,
    selectedDayEvents,
    isOpen,
    openModal,
    closeModal,
    isOpenCreateTask,
    openCreateTaskModal,
    closeCreateTaskModal,
    showAssignmentToast,
    closeAssignmentToast,
    showDeleteToast,
    closeDeleteToast,
    handleDatesSet,
    handleDateClick,
    handleSelectDateOnly,
    handleEventClick,
    handleTasksSelected,
    handleNextMonth,
    handlePrevMonth,
    handleToday,
    handleChangeView,
  };
}
