import { Router } from "express";
import {
  CreateTaskController,
  GetAllTasks,
  UpdateTaskController,
  DeleteTaskController,
  GetAllTasksFiltered,
} from "../Controllers/Task.controller";
import Validate from "../Middleware/Validate.middleware";
import { CreateTaskSchema } from "@repo/schemas";

const route = Router();

route.post("/createTask", Validate(CreateTaskSchema), CreateTaskController);
route.get("/getTasks", GetAllTasks);
route.put("/updateTask/:id", Validate(CreateTaskSchema), UpdateTaskController);
route.delete("/deleteTask/:id", DeleteTaskController);
route.get("/getTasksFiltered", GetAllTasksFiltered);
export default route;
