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
  onClick?: (id: string) => void;
  isSelected?: boolean;
}

export default React.memo(function TaskCard({
  id,
  name,
  description,
  category,
  status = "Pendiente",
  dateInit: _dateInit,
  dateFinish,
  priority,
  onDelete,
  onEdit,
}: TaskCardProps) {
  const normalizedPriority = priority?.toUpperCase?.() || priority;

  const priorityStyles: Record<
    string,
    { label: string; badgeClass: string; dotClass: string }
  > = {
    HIGH: {
      label: "Alta",
      badgeClass: "bg-rose-50 text-rose-700 border-rose-100",
      dotClass: "bg-rose-500",
    },
    MEDIUM: {
      label: "Media",
      badgeClass: "bg-amber-50 text-amber-700 border-amber-100",
      dotClass: "bg-amber-500",
    },
    LOW: {
      label: "Baja",
      badgeClass: "bg-teal-50 text-teal-700 border-teal-100",
      dotClass: "bg-teal-500",
    },
  };

  const currentPriority = priorityStyles[normalizedPriority] ?? {
    label: priority || "Baja",
    badgeClass: "bg-teal-50 text-teal-700 border-teal-100",
    dotClass: "bg-teal-500",
  };

  return (
    <article
      data-task-id={id}
      className="group relative flex flex-col justify-between rounded-[22px] border border-zinc-200/90 bg-white p-5 shadow-[0_2px_12px_rgba(0,0,0,0.04)] hover:border-zinc-300 hover:shadow-[0_8px_24px_rgba(0,0,0,0.07)] transition-all duration-200"
    >
      {/* Fila superior: Título a la izquierda, Badge + Acciones + Fecha a la derecha */}
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-start gap-3 min-w-0 flex-1">
          {/* Título de la tarea */}
          <h4 className="text-[16px] font-bold tracking-tight text-zinc-900 leading-snug">
            {name}
          </h4>
        </div>

        {/* Lado derecho superior: Indicador 'En 3 días' + Editar / Eliminar + Fecha */}
        <div className="flex flex-col items-end shrink-0">
          <div className="flex items-center gap-2">
            {/* Indicador estático: 'En 3 días' */}
            <span className="inline-flex items-center gap-1.5 rounded-full border border-sky-100 bg-sky-50 px-2.5 py-1 text-xs font-semibold text-sky-600">
              <svg
                className="size-3.5 text-sky-500"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <circle cx="12" cy="12" r="10" strokeWidth="2" />
                <path strokeLinecap="round" strokeWidth="2" d="M12 6v6l4 2" />
              </svg>
              En 3 días
            </span>

            {/* Botón Editar */}
            <button
              type="button"
              onClick={(event) => {
                event.stopPropagation();
                onEdit(id);
              }}
              className="p-1 text-zinc-400 hover:text-zinc-600 transition-colors"
              title="Editar"
            >
              <svg
                className="size-4"
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

            {/* Botón Eliminar */}
            <button
              type="button"
              onClick={(event) => {
                event.stopPropagation();
                onDelete(id);
              }}
              className="p-1 text-zinc-400 hover:text-rose-600 transition-colors"
              title="Eliminar"
            >
              <svg
                className="size-4"
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

          {/* Fecha estática / formateada */}
          <span className="text-[12px] font-medium text-zinc-400 mt-1">
            {dateFinish || "11 Oct, 2026"}
          </span>
        </div>
      </div>

      {/* Fila de Badges: Dificultad y Categoría */}
      <div className="flex flex-wrap items-center gap-2 mt-2.5">
        {/* Badge de Dificultad */}
        <span
          className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-xs font-semibold border ${currentPriority.badgeClass}`}
        >
          <span
            className={`size-1.5 rounded-full ${currentPriority.dotClass}`}
          />
          <span className="font-medium opacity-75">Dificultad:</span>
          <span>{currentPriority.label}</span>
        </span>

        {/* Badge de Categoría */}
        {category && (
          <span className="inline-flex items-center gap-1 rounded-full bg-purple-50 px-2.5 py-0.5 text-xs font-medium text-purple-700 border border-purple-100/60">
            <span className="opacity-75">Categoría:</span>
            <span className="font-semibold">{category}</span>
          </span>
        )}
      </div>

      {/* Fila de Descripción */}
      {description && (
        <p className="text-[14px] text-zinc-600 leading-relaxed mt-2.5">
          {description}
        </p>
      )}

      {/* Fila Inferior (Footer): Estado + Contador de Subtareas */}
      <div className="flex flex-wrap items-center gap-2.5 mt-4 pt-1">
        {/* Estado: Pendiente */}
        <div className="inline-flex items-center gap-2 rounded-full border border-amber-200/60 bg-amber-50/80 px-3 py-1 text-xs font-semibold text-amber-700">
          <span className="size-2 rounded-full bg-amber-500" />
          <span>{status || "Pendiente"}</span>
          <svg
            className="size-3 text-amber-600"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M19 9l-7 7-7-7"
            />
          </svg>
        </div>

        {/* Contador estático: 1/4 subtareas con barras de progreso */}
        <div className="inline-flex items-center gap-2 rounded-full border border-zinc-200/60 bg-zinc-50/80 px-3 py-1 text-xs font-medium text-zinc-600">
          <svg
            className="size-3.5 text-zinc-400"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            viewBox="0 0 24 24"
          >
            <circle cx="12" cy="12" r="10" />
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M9 12l2 2 4-4"
            />
          </svg>
          <span>1/4 subtareas</span>
          <div className="flex items-center gap-1 pl-0.5">
            <span className="h-1.5 w-3 rounded-full bg-amber-500" />
            <span className="h-1.5 w-3 rounded-full bg-zinc-200" />
            <span className="h-1.5 w-3 rounded-full bg-zinc-200" />
            <span className="h-1.5 w-3 rounded-full bg-zinc-200" />
          </div>
        </div>
      </div>
    </article>
  );
});
