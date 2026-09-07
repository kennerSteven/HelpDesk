import React from "react";
import type { TaskType } from "../../Types/TaskTypes";
import DeleteIcon from "../../../../Components/Icons/DeleteIcon";
import EditIcon from "../../../../Components/Icons/EditIcon";

interface ShowTaskProps extends TaskType {
  onDelete: (id: string) => void;
  onEdit: (id: string) => void;
}

export default React.memo(function ShowTask({
  id,
  name,
  description,
  category,
  status,
  dateInit,
  dateFinish,
  priority,

  onDelete,
  onEdit,
}: ShowTaskProps) {
  const priorityColors: Record<string, string> = {
    LOW: "bg-emerald-100 text-emerald-700 border border-emerald-200",
    MEDIUM: "bg-amber-100 text-amber-700 border border-amber-200",
    HIGH: "bg-rose-100 text-rose-700 border border-rose-200",
  };

  return (
    <div
      data-task-id={id}
      className="cursor-pointer rounded-2xl border border-zinc-200 bg-white p-5 shadow-sm shadow-zinc-200"
    >
      <div className="mb-3 flex items-start justify-between gap-2">
        <h2 className="text-lg font-semibold text-zinc-900">{name}</h2>
        <div className="flex items-center gap-2">
          <span
            className={`rounded-full px-2 py-1 text-xs font-medium ${
              priorityColors[priority] ?? "bg-zinc-100 text-zinc-700"
            }`}
          >
            {priority}
          </span>
          <EditIcon id={id} onEdit={onEdit} />
          <DeleteIcon id={id} onDelete={onDelete} />
        </div>
      </div>

      <p className="mb-3 text-sm text-zinc-600">
        {description || "Sin descripción"}
      </p>

      <div className="space-y-2 text-sm text-zinc-600">
        <p>
          <span className="font-medium text-zinc-800">Categoría:</span>{" "}
          {category}
        </p>
        <p>
          <span className="font-medium text-zinc-800">Estado:</span> {status}
        </p>
        <p>
          <span className="font-medium text-zinc-800">Inicio:</span> {dateInit}
        </p>
        <p>
          <span className="font-medium text-zinc-800">Fin:</span> {dateFinish}
        </p>
      </div>
    </div>
  );
});
