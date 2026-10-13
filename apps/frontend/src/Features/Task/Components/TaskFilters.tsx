export default function TaskFilters() {
  const projects = [
    {
      id: "all",
      name: "Todos los proyectos",
      count: 6,
      dotColor: "bg-indigo-600",
      isActive: true,
    },
    {
      id: "design",
      name: "Diseño & UX",
      count: 2,
      dotColor: "bg-purple-500",
      isActive: false,
    },
    {
      id: "frontend",
      name: "Desarrollo Frontend",
      count: 2,
      dotColor: "bg-blue-500",
      isActive: false,
    },
    {
      id: "research",
      name: "Investigación",
      count: 2,
      dotColor: "bg-emerald-500",
      isActive: false,
    },
  ];

  const dueDates = [
    { label: "Para hoy", count: 0, countColor: "text-zinc-400" },
    { label: "Esta sem.", count: 4, countColor: "text-indigo-600" },
    { label: "Vencidas", count: 1, countColor: "text-rose-500" },
  ];

  return (
    <div className="flex flex-col gap-5">
      {/* Tarjeta 1: Proyectos */}
      <div className="rounded-[24px] border border-zinc-200/80 bg-white p-5 shadow-[0_2px_12px_rgba(0,0,0,0.02)]">
        <div className="flex items-center justify-between px-1 mb-3">
          <span className="text-[12px] font-bold uppercase tracking-wider text-slate-700">
            PROYECTOS
          </span>
          <button
            type="button"
            className="text-xs font-semibold text-indigo-600 hover:text-indigo-700 transition-colors"
          >
            + Nuevo
          </button>
        </div>

        <div className="flex flex-col gap-1">
          {projects.map((project) => (
            <div
              key={project.id}
              className={`flex items-center justify-between px-3 py-2.5 rounded-xl transition-colors cursor-pointer ${
                project.isActive
                  ? "bg-indigo-50/70 text-indigo-950 font-semibold"
                  : "text-zinc-700 hover:bg-zinc-50"
              }`}
            >
              <div className="flex items-center gap-2.5">
                <span
                  className={`size-2 rounded-full shrink-0 ${project.dotColor}`}
                />
                <span className="text-[14px] leading-tight">
                  {project.name}
                </span>
              </div>
              <span
                className={`text-[13px] ${
                  project.isActive
                    ? "font-bold text-indigo-600"
                    : "font-medium text-zinc-400"
                }`}
              >
                {project.count}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Tarjeta 2: Vencimientos */}
      <div className="rounded-[24px] border border-zinc-200/80 bg-white p-5 shadow-[0_2px_12px_rgba(0,0,0,0.02)]">
        <div className="px-1 mb-3">
          <span className="text-[12px] font-bold uppercase tracking-wider text-slate-700">
            VENCIMIENTOS
          </span>
        </div>

        <div className="grid grid-cols-3 gap-2.5">
          {dueDates.map((item, index) => (
            <div
              key={index}
              className="flex flex-col items-center justify-center p-3 rounded-2xl bg-zinc-50/70 border border-zinc-100 text-center"
            >
              <span className="text-[12px] font-medium text-zinc-700 leading-tight">
                {item.label}
              </span>
              <span
                className={`text-[14px] font-bold mt-1 leading-tight ${item.countColor}`}
              >
                {item.count}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
