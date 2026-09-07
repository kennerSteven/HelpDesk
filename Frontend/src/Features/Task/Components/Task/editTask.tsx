import { useState } from "react";
import type { TaskType } from "../../Types/TaskTypes";

interface EditTaskProps {
  task: TaskType;
  onSave: (task: TaskType) => void;
  onCancel: () => void;
}

export default function EditTask({ task, onSave, onCancel }: EditTaskProps) {
  const [formData, setFormData] = useState(task);
  const updateField = (field: keyof TaskType, value: string) => {
    setFormData((currentTask) => ({ ...currentTask, [field]: value }));
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
      <form
        className="flex w-full max-w-lg flex-col gap-4 rounded-2xl bg-white p-6 shadow-xl"
        onSubmit={(event) => {
          event.preventDefault();
          onSave(formData);
        }}
      >
        <h2 className="text-xl font-bold text-zinc-900">Editar tarea</h2>
        <input
          value={formData.name}
          onChange={(event) => updateField("name", event.target.value)}
          className="rounded-lg border border-zinc-200 p-2"
          placeholder="Nombre"
        />
        <textarea
          value={formData.description ?? ""}
          onChange={(event) => updateField("description", event.target.value)}
          className="rounded-lg border border-zinc-200 p-2"
          placeholder="Descripción"
        />
        <div className="grid grid-cols-2 gap-3">
          <input
            type="date"
            value={formData.dateInit}
            onChange={(event) => updateField("dateInit", event.target.value)}
            className="rounded-lg border border-zinc-200 p-2"
          />
          <input
            type="date"
            value={formData.dateFinish}
            onChange={(event) => updateField("dateFinish", event.target.value)}
            className="rounded-lg border border-zinc-200 p-2"
          />
        </div>
        <select
          value={formData.priority}
          onChange={(event) => updateField("priority", event.target.value)}
          className="rounded-lg border border-zinc-200 p-2"
        >
          <option value="LOW">Baja</option>
          <option value="MEDIUM">Media</option>
          <option value="HIGH">Alta</option>
        </select>
        <div className="flex justify-end gap-3">
          <button type="button" onClick={onCancel} className="rounded-lg border px-4 py-2">
            Cancelar
          </button>
          <button type="submit" className="rounded-lg bg-zinc-800 px-4 py-2 text-white">
            Guardar
          </button>
        </div>
      </form>
    </div>
  );
}
