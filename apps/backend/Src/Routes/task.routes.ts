import { Router } from "express";
import {
  CreateTaskController,
  GetAllTasks,
} from "../Controllers/Task.controller";
import Validate from "../Middleware/Validate.middleware";
import { CreateTaskSchema } from "@repo/schemas";

const route = Router();

route.post("/createTask", Validate(CreateTaskSchema), CreateTaskController);
route.get("/getTasks", GetAllTasks);
export default route;
