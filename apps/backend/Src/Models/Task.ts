import mongoose from "mongoose";

const stepSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      required: false,
      trim: true,
    },
    status: {
      enum: ["PENDING", "DONE"],
    },
  },
  { _id: false },
);

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
  status: {
    type: String,
    enum: ["PENDING", "COMPLETED", "EXPIRED"],
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
  showSteps: Boolean,
  steps: {
    type: [stepSchema],
    default: [],
    required: false,
  },
});

const Task = mongoose.model("Task", taskSchema);
export default Task;
