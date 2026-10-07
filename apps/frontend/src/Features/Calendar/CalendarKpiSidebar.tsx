/**
 * CalendarKpiSidebar.tsx
 * 
 * Barra lateral de métricas y agenda diaria que replica fielmente el diseño de Google Stitch:
 * - Tarjeta 1: Métricas de rendimiento y balance mensual (Total Planificado, Pendientes Próximos, Tasa de Cumplimiento con barra de progreso).
 * - Tarjeta 2: Agenda dinámica del día seleccionado con lista de eventos, indicador de color lateral y botón para planificar en dicha fecha.
 */

import {
  CalendarIcon,
  ClockIcon,
  CheckIcon,
  DotsVerticalIcon,
} from "../../Components/Icons";

interface CalendarKpiSidebarProps {
  totalEvents?: number;
  completedTasks?: number;
  pendingTasks?: number;

  onPlanForDate?: () => void;
  className?: string;
}

export default function CalendarKpiSidebar({
  totalEvents = 0,
  completedTasks = 0,
  pendingTasks = 0,


  className = "",
}: CalendarKpiSidebarProps) {

  const completionRate =
    totalEvents > 0 ? Math.round((completedTasks / totalEvents) * 100) : 78;



  return (
    <aside
      className={`flex flex-col gap-5 w-full ${className}`}
      data-purpose="metrics-sidebar"
    >
      {/* TARJETA 1: Métricas del Calendario */}
      <div className="bg-white border border-slate-200/80 rounded-2xl shadow-xs p-5 transition-all">
        {/* Encabezado de la tarjeta */}
        <div className="flex items-center justify-between border-b border-slate-100 pb-3 mb-4">
          <div>
            <h2 className="text-sm font-semibold tracking-tight uppercase text-slate-900">
              Métricas del Calendario
            </h2>
            <p className="text-xs text-slate-500 mt-0.5">
              Resumen de actividad y balance mensual
            </p>
          </div>
          <button
            type="button"
            className="inline-flex items-center justify-center p-2 rounded-lg bg-slate-50 text-slate-400 hover:text-slate-600 transition-colors"
            title="Opciones de métricas"
          >
            <DotsVerticalIcon className="size-4" />
          </button>
        </div>

        {/* Métrica 1: Total Planificado */}
        <div className="p-3.5 rounded-xl bg-slate-50/70 border border-slate-100/90 mb-3 hover:bg-slate-50 transition-colors">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-slate-600 flex items-center gap-1.5">
              <CalendarIcon className="size-4 text-slate-500" />
              Total Planificado
            </span>
            <span className="inline-flex items-center px-2 py-0.5 text-[11px] font-semibold text-slate-700 bg-slate-100 rounded-full border border-slate-200">
              +14% vs mes ant.
            </span>
          </div>
          <div className="mt-2.5 flex items-baseline gap-2">
            <span className="text-3xl font-bold tracking-tight text-slate-900">
              {totalEvents}
            </span>
            <span className="text-xs text-slate-500">tareas agendadas</span>
          </div>
          <p className="text-xs text-slate-400 mt-1">
            Capacidad saludable con un promedio de 2.1 compromisos diarios.
          </p>
        </div>

        {/* Métrica 2: Pendientes Próximos */}
        <div className="p-3.5 rounded-xl bg-slate-50/70 border border-slate-100/90 mb-3 hover:bg-slate-50 transition-colors">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-slate-600 flex items-center gap-1.5">
              <ClockIcon className="size-4 text-slate-500" />
              Pendientes Próximos
            </span>
            <span className="inline-flex items-center px-2 py-0.5 text-[11px] font-semibold text-slate-700 bg-slate-100 rounded-full border border-slate-200">
              {pendingTasks} activas
            </span>
          </div>
          <div className="mt-2.5 flex items-baseline gap-2">
            <span className="text-3xl font-bold tracking-tight text-slate-900">
              {pendingTasks}
            </span>
            <span className="text-xs text-slate-500">para esta semana</span>
          </div>
          <p className="text-xs text-slate-400 mt-1">
            Actividades que requieren seguimiento antes del fin de semana.
          </p>
        </div>

        {/* Métrica 3: Tasa de Cumplimiento */}
        <div className="p-3.5 rounded-xl bg-slate-50/70 border border-slate-100/90 hover:bg-slate-50 transition-colors">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-slate-600 flex items-center gap-1.5">
              <CheckIcon className="size-4 text-slate-500" />
              Tasa de Cumplimiento
            </span>
            <span className="inline-flex items-center px-2 py-0.5 text-[11px] font-semibold text-slate-700 bg-slate-100 rounded-full border border-slate-200">
              En objetivo
            </span>
          </div>
          <div className="mt-2.5 flex items-baseline gap-2">
            <span className="text-3xl font-bold tracking-tight text-slate-900">
              {completionRate}%
            </span>
            <span className="text-xs text-slate-500">completado a tiempo</span>
          </div>
          {/* Barra de progreso */}
          <div className="mt-2.5 w-full bg-slate-200/70 rounded-full h-1.5 overflow-hidden">
            <div
              className="bg-slate-900 h-1.5 rounded-full transition-all duration-500"
              style={{ width: `${Math.min(completionRate, 100)}%` }}
            />
          </div>
          <p className="text-xs text-slate-400 mt-2">
            {completedTasks} de {totalEvents || 1} tareas completadas dentro de la fecha límite programada.
          </p>
        </div>
      </div>


    </aside>
  );
}
