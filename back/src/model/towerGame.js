import mongoose from "mongoose";
import {v4 as uuidv4} from "uuid";

const towerGameSchema = new mongoose.Schema({
        selectedValues: [String],
        gameId: {
            type: String,
            default: uuidv4(), // Utilisez uuidv4 pour générer l'ID par défaut
            unique: true,
        },
    });

export const TowerGame = mongoose.model("TowerGame", towerGameSchema);
