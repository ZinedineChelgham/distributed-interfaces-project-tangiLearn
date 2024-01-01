// routes/monitoring.js
import express from "express";
import "dotenv/config";
import { findExecutable } from "../lib/executableFinder.js";
import { exec } from "child_process";
import { Pupil } from "../model/pupil.js";

const router = express.Router();
let needHelp = false;
let currentGame = "";

router.get("/start-stream", (req, res) => {
  /*
    const executableName = process.env.OBS_EXECUTABLE_NAME;
    const rootDirectory = process.env.OBS_ROOT_DIR;
    let executablePath = findExecutable(executableName, rootDirectory);
    let arg = "--startstreaming";
    if (!executablePath) {
      res.send("Executable not found");
      return;
    }
    let command = `start /d ${executablePath} ${executableName} ${arg}`
    console.log(command)
    exec(command, (err, stdout) => {
      if (err) {
        console.log(err)
        return;
      }
      console.log(stdout)
    })
     */
});
router.get("/table", (req, res) => {
  //
  res.send({
    id: 1,
    name: "PolyTable",
    games: [
      {
        id: 1,
        name: "Jeu des tuyaux",
        image:
          "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTN-4Q8pxv-FxMJlYYtCHWwHFMu8D7yoGMKSQ&usqp=CAU",
      },
      {
        id: 2,
        name: "Jeu des tours",
        image:
          "https://play-lh.googleusercontent.com/pIDsKZ2NrD0et6pSLqH7DibC4hzEW3C8Tweq1R-ar3hBgX9qA3QQbafK01A62jrXB9Q",
      },
    ],
  });
});

router.get("/stream-link", (req, res) => {
  res.send(
    "https://www.youtube.com/embed/live_stream?channel=" +
      process.env.YT_CHANNEL_ID,
  );
});

// Route to get all current players who are playing
router.get("/current-players", async (req, res) => {
  try {
    const currentPlayers = await Pupil.find({ isPlaying: true });
    res.json(currentPlayers);
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
});

router.post("/current-game", async (req, res) => {
  currentGame = req.body.game;
  res.json(currentGame);
});

router.get("/current-game", async (req, res) => {
    res.json(currentGame);
});

// Route to get if the player needs help
router.get("/need-help", async (req, res) => {
  try {
    res.json(needHelp);
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
});

// Route to set if the player needs help
router.post("/need-help", async (req, res) => {
  try {
    needHelp = req.body.needHelp;
    res.json(needHelp);
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
});

export default router;
