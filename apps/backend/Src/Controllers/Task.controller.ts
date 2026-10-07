import { Request, Response } from "express";
import {
  CreateTask,
  GetTasks,
  UpdateTask,
  DeleteTask,
  DeleteManyTasks,
} from "../Services/task.service";
import { createCalendarEvent } from "../Services/calendarEvent.service";

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

    if (Tasks.length === 0) {
      return res.status(400).json({ message: "No hay tareas" });
    }
    return res.status(200).json(Tasks);
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

export async function DeleteManyTasksController(req: Request, res: Response) {
  try {
    const { ids } = req.body; // Se espera que el frontend envíe { ids: ["id1", "id2"] }

    const result = await DeleteManyTasks(ids);

    return res.status(200).json({
      message: `${result.deletedCount} tareas eliminadas correctamente`,
      details: result,
    });
  } catch (error: any) {
    return res
      .status(400)
      .json({ message: error.message || "Error al eliminar tareas", error });
  }
}
