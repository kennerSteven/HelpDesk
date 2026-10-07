import { Request, Response } from "express";
import { CreateTask, GetTasks } from "../Services/task.service";

export async function CreateTaskController(req: Request, res: Response) {
  try {
    const newTask = await CreateTask(req.body);
    res.status(201).json({message:"Tarea creada!",details:newTask});
  } catch (error) {
    res.status(500).json({ message: "Error al crear tarea", error: error });
  }
}


export async function GetAllTasks(__:any,res: Response) {
  try {
    const Tasks = await GetTasks();

    if (Tasks.length === 0) {
      return res.status(400).json({ message: "No hay tareas" });
    }
    return res.status(200).json(Tasks);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error al cargar tareas", error: error });
  }
}
