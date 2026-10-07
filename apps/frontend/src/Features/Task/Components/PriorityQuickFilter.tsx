export default function PriorityQuickFilter() {
  const priorityCards = [
    {
      id: "all",
      label: "Todas",
      subtitle: "Todas las tareas",
      count: "12",
      active: true,
      dotColor: null,
      badgeClass: "bg-zinc-800 text-zinc-200",
    },
    {
      id: "high",
      label: "Alta",
      subtitle: "Prioridad alta",
      count: "3",
      active: false,
      dotColor: "bg-rose-500",
      badgeClass: "bg-zinc-100 text-zinc-600",
    },
    {
      id: "medium",
      label: "Media",
      subtitle: "Prioridad media",
      count: "5",
      active: false,
      dotColor: "bg-amber-500",
      badgeClass: "bg-zinc-100 text-zinc-600",
    },
    {
      id: "low",
      label: "Baja",
      subtitle: "Prioridad baja",
      count: "4",
      active: false,
      dotColor: "bg-sky-500",
      badgeClass: "bg-zinc-100 text-zinc-600",
    },
  ];

  return (
    <div className="rounded-[28px] border border-zinc-100/80 bg-white p-5 sm:p-6 space-y-4 shadow-[0_4px_24px_rgba(0,0,0,0.03)]">
      <div className="flex items-center justify-between px-1 pb-1">
        <span className="text-[13px] font-bold uppercase tracking-wider text-zinc-500">
          Prioridad
        </span>
        <span className="text-[13px] text-zinc-400 font-medium">4 niveles</span>
      </div>

      <nav aria-label="Filtro de prioridades" className="space-y-2">
        {priorityCards.map((card) => (
          <button
            key={card.id}
            type="button"
            className={`w-full flex items-center justify-between p-3.5 rounded-[16px] transition-all duration-300 text-left cursor-pointer ${
              card.active
                ? "bg-zinc-900 text-white shadow-[0_4px_12px_rgba(0,0,0,0.1)] scale-[1.02]"
                : "bg-zinc-50/50 border border-transparent hover:bg-white hover:border-zinc-200/80 hover:shadow-sm group"
            }`}
          >
            <div className="flex items-center gap-3.5">
              {card.dotColor ? (
                <span className={`w-3 h-3 rounded-full shrink-0 ${card.dotColor} shadow-sm`} />
              ) : (
                <span className="w-3 h-3 rounded-full shrink-0 bg-transparent" />
              )}
              <div>
                <div
                  className={`font-semibold text-[15px] tracking-tight ${
                    card.active
                      ? "text-white"
                      : "text-zinc-800 group-hover:text-black"
                  }`}
                >
                  {card.label}
                </div>
                <div
                  className={`text-[13px] ${
                    card.active ? "text-zinc-300" : "text-zinc-500"
                  }`}
                >
                  {card.subtitle}
                </div>
              </div>
            </div>

            <span
              className={`inline-flex items-center justify-center min-w-[28px] h-7 px-2.5 text-[13px] font-bold rounded-lg ${card.badgeClass}`}
            >
              {card.count}
            </span>
          </button>
        ))}
      </nav>
    </div>
  );
}

