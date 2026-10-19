import Project from "../Models/Project";
import { CreateProjectSchemaType, Filters } from "@repo/schemas";

async function CreateProject(data: CreateProjectSchemaType) {
  const project = await Project.create(data);
  return project;
}

async function GetProjects() {
  const projects = await Project.find().populate("tasks");
  return projects;
}

async function FilterProjects(filter: Filters) {
  const projects = await Project.find(filter);
  return projects;
}

async function GetProjectById(id: string) {
  const project = await Project.findById(id).populate("tasks");
  if (!project) {
    throw new Error("El proyecto con el ID proporcionado no existe.");
  }
  return project;
}

async function UpdateProject(
  id: string,
  data: Partial<CreateProjectSchemaType>,
) {
  if (!data || Object.keys(data).length === 0) {
    throw new Error("El payload está vacío. No hay datos para actualizar.");
  }

  const existingProject = await Project.findById(id);
  if (!existingProject) {
    throw new Error("El proyecto con el ID proporcionado no existe.");
  }

  const updatedProject = await Project.findByIdAndUpdate(id, data, {
    new: true,
  }).populate("tasks");

  return updatedProject;
}

async function DeleteProject(id: string) {
  const existingProject = await Project.findById(id);
  if (!existingProject) {
    throw new Error("El proyecto con el ID proporcionado no existe.");
  }

  await Project.findByIdAndDelete(id);
  return { id };
}

export {
  CreateProject,
  GetProjects,
  FilterProjects,
  GetProjectById,
  UpdateProject,
  DeleteProject,
};
