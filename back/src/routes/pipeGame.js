import express from "express";
import { PipeGame } from "../model/pipeGame.js";

const router = express.Router();

let ping = { x: undefined, y: undefined };

router.get("/ping", (req, res) => {
  res.send(ping);
});

router.post("/ping", (req, res) => {
  ping = req.body;
  res.send(ping);
});

router.get("/", (req, res) =>
  PipeGame.find().then((pipeGames) => {
    res.send(pipeGames);
  }),
);

router.post("/", (req, res) => {
  PipeGame.create(req.body).then((pipeGame) => {
    res.send(pipeGame);
  });
});

router.get("/:gameId", (req, res) => {
  /** @type {string} */
  const { gameId } = req.params;
  return PipeGame.findOne()
    .then((game) => {
      if (!game) return res.sendStatus(404);
      res.send(game);
    })
    .catch((error) => {
      console.error(error);
      res.sendStatus(500);
    });
});

router.patch("/:gameId", (req, res) => {
  /** @type {string} */
  const { gameId } = req.params;
  return PipeGame.findOneAndUpdate({}, req.body, { new: true }).then(
    (pipeGame) => {
      res.send(pipeGame);
    },
  );
});

export default router;
