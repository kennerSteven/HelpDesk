import { useState } from "react";

interface PriorityQuickFilterProps {
  selectedPriority?: string;
  onPriorityChange?: (priorityId: string) => void;
  counts?: {
    all?: number;
    high?: number;
    medium?: number;
    low?: number;
  };
}

export default function PriorityQuickFilter({
  selectedPriority = "all",
  onPriorityChange,
  counts = { all: 12, high: 3, medium: 5, low: 4 },
}: PriorityQuickFilterProps) {
  const [internalActive, setInternalActive] = useState(selectedPriority);

  const activeId = onPriorityChange ? selectedPriority : internalActive;

  const handleSelect = (id: string) => {
    setInternalActive(id);
    onPriorityChange?.(id);
  };

  const priorityCards = [
    {
      id: "all",
      label: "Todas",
      subtitle: "Todas las tareas",
      count: counts.all ?? 12,
      dotColor: null,
    },
    {
      id: "high",
      label: "Alta",
      subtitle: "Prioridad alta",
      count: counts.high ?? 3,
      dotColor: "bg-rose-500",
    },
    {
      id: "medium",
      label: "Media",
      subtitle: "Prioridad media",
      count: counts.medium ?? 5,
      dotColor: "bg-amber-500",
    },
    {
      id: "low",
      label: "Baja",
      subtitle: "Prioridad baja",
      count: counts.low ?? 4,
      dotColor: "bg-sky-500",
    },
  ];

  return (
    <div className="rounded-2xl border border-slate-200/90 bg-white p-5 shadow-sm space-y-3.5">
      {/* Cabecera de Prioridad */}
      <div className="flex items-center justify-between pb-0.5">
        <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
          PRIORIDAD
        </span>
        <span className="text-xs text-slate-400 font-medium">4 niveles</span>
      </div>

      {/* Lista de niveles de prioridad */}
      <nav aria-label="Filtro de prioridades" className="space-y-1.5">
        {priorityCards.map((card) => {
          const isActive = activeId === card.id;

          if (isActive) {
            return (
              <button
                key={card.id}
                type="button"
                onClick={() => handleSelect(card.id)}
                className="w-full flex items-center justify-between p-3.5 rounded-2xl bg-[#0B132B] text-white shadow-sm cursor-pointer transition-all text-left"
              >
                <div>
                  <div className="text-[15px] font-bold text-white tracking-tight leading-tight">
                    {card.label}
                  </div>
                  <div className="text-[12px] text-slate-400 mt-0.5 font-normal">
                    {card.subtitle}
                  </div>
                </div>

                <span className="inline-flex items-center justify-center min-w-[28px] h-6 px-2.5 text-xs font-bold rounded-lg bg-slate-800 text-slate-200">
                  {card.count}
                </span>
              </button>
            );
          }

          return (
            <button
              key={card.id}
              type="button"
              onClick={() => handleSelect(card.id)}
              className="w-full flex items-center justify-between p-2.5 rounded-xl hover:bg-slate-50 transition-colors text-left cursor-pointer group"
            >
              <div className="flex items-center gap-3">
                {card.dotColor ? (
                  <span
                    className={`size-2 rounded-full shrink-0 ${card.dotColor}`}
                  />
                ) : (
                  <span className="size-2 rounded-full shrink-0 bg-transparent" />
                )}
                <div>
                  <div className="text-sm font-semibold text-slate-800 leading-tight group-hover:text-slate-900">
                    {card.label}
                  </div>
                  <div className="text-xs text-slate-400 mt-0.5 font-normal">
                    {card.subtitle}
                  </div>
                </div>
              </div>

              <span className="text-xs font-medium text-slate-400 mr-1">
                {card.count}
              </span>
            </button>
          );
        })}
      </nav>
    </div>
  );
}
