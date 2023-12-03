import mongoose from "mongoose";
import {v4 as uuidv4} from "uuid";

const towerGameSchema = new mongoose.Schema({
        selectedValues: [String],
        gameId: String,
    });

export const TowerGame = mongoose.model("TowerGame", towerGameSchema);
