import mongoose from "mongoose";

const teacherSchema = new mongoose.Schema({
  name: String,
  surname: String,
  password: String,
});

export const Teacher = mongoose.model("Teacher", teacherSchema);
