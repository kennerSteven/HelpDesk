import mongoose from "mongoose";
import { ref } from "node:process";


const CalendarEvent = new mongoose.Schema({
    taskId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Tasks",
        required: true,
    },
    date: {
        type: String,
        required: false,
    },
    title: {
        type: String,
        required: false,
    }


});

const CalendarE = mongoose.model("CalendarEvent", CalendarEvent);
export default CalendarE;
