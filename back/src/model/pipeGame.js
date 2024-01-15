import mongoose from "mongoose";

const pipeGameSchema = new mongoose.Schema({
  players: {
    type: [mongoose.Schema.Types.ObjectId],
    ref: "Pupil",
    required: true,
  },
  state: {
    board: {
      type: [mongoose.Schema.Types.Mixed],
    },
    outlet: {
      x: Number,
      side: String,
    },
    inlet: {
      x: Number,
      side: String,
    },
  },
});

export const PipeGame = mongoose.model("PipeGame", pipeGameSchema);
