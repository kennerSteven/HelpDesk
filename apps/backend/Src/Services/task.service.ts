import Task from "../Models/Task";
import { CreateTaskSchema, CreateUserSchemaType } from "@repo/schemas";

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
  const updatedTask = await Task.findByIdAndUpdate(id, data, { new: true }).populate("categoryId");
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

async function DeleteManyTasks(ids: string[]) {
  if (!ids || ids.length === 0) {
    throw new Error("No se proporcionaron IDs para eliminar.");
  }
  // Buscamos cuántas tareas existen realmente de la lista de IDs
  const existingCount = await Task.countDocuments({ _id: { $in: ids } });
  
  // Eliminamos de un solo golpe todas las que coincidan
  const result = await Task.deleteMany({ _id: { $in: ids } });
  
  return { 
    deletedCount: result.deletedCount, 
    requestedCount: ids.length,
    foundCount: existingCount
  };
}

export { GetTasks, CreateTask, UpdateTask, DeleteTask, DeleteManyTasks };