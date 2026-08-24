import Button from "../../../../Components/Ui/Button";
import FieldMessageError from "../../../../Components/Ui/FieldMessage";
import Input from "../../../../Components/Ui/Input";
import Select from "../../../../Components/Ui/Select";
import TextArea from "../../../../Components/Ui/TextArea";
import useCreateTask from "../../Hooks/useCreateTask";

const priorityOptions = {
  "": "Seleccione una prioridad",
  LOW: "Baja",
  MEDIUM: "Media",
  HIGH: "Alta",
};

const statusOptions = {
  "": "Seleccione un estado",
  PENDING: "Pendiente",
  IN_PROGRESS: "En progreso",
  COMPLETED: "Completada",
};

const categoryOptions = {
  "": "Seleccione una categoria",
  DEVELOPMENT: "Desarrollo",
  SUPPORT: "Soporte",
  MAINTENANCE: "Mantenimiento",
};

export default function CreateTask() {
  const { handleSubmit, taskError, task, HandleChange } = useCreateTask();

  return (
    <form
      onSubmit={handleSubmit}
      className="min-h-screen w-full max-w-xl mx-auto flex flex-col justify-center px-4 py-8 space-y-6 rounded-xl shadow-md shadow-zinc-200"
    >
      <div>
        <Input
          name="name"
          value={task.name}
          label="Nombre"
          showLabel={true}
          onChange={HandleChange}
          placeholder="Nombre de la tarea"
        />
        {taskError?.name && <FieldMessageError message={taskError.name} />}
      </div>

      <div>
        <TextArea
          name="description"
          value={task.description}
          label="Descripcion"
          showLabel={true}
          onChange={HandleChange}
          placeholder="Descripcion de la tarea"
        />
        {taskError?.description && (
          <FieldMessageError message={taskError.description} />
        )}
      </div>

      <div className="flex gap-4">
        <div className="flex-1">
          <Input
            name="dateInit"
            value={task.dateInit}
            label="Fecha de inicio"
            showLabel={true}
            onChange={HandleChange}
            type="date"
          />
          {taskError?.dateInit && (
            <FieldMessageError message={taskError.dateInit} />
          )}
        </div>

        <div className="flex-1">
          <Input
            name="dateFinish"
            value={task.dateFinish}
            label="Fecha de finalizacion"
            showLabel={true}
            onChange={HandleChange}
            type="date"
          />
          {taskError?.dateFinish && (
            <FieldMessageError message={taskError.dateFinish} />
          )}
        </div>
      </div>

      <div>
        <Input
          name="photo"
          value={task.photo}
          label="Foto"
          showLabel={true}
          onChange={HandleChange}
          placeholder="URL de la foto"
        />
        {taskError?.photo && <FieldMessageError message={taskError.photo} />}
      </div>

      <div className="flex gap-4">
        <div className="flex-1">
          <Select
            name="priority"
            value={task.priority}
            label="Prioridad"
            onChange={HandleChange}
            objectValues={priorityOptions}
          />
          {taskError?.priority && (
            <FieldMessageError message={taskError.priority} />
          )}
        </div>

        <div className="flex-1">
          <Select
            name="status"
            value={task.status}
            label="Estado"
            onChange={HandleChange}
            objectValues={statusOptions}
          />
          {taskError?.status && (
            <FieldMessageError message={taskError.status} />
          )}
        </div>
      </div>

      <div>
        <Select
          name="category"
          value={task.category}
          label="Categoria"
          onChange={HandleChange}
          objectValues={categoryOptions}
        />
        {taskError?.category && (
          <FieldMessageError message={taskError.category} />
        )}
      </div>

      <div className="flex justify-center">
        <Button typeBtn="submit" labelBtn="Crear tarea" />
      </div>
    </form>
  );
}
