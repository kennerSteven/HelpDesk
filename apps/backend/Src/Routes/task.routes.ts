import { Router } from "express";
import { CreateTaskController } from "../Controllers/CreateTask.controller";
import Validate from "../Middleware/Validate.middleware";
import { CreateTaskSchema } from "@repo/schemas";

const route = Router();

route.post("/", Validate(CreateTaskSchema), CreateTaskController);

export default route;
