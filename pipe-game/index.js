import { TUIOManager } from "@dj256/tuiomanager";
import { PipeElementWidget } from "./src/pipeElementWidget.js";
import {
  BOARD_HEIGHT,
  BOARD_WIDTH,
  GAME_WIDTH,
  IMAGE_SIZE,
  PIPE_TYPES,
} from "./src/constants.js";
import "./index.css";

const inventoryWidth = (GAME_WIDTH - BOARD_WIDTH) / 2;

const gameContainer = document.getElementById("game-container");
const gameContainerBoundingRect = gameContainer.getBoundingClientRect();
new TUIOManager(gameContainer).start();

let pipeCounts = {
  1: 5,
  2: 5,
  3: 5,
};

let board = document.getElementById("board");
board.style.width = BOARD_WIDTH + "px";
board.style.height = BOARD_HEIGHT + "px";
let cells = [];

initInventory();

for (let i = 0; i < BOARD_WIDTH / IMAGE_SIZE; i++) {
  for (let j = 0; j < BOARD_HEIGHT / IMAGE_SIZE; j++) {
    const cell = document.createElement("div");
    cell.classList.add("cell");
    cell.style.width = IMAGE_SIZE + "px";
    cell.style.height = IMAGE_SIZE + "px";
    board.append(cell);
    cells.push(cell);
  }
}

function getNewCurvedPipe() {
  const pipe = new PipeElementWidget(
    inventoryWidth / 2 + gameContainerBoundingRect.left - IMAGE_SIZE / 2,
    300,
    PIPE_TYPES.CURVED,
  );
  pipe.addTo(board);
  addPipeListeners(pipe);
  return pipe;
}

function getNewStraightPipe() {
  const pipe = new PipeElementWidget(
    inventoryWidth / 2 + gameContainerBoundingRect.left - IMAGE_SIZE / 2,
    500,
    PIPE_TYPES.STRAIGHT,
  );
  pipe.addTo(board);
  addPipeListeners(pipe);
  return pipe;
}

function getNewTShapePipe() {
  const pipe = new PipeElementWidget(
    inventoryWidth / 2 + gameContainerBoundingRect.left - IMAGE_SIZE / 2,
    700,
    PIPE_TYPES.T_SHAPE,
  );
  pipe.addTo(board);
  addPipeListeners(pipe);
  return pipe;
}

function getNewBigPipe() {
  const pipe = new PipeElementWidget(
    BOARD_WIDTH +
      (3 * inventoryWidth) / 2 +
      gameContainerBoundingRect.left -
      IMAGE_SIZE / 2,
    540 - 100,
    PIPE_TYPES.LONG,
  );
  pipe.addTo(board);
  addPipeListeners(pipe);
  return pipe;
}

function addPipeListeners(pipe) {
  pipe.onTagCreation((tuioTag) => {
    pipe.domElem.get(0).classList.add(`drag-${tuioTag.id}`);
    pipe.tagCurrentAngle = tuioTag.angle;
    const pipeX = pipe.domElem.get(0).style.left.replace("px", "");
    const pipeY = pipe.domElem.get(0).style.top.replace("px", "");
    pipe.tagOffset = {
      x: pipeX - tuioTag.x,
      y: pipeY - tuioTag.y,
    };
    pipe.tagFirstPosition = {
      x: tuioTag.x,
      y: tuioTag.y,
    };
    console.log(pipeCounts);
  });

  pipe.onTagUpdate((tuioTag) => {
    if (
      Math.sqrt(
        Math.pow(Math.abs(pipe.tagFirstPosition.x - tuioTag.x), 2) +
          Math.pow(Math.abs(pipe.tagFirstPosition.y - tuioTag.y), 2),
      ) > 50
    ) {
      pipe.domElem.get(0).style.left = `${tuioTag.x + pipe.tagOffset.x}px`;
      pipe.domElem.get(0).style.top = `${tuioTag.y + pipe.tagOffset.y}px`;
    }
    if (tuioTag.angle !== pipe.tagCurrentAngle) {
      console.log(tuioTag.angle);
      pipe.angle = (tuioTag.angle * 180) / Math.PI;
      pipe.domElem.get(0).style.transform = `rotate(${pipe.angle}deg)`;
      pipe.tagCurrentAngle = tuioTag.angle;
    }
  });

  pipe.onTagDeletion((tuioTagId) => {
    const pipeX = pipe.domElem.get(0).style.left.replace("px", "");
    const pipeY = pipe.domElem.get(0).style.top.replace("px", "");
    const closestCell = cells.reduce(
      (prev, curr) => {
        const boundingRect = curr.getBoundingClientRect();
        const currX = boundingRect.left;
        const currY = boundingRect.top;
        const currDist = Math.sqrt(
          Math.pow(Math.abs(pipeX - currX), 2) +
            Math.pow(Math.abs(pipeY - currY), 2),
        );
        return prev.distance < currDist
          ? prev
          : { cell: curr, distance: currDist, coords: { x: currX, y: currY } };
      },
      { cell: cells[0], distance: 1_000_000, coords: {} },
    );

    const closestAngle = Math.round(pipe.angle / 90) * 90;
    pipe.domElem.get(0).style.transform = `rotate(${closestAngle}deg)`;
    pipe.angle = closestAngle;

    let cellX = closestCell.coords.x;
    let cellY = closestCell.coords.y;

    if (pipe.category === PIPE_TYPES.LONG) {
      if (pipe.angle === 90 || pipe.angle === 270) {
        cellX -= IMAGE_SIZE / 2;
        cellY -= IMAGE_SIZE / 2;
      }
    }
    pipe.oldAngle = closestAngle;

    pipe.domElem.get(0).style.left = cellX + "px";
    pipe.domElem.get(0).style.top = cellY + "px";
    pipe.domElem.get(0).classList.remove(`drag-${tuioTagId}`);

    // countSpan.textContent = `*${pipeCounts[pipeCat] || 0}`;
    console.log(pipeCounts);
    switch (pipe.category) {
      case PIPE_TYPES.CURVED:
        getNewCurvedPipe();
        break;
      case PIPE_TYPES.STRAIGHT:
        getNewStraightPipe();
        break;
      case PIPE_TYPES.T_SHAPE:
        getNewTShapePipe();
        break;
      case PIPE_TYPES.LONG:
        getNewBigPipe();
        break;
    }
  });
}

function initInventory() {
  getNewCurvedPipe();
  getNewStraightPipe();
  getNewTShapePipe();
  getNewBigPipe();
}
