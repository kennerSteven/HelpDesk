import mongoose from "mongoose";

const projectSchema = new mongoose.Schema({
  nameProject: {
    type: String,
    required: true,
  },
  descriptionProject: {
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
  color: {
    type: String,
    enum: ["RED", "BLUE", "YELLOW", "GREEN", "PURPLE"],
    default: "BLUE",
    required: true,
  },
  tasks: {
    type: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Task",
      },
    ],
    default: [],
  },
});

const Project = mongoose.model("Project", projectSchema);
export default Project;
