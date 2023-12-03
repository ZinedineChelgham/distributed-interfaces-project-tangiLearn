import express from "express";
import { TowerGame } from "../model/towerGame.js";

const router = express.Router();


// Endpoint pour recevoir les données du frontend
router.post("/start-game", async (req, res) => {
  try {
    const { selectedValues } = req.body;

    // Enregistrez les données dans la base de données
    const newGame = new TowerGame({ selectedValues });
    const savedGame = await newGame.save();

    // Renvoyez l'ID généré au front-end
    res.status(200).json({ success: true, gameID: savedGame._id.toString() });
  } catch (error) {
    console.error("Erreur lors du démarrage d'une nouvelle partie :", error);
    res.status(500).json({ success: false, message: "Erreur lors du démarrage d'une nouvelle partie." });
  }
});
router.get("/get-game-data/:id", async (req, res) => {
  try {
    // Récupérez l'ID à partir des paramètres de l'URL
    const { id } = req.params;

    // Recherchez les données de la partie spécifique dans la base de données
    const gameData = await TowerGame.findOne({ gameId: id });

    // Vérifiez si la partie existe
    if (!gameData) {
      return res.status(404).json({ success: false, message: "Partie non trouvée." });
    }

    // Envoyez les données de la partie spécifique
    res.status(200).json({ success: true, gameData });
  } catch (error) {
    console.error("Erreur lors de la récupération des données de la partie :", error);
    res.status(500).json({ success: false, message: "Erreur lors de la récupération des données de la partie." });
  }
});
export default router;
