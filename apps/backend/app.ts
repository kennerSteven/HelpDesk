import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { ConnectDb } from "./Src/Config/database";
import taskRoutes from "./Src/Routes/task.routes";
import categoryRoutes from "./Src/Routes/category.route";
import calendarRoutes from "./Src/Routes/calendar.route";
import projectRoutes from "./Src/Routes/project.route";
//"Express, todas las rutas que estén dentro de taskRoutes van a comenzar con /api/tasks."
dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());
app.use("/api/tasks", taskRoutes);
app.use("/api/category", categoryRoutes);
app.use("/api/calendar", calendarRoutes);
app.use("/api/project", projectRoutes);
app.use("/api/projects", projectRoutes);
ConnectDb();

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
