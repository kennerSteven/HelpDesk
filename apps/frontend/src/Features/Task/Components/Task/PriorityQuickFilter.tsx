export default function PriorityQuickFilter() {
  const priorityCards = [
    {
      id: "all",
      label: "Todas",
      subtitle: "Todas las tareas",
      count: "12",
      active: true,
      dotColor: null,
      badgeClass: "bg-slate-800 text-slate-200",
    },
    {
      id: "high",
      label: "Alta",
      subtitle: "Prioridad alta",
      count: "3",
      active: false,
      dotColor: "bg-rose-500",
      badgeClass: "bg-slate-100 text-slate-600",
    },
    {
      id: "medium",
      label: "Media",
      subtitle: "Prioridad media",
      count: "5",
      active: false,
      dotColor: "bg-amber-500",
      badgeClass: "bg-slate-100 text-slate-600",
    },
    {
      id: "low",
      label: "Baja",
      subtitle: "Prioridad baja",
      count: "4",
      active: false,
      dotColor: "bg-sky-500",
      badgeClass: "bg-slate-100 text-slate-600",
    },
  ];

  return (
    <div className="rounded-2xl border border-slate-200/80 bg-slate-50/70 p-4 sm:p-5 space-y-4 shadow-xs">
      <div className="flex items-center justify-between px-1">
        <span className="text-xs font-bold uppercase tracking-wider text-slate-700">
          Prioridad
        </span>
        <span className="text-xs text-slate-400 font-medium">4 niveles</span>
      </div>

      <nav aria-label="Filtro de prioridades" className="space-y-2">
        {priorityCards.map((card) => (
          <button
            key={card.id}
            type="button"
            className={`w-full flex items-center justify-between p-3.5 rounded-xl transition text-left cursor-pointer ${
              card.active
                ? "bg-slate-900 text-white shadow-sm hover:bg-slate-800"
                : "bg-white border border-slate-200/90 hover:border-slate-300 hover:shadow-xs shadow-2xs group"
            }`}
          >
            <div className="flex items-center gap-3">
              {card.dotColor && (
                <span className={`w-2.5 h-2.5 rounded-full shrink-0 ${card.dotColor}`} />
              )}
              <div>
                <div
                  className={`font-semibold text-sm ${
                    card.active
                      ? "text-white"
                      : "text-slate-800 group-hover:text-slate-900"
                  }`}
                >
                  {card.label}
                </div>
                <div
                  className={`text-xs ${
                    card.active ? "text-slate-300" : "text-slate-500"
                  }`}
                >
                  {card.subtitle}
                </div>
              </div>
            </div>

            <span
              className={`inline-flex items-center justify-center min-w-[24px] h-6 px-2 text-xs font-semibold rounded-md ${card.badgeClass}`}
            >
              {card.count}
            </span>
          </button>
        ))}
      </nav>
    </div>
  );
}

