import express from "express";
import dotenv from "dotenv";
import {ConnectDb} from "./Src/Config/database"
import taskRoutes from "./Src/Routes/task.routes";
//"Express, todas las rutas que estén dentro de taskRoutes van a comenzar con /api/tasks."
dotenv.config();

const app = express();
app.use(express.json());
app.use("/api/tasks", taskRoutes);

ConnectDb();

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});