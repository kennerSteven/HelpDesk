import useCalendarKpi from "./useCalendarKpi";
import { SearchIcon } from "../../../../Components/Icons";
import FilterBadge from "../../../../Components/Ui/FilterBadge";
import useStylesCalendarKpi from "./useStylesCalendarKpi";
import type { TypeCalendarIncludeDateBetween } from "../../Types/types";

interface CalendarKpiProps {
  tasks?: TypeCalendarIncludeDateBetween[];
  className?: string;
}

export default function CalendarKpi({
  tasks: propTasks,
  className = "",
}: CalendarKpiProps) {
  const { taskNames: hookTasks } = useCalendarKpi();
  const tasks = propTasks || hookTasks;
  const { getDaysBadge, getStatusBadge, getPriorityBadge } =
    useStylesCalendarKpi();
  return (
    <div className="">
      <div className={`flex flex-col gap-3.5  ${className}`}>
        <div className="flex flex-col gap-3 ">
          <div className="flex items-center justify-between ">
            <div className="flex items-center gap-2">
              <h2 className="text-xs font-bold tracking-wider text-slate-900 uppercase">
                Tareas y entregas
              </h2>
              <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-semibold bg-rose-50 text-rose-600 border border-rose-300">
                5 urgentes
              </span>
            </div>
          </div>

          <div className="flex items-center gap-3 overflow-x-auto pb-0.5 scrollbar-none">
            <FilterBadge label="Mañana" count={14} isActive={true} />
            <FilterBadge label="Hoy" count={2} isActive={false} />
            <FilterBadge label="Proximas" count={2} isActive={false} />
          </div>
          <div className="relative flex items-center">
            <SearchIcon className="absolute left-3.5 size-4 text-slate-400 pointer-events-none" />
            <input
              type="text"
              placeholder="Filtrar tareas o responsables..."
              className="w-full rounded-xl border border-slate-200/90 bg-white pl-10 pr-3.5 py-2 text-xs text-slate-700 placeholder:text-slate-400 focus:outline-none focus:border-slate-400 focus:ring-2 focus:ring-slate-100 transition-all shadow-2xs"
            />
          </div>
        </div>

        {!tasks || tasks.length === 0 ? (
          <div className="bg-white border border-slate-100 rounded-xl p-4 text-center shadow-xs">
            <p className="text-xs font-semibold text-slate-700">
              Sin tareas en el calendario
            </p>
            <p className="text-[11px] text-slate-400 mt-0.5">
              Las tareas programadas aparecerán aquí.
            </p>
          </div>
        ) : (
          <div className="flex flex-col gap-3 overflow-y-auto max-h-[580px] xl:max-h-[640px] pr-1.5 scrollbar-custom">
            {tasks.map((task, index) => {
              const daysBadge = getDaysBadge(task.daysBetween);
              const statusBadge = getStatusBadge(task.status);
              const priorityBadge = getPriorityBadge(task.priority);
              const title = task.name || "Tarea sin título";
              const startDate = task.dateInit ? task.dateInit : "Sin fecha";

              return (
                <article
                  key={task._id || index}
                  className="shrink-0 bg-white border border-slate-100 rounded-xl p-3 shadow-xs hover:shadow-sm hover:border-slate-200 transition-all duration-150 flex flex-col gap-1.5 overflow-hidden min-w-0"
                >
                  <div className="flex items-center justify-between gap-2">
                    <span
                      className={`inline-flex items-center px-2 py-0.5 rounded-md text-[11px] font-semibold ${daysBadge.containerClass}`}
                    >
                      {daysBadge.hasDot && (
                        <span
                          className={`size-1.5 rounded-full mr-1.5 shrink-0 ${daysBadge.dotClass}`}
                        />
                      )}
                      {daysBadge.label}
                    </span>
                  </div>

                  <h3
                    className="text-slate-800 font-semibold text-xs md:text-sm leading-snug truncate mt-0.5"
                    title={title}
                  >
                    {title}
                  </h3>

                  {task.description && task.description !== title && (
                    <p
                      className="text-[11px] text-slate-500 truncate"
                      title={task.description}
                    >
                      {task.description}
                    </p>
                  )}

                  <div className="pt-2 mt-1 border-t border-slate-100/80 flex items-center justify-between text-[11px] gap-2 flex-wrap sm:flex-nowrap">
                    <div className="flex items-center gap-1.5 text-slate-400">
                      <span>Inicio:</span>
                      <span className="font-medium text-slate-600">
                        {startDate}
                      </span>
                    </div>

                    <div className="flex items-center gap-1.5">
                      <span className="text-slate-400">Prioridad :</span>
                      <span
                        className={`inline-flex items-center px-1.5 py-0.5 rounded text-[10px] font-bold ${priorityBadge.className}`}
                      >
                        {priorityBadge.label}
                      </span>
                    </div>

                    <span
                      className={`inline-flex items-center px-2 py-0.5 rounded-md text-[11px] font-medium shrink-0 ${statusBadge.className}`}
                    >
                      {statusBadge.label}
                    </span>
                  </div>
                </article>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
