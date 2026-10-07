import React from "react";

interface TaskCardProps {
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
  onClick: (id: string) => void;
  isSelected?: boolean;
}

export default React.memo(function TaskCard({
  id,
  name,
  description,
  category,
  dateInit,
  dateFinish,
  priority,
  onDelete,
  onEdit,
  onClick,
  isSelected = false,
}: TaskCardProps) {
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
      onClick={() => onClick(id)}
      data-task-id={id}
      className={`group flex flex-col md:flex-row md:items-center justify-between gap-3 py-3.5 px-3 sm:px-4 transition-colors duration-200 w-full cursor-pointer first:rounded-t-[20px] last:rounded-b-[20px] ${
        isSelected ? "bg-blue-50/50" : "bg-transparent hover:bg-zinc-50/70"
      }`}
    >
      <div className="flex flex-col gap-3 md:flex-row md:items-center md:flex-1 md:gap-4 min-w-0">
        {/* Selection Indicator (Apple Style) */}
        <div className="shrink-0 pt-1 md:pt-0">
          <div
            className={`flex items-center justify-center size-5 rounded-full border transition-colors ${
              isSelected
                ? "bg-blue-500 border-blue-500 text-white"
                : "border-zinc-300 bg-transparent group-hover:border-zinc-400"
            }`}
          >
            {isSelected && (
              <svg
                className="size-3.5"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M5 13l4 4L19 7"
                />
              </svg>
            )}
          </div>
        </div>

        {/* Col 1: Título y Descripción */}
        <div className="flex-1 min-w-0">
          <h4 className="text-[15px] font-semibold tracking-tight text-zinc-900 truncate">
            {name}
          </h4>
          <p className="text-[13px] text-zinc-500 truncate mt-0.5">
            {description || "Sin descripción"}
          </p>
        </div>

        {/* Col 2: Badges de Categoría y Prioridad */}
        <div className="flex items-center gap-2 md:w-[160px] shrink-0">
          {category && (
            <span className="inline-flex items-center px-2 py-0.5 rounded-md text-[11px] font-medium text-indigo-700 bg-indigo-50/80 truncate max-w-[120px]">
              <span className="truncate">{category}</span>
            </span>
          )}
          <span
            className={`inline-flex items-center gap-1.5 px-2 py-0.5 rounded-md text-[11px] font-medium ${
              normalizedPriority === "HIGH"
                ? "text-rose-700 bg-rose-50/80"
                : normalizedPriority === "MEDIUM"
                  ? "text-amber-700 bg-amber-50/80"
                  : normalizedPriority === "LOW"
                    ? "text-sky-700 bg-sky-50/80"
                    : "text-zinc-700 bg-zinc-100/80"
            }`}
          >
            {currentPriority.label}
          </span>
        </div>

        {/* Col 3: Fechas (Ultra clean, no boxes) */}
        <div className="flex flex-col md:w-[120px] shrink-0 space-y-0.5">
          <div className="flex items-center gap-1.5 text-[12px] text-zinc-500 truncate">
            <span className="w-[8px] h-[8px] rounded-full border border-emerald-500 shrink-0"></span>
            <span className="truncate">{dateInit || "-"}</span>
          </div>
          <div className="flex items-center gap-1.5 text-[12px] text-zinc-500 truncate">
            <span className="w-[8px] h-[8px] rounded-full bg-rose-500 shrink-0"></span>
            <span className="truncate">{dateFinish || "-"}</span>
          </div>
        </div>
      </div>

      {/* Botones de Acción */}
      <div className="flex items-center justify-end gap-2 pt-2 md:pt-0 shrink-0">
        <button
          type="button"
          onClick={(event) => {
            event?.stopPropagation();
            onEdit(id);
          }}
          className="p-1.5 text-blue-500 hover:bg-blue-50 rounded-lg transition-colors"
          title="Editar"
        >
          <svg
            className="size-4.5"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"
            />
          </svg>
        </button>
        <button
          type="button"
          onClick={(event) => {
            event?.stopPropagation();
            onDelete(id);
          }}
          className="p-1.5 text-[#FF3B30] hover:bg-red-50 rounded-lg transition-colors"
          title="Eliminar"
        >
          <svg
            className="size-4.5"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
            />
          </svg>
        </button>
      </div>
    </article>
  );
});
