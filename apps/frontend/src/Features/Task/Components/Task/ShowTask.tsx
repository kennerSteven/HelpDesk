import React from "react";

interface ShowTaskProps {
  id: string;
  name: string;
  description?: string;
  category?: string;
  status?: string;
  dateInit: string;
  dateFinish: string;
  priority: string;
  onDelete: (id: string) => void;
  onEdit: (id: string) => void;
}

export default React.memo(function ShowTask({
  id,
  name,
  description,
  category,
  dateInit,
  dateFinish,
  priority,
  onDelete,
  onEdit,
}: ShowTaskProps) {
  const normalizedPriority = priority?.toUpperCase?.() || priority;

  const priorityStyles: Record<
    string,
    { label: string; badgeClass: string; dotClass: string }
  > = {
    HIGH: {
      label: "Alta",
      badgeClass: "bg-rose-50 text-rose-700 border-rose-200/80",
      dotClass: "bg-rose-500",
    },
    MEDIUM: {
      label: "Media",
      badgeClass: "bg-amber-50 text-amber-700 border-amber-200/80",
      dotClass: "bg-amber-500",
    },
    LOW: {
      label: "Baja",
      badgeClass: "bg-sky-50 text-sky-700 border-sky-200/80",
      dotClass: "bg-sky-500",
    },
  };

  const currentPriority = priorityStyles[normalizedPriority] ?? {
    label: priority || "Normal",
    badgeClass: "bg-slate-50 text-slate-700 border-slate-200",
    dotClass: "bg-slate-400",
  };

  return (
    <article
      data-task-id={id}
      className="group flex flex-col justify-between gap-3.5 rounded-2xl border border-slate-200/90 bg-white p-4 sm:p-4.5 shadow-2xs hover:shadow-md hover:border-slate-300 transition-all duration-200 h-full"
    >
      {/* Badges de Categoría y Prioridad */}
      <div className="flex flex-wrap items-center justify-between gap-2">
        <div className="flex flex-wrap items-center gap-1.5 min-w-0">
          {category && (
            <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold text-indigo-700 bg-indigo-50 border border-indigo-100 truncate max-w-[140px]">
              <svg
                className="size-3 text-indigo-500 shrink-0"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                viewBox="0 0 24 24"
              >
                <path
                  d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              <span className="truncate">{category}</span>
            </span>
          )}

          <span
            className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-semibold border ${currentPriority.badgeClass}`}
          >
            <span
              className={`size-1.5 rounded-full shrink-0 ${currentPriority.dotClass}`}
            />
            {currentPriority.label}
          </span>
        </div>
      </div>

      {/* Título y Descripción */}
      <div className="space-y-1">
        <h4 className="text-sm font-bold tracking-tight text-slate-900 group-hover:text-slate-800 line-clamp-1">
          {name}
        </h4>
        <p className="text-xs text-slate-500 line-clamp-2 leading-relaxed">
          {description || "Sin descripción"}
        </p>
      </div>

      {/* Fechas: Inicio y Fin en bloque compacto */}
      <div className="grid grid-cols-2 gap-2 rounded-xl border border-slate-100 bg-slate-50/80 p-2.5 text-xs">
        <div className="flex flex-col min-w-0">
          <span className="flex items-center gap-1 text-[10px] font-bold uppercase tracking-wider text-slate-400">
            <svg
              className="size-3 text-emerald-600 shrink-0"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24"
            >
              <path
                d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            Inicio
          </span>
          <span className="font-semibold text-slate-700 truncate mt-0.5 text-[11px]">
            {dateInit || "No definida"}
          </span>
        </div>

        <div className="flex flex-col min-w-0 border-l border-slate-200/60 pl-2">
          <span className="flex items-center gap-1 text-[10px] font-bold uppercase tracking-wider text-slate-400">
            <svg
              className="size-3 text-rose-500 shrink-0"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24"
            >
              <circle cx="12" cy="12" r="9" />
              <polyline points="12 7 12 12 15 15" />
            </svg>
            Límite
          </span>
          <span className="font-semibold text-slate-700 truncate mt-0.5 text-[11px]">
            {dateFinish || "No definida"}
          </span>
        </div>
      </div>

      {/* Botones de Acción */}
      <div className="flex items-center justify-end gap-2 border-t border-slate-100 pt-2.5">
        <button
          type="button"
          aria-label="Editar tarea"
          onClick={(event) => {
            event.stopPropagation();
            onEdit(id);
          }}
          className="inline-flex items-center gap-1.5 rounded-lg border border-slate-200 bg-white px-2.5 py-1.5 text-xs font-semibold text-slate-700 shadow-2xs transition hover:border-slate-300 hover:bg-slate-50 cursor-pointer"
        >
          <svg
            className="size-3.5 text-slate-400"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            viewBox="0 0 24 24"
          >
            <path
              d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          Editar
        </button>

        <button
          type="button"
          aria-label="Eliminar tarea"
          onClick={(event) => {
            event.stopPropagation();
            onDelete(id);
          }}
          className="inline-flex items-center gap-1.5 rounded-lg border border-rose-200 bg-rose-50/80 px-2.5 py-1.5 text-xs font-semibold text-rose-700 transition hover:bg-rose-100 cursor-pointer"
        >
          <svg
            className="size-3.5 text-rose-500"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            viewBox="0 0 24 24"
          >
            <path
              d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          Eliminar
        </button>
      </div>
    </article>
  );
});

