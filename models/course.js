import mongoose from "mongoose";

const courseShema = new mongoose.Schema({
  course: { 
    type: String,
    required: true
  }, 
  createdAt: {
    type: Date,
    default: Date.now
  }
});
   
export const Course = mongoose.model("Course", courseShema);