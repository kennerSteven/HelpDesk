import { useState } from "react";
import type { TaskResponseType } from "@repo/schemas";
import Input from "../../../Components/Ui/Input";
import TextArea from "../../../Components/Ui/TextArea";
import InputDate from "../../../Components/Ui/InputDate";
import Select from "../../../Components/Ui/Select";
import { PlusIcon, CloseIcon } from "../../../Components/Icons";

interface EditTaskProps {
  task: TaskResponseType;
  onSave: (task: TaskResponseType) => void;
}

export default function EditTaskModal({ task, onSave }: EditTaskProps) {
  const [formData, setFormData] = useState<TaskResponseType>({
    ...task,
    steps: task.steps || [],
  });
  const [newStepName, setNewStepName] = useState("");

  const updateField = (field: keyof TaskResponseType, value: any) => {
    setFormData((currentTask) => ({ ...currentTask, [field]: value }));
  };

  const handleStepNameChange = (index: number, newName: string) => {
    setFormData((current) => {
      const currentSteps = [...(current.steps || [])];
      currentSteps[index] = {
        ...currentSteps[index],
        name: newName,
      };
      return { ...current, steps: currentSteps };
    });
  };

  const handleRemoveStep = (index: number) => {
    setFormData((current) => ({
      ...current,
      steps: (current.steps || []).filter((_, i) => i !== index),
    }));
  };

  const handleAddStep = () => {
    const trimmed = newStepName.trim();
    if (!trimmed) return;

    setFormData((current) => ({
      ...current,
      steps: [...(current.steps || []), { name: trimmed, status: "PENDING" }],
    }));
    setNewStepName("");
  };

  const priorityOptions = [
    { value: "LOW", label: "Baja" },
    { value: "MEDIUM", label: "Media" },
    { value: "HIGH", label: "Alta" },
  ];

  const steps = formData.steps || [];

  return (
    <form
      id="edit-task-form"
      className="flex flex-col gap-5"
      onSubmit={(event) => {
        event.preventDefault();
        onSave(formData);
      }}
    >
      <Input
        name="name"
        value={formData.name}
        onChange={(event) => updateField("name", event.target.value)}
        label="Nombre de la tarea"
        showLabel={true}
        placeholder="Ej. Rediseñar flujo de onboarding"
      />

      <TextArea
        name="description"
        value={formData.description ?? ""}
        onChange={(event) => updateField("description", event.target.value)}
        label="Descripción"
        showLabel={true}
        placeholder="Añade notas o detalles clave..."
        rows={3}
      />

      <div className="grid grid-cols-2 gap-4">
        <InputDate
          name="dateInit"
          value={formData.dateInit}
          onChange={(event) => updateField("dateInit", event.target.value)}
          label="Fecha de inicio"
          showLabel={true}
          dateType="init"
        />
        <InputDate
          name="dateFinish"
          value={formData.dateFinish}
          onChange={(event) => updateField("dateFinish", event.target.value)}
          label="Fecha límite"
          showLabel={true}
          dateType="finish"
        />
      </div>

      <Select
        name="priority"
        value={formData.priority}
        onChange={(event) => updateField("priority", event.target.value)}
        label="Prioridad"
        objectValues={priorityOptions}
      />

      {/* Sección de Subtareas Editables */}
      <div className="flex flex-col gap-3 rounded-2xl border border-slate-200/90 bg-slate-50/60 p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-700">
              Subtareas
            </span>
            <span className="text-[11px] font-semibold text-slate-500 bg-white border border-slate-200/80 px-2 py-0.5 rounded-full">
              {steps.length}
            </span>
          </div>
          <span className="text-[11px] text-slate-400">
            Haz clic en el texto para editar cada subtarea
          </span>
        </div>

        {/* Lista de subtareas con input editable */}
        {steps.length > 0 ? (
          <div className="flex flex-col gap-2 max-h-[220px] overflow-y-auto pr-1 scrollbar-custom">
            {steps.map((step, index) => {
              const isDone = step.status === "DONE";
              return (
                <div
                  key={index}
                  className={`flex items-center gap-2.5 p-2 rounded-xl border transition-all ${
                    isDone
                      ? "bg-emerald-50/40 border-emerald-200/70"
                      : "bg-white border-slate-200/80 hover:border-slate-300"
                  }`}
                >
                  {/* Input editable de la subtarea */}
                  <input
                    type="text"
                    value={step.name}
                    onChange={(e) =>
                      handleStepNameChange(index, e.target.value)
                    }
                    placeholder="Escribe el nombre de la subtarea..."
                    className={`flex-1 bg-transparent text-xs font-medium focus:outline-none transition-colors ${
                      isDone
                        ? "line-through text-slate-400"
                        : "text-slate-800 placeholder:text-slate-400"
                    }`}
                  />

                  {/* Botón para eliminar subtarea */}
                  <button
                    type="button"
                    onClick={() => handleRemoveStep(index)}
                    title="Eliminar subtarea"
                    className="size-6 flex items-center justify-center rounded-lg text-slate-400 hover:text-rose-600 hover:bg-rose-50 transition-colors cursor-pointer shrink-0"
                  >
                    <CloseIcon className="size-3.5" />
                  </button>
                </div>
              );
            })}
          </div>
        ) : (
          <p className="text-xs text-slate-400 text-center py-2">
            No hay subtareas en esta tarea. Añade una abajo.
          </p>
        )}

        {/* Input para agregar nueva subtarea */}
        <div className="flex items-center gap-2 pt-2 border-t border-slate-200/70">
          <input
            type="text"
            value={newStepName}
            onChange={(e) => setNewStepName(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                e.preventDefault();
                handleAddStep();
              }
            }}
            placeholder="Añadir una nueva subtarea..."
            className="flex-1 px-3 py-1.5 text-xs bg-white border border-slate-200 rounded-lg focus:outline-none focus:border-indigo-400 text-slate-800 placeholder:text-slate-400"
          />
          <button
            type="button"
            onClick={handleAddStep}
            disabled={!newStepName.trim()}
            className="inline-flex items-center gap-1 px-3 py-1.5 text-xs font-semibold text-slate-700 bg-white border border-slate-200 rounded-lg hover:bg-slate-50 hover:text-slate-900 transition-all cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed"
          >
            <PlusIcon className="size-3 text-slate-500" />
            <span>Añadir</span>
          </button>
        </div>
      </div>
    </form>
  );
}
