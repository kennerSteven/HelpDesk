import React from "react";
import CalculateDaysBetween from "../../../Utils/CalculateDaysBetween";

interface TaskCardProps {
  id: string;
  name: string;
  description?: string;
  category?: string;
  status?: string;
  dateInit?: string;
  dateFinish: string;
  priority: string;
  steps?: Array<{ name: string; status: "PENDING" | "DONE" }>;
  onDelete: (id: string) => void;
  onEdit: (id: string) => void;
  onClick?: (id: string) => void;
  isSelected?: boolean;
}

export default React.memo(function TaskCard({
  id,
  name,
  description,
  category,
  status = "PENDING",
  dateInit: _dateInit,
  dateFinish,
  priority,
  steps,
  onDelete,
  onEdit,
  onClick,
  isSelected,
}: TaskCardProps) {
  // Configuración de Prioridad / Dificultad
  const normalizedPriority = priority?.toUpperCase?.() || "LOW";
  const priorityStyles: Record<
    string,
    { label: string; dotClass: string; textClass: string }
  > = {
    HIGH: {
      label: "Alta",
      dotClass: "bg-rose-500",
      textClass: "text-rose-600",
    },
    MEDIUM: {
      label: "Media",
      dotClass: "bg-amber-500",
      textClass: "text-amber-600",
    },
    LOW: {
      label: "Baja",
      dotClass: "bg-teal-500",
      textClass: "text-teal-600",
    },
  };

  const currentPriority = priorityStyles[normalizedPriority] ?? {
    label: priority || "Baja",
    dotClass: "bg-teal-500",
    textClass: "text-teal-600",
  };

  // Configuración de Estado
  const normalizedStatus = status?.toUpperCase?.() || "PENDING";
  const statusStyles: Record<
    string,
    { label: string; dotClass: string; textClass: string; chevronClass: string }
  > = {
    PENDING: {
      label: "Pendiente",
      dotClass: "bg-amber-500",
      textClass: "text-amber-600",
      chevronClass: "text-amber-500",
    },
    COMPLETED: {
      label: "Completada",
      dotClass: "bg-emerald-500",
      textClass: "text-emerald-600",
      chevronClass: "text-emerald-500",
    },
    EXPIRED: {
      label: "Expirada",
      dotClass: "bg-rose-500",
      textClass: "text-rose-600",
      chevronClass: "text-rose-500",
    },
  };

  const currentStatus = statusStyles[normalizedStatus] ?? {
    label: status || "Pendiente",
    dotClass: "bg-amber-500",
    textClass: "text-amber-600",
    chevronClass: "text-amber-500",
  };

  // Cálculo de tiempo restante relativo
  let daysText = "En 3 días";
  if (dateFinish) {
    const diff = CalculateDaysBetween(dateFinish);
    if (diff > 1) {
      daysText = `En ${diff} días`;
    } else if (diff === 1) {
      daysText = "Mañana";
    } else if (diff === 0) {
      daysText = "Hoy";
    } else if (diff === -1) {
      daysText = "Ayer";
    } else if (diff < -1) {
      daysText = `Venció hace ${Math.abs(diff)} días`;
    }
  }

  // Subtareas y progreso
  const totalSteps = steps?.length || 4;
  const completedSteps = steps
    ? steps.filter((s) => s.status === "DONE").length
    : 1;

  return (
    <article
      data-task-id={id}
      onClick={() => onClick?.(id)}
      className={`group relative flex flex-col justify-between rounded-2xl border bg-white p-5 shadow-[0_2px_8px_rgba(0,0,0,0.03)] hover:border-slate-300 hover:shadow-[0_8px_20px_rgba(0,0,0,0.05)] transition-all duration-200 ${
        isSelected
          ? "ring-2 ring-indigo-500 border-indigo-400"
          : "border-slate-200/90"
      } ${onClick ? "cursor-pointer" : ""}`}
    >
      <div>
        {/* Cabecera: Título a la izquierda, Acciones (Editar/Eliminar) a la derecha */}
        <div className="flex items-start justify-between gap-3">
          <h4 className="text-[17px] font-bold text-slate-900 tracking-tight leading-snug line-clamp-1 flex-1">
            {name}
          </h4>

          <div className="flex items-center gap-1 shrink-0">
            {/* Botón Editar */}
            <button
              type="button"
              onClick={(event) => {
                event.stopPropagation();
                onEdit(id);
              }}
              className="p-1 text-slate-400 hover:text-slate-600 transition-colors rounded-md hover:bg-slate-50"
              title="Editar"
            >
              <svg
                className="size-4"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.75"
                strokeLinecap="round"
                strokeLinejoin="round"
                viewBox="0 0 24 24"
              >
                <path d="M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z" />
                <path d="m15 5 4 4" />
              </svg>
            </button>

            {/* Botón Eliminar */}
            <button
              type="button"
              onClick={(event) => {
                event.stopPropagation();
                onDelete(id);
              }}
              className="p-1 text-slate-400 hover:text-rose-600 transition-colors rounded-md hover:bg-rose-50"
              title="Eliminar"
            >
              <svg
                className="size-4"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.75"
                strokeLinecap="round"
                strokeLinejoin="round"
                viewBox="0 0 24 24"
              >
                <path d="M3 6h18" />
                <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6" />
                <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" />
                <line x1="10" x2="10" y1="11" y2="17" />
                <line x1="14" x2="14" y1="11" y2="17" />
              </svg>
            </button>
          </div>
        </div>

        {/* Fila de Fecha Relativa y Fecha Límite */}
        <div className="flex items-center gap-1.5 text-slate-500 text-[13px] mt-1 font-medium">
          <svg
            className="size-3.5 text-slate-400 stroke-[1.8] shrink-0"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
          >
            <circle cx="12" cy="12" r="10" />
            <polyline points="12 6 12 12 16 14" />
          </svg>
          <span className="text-slate-600">{daysText}</span>
          <span className="text-slate-300 text-xs mx-0.5">•</span>
          <span className="text-slate-400 font-normal">
            {dateFinish || "2026-10-08"}
          </span>
        </div>

        {/* Fila de Descripción */}
        {description && (
          <p className="text-[14px] text-slate-600 leading-relaxed mt-3 line-clamp-2">
            {description}
          </p>
        )}

        {/* Fila de Metadatos: Dificultad y Categoría */}
        <div className="flex items-center text-[13px] text-slate-500 mt-3.5 mb-1 flex-wrap gap-y-1">
          <span className="flex items-center gap-1.5">
            <span
              className={`size-2 rounded-full ${currentPriority.dotClass} shrink-0`}
            />
            <span>Dificultad:</span>
            <span className={`font-semibold ${currentPriority.textClass}`}>
              {currentPriority.label}
            </span>
          </span>

          {category && (
            <>
              <span className="text-slate-300 text-xs mx-2.5">•</span>
              <span className="flex items-center gap-1">
                <span>Categoría:</span>
                <span className="font-semibold text-slate-700">{category}</span>
              </span>
            </>
          )}
        </div>
      </div>

      {/* Fila Inferior (Footer): Estado a la izquierda, Subtareas y Barra a la derecha */}
      <div className="flex items-center justify-between pt-3 mt-4 border-t border-slate-100 text-xs">
        {/* Estado con punto de color y chevron */}
        <div className="flex items-center gap-1.5 cursor-default select-none">
          <span className={`size-2 rounded-full ${currentStatus.dotClass}`} />
          <span
            className={`text-[13px] font-semibold ${currentStatus.textClass}`}
          >
            {currentStatus.label}
          </span>
          <svg
            className={`size-3.5 stroke-[2.5] ${currentStatus.chevronClass}`}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M19 9l-7 7-7-7"
            />
          </svg>
        </div>

        {/* Progreso de Subtareas con segmentos tipo cápsula */}
        <div className="flex items-center gap-2 text-slate-500">
          <svg
            className="size-3.5 text-slate-400 stroke-[1.8] shrink-0"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <circle cx="12" cy="12" r="10" />
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="m9 12 2 2 4-4"
            />
          </svg>
          <span className="text-[12px] font-medium text-slate-600">
            {completedSteps}/{totalSteps} subtareas
          </span>
          <div className="flex items-center gap-1 pl-0.5">
            {Array.from({ length: totalSteps }).map((_, i) => (
              <span
                key={i}
                className={`h-1.5 rounded-full transition-all ${
                  i < completedSteps ? "w-4 bg-slate-700" : "w-2 bg-slate-200"
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </article>
  );
});
