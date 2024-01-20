import { levels } from "./levels.js";
import { PIPE_TYPES } from "./constants.js";
import {
  BACKEND_URL,
  clearPing,
  getAllNeighbours,
  getPingValue,
} from "./util.js";
import { GameState } from "./gameState.js";
import { Pipe } from "./pipe.js";
import { EventEmitter } from "events";
import { nanoid } from "nanoid";

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

let classId = 0;

export class PipeGameManager extends EventEmitter {
  /** @typedef Position
   * @property {number} x
   * @property {number} y
   * @property {number} angle
   */

  /**
   * @typedef TagInfo
   * @property {Position} position
   * @property {Position} offset
   */
  constructor() {
    super();
    this.pipes = [];
    /** @type {{[p: PipeType]: number}} */
    this.pipeCounts = {
      [PIPE_TYPES.CURVED]: 0,
      [PIPE_TYPES.STRAIGHT]: 0,
      [PIPE_TYPES.T_SHAPE]: 0,
      [PIPE_TYPES.LONG]: 0,
    };
    /** @type {Map<string, number[]>} */
    this.equivalenceClasses = new Map();
    /** @type {Map<number, {equivalenceClass: number, pipe: {pipeType: PipeType, rotation: 0|90|180|270}}>} */
    this.graphNodes = new Map();
    this.state = new GameState();
  }

  get({ x, y }) {
    return this.state.board[y][x];
  }

  launchGame() {
    const level = (this.level = levels[0]);
    this.state.inlet = level.inlet;
    this.state.outlet = level.outlet;

    this.initPingInterval();
    return this.publishGameState();
  }

  async onDropPipe(pipe, newPos, isNew = false) {
    if (isNew) {
      if (
        this.level.pipes[pipe.pipeType] - this.pipeCounts[pipe.pipeType] >
        0
      ) {
        this.addNewPipeToGraph(
          newPos.x,
          newPos.y,
          pipe.pipeType,
          pipe.rotation,
        );
        this.addNewPipeToState(
          pipe.pipeType,
          newPos.x,
          newPos.y,
          pipe.rotation,
        );
      }
    } else {
      this.movePipe(newPos.x, newPos.y, pipe.angle, pipe);
      this.updateStateAfterMove(
        pipe.boardX,
        pipe.boardY,
        newPos.x,
        newPos.y,
        pipe.angle,
      );
    }
    await this.publishGameState();
    if (this.checkWin()) {
      console.log("////////////////////////////////////////////////");
      console.log("//                                            //");
      console.log("//                   WIN                      //");
      console.log("//                                            //");
      console.log("////////////////////////////////////////////////");
      this.onWin();
    }
  }

  initPingInterval() {
    this.pingInterval = setInterval(() => {
      getPingValue().then((ping) => {
        const { x, y } = ping;
        if (x !== undefined && y !== undefined) {
          this.emit("ping", { x, y });
          return clearPing();
        }
      });
    }, 1000);
  }

  publishGameState() {
    return fetch(`${BACKEND_URL}/api/pipe-game/fakeId`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ state: this.state }),
    });
  }

  onHelpRequested() {
    return fetch(`${BACKEND_URL}/api/monitoring/need-help`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        needHelp: true,
      }),
    })
      .then(() => {
        const interval = setInterval(
          () =>
            fetch(`${BACKEND_URL}/api/monitoring/need-help`)
              .then((res) => res.json())
              .then((res) => {
                if (!res) {
                  clearInterval(interval);
                  this.emit("help-resolved");
                }
              }),
          1000,
        );
      })
      .catch((err) => console.error(err))
      .finally(() => {
        this.emit("help-sent");
      });
  }

  addGate(gateDescription) {
    const id = nanoid();
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

  addNewPipeToState(pipeType, x, y, rotation, fixed = false) {
    this.state.board[y][x] = {
      type: pipeType,
      rotation,
      fixed,
    };
  }

  updateStateAfterMove(x, y, newX, newY, newRotation) {
    this.state.board[newY][newX] = {
      type: this.state.board[y][x].type,
      rotation: newRotation,
    };
    if (x !== newX || y !== newY) this.state.board[y][x] = null;
  }

  /**
   * @param {number} pipeX
   * @param {number} pipeY
   * @param {PipeType} pipeType
   * @param {0|90|180|270} rotation
   * @returns {{x: number, y: number}[]}
   */
  getNeighbours(pipeX, pipeY, pipeType, rotation) {
    const allNeighbours = getAllNeighbours(pipeX, pipeY);
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
    console.log(this.equivalenceClasses);
    console.log(this.graphNodes);
  }

  /**
   * @param {number} newPipeX
   * @param {number} newPipeY
   * @param {0|90|180|270} newAngle
   * @param {Pipe} pipe
   */
  movePipe(newPipeX, newPipeY, newAngle, pipe) {
    const oldPipeX = pipe.boardX;
    const oldPipeY = pipe.boardY;
    this.removeNode(oldPipeX, oldPipeY);
    this.addNewPipeToGraph(newPipeX, newPipeY, pipe.pipeType, newAngle);
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

  checkWin() {
    const inletEquivalenceClass = this.graphNodes.get(
      (this.level.inlet.x + 1) * 100 + (this.level.inlet.side === "up" ? 0 : 9),
    ).equivalenceClass;
    const outletEquivalenceClass = this.graphNodes.get(
      (this.level.outlet.x + 1) * 100 +
        (this.level.outlet.side === "up" ? 0 : 9),
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

  onNewPipe(pipeType) {
    this.pipeCounts[pipeType] += 1;
  }

  start(onFinish) {
    this.onFinish = onFinish;
    // this.uiManager.displayLogo(() => this.launchGame());
  }
}
