import { PipeGameManager } from "./src/pipeGameManager.js";
import { TUIOManager } from "@dj256/tuiomanager";

const anchor = document.getElementById("root");
TUIOManager.start({ anchor });

new PipeGameManager().start(() => {
  window.location.reload();
});
