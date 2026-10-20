import React, { useState } from "react";
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
  const [showSubtasks, setShowSubtasks] = useState(false);
  const hasSteps = Boolean(steps && steps.length > 0);
  const totalSteps = steps?.length || 0;
  const completedSteps = steps
    ? steps.filter((s) => s.status === "DONE").length
    : 0;

  const isAllCompleted = totalSteps > 0 && totalSteps === completedSteps;
  const isCompleted = isAllCompleted || normalizedStatus === "COMPLETED";

  const currentStatus = statusStyles[isCompleted ? "COMPLETED" : normalizedStatus] ?? {
    label: status || "Pendiente",
    dotClass: "bg-amber-500",
    textClass: "text-amber-600",
    chevronClass: "text-amber-500",
  };

  return (
    <article
      data-task-id={id}
      onClick={() => onClick?.(id)}
      className={`group relative flex flex-col justify-between rounded-2xl border bg-white p-5 shadow-[0_2px_8px_rgba(0,0,0,0.03)] hover:border-slate-300 hover:shadow-[0_8px_20px_rgba(0,0,0,0.05)] transition-all duration-200 ${
        isSelected
          ? "ring-2 ring-indigo-500 border-indigo-400"
          : isCompleted
            ? "border-emerald-200/90 bg-emerald-50/15"
            : "border-slate-200/90"
      } ${onClick ? "cursor-pointer" : ""}`}
    >
      <div>
        {/* Cabecera: Título a la izquierda, Acciones (Editar/Eliminar) a la derecha */}
        <div className="flex items-start justify-between gap-3">
          <h4
            className={`text-[17px] font-bold tracking-tight leading-snug line-clamp-1 flex-1 transition-all ${
              isCompleted
                ? "line-through text-slate-400 decoration-emerald-500/80 decoration-2"
                : "text-slate-900"
            }`}
          >
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
          <p
            className={`text-[14px] leading-relaxed mt-3 line-clamp-2 transition-all ${
              isCompleted
                ? "line-through text-slate-400 decoration-emerald-500/60"
                : "text-slate-600"
            }`}
          >
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

        {/* Badge Clickeable para ver Subtareas */}
        {hasSteps ? (
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              setShowSubtasks((prev) => !prev);
            }}
            className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-semibold transition-all cursor-pointer border shadow-2xs active:scale-95 ${
              isAllCompleted
                ? showSubtasks
                  ? "bg-emerald-100/90 text-emerald-800 border-emerald-300 ring-2 ring-emerald-500/20"
                  : "bg-emerald-50 text-emerald-700 border-emerald-200/90 hover:bg-emerald-100/80"
                : showSubtasks
                  ? "bg-indigo-50 text-indigo-700 border-indigo-200 ring-2 ring-indigo-500/20"
                  : "bg-slate-50 hover:bg-slate-100 text-slate-700 border-slate-200/90 hover:border-slate-300"
            }`}
            title="Clic para ver las subtareas"
          >
            {isAllCompleted ? (
              <svg
                className="size-3.5 text-emerald-600 stroke-[2.4] shrink-0"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M4.5 12.75l6 6 9-13.5"
                />
              </svg>
            ) : (
              <svg
                className={`size-3.5 transition-colors ${
                  showSubtasks ? "text-indigo-600" : "text-slate-500"
                }`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <circle cx="12" cy="12" r="10" strokeWidth="1.8" />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="1.8"
                  d="m9 12 2 2 4-4"
                />
              </svg>
            )}
            <span>
              {completedSteps}/{totalSteps} subtareas
            </span>
            <svg
              className={`size-3 transition-transform duration-200 ${
                showSubtasks
                  ? isAllCompleted
                    ? "rotate-180 text-emerald-700"
                    : "rotate-180 text-indigo-600"
                  : isAllCompleted
                    ? "text-emerald-500"
                    : "text-slate-400"
              }`}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M19 9l-7 7-7-7"
              />
            </svg>
          </button>
        ) : (
          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-medium text-slate-400 bg-slate-50 border border-slate-100">
            0 subtareas
          </span>
        )}
      </div>

      {/* Lista desplegable de subtareas al hacer clic en el badge */}
      {showSubtasks && hasSteps && (
        <div
          onClick={(e) => e.stopPropagation()}
          className="mt-3 pt-3 border-t border-dashed border-slate-200 flex flex-col gap-2 transition-all animate-fadeIn"
        >
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
              Subtareas ({completedSteps}/{totalSteps})
            </span>
          </div>

          <div className="flex flex-col gap-1.5 max-h-[140px] overflow-y-auto pr-1 scrollbar-custom">
            {steps?.map((step, idx) => {
              const isDone = step.status === "DONE";
              return (
                <div
                  key={idx}
                  className={`flex items-start gap-2 p-2 rounded-lg text-xs transition-colors ${
                    isDone
                      ? "bg-emerald-50/50 text-slate-500"
                      : "bg-slate-50 text-slate-700 hover:bg-slate-100/80"
                  }`}
                >
                  <span
                    className={`leading-snug break-words ${
                      isDone ? "line-through text-slate-400" : "font-medium"
                    }`}
                  >
                    {step.name}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </article>
  );
});
