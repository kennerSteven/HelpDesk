import React from "react";
import TaskCard from "../../Task/Components/TaskCard";
import { PlusIcon } from "../../../Components/Icons";

export interface ProjectType {
  _id?: string;
  nameProject: string;
  descriptionProject?: string;
  dateInit: string;
  dateFinish: string;
  color?: "RED" | "BLUE" | "YELLOW" | "GREEN" | "PURPLE" | string;
  tasks?: any[];
}

interface ProjectTasksContainerProps {
  project: ProjectType;
  onDeleteTask?: (taskId: string) => void;
  onEditTask?: (taskId: string) => void;
  onAddTask?: (projectId?: string) => void;
}

// Configuración de estilos y temas para los 5 colores en mayúsculas
const COLOR_CONFIG: Record<
  string,
  {
    dotClass: string;
    badgeClass: string;
    borderTopClass: string;
    cardBorder: string;
    textAccent: string;
  }
> = {
  RED: {
    dotClass: "bg-rose-400",
    badgeClass: "bg-rose-50 text-rose-700 border-rose-200",
    borderTopClass: "bg-rose-400",
    cardBorder: "border-rose-200/70",
    textAccent: "text-rose-600",
  },
  BLUE: {
    dotClass: "bg-sky-400",
    badgeClass: "bg-sky-50 text-sky-700 border-sky-200",
    borderTopClass: "bg-sky-400",
    cardBorder: "border-sky-200/70",
    textAccent: "text-sky-600",
  },
  YELLOW: {
    dotClass: "bg-amber-400",
    badgeClass: "bg-amber-50 text-amber-700 border-amber-200",
    borderTopClass: "bg-amber-400",
    cardBorder: "border-amber-200/70",
    textAccent: "text-amber-600",
  },
  GREEN: {
    dotClass: "bg-emerald-400",
    badgeClass: "bg-emerald-50 text-emerald-700 border-emerald-200",
    borderTopClass: "bg-emerald-400",
    cardBorder: "border-emerald-200/70",
    textAccent: "text-emerald-600",
  },
  PURPLE: {
    dotClass: "bg-purple-400",
    badgeClass: "bg-purple-50 text-purple-700 border-purple-200",
    borderTopClass: "bg-purple-400",
    cardBorder: "border-purple-200/70",
    textAccent: "text-purple-600",
  },
};

export default function ProjectTasksContainer({
  project,
  onDeleteTask,
  onEditTask,
  onAddTask,
}: ProjectTasksContainerProps) {
  const normalizedColor = project.color?.toUpperCase?.() || "BLUE";
  const colorTheme = COLOR_CONFIG[normalizedColor] || COLOR_CONFIG.BLUE;
  const tasks = project.tasks || [];
  const hasTasks = tasks.length > 0;
  return (
    <article className="w-full rounded-2xl border border-slate-200/90 bg-white shadow-xs overflow-hidden transition-all duration-200 hover:shadow-sm">
      {/* Barra superior de acento con el color del proyecto */}
      <div className={`h-1.5 w-full ${colorTheme.borderTopClass}`} />

      <div className="p-5 flex flex-col gap-4">
        {/* Encabezado del Proyecto */}
        <div className="flex items-start justify-between gap-3">
          <div className="flex flex-col gap-1 min-w-0">
            <div className="flex items-center gap-2">
              <span
                className={`size-2.5 rounded-full shrink-0 ${colorTheme.dotClass}`}
              />
              <h3 className="text-[16px] font-bold text-slate-900 tracking-tight truncate">
                {project.nameProject}
              </h3>
            </div>

            {project.descriptionProject && (
              <p className="text-xs text-slate-500 line-clamp-2 leading-relaxed">
                {project.descriptionProject}
              </p>
            )}
          </div>

          {/* Badge del contador de tareas */}
          <span
            className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-semibold border shrink-0 ${colorTheme.badgeClass}`}
          >
            {tasks.length} {tasks.length === 1 ? "tarea" : "tareas"}
          </span>
        </div>

        {/* Fechas del Proyecto */}
        <div className="flex items-center gap-2 text-[11px] font-medium text-slate-400">
          <svg
            className="size-3.5 text-slate-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
            />
          </svg>
          <span>
            {project.dateInit} — {project.dateFinish}
          </span>
        </div>

        {/* Separador sutil */}
        <hr className="border-slate-100" />

        {/* Contenedor de tareas: 200px fijos por defecto y scroll si excede */}
        <div className="h-[200px] overflow-y-auto pr-1 flex flex-col gap-3 scrollbar-custom">
          {hasTasks ? (
            tasks.map((task: any) => (
              <TaskCard
                key={task._id || task.id}
                id={task._id || task.id}
                name={task.name}
                description={task.description}
                category={task.categoryId?.nameCategory || task.category}
                status={task.status}
                steps={task.steps}
                dateInit={task.dateInit}
                dateFinish={task.dateFinish}
                priority={task.priority}
                onDelete={() => onDeleteTask?.(task._id || task.id)}
                onEdit={() => onEditTask?.(task._id || task.id)}
              />
            ))
          ) : (
            /* Estado vacío ocupando los 200px completos centrado */
            <div className="w-full h-full rounded-xl border border-dashed border-slate-200 bg-slate-50/60 p-4 flex flex-col items-center justify-center text-center gap-2 transition-colors hover:bg-slate-50/90">
              <div className="size-9 rounded-full bg-white border border-slate-200/80 shadow-2xs flex items-center justify-center text-slate-400 shrink-0">
                <svg
                  className="size-4 text-slate-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="1.8"
                    d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4"
                  />
                </svg>
              </div>

              <div className="space-y-0.5">
                <h4 className="text-[13px] font-semibold text-slate-700">
                  Sin tareas en este proyecto
                </h4>
                <p className="text-[11px] text-slate-400 max-w-xs leading-relaxed">
                  Este proyecto aún no tiene tareas vinculadas.
                </p>
              </div>

              {onAddTask && (
                <button
                  type="button"
                  onClick={() => onAddTask(project._id)}
                  className="mt-0.5 inline-flex items-center gap-1.5 px-2.5 py-1 text-xs font-semibold text-slate-700 bg-white border border-slate-200 rounded-lg shadow-2xs hover:bg-slate-50 hover:text-slate-900 transition-all cursor-pointer"
                >
                  <PlusIcon className="size-3 text-slate-500" />
                  <span>Añadir tarea</span>
                </button>
              )}
            </div>
          )}
        </div>
      </div>
    </article>
  );
}
