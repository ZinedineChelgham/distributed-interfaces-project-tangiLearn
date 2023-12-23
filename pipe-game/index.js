import { TUIOManager } from "@dj256/tuiomanager";
import { PipeElementWidget } from "./src/pipeElementWidget.js";
import "./index.css";

const BOARD_WIDTH = 1400;
const BOARD_HEIGHT = 800;

const IMAGES_WIDTH = 100;
const IMAGES_HEIGHT = 100;

const inventoryWidth = (1920 - BOARD_WIDTH) / 2;

let gameContainer = document.getElementById("game-container");
const gameContainerBoundingRect = gameContainer.getBoundingClientRect();
new TUIOManager(gameContainer).start();


let pipeCounts = {
  1: 5,
  2: 5,
  3: 5
};

let board = document.getElementById("board");
board.style.width = BOARD_WIDTH + "px";
board.style.height = BOARD_HEIGHT + "px";
let cells = [];

initInventory();

for (let i = 0; i < BOARD_WIDTH / IMAGES_WIDTH; i++) {
  for (let j = 0; j < BOARD_HEIGHT / IMAGES_HEIGHT; j++) {
    const cell = document.createElement("div");
    cell.classList.add("cell");
    cell.style.width = IMAGES_WIDTH + "px";
    cell.style.height = IMAGES_HEIGHT + "px";
    board.append(cell);
    cells.push(cell);
  }
}

function getNewCurvedPipe() {
  const pipe = new PipeElementWidget(
    inventoryWidth / 2 + gameContainerBoundingRect.left - IMAGES_WIDTH / 2,
    300,
    "curved"
  );
  pipe.addTo(board);
  addPipeListeners(pipe);
  return pipe;
}

function getNewStraightPipe() {
  const pipe = new PipeElementWidget(
    inventoryWidth / 2 + gameContainerBoundingRect.left - IMAGES_WIDTH / 2,
    500,
    "straight"
  );
  pipe.addTo(board);
  addPipeListeners(pipe);
  return pipe;
}

function getNewTShapePipe() {
  const pipe = new PipeElementWidget(
    inventoryWidth / 2 + gameContainerBoundingRect.left - IMAGES_WIDTH / 2,
    700,
    "t-shape"
  );
  pipe.addTo(board);
  addPipeListeners(pipe);
  return pipe;
}

function getNewBigPipe() {
  const pipe = new PipeElementWidget(
    BOARD_WIDTH + 3 * inventoryWidth / 2 + gameContainerBoundingRect.left - IMAGES_WIDTH / 2,
    540-100,
    "long"
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
      y: pipeY - tuioTag.y
    };
    pipe.tagFirstPosition = {
      x: tuioTag.x,
      y: tuioTag.y
    };
    console.log(pipeCounts);
  });

  pipe.onTagUpdate((tuioTag) => {
    if (Math.sqrt(Math.pow(Math.abs(pipe.tagFirstPosition.x - tuioTag.x), 2) + Math.pow(Math.abs(pipe.tagFirstPosition.y - tuioTag.y), 2)) > 50) {
      pipe.domElem.get(0).style.left = `${tuioTag.x + pipe.tagOffset.x}px`;
      pipe.domElem.get(0).style.top = `${tuioTag.y + pipe.tagOffset.y}px`;
    }
    if (tuioTag.angle !== pipe.tagCurrentAngle) {
      console.log(tuioTag.angle);
      pipe.angle = tuioTag.angle * 180 / Math.PI
      pipe.domElem.get(0).style.transform = `rotate(${pipe.angle}deg)`;
      pipe.tagCurrentAngle = tuioTag.angle;
    }
  });

  pipe.onTagDeletion((tuioTagId) => {
    const pipeX = pipe.domElem.get(0).style.left.replace("px", "");
    const pipeY = pipe.domElem.get(0).style.top.replace("px", "");
    const closestCell = cells.reduce((prev, curr) => {
      const boundingRect = curr.getBoundingClientRect();
      const currX = boundingRect.left;
      const currY = boundingRect.top;
      const currDist = Math.sqrt(Math.pow(Math.abs(pipeX - currX), 2) + Math.pow(Math.abs(pipeY - currY), 2));
      return prev.distance < currDist ? prev : { cell: curr, distance: currDist, coords: { x: currX, y: currY } };
    }, { cell: cells[0], distance: 1_000_000, coords: {} });

    const closestAngle = Math.round(pipe.angle / 90) * 90;
    pipe.domElem.get(0).style.transform = `rotate(${closestAngle}deg)`;
    pipe.angle = closestAngle;

    let cellX = closestCell.coords.x;
    let cellY = closestCell.coords.y;

    if (pipe.category === "long") {
      if (pipe.angle === 90 || pipe.angle === 270) {
        cellX -= IMAGES_WIDTH / 2;
        cellY -= IMAGES_HEIGHT / 2;
      }
    }
    pipe.oldAngle = closestAngle;


    pipe.domElem.get(0).style.left = cellX + "px";
    pipe.domElem.get(0).style.top = cellY + "px";
    pipe.domElem.get(0).classList.remove(`drag-${tuioTagId}`);

    // countSpan.textContent = `*${pipeCounts[pipeCat] || 0}`;
    console.log(pipeCounts);
    switch (pipe.category) {
      case "curved":
        getNewCurvedPipe();
        break;
      case "straight":
        getNewStraightPipe();
        break;
      case "t-shape":
        getNewTShapePipe();
        break;
      case "long":
        getNewBigPipe();
        break;
    }
  });
}

function initInventory() {
  getNewCurvedPipe();
  getNewStraightPipe();
  getNewTShapePipe();
  getNewBigPipe()
}
