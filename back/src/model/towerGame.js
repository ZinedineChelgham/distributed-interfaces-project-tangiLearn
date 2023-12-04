import mongoose from "mongoose";

const towerGameSchema = new mongoose.Schema({
        selectedValues: [String],
        gameId: [String],
    });

export const TowerGame = mongoose.model("TowerGame", towerGameSchema);
