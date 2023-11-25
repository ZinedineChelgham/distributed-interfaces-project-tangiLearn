import mongoose from "mongoose";

const teacherSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  surname: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true,
  },
});

export const Teacher = mongoose.model("Teacher", teacherSchema);
