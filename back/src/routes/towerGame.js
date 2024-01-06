import express from "express";
import { TowerGame } from "../model/towerGame.js";
import { WebSocketServer } from 'ws';
import WebSocket from 'ws';
const app = express();
import cors from "cors";
import bodyParser from "body-parser";
const router = express.Router();
const wss = new WebSocketServer({ port: 8080 });
app.use(cors());

app.use(bodyParser.json());
// Exemple de gestion de la connexion WebSocket
wss.on('listening', () => console.log('Server listening on port 8080'));

// Exemple de gestion de la connexion WebSocket
wss.on('connection', (ws) => {
  console.log('Client connected to WebSocket server');
  ws.on('message', (message) => {
    console.log('Received message:', message.toString());

    // Envoyez une réponse au client
    ws.send('Message received by the server');

    // Envoyez le message à tous les clients connectés (broadcast)
    wss.clients.forEach((client) => {
      if (client.readyState === WebSocket.OPEN && client !== ws) {
        // Envoyez le message reçu du casque AR à tous les clients
        client.send(message.toString());
      }
    });
  });
});
router.post("/start-game", async (req, res) => {
  try {
    const { selectedValues, gameId,state_game } = req.body;
    await TowerGame.deleteMany({});
    // Enregistrez les données dans la base de données
      const TowerGameInstance = new TowerGame({
        selectedValues,
        gameId,
        state_game,
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
    return gameData;
  } catch (error) {
    console.error("Erreur lors de la récupération des données de la partie :", error);
    res.status(500).json({ success: false, message: "Erreur lors de la récupération des données de la partie." });
  }
});
router.post('/update-data/:id', async (req, res) => {
  try {
    let { gameId, row, col, action } = req.body;

    // Recherchez la partie dans la base de données par gameId
    const game = await TowerGame.findOne({ gameId: gameId });

    // Vérifiez si la partie existe
    if (!game) {
      return res.status(404).json({ success: false, message: 'Partie non trouvée.' });
    }

    // Mettez à jour les données de la partie
    if (action === 'increment') {
        game.state_game[row][col] += 1;
    } else if (action === 'decrement') {
        game.state_game[row][col] -= 1;
    }
    console.log('Données de jeu mises à jour :', game);
    // Sauvegardez les modifications dans la base de données
    await game.save();
    // Envoyez les données mises à jour à tous les clients WebSocket connectés
    if(action === 'increment') action = 1;
    else if(action === 'decrement') action = -1;
    wss.clients.forEach((client) => {
      if (client.readyState === WebSocket.OPEN) {
        client.send(JSON.stringify({ origin: 'backend', row, col, action }));
      }
    });
    res.status(200).json({ success: true, message: 'Données mises à jour avec succès.' });
  } catch (error) {
    console.error('Erreur lors de la mise à jour des données du jeu :', error);
    res.status(500).json({ success: false, message: 'Erreur lors de la mise à jour des données du jeu.' });
  }
});
router.post('/ping', async (req, res) => {
  try {
    const { row, col, action } = req.body;

    // Recherchez la partie dans la base de données par gameId
    const game = await TowerGame.findOne({ gameId: gameId });

    // Vérifiez si la partie existe
    if (!game) {
      return res.status(404).json({ success: false, message: 'Partie non trouvée.' });
    }

    // Vous pouvez traiter les données de ping ici
    console.log('Ping received:', {row, col, action });

    // Répondez avec succès
    res.status(200).json({ success: true, message: 'Ping reçu avec succès.' });
  } catch (error) {
    console.error('Erreur lors de la gestion du ping :', error);
    res.status(500).json({ success: false, message: 'Erreur lors de la gestion du ping.' });
  }
});

router.get("/get-id", async (req, res) => {
  try {
    // Rechercher la seule instance de jeu dans la base de données
    const gameInstance = await TowerGame.findOne({});

    if (gameInstance) {
      // Si l'instance de jeu est trouvée, renvoyer l'ID
      res.status(200).json({ success: true, gameId: gameInstance.gameId });
    } else {
      // Si aucune instance de jeu n'est trouvée
      res.status(404).json({ success: false, message: "Aucune instance de jeu trouvée." });
    }
  } catch (error) {
    console.error("Erreur lors de la récupération de l'ID :", error);
    res.status(500).json({ success: false, message: "Erreur lors de la récupération de l'ID." });
  }
});

export default router;
