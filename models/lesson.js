import mongoose, { Schema } from "mongoose";
import { Course } from "./course";

const lessonShema = new mongoose.Schema({
  course: { 
    type: Schema.Types.ObjectId | String,
    ref: Course,
    required: true
  },
  lesson: { 
    type: String,
    required: true
  }, 
  createdAt: {
    type: Date,
    default: Date.now
  }
});
   
export const Lesson = mongoose.model("Lesson", lessonShema);