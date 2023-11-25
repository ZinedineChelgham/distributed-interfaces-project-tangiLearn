import mongoose from "mongoose";

const pupilSchema = new mongoose.Schema({
  name: String,
  surname: String,
  tokenId: String,
  teacher: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Teacher",
  },
});

export const Pupil = mongoose.model("Pupil", pupilSchema);
