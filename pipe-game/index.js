import { PipeGameManager } from "./src/pipeGameManager.js";
import { TUIOManager } from "@dj256/tuiomanager";
import { GameUiManager } from "./src/gameUiManager.js";

const anchor = document.getElementById("root");
TUIOManager.start({ anchor });

const gameManager = new PipeGameManager();
new GameUiManager(gameManager);
