import { Router } from "express";

import Validate from "../Middleware/Validate.middleware";
import { CategorySchema } from "@repo/schemas";
import { CreateCategoryController,GetAllCategory } from "../Controllers/Category.controller";

const route = Router();

route.post("/createCategory", Validate(CategorySchema), CreateCategoryController);
route.get("/getCategories",  GetAllCategory);
export default route;
