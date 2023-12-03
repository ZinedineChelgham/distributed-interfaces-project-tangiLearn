import express from "express";
import { TowerGame } from "../model/towerGame.js";

const router = express.Router();


// Endpoint pour recevoir les données du frontend
router.post("/start-game", async (req, res) => {
  try {
    const { selectedValues, gameId } = req.body;

    // Enregistrez les données dans la base de données
    const TowerGameInstance = new TowerGame({
      selectedValues,
      gameId,
    });

    await TowerGameInstance.save();
    console.log("Données enregistrées avec succès :", TowerGameInstance);
    res.status(200).json({ success: true, message: "Données enregistrées avec succès." });
  } catch (error) {
    console.error("Erreur lors de l'enregistrement des données :", error);
    res.status(500).json({ success: false, message: "Erreur lors de l'enregistrement des données." });
  }
});

// Endpoint pour récupérer les données du frontend (à des fins de démonstration)
router.get("/get-game-data", async (req, res) => {
  try {
    // Récupérez toutes les données de jeu de la base de données (à des fins de démonstration)
    const gameData = await GameData.find();

    res.status(200).json({ success: true, gameData });
  } catch (error) {
    console.error("Erreur lors de la récupération des données :", error);
    res.status(500).json({ success: false, message: "Erreur lors de la récupération des données." });
  }
});
export default router;
