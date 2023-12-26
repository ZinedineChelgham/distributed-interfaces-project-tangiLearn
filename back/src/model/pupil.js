import mongoose from "mongoose";

const pupilSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  surname: {
    type: String,
    required: true,
  },
  tokenId: {
    type: String,
    required: false,
  },
  isPlaying : {
    type: Boolean,
    required: false,
    default: false
  },
  avatar: {
    type: String,
    required: false,
  },
  teacher: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Teacher",
  },
});

export const Pupil = mongoose.model("Pupil", pupilSchema);
