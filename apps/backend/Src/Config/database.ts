import mongoose from "mongoose";

export async function ConnectDb() {
  try {
    await mongoose.connect("mongodb://localhost:27017/personaApp");
    console.log("Mongo DB conectado");
  } catch (error) {
    console.log("Error al conectar", error);
  }
}
