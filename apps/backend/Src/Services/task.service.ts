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


export {GetTasks,CreateTask}