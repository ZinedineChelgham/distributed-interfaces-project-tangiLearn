import Pipes from "../assets/styles/pipes.module.css";
import magnet from "../assets/images/magnet.png";
import logo from "../assets/images/pipes_game_logo.svg";
import Animations from "../assets/styles/animations.module.css";
import { levels } from "./levels.js";
import sign from "../assets/images/works_sign.png";
import {
  BOARD_HEIGHT,
  BOARD_WIDTH,
  HORIZONTAL_MARGIN_HEIGHT,
  IMAGE_SIZE,
  INVENTORY_WIDTH,
  PIPE_TYPES,
} from "./constants.js";
import { Cell } from "./cell.js";
import inlet from "../assets/images/inlet.svg";
import { getAllNeighbours, PIPE_DATA } from "./util.js";
import { Pipe } from "./pipe.js";
import win from "../assets/images/win.svg";

export class GameUiManager {
  /**
   * @param {import("./pipeGameManager.js").PipeGameManager} gameManager
   */
  constructor(gameManager) {
    this.gameManager = gameManager;
    this.root = document.getElementById("root");
    this.pipesGameContainer = document.createElement("div");
    this.cells = [];
    /** @type {Map<number, Pipe>} */
    this.dragMap = new Map();
    this.displayLogo();
  }

  displayLogo() {
    let count = 0;
    this.pipesGameContainer.id = "logo-container";
    this.pipesGameContainer.innerHTML = `
      <div class="${Pipes.startScreen}">
        <div class="${Pipes.playerStart} reverse">
          <p>Déposez votre jeton pour commencer une partie</p>
          <div class="${Pipes.tokenContainer}">
            <div class="${Pipes.tokenContainerBackground}"></div>
            <div class="${Pipes.tokenContainerInnerBackground}"></div>
            <img src=${magnet} alt="Magnet" />
          </div>
        </div>
        <img class="${Pipes.logo}" src=${logo} alt="Logo TangiLearn" />
         <div class="${Pipes.playerStart}">
          <p>Déposez votre jeton pour commencer une partie</p>
          <div class="${Pipes.tokenContainer}">
            <div class="${Pipes.tokenContainerBackground}"></div>
            <div class="${Pipes.tokenContainerInnerBackground}"></div>
            <img src=${magnet} alt="Magnet" />
          </div>
         </div>
      </div>
`;
    const slots = this.pipesGameContainer.querySelectorAll(
      `.${Pipes.playerStart} .${Pipes.tokenContainer}`,
    );

    const gamePreStart = () => {
      slots.forEach((slot) => {
        slot.parentElement.querySelector("p").innerText = "C'est parti !";
      });
      setTimeout(() => {
        this.pipesGameContainer
          .querySelector(`.${Pipes.startScreen}`)
          .classList.add(Animations.fadeOut);
        setTimeout(() => {
          this.displayGame();
        }, 1000);
      }, 2000);
    };

    const startSpinAndAddListeners = () => {
      this.root
        .querySelector(`.${Pipes.logo}`)
        .classList.add(Animations.slowSpin);
      slots.forEach((container) => {
        const tagUpListener = () => {
          if (count > 0) count -= 1;
          container.removeEventListener("tuiotagup", tagUpListener);
        };
        container.addEventListener("tuiotagdown", () => {
          count += 1;
          container
            .querySelector(`.${Pipes.tokenContainerBackground}`)
            .classList.add(Pipes.tokenContainerBackgroundActive);
          if (count === 2) {
            gamePreStart();
          }
          container.addEventListener("tuiotagup", tagUpListener);
        });
      });
      setTimeout(() => {
        this.pipesGameContainer
          .querySelector(`.${Pipes.startScreen}`)
          .classList.add(Animations.fadeOut);
        setTimeout(() => {
          this.pipesGameContainer
            .querySelector(`.${Pipes.startScreen}`)
            .remove();
          this.displayGame();
        }, 1000);
      }, 2000);
    };

    this.pipesGameContainer.classList.add(Pipes.pipesGameContainer);
    this.root.innerHTML = "";
    this.root.append(this.pipesGameContainer);

    setTimeout(() => {
      startSpinAndAddListeners();
    }, 500);
  }

  displayGame() {
    this.level = levels[0];
    this.pipesGameContainer.innerHTML = `
      <div class="${Pipes.gameContainer}">
        <div class="${Pipes.inventory} ${Pipes.inventoryLeft}">
          <div class="${Pipes.inventorySign}">
            <img src=${sign} alt="Works" />
            <p>Inventaire</p>
          </div>
          <div class="${Pipes.inventorySign} reverse">
            <img src=${sign} alt="Works" />
            <p>Inventaire</p>
          </div>
        </div>
        <div class="margin up">
          <div class="${Pipes.helpButton} reverse">Demander de l'aide</div>
        </div>
        <div id="board"></div>
        <div class="margin down">
          <div class="${Pipes.helpButton}">Demander de l'aide</div>
        </div>
        <div class="${Pipes.inventory} ${Pipes.inventoryRight}">
          <div class="${Pipes.inventorySign}">
            <img src=${sign} alt="Works" />
            <p>Inventaire</p>
          </div>
          <div class="${Pipes.inventorySign} reverse">
            <img src=${sign} alt="Works" />
            <p>Inventaire</p>
          </div>
        </div>
      </div>
    `;
    this.board = this.pipesGameContainer.querySelector("#board");
    this.gameContainer = this.pipesGameContainer.querySelector(
      `.${Pipes.gameContainer}`,
    );

    for (let i = 0; i < BOARD_WIDTH / IMAGE_SIZE; i++) {
      for (let j = 0; j < BOARD_HEIGHT / IMAGE_SIZE; j++) {
        const cell = new Cell(i, j);
        this.board.append(cell);
        this.cells.push(cell);
      }
    }

    this.helpButtons = this.gameContainer.querySelectorAll(
      `.${Pipes.helpButton}`,
    );
    this.helpButtons.forEach(
      (button) => (button.onclick = () => this.gameManager.onHelpRequested()),
    );
    this.gameManager.on("help-sent", () => {
      this.helpButtons.forEach((button) => {
        button.classList.add(Pipes.helpButtonInactive);
        button.innerText = "Demande envoyée";
      });
    });
    this.gameManager.on("help-resolved", () => {
      this.helpButtons.forEach((button) => {
        button.classList.remove(Pipes.helpButtonInactive);
        button.innerText = "Demander de l'aide";
      });
    });
    this.gameManager.on("ping", ({ x, y }) => {
      this.blinkCell(x, y);
    });

    this.placeWaterGates();
    this.placeUnmovablePipes();
    this.initInventory();

    return this.gameManager.launchGame();
  }

  placeWaterGates() {
    for (const gateDescription of [this.level.inlet, this.level.outlet]) {
      const gateElement = document.createElement("div");
      gateElement.classList.add(Pipes.waterGate);
      gateElement.innerHTML = `
        <img src=${inlet} alt="Inlet" />
      `;
      this.pipesGameContainer
        .querySelector(`.margin.${gateDescription.side}`)
        .append(gateElement);
      gateElement.style.left = `${gateDescription.x * 100}px`;
      gateElement.style[gateDescription.side === "up" ? "bottom" : "top"] = 0;
      this.gameManager.addGate(gateDescription);
    }
  }

  placeUnmovablePipes() {
    this.level.unmovablePipes.forEach((pipeDescription) => {
      const pipeElement = document.createElement("img");
      pipeElement.src = PIPE_DATA[pipeDescription.type].images.fixed;
      pipeElement.classList.add(Pipes[pipeDescription.type]);
      this.board.append(pipeElement);
      pipeElement.style.position = "absolute";
      pipeElement.style.left = `${pipeDescription.x * 100}px`;
      pipeElement.style.top = `${pipeDescription.y * 100}px`;
      pipeElement.style.transform = `rotate(${pipeDescription.rotation}deg)`;

      this.gameManager.addNewPipeToGraph(
        pipeDescription.x,
        pipeDescription.y,
        pipeDescription.type,
        pipeDescription.rotation,
      );
      this.gameManager.addNewPipeToState(
        pipeDescription.type,
        pipeDescription.x,
        pipeDescription.y,
        pipeDescription.rotation,
        true,
      );
    });
  }

  initInventory() {
    for (const [pipeType, pipeCount] of Object.entries(this.level.pipes)) {
      if (pipeCount > 0) {
        this.getNewPipe(pipeType);
      }
    }
  }

  putBackPipe(pipe) {
    pipe.setAngle(0);
    pipe.setPosition(
      PIPE_DATA[pipe.pipeType].inventoryPosition.x,
      PIPE_DATA[pipe.pipeType].inventoryPosition.y,
    );
  }

  onGrabPipe(pipe, tuioTag) {
    if (pipe.tagId !== undefined) return;
    if (this.dragMap.get(tuioTag.id) !== undefined) return;
    this.dragMap.set(tuioTag.id, pipe);
    pipe.tagId = tuioTag.id;
    pipe.element.classList.add(`drag-${tuioTag.id}`);
    const pipeX = (this.x = pipe.element.style.left.match(/\d+/)[0]);
    const pipeY = (this.y = pipe.element.style.top.match(/\d+/)[0]);
    pipe.tagOffset = {
      x: pipeX - tuioTag.x,
      y: pipeY - tuioTag.y,
      angle: pipe.angle - tuioTag.angle,
    };
    pipe.tagLastPosition = {
      x: pipeX,
      y: pipeY,
      angle: pipe.angle,
    };
  }

  onMovePipe(pipe, tuioTag) {
    if (pipe.tagId === undefined || pipe.tagId !== tuioTag.id) return;
    if (
      Math.sqrt(
        Math.pow(Math.abs(pipe.tagLastPosition.x - tuioTag.x), 2) +
          Math.pow(Math.abs(pipe.tagLastPosition.y - tuioTag.y), 2),
      ) > 50
    ) {
      pipe.setPosition(
        tuioTag.x + pipe.tagOffset.x,
        tuioTag.y + pipe.tagOffset.y,
      );
    }
    pipe.setAngle(tuioTag.angle + pipe.tagOffset.angle);
  }

  async onPipeDropped(pipe, tuioTag) {
    if (pipe.tagId === undefined || pipe.tagId !== tuioTag.id) return;
    this.dragMap.delete(tuioTag.id);
    pipe.tagId = undefined;
    pipe.element.classList.remove(`drag-${tuioTag.id}`);
    let closestCellX = Math.round((pipe.x - INVENTORY_WIDTH) / 100);
    let closestCellY = Math.round((pipe.y - HORIZONTAL_MARGIN_HEIGHT) / 100);
    if (closestCellX < 0 || closestCellY < 0) return this.putBackPipe(pipe);
    if (this.gameManager.get({ x: closestCellX, y: closestCellY })) {
      const neighbors = getAllNeighbours(closestCellX, closestCellY);
      const candidate = Object.values(neighbors)
        .filter((v) => v.x >= 0 && v.y >= 0)
        .map((neighbor) => ({
          pipe: this.gameManager.get(neighbor),
          ...neighbor,
        }))
        .find((v) => v.pipe === null);
      if (candidate) {
        closestCellX = candidate.x;
        closestCellY = candidate.y;
      } else {
        return this.putBackPipe(pipe);
      }
    }
    const closestCellPosition = {
      x: closestCellX * 100 + INVENTORY_WIDTH,
      y: closestCellY * 100 + HORIZONTAL_MARGIN_HEIGHT,
    };
    const rotation = (Math.round((pipe.angle * 2) / Math.PI) * 90) % 360;
    pipe.setAngle((rotation * Math.PI) / 180);
    pipe.rotation = rotation;
    if (pipe.pipeType === PIPE_TYPES.LONG) {
      if (rotation === 90 || rotation === 270) {
        closestCellPosition.x -= IMAGE_SIZE / 2;
        closestCellPosition.y -= IMAGE_SIZE / 2;
      }
    }
    pipe.setPosition(closestCellPosition.x, closestCellPosition.y);
    if (pipe.element.classList.contains("new")) {
      pipe.element.classList.remove("new");
      await this.gameManager.onDropPipe(
        pipe,
        { x: closestCellX, y: closestCellY },
        true,
      );
      this.getNewPipe(pipe.pipeType);
    } else {
      await this.gameManager.onDropPipe(pipe, {
        x: closestCellX,
        y: closestCellY,
      });
    }
    pipe.boardX = closestCellX;
    pipe.boardY = closestCellY;
  }

  /**
   * @param {PipeType} pipeType
   */
  getNewPipe(pipeType) {
    this.gameManager.onNewPipe(pipeType);
    const pipe = new Pipe(pipeType);
    pipe.element.addEventListener("tuiotagdown", ({ detail: tuioTag }) =>
      this.onGrabPipe(pipe, tuioTag),
    );
    document.addEventListener("tuiotagmove", ({ detail: tuioTag }) =>
      this.onMovePipe(pipe, tuioTag),
    );
    document.addEventListener("tuiotagup", ({ detail: tuioTag }) =>
      this.onPipeDropped(pipe, tuioTag),
    );
    this.gameContainer.append(pipe.element);
  }

  blinkCell(x, y) {
    const cell = this.cells.find(
      (cell) => cell.x === x * 100 && cell.y === y * 100,
    );
    cell.classList.add(Animations.cellBlink);
    setTimeout(() => {
      cell.classList.remove(Animations.cellBlink);
    }, 2000);
  }

  onWin() {
    const winOverlay = document.createElement("div");
    winOverlay.classList.add(Pipes.winOverlay);
    winOverlay.innerHTML = `
      <img src=${win} alt="win" />
      <p>Vous avez gagné ! Félicitations !</p>
    `;
    this.pipesGameContainer.append(winOverlay);
    setTimeout(() => {
      winOverlay.classList.add(Animations.fadeOut);
      setTimeout(() => {
        this.pipesGameContainer.innerHTML = "";
        this.gameManager.onFinish();
      }, 500);
    }, 5000);
  }
}
