import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import { EventCustomContent } from "./EventCustomContent";
import SelectTask from "./SelectTask";
import Modal from "../../../Components/Modal/Modal";
import Toast from "../../../Components/Toast/Toast";
import CreateTask from "../../Task/Components/CreateTask/CreateTask";
import { ChevronLeftIcon, ChevronRightIcon } from "../../../Components/Icons";
import useHandleCalendar from "../Hooks/useHandleCalendar";
import type { CalendarEvent } from "../Types/types";
import useModal from "../../../Hooks/useModal";
import useShowToast from "../../../Hooks/useShowToast";
import useCalendarKpi from "./Kpi/useCalendarKpi";
import CalendarKpi from "./Kpi/CalendarKpi";

interface CalendarProps {
  initialEvents?: CalendarEvent[];
}

export const Calendar = ({ initialEvents = [] }: CalendarProps) => {
  const { Calendar, taskNames } = useCalendarKpi();
  console.log("Calendar Date", taskNames);
  console.log("Calendar payload", Calendar);
  const { isOpen: isOpenCreateTask, closeModal: closeCreateTaskModal } =
    useModal();

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

  const {
    isOpen: showCreateSuccessToast,
    showToast: openCreateSuccessToast,
    closeToast: closeCreateSuccessToast,
  } = useShowToast();

  const {
    calendarRef,
    events,
    currentView,
    calendarTitle,
    selectedDateInfo,
    isOpen,
    closeModal,
    handleDatesSet,
    handleDateClick,
    handleEventClick,
    handleTasksSelected,
    handleNextMonth,
    handlePrevMonth,
    handleToday,
    handleChangeView,
  } = useHandleCalendar(initialEvents, {
    onAssignmentSuccess: showAssignmentSuccess,
    onDeleteSuccess: showDeleteSuccess,
  });

  // const totalEventsCount = events.length;
  // const completedTasksCount = allTasksList.filter(
  //   (t) => t.status === "Completado" || t.status === "Finalizada",
  // ).length;
  // const pendingTasksCount =
  //   allTasksList.filter(
  //     (t) => t.status !== "Completado" && t.status !== "Finalizada",
  //   ).length || Math.max(0, totalEventsCount - completedTasksCount);

  return (
    <div className="max-w-[1600px] w-full mx-auto flex flex-col gap-6 justify-between">
      {/* ========================================================================= */}
      {/* BEGIN: MainContentGrid (Grilla con Calendario + Sidebar de Métricas)     */}
      {/* ========================================================================= */}

      <main
        className="grid grid-cols-10 xl:grid-cols-10 gap-6 items-start"
        data-purpose="dashboard-layout"
      >
        {/* ======================================================================= */}
        {/* Columna Izquierda: Vista Principal del Calendario (6 Columnas en XL)     */}
        {/* ======================================================================= */}
        <section
          className="xl:col-span-7 bg-white border border-slate-200/80 rounded-2xl shadow-xs p-5 flex flex-col gap-5"
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
                className={`px-3 py-1 text-xs font-semibold rounded-md transition-all cursor-pointer ${
                  currentView === "dayGridMonth"
                    ? "bg-white text-slate-900 shadow-xs"
                    : "text-slate-500 hover:text-slate-900"
                }`}
              >
                Mes
              </button>
              <button
                type="button"
                onClick={() => handleChangeView("timeGridWeek")}
                className={`px-3 py-1 text-xs font-medium rounded-md transition-all cursor-pointer ${
                  currentView === "timeGridWeek"
                    ? "bg-white text-slate-900 font-semibold shadow-xs"
                    : "text-slate-500 hover:text-slate-900"
                }`}
              >
                Semana
              </button>
              <button
                type="button"
                onClick={() => handleChangeView("timeGridDay")}
                className={`px-3 py-1 text-xs font-medium rounded-md transition-all cursor-pointer ${
                  currentView === "timeGridDay"
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
              eventContent={(eventInfo) => (
                <EventCustomContent {...eventInfo} />
              )}
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
        {/* Columna Derecha: Sidebar de Métricas / KPI (4 Columnas en XL)           */}
        {/* ======================================================================= */}
        <aside className="xl:col-span-3 w-full">
          <CalendarKpi tasks={taskNames} />
        </aside>
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

      {showCreateSuccessToast && (
        <div className="fixed right-6 top-6 z-50 w-full max-w-sm">
          <Toast
            titleToast="Se ha creado una nueva tarea"
            typeToast="success"
            isOpen={showCreateSuccessToast}
            onClose={closeCreateSuccessToast}
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
              onTaskCreated={openCreateSuccessToast}
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
          Confirm={() => {}}
          Cancel={closeCreateTaskModal}
          closeModal={closeCreateTaskModal}
          contentModal={
            <CreateTask
              onSuccess={() => {
                closeCreateTaskModal();
                openCreateSuccessToast();
              }}
            />
          }
        />
      )}
    </div>
  );
};
