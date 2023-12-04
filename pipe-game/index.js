import { TUIOManager } from "@dj256/tuiomanager";
import { ImageElementWidget } from "@dj256/tuiomanager/widgets";

const BOARD_WIDTH = 500;
const BOARD_HEIGHT = 500;

const IMAGES_WIDTH = 100;
const IMAGES_HEIGHT = 100;

const placeableImgsInRow = BOARD_WIDTH / IMAGES_WIDTH;
const placeableImgsInCol = BOARD_HEIGHT / IMAGES_HEIGHT;


new TUIOManager().start();


let draggedItem = null;
let pipeCounts = {
  1: 5,
  2: 5,
  3: 5
};

let board = document.getElementById("board");
let cells = [];

for (let i = 0; i < 25; i++) {
  const cell = document.createElement("div");
  cell.classList.add("cell");
  board.append(cell);
  cells.push(cell);
}

initInventory();
// initBoard();


const testImageWidget = new ImageElementWidget(
  0,
  0,
  IMAGES_WIDTH,
  IMAGES_HEIGHT,
  0,
  1,
  "./assets/images/pipeCurved.png"
);

// testImageWidget.addTo(board)
// testImageWidget.onTouchCreation((touch) => {
//   console.log("touch creation");
// })
// testImageWidget.onTouchDeletion((touch) => {
//   console.log("touch deletion");
// })
//
// testImageWidget.onTagCreation((tag) => {
//   console.log("tag creation");
// })
//
// testImageWidget.onTagDeletion((tag) => {
//   console.log("tag deletion");
// })
//
// testImageWidget.onTagUpdate((tag) => {
//   console.log("tag update");
// })

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


function initInventory() {

  // 1249, 831;
  // 966, 830;
  // 711,819;

  const pipes = [
    new ImageElementWidget(
      800,
      600,
      IMAGES_WIDTH,
      IMAGES_HEIGHT,
      0,
      1,
      "./assets/images/pipeCurved.png"
    ),
    new ImageElementWidget(
      550,
      600,
      IMAGES_WIDTH,
      IMAGES_HEIGHT,
      0,
      1,
      "./assets/images/pipeStraight.png"
    ),
    new ImageElementWidget(
      300,
      600,
      IMAGES_WIDTH,
      IMAGES_HEIGHT,
      0,
      1,
      "./assets/images/pipeTshape.png"
    )
  ];
  pipes[0].domElem.get(0).classList.add("pipe-cat-1");
  pipes[1].domElem.get(0).classList.add("pipe-cat-2");
  pipes[2].domElem.get(0).classList.add("pipe-cat-3");
  pipes.forEach((pipe) => {
    pipe.addTo(board);
    // pipe.domElem.get(0).classList.add("item");
    // pipe.onTouchCreation((touch) => {
    //   console.log("touch creation");
    // })
    pipe.onTagCreation((tuioTag) => {
      pipe.domElem.get(0).classList.add(`drag-${tuioTag.id}`);
      let pipeCat;
      pipe.domElem.get(0).classList.forEach((className) => {
        if (className.startsWith("pipe-cat-")) {
          pipeCat = className.split("-")[2];
        }
      });
      pipeCounts[pipeCat] = pipeCounts[pipeCat] - 1;
      // countSpan.textContent = `*${pipeCounts[pipeCat] || 0}`;
      console.log(pipeCounts);
      setTimeout(() => {
        //pipe.style.display = "none";
      }, 0);
    });

    pipe.onTagUpdate((tuioTag) => {
      pipe.domElem.get(0).style.left = `${tuioTag.x}px`;
      pipe.domElem.get(0).style.top = `${tuioTag.y}px`;
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
      console.log("cellX", cellX)
      console.log("cellY", cellY)
      pipe.domElem.get(0).style.left = cellX+"px";
      pipe.domElem.get(0).style.top = cellY+"px";

      pipe.domElem.get(0).classList.remove(`drag-${tuioTagId}`);
      let pipeCat;
      pipe.domElem.get(0).classList.forEach((className) => {
        if (className.startsWith("pipe-cat-")) {
          pipeCat = className.split("-")[2];
        }
      });
      pipeCounts[pipeCat] = pipeCounts[pipeCat] + 1;
      // countSpan.textContent = `*${pipeCounts[pipeCat] || 0}`;
      console.log(pipeCounts);
    });
  });
  const inventoryItems = document.querySelectorAll(".inventory-item");

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
