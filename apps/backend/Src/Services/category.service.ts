import { CategorySchemaType } from "@repo/schemas";
import Category from "../Models/Category";

async function NewCategory(data: CategorySchemaType) {
  const newCategory = await Category.create(data);
  return newCategory;
}

async function GetCategory() {
  const Categories = await Category.find();
  return Categories;
}

export { GetCategory, NewCategory };
