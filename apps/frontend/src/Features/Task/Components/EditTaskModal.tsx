import { useState } from "react";
import type { TaskResponseType } from "@repo/schemas";
import Input from "../../../Components/Ui/Input";
import TextArea from "../../../Components/Ui/TextArea";
import InputDate from "../../../Components/Ui/InputDate";
import Select from "../../../Components/Ui/Select";

interface EditTaskProps {
  task: TaskResponseType;
  onSave: (task: TaskResponseType) => void;
}

export default function EditTaskModal({ task, onSave }: EditTaskProps) {
  const [formData, setFormData] = useState(task);

  const updateField = (field: keyof TaskResponseType, value: string) => {
    setFormData((currentTask) => ({ ...currentTask, [field]: value }));
  };

  const priorityOptions = [
    { value: "LOW", label: "Baja" },
    { value: "MEDIUM", label: "Media" },
    { value: "HIGH", label: "Alta" },
  ];

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
    </form>
  );
}
