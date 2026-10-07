import { Router } from "express";
import {
  CreateTaskController,
  GetAllTasks,
  UpdateTaskController,
  DeleteTaskController,
  DeleteManyTasksController
} from "../Controllers/Task.controller";
import Validate from "../Middleware/Validate.middleware";
import { CreateTaskSchema } from "@repo/schemas";

const route = Router();

route.post("/createTask", Validate(CreateTaskSchema), CreateTaskController);
route.get("/getTasks", GetAllTasks);
route.put("/updateTask/:id", Validate(CreateTaskSchema), UpdateTaskController);
route.delete("/deleteTask/:id", DeleteTaskController);
route.post("/deleteTasks/bulk", DeleteManyTasksController);

export default route;
