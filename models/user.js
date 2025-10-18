import mongoose from "mongoose";

const userShema = new mongoose.Schema({
  username: { 
    type: String,
    required: true
  }, 
  email: { 
    type: String, 
    required: true,
    unique: true 
  },
  password: { 
    type: String,
    required: true
  },
  isAdmin: {
    type: Boolean,
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});
   
export const User = mongoose.model("User", userShema);