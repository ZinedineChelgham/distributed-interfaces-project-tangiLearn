import mongoose from "mongoose";

const pipeGameSchema = new mongoose.Schema({
  players: {
    type: [mongoose.Schema.Types.ObjectId],
    ref: "Pupil",
    required: true,
  },
  state: {
    board: {
      type: [[[{}]]],
    },
  },
});

export const PipeGame = mongoose.model("PipeGame", pipeGameSchema);
