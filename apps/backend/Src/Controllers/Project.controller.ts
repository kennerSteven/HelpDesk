import { Request, Response } from "express";
import {
  CreateProject,
  GetProjects,
  FilterProjects,
  GetProjectById,
  UpdateProject,
  DeleteProject,
} from "../Services/project.service";
import { Filters } from "@repo/schemas";

export async function CreateProjectController(req: Request, res: Response) {
  try {
    const project = await CreateProject(req.body);
    return res.status(201).json({
      message: "Proyecto creado con éxito",
      info: project,
    });
  } catch (error: any) {
    return res.status(500).json({
      message: "Error al crear proyecto",
      error: error.message || error,
    });
  }
}

export async function GetAllProjectsController(req: Request, res: Response) {
  try {
    const { status, priority } = req.query;

    const filter: Filters = {
      ...(typeof status === "string" && { status: status as Filters["status"] }),
      ...(typeof priority === "string" && { priority: priority as Filters["priority"] }),
    };

    const hasFilters = Boolean(filter.status || filter.priority);
    const projects = hasFilters
      ? await FilterProjects(filter)
      : await GetProjects();

    return res.status(200).json(projects || []);
  } catch (error: any) {
    return res.status(500).json({
      message: "Error al cargar proyectos",
      error: error.message || error,
    });
  }
}


export async function GetProjectByIdController(req: Request, res: Response) {
  try {
    const id = req.params.id as string;
    const project = await GetProjectById(id);
    return res.status(200).json(project);
  } catch (error: any) {
    return res.status(404).json({
      message: error.message || "Proyecto no encontrado",
      error: error.message || error,
    });
  }
}

export async function UpdateProjectController(req: Request, res: Response) {
  try {
    const id = req.params.id as string;
    const updatedProject = await UpdateProject(id, req.body);
    return res.status(200).json({
      message: "Proyecto actualizado con éxito",
      info: updatedProject,
    });
  } catch (error: any) {
    return res.status(500).json({
      message: "Error al actualizar proyecto",
      error: error.message || error,
    });
  }
}

export async function DeleteProjectController(req: Request, res: Response) {
  try {
    const id = req.params.id as string;
    const result = await DeleteProject(id);
    return res.status(200).json({
      message: "Proyecto eliminado con éxito",
      info: result,
    });
  } catch (error: any) {
    return res.status(500).json({
      message: "Error al eliminar proyecto",
      error: error.message || error,
    });
  }
}
