import { Request, Response } from "express";
import { CreateTask } from "../Services/task.service";

export async function CreateTaskController(req: Request, res: Response) {
  try {
    const newTask = await CreateTask(req.body);
    res.status(201).json(newTask);
  } catch (error) {
    res.status(500).json({ message: "Error al crear tarea", error: error });
  }
}
