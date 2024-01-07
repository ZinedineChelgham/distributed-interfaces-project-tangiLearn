import logo from "../assets/images/pipes_game_logo.svg";
import magnet from "../assets/images/magnet.png";
import Pipes from "../assets/styles/pipes.module.css";
import Animations from "../assets/styles/animations.module.css";
import inlet from "../assets/images/inlet.svg";
import sign from "../assets/images/works_sign.png";
import win from "../assets/images/win.svg";
import { HTMLElementWidget } from "@dj256/tuiomanager/widgets";
import { levels } from "./levels.js";
import straightFixed from "../assets/images/pipe_straight_fixed.svg";
import curvedFixed from "../assets/images/pipe_curved_fixed.svg";
import tshapeFixed from "../assets/images/pipe_t_shape_fixed.svg";
import longFixed from "../assets/images/pipe_long_fixed.svg";
import straight from "../assets/images/pipe_straight.svg";
import curved from "../assets/images/pipe_curved.svg";
import tshape from "../assets/images/pipe_t_shape.svg";
import long from "../assets/images/pipe_long.svg";
import {
  BOARD_HEIGHT,
  BOARD_WIDTH,
  GAME_HEIGHT,
  GAME_WIDTH,
  HORIZONTAL_MARGIN_HEIGHT,
  IMAGE_SIZE,
  INVENTORY_WIDTH,
  PIPE_TYPES,
} from "./constants.js";
import { Cell } from "./cell.js";

// Pipe default rotation states:
//
//   == STRAIGHT ==          == CURVED ==          == T-SHAPE ==          == LONG ==
//
//       ######                          ##            ######               ######
//        ####                     ########             ####                 ####
//        ####                  ###########      ##     ####     ##          ####
//        ####                 #######   ##      ##################          ####
//        ####                 #######           ##              ##          ####
//       ######              ##########                                      ####
//                                                                           ####
//                                                                           ####
//                                                                           ####
//                                                                           ####
//                                                                           ####
//                                                                           ####
//                                                                          ######

const pipeData = {
  straight: {
    images: {
      fixed: straightFixed,
      movable: straight,
    },
    inventoryPosition: {
      x: INVENTORY_WIDTH / 2 - IMAGE_SIZE / 2,
      y: GAME_HEIGHT / 2 - (5 / 2) * IMAGE_SIZE,
    },
  },
  curved: {
    images: {
      fixed: curvedFixed,
      movable: curved,
    },
    inventoryPosition: {
      x: INVENTORY_WIDTH / 2 - IMAGE_SIZE / 2,
      y: GAME_HEIGHT / 2 - IMAGE_SIZE / 2,
    },
  },
  tshape: {
    images: {
      fixed: tshapeFixed,
      movable: tshape,
    },
    inventoryPosition: {
      x: INVENTORY_WIDTH / 2 - IMAGE_SIZE / 2,
      y: GAME_HEIGHT / 2 + (3 / 2) * IMAGE_SIZE,
    },
  },
  long: {
    images: {
      fixed: longFixed,
      movable: long,
    },
    inventoryPosition: {
      x: GAME_WIDTH - INVENTORY_WIDTH / 2 - IMAGE_SIZE / 2,
      y: GAME_HEIGHT / 2 - IMAGE_SIZE,
    },
  },
};

let classId = 0;

export class PipeGameManager {
  constructor() {
    this.root = document.getElementById("root");
    this.pipesGameContainer = document.createElement("div");
    this.cells = [];
    /** @type {{[p: PipeType]: number}} */
    this.pipeCounts = {
      [PIPE_TYPES.CURVED]: 0,
      [PIPE_TYPES.STRAIGHT]: 0,
      [PIPE_TYPES.T_SHAPE]: 0,
      [PIPE_TYPES.LONG]: 0,
    };
    /** @type {Map<number, number[]>} */
    this.equivalenceClasses = new Map();
    /** @type {Map<number, {equivalenceClass: number, pipe: {pipeType: PipeType, rotation: 0|90|180|270}}>} */
    this.graphNodes = new Map();
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
    const slots = this.root.querySelectorAll(
      `.${Pipes.playerStart} .${Pipes.tokenContainer}`,
    );

    const gamePreStart = () => {
      slots.forEach((slot) => {
        slot.parentElement.querySelector("p").innerText = "C'est parti !";
        setTimeout(() => {
          this.pipesGameContainer
            .querySelector(`.${Pipes.startScreen}`)
            .classList.add(Animations.fadeOut);
          setTimeout(() => {
            this.launchGame();
          }, 500);
        }, 2500);
      });
    };
    const startSpinAndAddListeners = () => {
      this.root
        .querySelector(`.${Pipes.logo}`)
        .classList.add(Animations.slowSpin);
      slots.forEach((container) => {
        const playerSlot = new HTMLElementWidget(container);
        playerSlot.addOnTagDownListener(() => {
          count += 1;
          playerSlot.domElem
            .querySelector(`.${Pipes.tokenContainerBackground}`)
            .classList.add(Pipes.tokenContainerBackgroundActive);
          if (count === 2) {
            gamePreStart();
          }
        });
        playerSlot.addOnTagUpListener(() => {
          count -= 1;
        });
      });
      // setTimeout(() => {
      //   this.pipesGameContainer
      //     .querySelector(`.${Pipes.startScreen}`)
      //     .classList.add(Animations.fadeOut);
      //   setTimeout(() => {
      //     this.pipesGameContainer
      //       .querySelector(`.${Pipes.startScreen}`)
      //       .remove();
      //     this.launchGame();
      //   }, 1000);
      // }, 2000);
    };

    this.pipesGameContainer.classList.add(Pipes.pipesGameContainer);
    this.root.innerHTML = "";
    this.root.append(this.pipesGameContainer);

    setTimeout(() => {
      startSpinAndAddListeners();
    }, 500);
  }

  launchGame() {
    const level = levels[0];
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

    this.placeWaterGates(level);
    this.placeUnmovablePipes(level);
    this.initInventory(level);
    const helpButtons = this.gameContainer.querySelectorAll(
      `.${Pipes.helpButton}`,
    );
    helpButtons.forEach(
      (button) =>
        (button.onclick = () => {
          return fetch("http://localhost:3000/api/monitoring/need-help", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              needHelp: true,
            }),
          })
            .then(() => {})
            .catch((err) => console.error(err))
            .finally(() => {
              helpButtons.forEach((button) => {
                button.classList.add(Pipes.helpButtonInactive);
                button.innerText = "Demande envoyée";
              });
            });
        }),
    );
  }

  /**
   * @param {import("./gameLevel.js").GameLevel} level
   */
  placeWaterGates(level) {
    for (const gateDescription of [level.inlet, level.outlet]) {
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
      const id = classId++;
      this.graphNodes.set(
        (gateDescription.x + 1) * 100 + (gateDescription.side === "up" ? 0 : 9),
        {
          equivalenceClass: id,
          pipe: undefined,
        },
      );
      this.equivalenceClasses.set(id, [
        (gateDescription.x + 1) * 100 + (gateDescription.side === "up" ? 0 : 9),
      ]);
    }
  }

  /**
   * @param {import("./gameLevel.js").GameLevel} level
   */
  placeUnmovablePipes(level) {
    level.unmovablePipes.forEach((pipeDescription) => {
      const pipeElement = document.createElement("img");
      pipeElement.src = pipeData[pipeDescription.type].images.fixed;
      pipeElement.classList.add(Pipes[pipeDescription.type]);
      this.board.append(pipeElement);
      pipeElement.style.position = "absolute";
      pipeElement.style.left = `${pipeDescription.x * 100}px`;
      pipeElement.style.top = `${pipeDescription.y * 100}px`;
      pipeElement.style.transform = `rotate(${pipeDescription.rotation}deg)`;

      this.addNewPipeToGraph(
        pipeDescription.x,
        pipeDescription.y,
        pipeDescription.type,
        pipeDescription.rotation,
      );
    });
  }

  /**
   * @param {import("./gameLevel.js").GameLevel} level
   */
  initInventory(level) {
    for (const [pipeType, pipeCount] of Object.entries(level.pipes)) {
      if (pipeCount > 0) {
        this.getNewPipe(level, pipeType);
      }
    }
  }

  /**
   * @param {import("./gameLevel.js").GameLevel} level
   * @param {PipeType} pipeType
   */
  getNewPipe(level, pipeType) {
    this.pipeCounts[pipeType] += 1;
    const pipeElement = document.createElement("img");
    pipeElement.src = pipeData[pipeType].images.movable;
    pipeElement.style.position = "absolute";
    pipeElement.style.left = `${pipeData[pipeType].inventoryPosition.x}px`;
    pipeElement.style.top = `${pipeData[pipeType].inventoryPosition.y}px`;
    pipeElement.style.width = `${IMAGE_SIZE}px`;
    pipeElement.style.height = `${
      pipeType === PIPE_TYPES.LONG ? IMAGE_SIZE * 2 : IMAGE_SIZE
    }px`;
    pipeElement.classList.add("new");
    this.gameContainer.append(pipeElement);
    const pipeWidget = new HTMLElementWidget(pipeElement);

    pipeWidget.addOnTagDownListener((tuioTag) => {
      pipeWidget.domElem.classList.add(`drag-${tuioTag.id}`);
      const pipeX = pipeWidget.domElem.style.left.match(/\d+/)[0];
      const pipeY = pipeWidget.domElem.style.top.match(/\d+/)[0];
      console.log(pipeX, pipeY);
      pipeWidget.tagOffset = {
        x: pipeX - tuioTag.x,
        y: pipeY - tuioTag.y,
        angle: pipeWidget.angle - tuioTag.angle,
      };
    });

    pipeWidget.addOnTagDragListener((tuioTag, oldPos) => {
      if (
        Math.sqrt(
          Math.pow(Math.abs(oldPos.x - tuioTag.x), 2) +
            Math.pow(Math.abs(oldPos.y - tuioTag.y), 2),
        ) > 50
      ) {
        pipeWidget.domElem.style.left = `${
          tuioTag.x + pipeWidget.tagOffset.x
        }px`;
        pipeWidget.domElem.style.top = `${
          tuioTag.y + pipeWidget.tagOffset.y
        }px`;
      }
    });

    pipeWidget.addOnTagRotateListener((tuioTag) => {
      pipeWidget.domElem.style.transform = `rotate(${
        tuioTag.angle + pipeWidget.tagOffset.angle
      }rad)`;
    });

    pipeWidget.addOnTagUpListener((tuioTagId) => {
      const pipeX =
        pipeWidget.domElem.style.left.match(/\d+/)[0] - INVENTORY_WIDTH;
      const pipeY =
        pipeWidget.domElem.style.top.match(/\d+/)[0] - HORIZONTAL_MARGIN_HEIGHT;
      const closest = this.cells.reduce(
        (prev, curr) => {
          const currDist = Math.sqrt(
            Math.pow(Math.abs(pipeX - curr.x), 2) +
              Math.pow(Math.abs(pipeY - curr.y), 2),
          );
          return prev.distance < currDist
            ? prev
            : {
                cell: curr,
                distance: currDist,
              };
        },
        { cell: this.cells[0], distance: 1_000_000 },
      );
      const closestCell = closest.cell;
      const closestAngle =
        (Math.round((pipeWidget.angle * 2) / Math.PI) * 90) % 360;
      pipeWidget.domElem.style.transform = `rotate(${closestAngle}deg)`;

      if (pipeType === PIPE_TYPES.LONG) {
        if (closestAngle === 90 || closestAngle === 270) {
          closestCell.x -= IMAGE_SIZE / 2;
          closestCell.y -= IMAGE_SIZE / 2;
        }
      }
      pipeWidget.oldAngle = closestAngle;
      pipeWidget.domElem.style.left = closestCell.x + INVENTORY_WIDTH + "px";
      pipeWidget.domElem.style.top =
        closestCell.y + HORIZONTAL_MARGIN_HEIGHT + "px";
      const pipeXBoard = closestCell.x / 100;
      const pipeYBoard = closestCell.y / 100;
      pipeWidget.domElem.classList.remove(`drag-${tuioTagId}`);
      // countSpan.textContent = `*${pipeCounts[pipeCat] || 0}`;
      if (pipeWidget.domElem.classList.contains("new")) {
        pipeWidget.domElem.classList.remove("new");
        this.addNewPipeToGraph(pipeXBoard, pipeYBoard, pipeType, closestAngle);
        if (level.pipes[pipeType] - this.pipeCounts[pipeType] > 0) {
          this.getNewPipe(level, pipeType);
        }
      } else {
        this.movePipe(pipeXBoard, pipeYBoard, closestAngle, pipeWidget);
      }
      pipeWidget.positionOnBoard = {
        x: pipeXBoard,
        y: pipeYBoard,
        angle: closestAngle,
      };

      if (this.checkWin(level)) {
        console.log("////////////////////////////////////////////////");
        console.log("//                                            //");
        console.log("//                   WIN                      //");
        console.log("//                                            //");
        console.log("////////////////////////////////////////////////");
        this.onWin();
      }
    });
  }

  /**
   * @param {number} pipeX
   * @param {number} pipeY
   * @param {PipeType} pipeType
   * @param {0|90|180|270} rotation
   * @returns {{x: number, y: number}[]}
   */
  getNeighbours(pipeX, pipeY, pipeType, rotation) {
    const allNeighbours = {
      up: { x: pipeX, y: pipeY - 1 },
      down: { x: pipeX, y: pipeY + 1 },
      left: { x: pipeX - 1, y: pipeY },
      right: { x: pipeX + 1, y: pipeY },
    };
    switch (pipeType) {
      case PIPE_TYPES.STRAIGHT:
        switch (rotation) {
          case 0:
          case 180:
            delete allNeighbours.left;
            delete allNeighbours.right;
            break;
          case 90:
          case 270:
            delete allNeighbours.up;
            delete allNeighbours.down;
            break;
        }
        break;
      case PIPE_TYPES.CURVED:
        switch (rotation) {
          case 0:
            delete allNeighbours.left;
            delete allNeighbours.up;
            break;
          case 90:
            delete allNeighbours.up;
            delete allNeighbours.right;
            break;
          case 180:
            delete allNeighbours.right;
            delete allNeighbours.down;
            break;
          case 270:
            delete allNeighbours.down;
            delete allNeighbours.left;
            break;
        }
        break;
      case PIPE_TYPES.T_SHAPE:
        switch (rotation) {
          case 0:
            delete allNeighbours.down;
            break;
          case 90:
            delete allNeighbours.left;
            break;
          case 180:
            delete allNeighbours.up;
            break;
          case 270:
            delete allNeighbours.right;
            break;
        }
        break;
      case PIPE_TYPES.LONG:
        switch (rotation) {
          case 0:
          case 180:
            delete allNeighbours.left;
            delete allNeighbours.right;
            allNeighbours.down.y += 1;
            break;
          case 90:
          case 270:
            delete allNeighbours.up;
            delete allNeighbours.down;
            allNeighbours.right.x += 1;
            break;
        }
        break;
    }
    return Object.values(allNeighbours);
  }

  /**
   * @param {number} newPipeX
   * @param {number} newPipeY
   * @param {PipeType} pipeType
   * @param {0|90|180|270} rotation
   */
  addNewPipeToGraph(newPipeX, newPipeY, pipeType, rotation) {
    const id = classId++;
    this.graphNodes.set((newPipeX + 1) * 100 + newPipeY + 1, {
      equivalenceClass: id,
      pipe: { pipeType, rotation },
    });
    this.equivalenceClasses.set(id, [(newPipeX + 1) * 100 + newPipeY + 1]);
    if (pipeType === PIPE_TYPES.LONG) {
      if (rotation === 0 || rotation === 180) {
        this.graphNodes.set((newPipeX + 1) * 100 + newPipeY + 2, {
          equivalenceClass: id,
          pipe: { pipeType, rotation },
        });
        this.equivalenceClasses.set(id, [
          (newPipeX + 1) * 100 + newPipeY + 1,
          (newPipeX + 1) * 100 + newPipeY + 2,
        ]);
      } else {
        this.graphNodes.set((newPipeX + 2) * 100 + newPipeY + 1, {
          equivalenceClass: id,
          pipe: { pipeType, rotation },
        });
        this.equivalenceClasses.set(id, [
          (newPipeX + 1) * 100 + newPipeY + 1,
          (newPipeX + 2) * 100 + newPipeY + 1,
        ]);
      }
    }
    const neighbours = this.getNeighbours(
      newPipeX,
      newPipeY,
      pipeType,
      rotation,
    );
    for (const neighbour of neighbours) {
      if (this.graphNodes.has((neighbour.x + 1) * 100 + neighbour.y + 1)) {
        this.mergeEquivalenceClasses(
          this.graphNodes.get((neighbour.x + 1) * 100 + neighbour.y + 1)
            .equivalenceClass,
          this.graphNodes.get((newPipeX + 1) * 100 + newPipeY + 1)
            .equivalenceClass,
        );
      }
    }
  }

  movePipe(newPipeX, newPipeY, newAngle, pipeWidget) {
    const oldPipeX = pipeWidget.positionOnBoard.x;
    const oldPipeY = pipeWidget.positionOnBoard.y;
    this.removeNode(oldPipeX, oldPipeY);
    this.addNewPipeToGraph(newPipeX, newPipeY, pipeWidget.pipeType, newAngle);
  }

  removeNode(x, y, removingLong = false) {
    const id = this.graphNodes.get((x + 1) * 100 + y + 1).equivalenceClass;
    this.equivalenceClasses
      .get(id)
      .splice(
        this.equivalenceClasses.get(id).indexOf((x + 1) * 100 + y + 1),
        1,
      );
    const node = this.graphNodes.get((x + 1) * 100 + y + 1);
    this.graphNodes.delete((x + 1) * 100 + y + 1);
    if (this.equivalenceClasses.get(id).length === 0) {
      this.equivalenceClasses.delete(id);
    }
    if (!removingLong && node.pipe.pipeType === PIPE_TYPES.LONG) {
      if (node.pipe.rotation === 0 || node.pipe.rotation === 180) {
        this.removeNode(x, y + 1, true);
      } else {
        this.removeNode(x + 1, y, true);
      }
    }
  }

  checkWin(level) {
    const inletEquivalenceClass = this.graphNodes.get(
      (level.inlet.x + 1) * 100 + (level.inlet.side === "up" ? 0 : 9),
    ).equivalenceClass;
    const outletEquivalenceClass = this.graphNodes.get(
      (level.outlet.x + 1) * 100 + (level.outlet.side === "up" ? 0 : 9),
    ).equivalenceClass;
    return inletEquivalenceClass === outletEquivalenceClass;
  }

  mergeEquivalenceClasses(equivalenceClass1, equivalenceClass2) {
    if (equivalenceClass1 === equivalenceClass2) return;
    const equivalenceClass1Set = this.equivalenceClasses.get(equivalenceClass1);
    const equivalenceClass2Set = this.equivalenceClasses.get(equivalenceClass2);
    for (const node of equivalenceClass2Set) {
      this.graphNodes.set(node, {
        equivalenceClass: equivalenceClass1,
        pipe: this.graphNodes.get(node).pipe,
      });
    }
    this.equivalenceClasses.set(
      equivalenceClass1,
      equivalenceClass1Set.concat(equivalenceClass2Set),
    );
    this.equivalenceClasses.delete(equivalenceClass2);
  }

  start(onFinish) {
    this.onFinish = onFinish;
    this.displayLogo();
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
        this.onFinish();
      }, 500);
    }, 5000);
  }

  blinkCell(x, y) {
    const cell = this.cells.find((cell) => cell.x === x && cell.y === y);
    cell.classList.add(Animations.cellBlink);
    setTimeout(() => {
      cell.classList.remove(Animations.cellBlink);
    }, 1000);
  }
}
