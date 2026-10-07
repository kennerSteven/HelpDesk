/**
 * Calendar.tsx
 * 
 * Componente principal de Calendario rediseñado según la especificación de Google Stitch:
 * - TopBar con badge de estado "En ritmo", barra de búsqueda de tareas en tiempo real, botón de filtrado y CTA "Nueva tarea".
 * - Subcabecera interactiva con controles de navegación (Anterior, Hoy, Siguiente), título dinámico de período y conmutador de vistas (Mes, Semana, Día).
 * - Grilla FullCalendar con celdas minimalistas y renderizado de eventos con badges clasificados por color según su categoría.
 * - Soporte completo para vista Día y Semana con navegación a la fecha activa y ranura de día completo.
 * - Panel lateral de métricas KPI (CalendarKpiSidebar).
 */

import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import { useEffect, useState } from "react";

import { EventCustomContent } from "./EventCustomContent";
import SelectTask from "./SelectTask";
import CalendarKpiSidebar from "./CalendarKpiSidebar";
import Modal from "../../Components/Modal/Modal";
import Toast from "../../Components/Toast/Toast";
import CreateTask from "../Task/Components/CreateTask/CreateTask";
import {
  PlusIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
} from "../../Components/Icons";

import useCalendar, { type CalendarEvent } from "./Hooks/useCalendar";
import { getCalendar } from "./Services/calendar.service";
import { getAllTasks } from "../Task/Services/task.service";
import type { TaskType } from "../Task/Types/TaskTypes";
import Button from "../../Components/Ui/Button";

export type { CalendarEvent } from "./Hooks/useCalendar";

interface CalendarProps {
  initialEvents?: CalendarEvent[];
}

export const Calendar = ({ initialEvents = [] }: CalendarProps) => {
  const {
    calendarRef,
    events,
    setEvents,
    currentView,
    calendarTitle,
    selectedDateInfo,
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
    handleEventClick,
    handleTasksSelected,
    handleNextMonth,
    handlePrevMonth,
    handleToday,
    handleChangeView,
  } = useCalendar(initialEvents);

  // Estados para métricas reales calculadas desde tareas
  const [allTasksList, setAllTasksList] = useState<TaskType[]>([]);

  // Carga inicial y sincronización de tareas de la API
  useEffect(() => {
    async function fetchCalendarAndTasks() {
      try {
        const [calendarData, tasksData] = await Promise.all([
          getCalendar(),
          getAllTasks(),
        ]);

        const tasks = Array.isArray(tasksData) ? tasksData : [];
        setAllTasksList(tasks);

        // Mapa de tareas por ID (el backend ya trae categoryId poblado con { _id, nameCategory })
        const tasksMap = new Map<string, any>(
          tasks.map((task: any) => [task._id, task])
        );

        if (Array.isArray(calendarData)) {
          const formatted: CalendarEvent[] = calendarData.map((item: any) => {
            const task = tasksMap.get(item.taskId) || tasksMap.get(item._id);

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

          setEvents(formatted);
        }
      } catch (error) {
        console.error("Error al cargar datos del calendario:", error);
      }
    }

    void fetchCalendarAndTasks();
  }, [setEvents]);

  // Métricas calculadas para la barra lateral
  const totalEventsCount = events.length;
  const completedTasksCount = allTasksList.filter(
    (t) => t.status === "Completado" || t.status === "Finalizada"
  ).length;
  const pendingTasksCount =
    allTasksList.filter(
      (t) => t.status !== "Completado" && t.status !== "Finalizada"
    ).length || Math.max(0, totalEventsCount - completedTasksCount);

  return (
    <div className="max-w-[1600px] w-full mx-auto flex flex-col gap-6" data-purpose="application-root">
      {/* ========================================================================= */}
      {/* BEGIN: TopBar (Header de Google Stitch con estado, buscador y acciones) */}
      {/* ========================================================================= */}
      <header
        className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-3 border-b border-slate-200/70"
        data-purpose="header-section"
      >
        <div>
          <div className="flex items-center gap-2.5">
            <h1 className="text-2xl font-semibold tracking-tight text-slate-900">
              Mi calendario
            </h1>
            <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-slate-100 text-slate-800 border border-slate-200">
              <span className="w-1.5 h-1.5 rounded-full bg-slate-900 mr-1.5 animate-pulse" />
              En ritmo
            </span>
          </div>
          <p className="text-sm text-slate-500 mt-0.5">
            Gestiona tus proyectos, hitos clave y revisa la cadencia de tu equipo.
          </p>
        </div>

        {/* Acciones y controles rápidos */}
        <div className="flex items-center gap-2.5 flex-wrap sm:flex-nowrap">
          {/* CTA: Botón Nueva Tarea */}
          <Button
            typeBtn="button"
            icon={<PlusIcon className="size-3.5" />}
            labelBtn="Crear nueva tarea"
            onClick={openCreateTaskModal}
            className="px-3.5 py-1.5 text-xs font-medium text-white bg-slate-900 rounded-lg hover:bg-slate-800 shadow-xs transition-colors flex items-center gap-1.5 ml-1 cursor-pointer"
          />
        </div>
      </header>
      {/* END: TopBar */}

      {/* ========================================================================= */}
      {/* BEGIN: MainContentGrid (Grilla con Calendario + Sidebar de Métricas)     */}
      {/* ========================================================================= */}
      <main
        className="grid grid-cols-1 xl:grid-cols-12 gap-6 items-start"
        data-purpose="dashboard-layout"
      >
        {/* ======================================================================= */}
        {/* Columna Izquierda: Vista Principal del Calendario (8 Columnas en XL)     */}
        {/* ======================================================================= */}
        <section
          className="xl:col-span-8 bg-white border border-slate-200/80 rounded-2xl shadow-xs p-5 flex flex-col gap-5"
          data-purpose="calendar-main-view"
        >
          {/* Subcabecera de Navegación del Calendario */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              {/* Controles: Anterior, Hoy, Siguiente */}
              <div className="flex items-center bg-slate-100 p-0.5 rounded-lg border border-slate-200/60">
                <button
                  type="button"
                  onClick={handlePrevMonth}
                  className="p-1.5 text-slate-600 hover:text-slate-900 hover:bg-white rounded-md transition-colors cursor-pointer"
                  title="Anterior"
                >
                  <ChevronLeftIcon className="size-4" />
                </button>
                <button
                  type="button"
                  onClick={handleToday}
                  className="px-2.5 py-1 text-xs font-medium text-slate-700 hover:bg-white rounded-md transition-all cursor-pointer"
                >
                  Hoy
                </button>
                <button
                  type="button"
                  onClick={handleNextMonth}
                  className="p-1.5 text-slate-600 hover:text-slate-900 hover:bg-white rounded-md transition-colors cursor-pointer"
                  title="Siguiente"
                >
                  <ChevronRightIcon className="size-4" />
                </button>
              </div>

              {/* Título dinámico del mes/período actual */}
              <h2 className="text-lg font-semibold text-slate-900 tracking-tight capitalize">
                {calendarTitle || "Calendario"}
              </h2>
            </div>

            {/* Selector de Vistas: Mes / Semana / Día */}
            <div className="flex items-center bg-slate-100/80 p-0.5 rounded-lg border border-slate-200/60 self-start sm:self-auto">
              <button
                type="button"
                onClick={() => handleChangeView("dayGridMonth")}
                className={`px-3 py-1 text-xs font-semibold rounded-md transition-all cursor-pointer ${currentView === "dayGridMonth"
                  ? "bg-white text-slate-900 shadow-xs"
                  : "text-slate-500 hover:text-slate-900"
                  }`}
              >
                Mes
              </button>
              <button
                type="button"
                onClick={() => handleChangeView("timeGridWeek")}
                className={`px-3 py-1 text-xs font-medium rounded-md transition-all cursor-pointer ${currentView === "timeGridWeek"
                  ? "bg-white text-slate-900 font-semibold shadow-xs"
                  : "text-slate-500 hover:text-slate-900"
                  }`}
              >
                Semana
              </button>
              <button
                type="button"
                onClick={() => handleChangeView("timeGridDay")}
                className={`px-3 py-1 text-xs font-medium rounded-md transition-all cursor-pointer ${currentView === "timeGridDay"
                  ? "bg-white text-slate-900 font-semibold shadow-xs"
                  : "text-slate-500 hover:text-slate-900"
                  }`}
              >
                Día
              </button>
            </div>
          </div>

          {/* Grilla FullCalendar */}
          <div className="calendar-grid border border-slate-200 rounded-xl overflow-hidden shadow-[inset_0_1px_2px_rgba(0,0,0,0.02)]">
            <FullCalendar
              ref={calendarRef}
              plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
              initialView="dayGridMonth"
              locale="es"
              events={events}
              eventContent={(eventInfo) => <EventCustomContent {...eventInfo} />}
              datesSet={handleDatesSet}
              dateClick={handleDateClick}
              eventClick={handleEventClick}
              headerToolbar={false}
              dayMaxEvents={currentView === "timeGridDay" ? false : 3}
              moreLinkText={(num) => `+${num} más`}
              allDaySlot={true}
              allDayText="Todo el día"
              slotMinTime="07:00:00"
              slotMaxTime="22:00:00"
              scrollTime="08:00:00"
              expandRows={true}
              nowIndicator={true}
              slotDuration="01:00:00"
            />
          </div>
        </section>

        {/* ======================================================================= */}
        {/* Columna Derecha: Sidebar de Métricas (4 Columnas en XL)                 */}
        {/* ======================================================================= */}
        <CalendarKpiSidebar
          className="xl:col-span-4"
          totalEvents={totalEventsCount}
          completedTasks={completedTasksCount}
          pendingTasks={pendingTasksCount}
          onPlanForDate={openModal}
        />
      </main>
      {/* END: MainContentGrid */}

      {/* ========================================================================= */}
      {/* NOTIFICACIONES TOAST                                                     */}
      {/* ========================================================================= */}
      {showAssignmentToast && (
        <div className="fixed right-6 top-6 z-50 w-full max-w-sm">
          <Toast
            titleToast="Tareas asignadas correctamente"
            typeToast="success"
            isOpen={showAssignmentToast}
            onClose={closeAssignmentToast}
          />
        </div>
      )}

      {showDeleteToast && (
        <div className="fixed right-6 top-6 z-50 w-full max-w-sm">
          <Toast
            titleToast="Evento eliminado correctamente"
            typeToast="warning"
            isOpen={showDeleteToast}
            onClose={closeDeleteToast}
          />
        </div>
      )}

      {/* ========================================================================= */}
      {/* MODALES: Planificación de fecha y Creación de nueva tarea               */}
      {/* ========================================================================= */}
      {isOpen && (
        <Modal
          width="medium"
          modalTitle={
            selectedDateInfo?.dayName
              ? `Planificar Tarea - ${selectedDateInfo.dayName}`
              : "Seleccionar Tarea"
          }
          typeBtnConfirm="button"
          closeModal={closeModal}
          contentModal={
            <SelectTask
              onCloseParent={closeModal}
              selectedDate={selectedDateInfo?.dateStr}
              onTasksSelected={handleTasksSelected}
            />
          }
        />
      )}

      {/* Modal para CTA "Nueva tarea" del encabezado */}
      {isOpenCreateTask && (
        <Modal
          width="medium"
          modalTitle="Crear Nueva Tarea"
          typeBtnConfirm="submit"
          labelConfirm="Crear tarea"
          labelCancel="Cancelar"
          formId="CreateTask"
          Confirm={() => { }}
          Cancel={closeCreateTaskModal}
          closeModal={closeCreateTaskModal}
          contentModal={
            <CreateTask
              close={closeCreateTaskModal}
              showButtons={false}
              onSuccess={() => {
                closeCreateTaskModal();
              }}
            />
          }
        />
      )}
    </div>
  );
};
