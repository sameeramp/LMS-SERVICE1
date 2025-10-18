import mongoose from "mongoose";
import { Schema } from "mongoose";
import { Course } from "./course.js";
import { User } from "./user.js";
import { Lesson } from "./lesson.js";

const userLessonShema = new mongoose.Schema({
  user: { 
    type: Schema.Types.ObjectId,
    ref: User,
    required: true
  }, 
  course: { 
    type: [Schema.Types.ObjectId],
    ref: Course,
    required: true
  },
  progress: [
    {
      lesson: { type: mongoose.Schema.Types.ObjectId, ref: Lesson },
      completed: { type: Boolean, default: false }
    }
  ],
  createdAt: {
    type: Date,
    default: Date.now
  }
});
   
export const UserLesson = mongoose.model("UserLesson", userLessonShema);