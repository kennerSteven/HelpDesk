import { Request, Response, NextFunction } from "express";
import { ZodType } from "zod";

export default function Validate(schema: ZodType) {
  return (req: Request, res: Response, next: NextFunction) => {
    //"Después de recibir el schema, devuelvo una función que Express podrá ejecutar cuando llegue una petición."
    const result = schema.safeParse(req.body);
    //"Toma lo que vino en req.body y compáralo contra este schema."

    if (!result.success) {
      //safeParse() devuelve un resultado que puede ser: true o false
      return res
        .status(400)
        .json({ message: "Bad structure", errors: result.error.issues });
    }

    req.body = result.data;
    next();
  };
}
