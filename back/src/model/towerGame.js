import mongoose from "mongoose";

const towerGameSchema = new mongoose.Schema({
        selectedValues: [String],
    });

export const TowerGame = mongoose.model("TowerGame", towerGameSchema);
