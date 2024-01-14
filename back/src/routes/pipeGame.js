import express from "express";
import { PipeGame } from "../model/pipeGame.js";
import { updateGameState } from "../lib/pipeGameLogic.js";

const router = express.Router();

router.get("/", (req, res) => {
  res.send({ status: "Pipe Game is running" });
});

router.post("/", (req, res) => {
  PipeGame.create(req.body).then((pipeGame) => {
    res.send(pipeGame);
  });
});

router.get("/:gameId", (req, res) => {
  /** @type {string} */
  const { gameId } = req.params;
  PipeGame.findById(gameId).then((game) => {
    if (!game) return res.sendStatus(404);
    res.send(game);
  });
});

router.patch("/:gameId", (req, res) => {
  /** @type {string} */
  const { gameId } = req.params;
  /** @type {PipeGameAction} */
  const { newMove } = req.body;

  PipeGame.findById(gameId).then((pipeGame) => {
    if (pipeGame) {
      const { state } = pipeGame;
      pipeGame.state = updateGameState(state, newMove);
      pipeGame.save().then((updatedPipeGame) => {
        res.send(updatedPipeGame);
      });
    }
  });
});

export default router;
