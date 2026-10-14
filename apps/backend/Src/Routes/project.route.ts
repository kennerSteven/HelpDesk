import { Router } from "express";
import {
  CreateProjectController,
  GetAllProjectsController,
  GetProjectByIdController,
  UpdateProjectController,
  DeleteProjectController,
} from "../Controllers/Project.controller";
import Validate from "../Middleware/Validate.middleware";
import { CreateProjectSchema } from "@repo/schemas";

const route = Router();

// Rutas de creación
route.post("/createProject", Validate(CreateProjectSchema), CreateProjectController);
route.post("/", Validate(CreateProjectSchema), CreateProjectController);

// Rutas de consulta
route.get("/getProjects", GetAllProjectsController);
route.get("/", GetAllProjectsController);
route.get("/getProject/:id", GetProjectByIdController);
route.get("/:id", GetProjectByIdController);

// Rutas de actualización y eliminación
route.put("/updateProject/:id", UpdateProjectController);
route.put("/:id", UpdateProjectController);
route.delete("/deleteProject/:id", DeleteProjectController);
route.delete("/:id", DeleteProjectController);

export default route;
