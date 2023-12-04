import mongoose from "mongoose";

const towerGameSchema = new mongoose.Schema({
        selectedValues: [String],
        gameId: String,
        state_game:  [[Number]],
    });

export const TowerGame = mongoose.model("TowerGame", towerGameSchema);
