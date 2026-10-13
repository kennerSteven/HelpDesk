import { Request, Response } from "express";
import {
  CreateTask,
  GetTasks,
  UpdateTask,
  DeleteTask,
  FilterByPriority,
} from "../Services/task.service";
import { createCalendarEvent } from "../Services/calendarEvent.service";
import { priority } from "@repo/schemas";

export async function CreateTaskController(req: Request, res: Response) {
  try {
    const newTask = await CreateTask(req.body);

    await createCalendarEvent({
      taskId: newTask._id.toString(),
      title: newTask.name,
      date: newTask.dateInit,
    });

    res.status(201).json({ message: "Tarea creada!", details: newTask });
  } catch (error) {
    res.status(500).json({ message: "Error al crear tarea", error: error });
  }
}
export async function UpdateTaskController(req: Request, res: Response) {
  try {
    const id = req.params.id as string;
    const data = req.body;

    const updatedTask = await UpdateTask(id, data);

    return res.status(200).json({
      message: "Tarea actualizada correctamente",
      details: updatedTask,
    });
  } catch (error: any) {
    return res.status(400).json({
      message: error.message || "Error al actualizar la tarea",
      error,
    });
  }
}

export async function GetAllTasks(__: any, res: Response) {
  try {
    const Tasks = await GetTasks();
    return res.status(200).json(Tasks || []);
  } catch (error) {
    res.status(500).json({ message: "Error al cargar tareas", error: error });
  }
}

export async function GetAllTasksFiltered(req: Request, res: Response) {
  const { priority, status } = req.query;

  const filters = {
    ...(typeof priority === "string" && { priority }),
    ...(typeof status === "string" && { status }),
  };
  try {
    const Tasks = await FilterByPriority(filters as any);
    return res.status(200).json(Tasks || []);
  } catch (error) {
    res.status(500).json({ message: "Error al cargar tareas", error: error });
  }
}

export async function DeleteTaskController(req: Request, res: Response) {
  try {
    const id = req.params.id as string;
    await DeleteTask(id);

    return res.status(200).json({ message: "Tarea eliminada correctamente" });
  } catch (error: any) {
    return res
      .status(400)
      .json({ message: error.message || "Error al eliminar la tarea", error });
  }
}
