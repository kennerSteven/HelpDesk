import { Request, Response } from "express";
import { GetCategory, NewCategory } from "../Services/category.service";

export async function CreateCategoryController(req: Request, res: Response) {
  try {
    const nameCategory = await NewCategory(req.body);
    res
      .status(201)
      .json({ message: "Categoria creada con exito", info: nameCategory });
  } catch (error) {
    res.status(500).json({ message: "Error al crear categoria", error: error });
  }
}

export async function GetAllCategory(__: any, res: Response) {
  try {
    const Categories = await GetCategory();

    return res.status(200).json(Categories || []);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error al cargar categorias", error: error });
  }
}
