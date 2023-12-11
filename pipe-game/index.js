import { TUIOManager } from "@dj256/tuiomanager";
import { PipeElementWidget } from "./src/pipeElementWidget.js";

const BOARD_WIDTH = 1400;
const BOARD_HEIGHT = 800;

const IMAGES_WIDTH = 100;
const IMAGES_HEIGHT = 100;

const placeableImgsInRow = BOARD_WIDTH / IMAGES_WIDTH;
const placeableImgsInCol = BOARD_HEIGHT / IMAGES_HEIGHT;

const inventoryWidth = (1920 - BOARD_WIDTH) / 2;

let gameContainer = document.getElementById("game-container");
const gameContainerBoundingRect = gameContainer.getBoundingClientRect();
new TUIOManager(gameContainer).start();


let draggedItem = null;
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

// initBoard();

function initBoard() {
  for (let i = 0; i < placeableImgsInRow; i++) {
    for (let j = 0; j < placeableImgsInCol; j++) {
      let cell = document.createElement("div");
      cell.id = i + "-" + j;
      cell.classList.add("cell");
      cell.addEventListener("dragover", function(event) {
        event.preventDefault();
      });
      cell.addEventListener("dragenter", function(event) {
        event.preventDefault();
      });
      cell.addEventListener("drop", function(event) {
        if (!cell.children.length && draggedItem) {
          let clone = draggedItem.cloneNode(true);
          clone.classList.add("rotation-0");
          clone.style.transition = "transform 0.4s ease"; // Adding transition to the transform property
          clone.addEventListener("dragstart", function() {
            draggedItem = clone;
            setTimeout(() => {
              //draggedItem.style.display = "flex";
            }, 0);
          });

          clone.addEventListener("dragend", function(e) {
            console.log(e);
            setTimeout(() => {
              //remove from the dom
              draggedItem.remove();
              draggedItem = null;
            }, 0);
          });

          clone.addEventListener("click", function(e) {
            let curAngle = 0;
            clone.classList.forEach((className) => {
              if (className.startsWith("rotation-")) {
                clone.classList.remove(className);
                curAngle = parseInt(className.split("-")[1]);
              }
            });
            curAngle += 90 % 360;
            clone.style.transform = "rotate(" + curAngle + "deg)";
            clone.classList.add("rotation-" + curAngle);
          });

          cell.appendChild(clone);
        }
      });
      document.getElementById("board").appendChild(cell);
    }
  }
}

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

function getCategory(pipe) {
  let pipeCat;
  pipe.domElem.get(0).classList.forEach((className) => {
    if (className.startsWith("pipe-cat-")) {
      pipeCat = className.split("-")[2];
    }
  });
  return pipeCat;
}

function getNewCurvedPipe() {
  const pipe = new PipeElementWidget(
    inventoryWidth/2 + gameContainerBoundingRect.left - IMAGES_WIDTH/2,
    300,
    IMAGES_WIDTH,
    IMAGES_HEIGHT,
    0,
    1,
    "./assets/images/pipe_curved.svg"
  );
  pipe.addTo(board);
  pipe.domElem.get(0).classList.add("pipe-cat-1");
  addPipeListeners(pipe);
  return pipe;
}

function getNewStraightPipe() {
  const pipe = new PipeElementWidget(
    inventoryWidth/2 + gameContainerBoundingRect.left - IMAGES_WIDTH/2,
    500,
    IMAGES_WIDTH,
    IMAGES_HEIGHT,
    0,
    1,
    "./assets/images/pipe_straight.svg"
  );
  pipe.addTo(board);
  pipe.domElem.get(0).classList.add("pipe-cat-2");
  addPipeListeners(pipe);
  return pipe;
}

function getNewTShapePipe() {
  const pipe = new PipeElementWidget(
    inventoryWidth/2 + gameContainerBoundingRect.left - IMAGES_WIDTH/2,
    750,
    IMAGES_WIDTH,
    IMAGES_HEIGHT,
    0,
    1,
    "./assets/images/pipe_t_shape.svg"
  );
  pipe.addTo(board);
  pipe.domElem.get(0).classList.add("pipe-cat-3");
  addPipeListeners(pipe);
  return pipe;
}

function addPipeListeners(pipe) {
  pipe.onTagCreation((tuioTag) => {
    pipe.domElem.get(0).classList.add(`drag-${tuioTag.id}`);
    pipe.tagCurrentAngle = tuioTag.angle;
    console.log(pipeCounts);
  });

  pipe.onTagUpdate((tuioTag) => {
    pipe.domElem.get(0).style.left = `${tuioTag.x}px`;
    pipe.domElem.get(0).style.top = `${tuioTag.y}px`;
    if (tuioTag.angle !== pipe.tagCurrentAngle) {
      pipe.domElem.get(0).style.transform = `rotate(${tuioTag.angle*180/Math.PI}deg)`;
      pipe.angle = tuioTag.angle;
      pipe.tagCurrentAngle = tuioTag.angle;
    }
    console.log(tuioTag);
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

    const cellX = closestCell.coords.x;
    const cellY = closestCell.coords.y;
    pipe.domElem.get(0).style.left = cellX + "px";
    pipe.domElem.get(0).style.top = cellY + "px";

    pipe.domElem.get(0).classList.remove(`drag-${tuioTagId}`);
    let pipeCat = getCategory(pipe);
    pipeCounts[pipeCat] = pipeCounts[pipeCat] - 1;
    // countSpan.textContent = `*${pipeCounts[pipeCat] || 0}`;
    console.log(pipeCounts);
    switch (pipeCat) {
      case "1":
        if (pipeCounts[pipeCat] > 0)
          getNewCurvedPipe();
        break;
      case "2":
        getNewStraightPipe();
        break;
      case "3":
        getNewTShapePipe();
        break;
    }
  });
}

function initInventory() {
  getNewCurvedPipe(),
    getNewStraightPipe(),
    getNewTShapePipe();

  // for (let i = 0; i < pipes.length; i++) {
  //   const pipe = pipes[i];
  //   const pipeCat = pipe.getAttribute("data-pipeCat");
  //   const pipeCount = pipeCounts[pipeCat];
  //   const countSpan = document.createElement("span");
  //   countSpan.classList.add("pipeCount");
  //   countSpan.textContent = `*${pipeCount || 0}`;
  //   inventoryItems[i].appendChild(countSpan);
  //

  //
  //   pipe.addEventListener("dragend", function() {
  //     setTimeout(() => {
  //       //draggedItem.style.display = "block";
  //       draggedItem = null;
  //     }, 0);
  //   });
  // }
}
