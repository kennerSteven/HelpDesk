import mongoose from "mongoose";

const CalendarEvent = new mongoose.Schema({
  taskId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Task",
    required: true,
  },
  date: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: false,
  },
});






const CalendarE = mongoose.model("CalendarEvent", CalendarEvent);
export default CalendarE;
