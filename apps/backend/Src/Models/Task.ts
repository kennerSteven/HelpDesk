import mongoose from "mongoose";


const taskSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: false,
  },
  dateInit: {
    type: String,
    required: true,
  },
  dateFinish: {
    type: String,
    required: true,
  },
  priority: {
    type: String,
    enum: ["HIGH", "MEDIUM", "LOW"],
  },
  categoryId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Category",
    required: true,

    //"category va a guardar el _id de un documento que pertenece al modelo Category."//
  },
});

const Task = mongoose.model("Task", taskSchema);
export default Task;
