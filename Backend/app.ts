import express from "express";
import dotenv from "dotenv";
import {connectDB} from "./Src/config/database"

dotenv.config();

const app = express();

app.use(express.json());

connectDB();

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});