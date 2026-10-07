import { useState } from "react";

import Button from "../../../Components/Ui/Button";
import { createCalendar } from "../Services/calendar.service";
import type { TaskResponseType } from "@repo/schemas";



interface ExistingTaskListProps {
  tasks: TaskResponseType[];
  searchTerm: string;
  isLoading: boolean;
  selectedDate: string;
  errorMessage?: string;
  onSearchChange: (value: string) => void;
  onTasksSelect: (tasks: TaskResponseType[]) => void;
}

const priorityStyles: Record<string, string> = {
  LOW: "border-sky-200 bg-sky-50 text-sky-700",
  MEDIUM: "border-amber-200 bg-amber-50 text-amber-700",
  HIGH: "border-rose-200 bg-rose-50 text-rose-700",
};

const priorityLabels: Record<string, string> = {
  LOW: "Baja",
  MEDIUM: "Media",
  HIGH: "Alta",
};

function getPriorityData(priority?: string) {
  const normalizedPriority = priority?.toUpperCase() || "MEDIUM";

  return {
    label: priorityLabels[normalizedPriority] || priority || "Media",
    className:
      priorityStyles[normalizedPriority] ||
      "border-zinc-200 bg-zinc-100 text-zinc-700",
  };
}

export default function ExistingTaskList({
  tasks,
  searchTerm,
  isLoading,
  errorMessage,
  onSearchChange,
  onTasksSelect,
  selectedDate,
}: ExistingTaskListProps) {

  
  const [selectedTasks, setSelectedTasks] = useState<TaskResponseType[]>([]);

  const filteredTasks = tasks.filter((task) =>
    task.name?.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  const toggleTask = (task: TaskResponseType) => {
    const taskId = task._id;

    setSelectedTasks((currentTasks) =>
      currentTasks.some((selectedTask) => selectedTask._id === taskId)
        ? currentTasks.filter((selectedTask) => selectedTask._id !== taskId)
        : [...currentTasks, task],
    );
  };

  async function HandleCreateEvent() {
    try {
      const calendar = {
        date: selectedDate,
        title: selectedTasks[0].name,
        taskId: selectedTasks[0]._id,
      };

      const newCalendar = await createCalendar(calendar);
      console.log("Calendario Creado!", newCalendar);
    } catch (error) {}
  }

  return (
    <div className="flex flex-col gap-4">
      <div className="relative">
        <input
          type="text"
          placeholder="Buscar tarea existente..."
          value={searchTerm}
          onChange={(event) => onSearchChange(event.target.value)}
          className="w-full rounded-xl border border-zinc-200 bg-zinc-50 py-2.5 pl-10 pr-4 text-sm text-zinc-900 outline-none focus:border-zinc-800 focus:bg-white"
        />
        <svg
          className="absolute left-3 top-3 size-4 text-zinc-400"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          aria-hidden="true"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
          />
        </svg>
      </div>

      {isLoading ? (
        <div className="py-8 text-center text-sm text-zinc-500">
          Cargando tareas...
        </div>
      ) : errorMessage ? (
        <div className="rounded-xl border border-rose-200 bg-rose-50 py-6 text-center text-sm text-rose-700">
          {errorMessage}
        </div>
      ) : filteredTasks.length > 0 ? (
        <>
          <div className="flex max-h-72 flex-col gap-2.5 overflow-y-auto pr-1">
            {filteredTasks.map((task) => {
              const priority = getPriorityData(task.priority);
              const isSelected = selectedTasks.some(
                (selectedTask) => selectedTask._id === task._id,
              );

              return (
                <button
                  type="button"
                  key={task._id }
                  onClick={() => toggleTask(task)}
                  aria-pressed={isSelected}
                  className={`group flex w-full items-start justify-between rounded-xl border p-3.5 text-left transition-all hover:border-zinc-500 hover:bg-zinc-50/20 ${
                    isSelected
                      ? "border-zinc-800 bg-zinc-100"
                      : "border-zinc-200 bg-white"
                  }`}
                >
                  <div className="min-w-0">
                    <p className="text-xs font-semibold uppercase tracking-wide text-zinc-400">
                      Nombre:
                    </p>
                    <h5 className="truncate text-sm font-semibold text-zinc-900 group-hover:text-zinc-700">
                      {task.name}
                    </h5>
                    <p className="mt-2 text-xs font-semibold uppercase tracking-wide text-zinc-400">
                      Descripción:
                    </p>
                    <p className="line-clamp-2 text-xs text-zinc-500">
                      {task.description || "Sin descripción"}
                    </p>
                  </div>
                  <div className="ml-3 flex shrink-0 flex-col items-end gap-2">
                    <span
                      className={`flex size-5 items-center justify-center rounded border text-xs font-bold ${
                        isSelected
                          ? "border-zinc-800 bg-zinc-800 text-white"
                          : "border-zinc-300 text-transparent"
                      }`}
                      aria-hidden="true"
                    >
                      ✓
                    </span>
                    <span className="text-[10px] font-semibold uppercase tracking-wide text-zinc-400">
                      Dificultad
                    </span>
                    <span
                      className={`rounded-md border px-2 py-0.5 text-[10px] font-bold ${priority.className}`}
                    >
                      {priority.label}
                    </span>
                    <span className="text-xs font-semibold text-emerald-600">
                      Elegir
                    </span>
                  </div>
                </button>
              );
            })}
          </div>
          <div className="flex items-center justify-between border-t border-zinc-100 pt-3">
            <span className="text-xs text-zinc-500">
              {selectedTasks.length} tarea
              {selectedTasks.length === 1 ? "" : "s"} seleccionada
              {selectedTasks.length === 1 ? "" : "s"}
            </span>
            <Button
              typeBtn="button"
              labelBtn="Confirmar selección"
              variant="primary"
              size="sm"
              disabled={selectedTasks.length === 0}
              onClick={() => {
                (onTasksSelect(selectedTasks), HandleCreateEvent());
              }}
            />
          </div>
        </>
      ) : (
        <div className="rounded-xl border border-dashed border-zinc-200 py-8 text-center">
          <p className="text-sm font-medium text-zinc-600">
            No se encontraron tareas
          </p>
          <p className="mt-1 text-xs text-zinc-400">
            Puedes crear una nueva usando la opción anterior.
          </p>
        </div>
      )}
    </div>
  );
}
