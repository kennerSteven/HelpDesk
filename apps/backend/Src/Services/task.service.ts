import Task from "../Models/Task";
import { CreateTaskSchema, CreateUserSchemaType } from "@repo/schemas";
import { priority, status } from "@repo/schemas";

async function CreateTask(data: CreateUserSchemaType) {
  const task = await Task.create(data);
  return task;
}

async function GetTasks() {
  const Tasks = await Task.find().populate("categoryId");
  //.find encontrar todas, .populate("idDelModelo") Mongoose busca automáticamente la categoría correspondiente.
  //Retorna el objeto dentro de categoryId
  return Tasks;
}

async function UpdateTask(id: string, data: Partial<CreateUserSchemaType>) {
  // Validar que el payload no venga vacío
  if (!data || Object.keys(data).length === 0) {
    throw new Error("El payload está vacío. No hay datos para actualizar.");
  }

  // Validar que el ID exista
  const existingTask = await Task.findById(id);
  if (!existingTask) {
    throw new Error("La tarea con el ID proporcionado no existe.");
  }

  // Actualizar la tarea y devolver el documento nuevo
  const updatedTask = await Task.findByIdAndUpdate(id, data, {
    new: true,
  }).populate("categoryId");
  return updatedTask;
}

async function DeleteTask(id: string) {
  const existingTask = await Task.findById(id);
  if (!existingTask) {
    throw new Error("La tarea con el ID proporcionado no existe.");
  }
  await Task.findByIdAndDelete(id);
  return { id };
}

async function FilterByPriority(filterBy: {
  priority?: priority;
  status?: status;
}) {
  const filteredTasks = await Task.find(filterBy);

  return filteredTasks;
}

export { GetTasks, CreateTask, UpdateTask, DeleteTask, FilterByPriority };
