import express from "express";
import { TowerGame } from "../model/towerGame.js";

const router = express.Router();


// Endpoint pour recevoir les données du frontend
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
