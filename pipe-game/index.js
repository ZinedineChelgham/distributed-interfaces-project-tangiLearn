import { TUIOManager } from "@dj256/tuiomanager";

const BOARD_WIDTH = 500;
const BOARD_HEIGHT = 500;

const IMAGES_WIDTH = 100;
const IMAGES_HEIGHT = 100;

const placeableImgsInRow = BOARD_WIDTH / IMAGES_WIDTH;
const placeableImgsInCol = BOARD_HEIGHT / IMAGES_HEIGHT;


window.onload = initGame;
const tuioManager = new TUIOManager();


let draggedItem = null;


function initGame() {
  initBoard();
  initInventory();

}

let pipeRotationTracker = {};
let pipeCounts = {
  1: 5,
  2: 5,
  3: 5
};


function initBoard() {
  let board = document.getElementById("board");

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
  const pipes = document.querySelectorAll(".pipe");
  const inventoryItems = document.querySelectorAll(".inventory-item");
  for (let i = 0; i < pipes.length; i++) {
    const pipe = pipes[i];
    const pipeCat = pipe.getAttribute("data-pipeCat");
    const pipeCount = pipeCounts[pipeCat];
    const countSpan = document.createElement("span");
    countSpan.classList.add("pipeCount");
    countSpan.textContent = `*${pipeCount || 0}`;
    inventoryItems[i].appendChild(countSpan);


    pipe.addEventListener("dragstart", function() {
      draggedItem = pipe;
      pipeCounts[pipeCat] = pipeCounts[pipeCat] - 1;
      countSpan.textContent = `*${pipeCounts[pipeCat] || 0}`;
      console.log(pipeCounts);
      setTimeout(() => {
        //pipe.style.display = "none";
      }, 0);
    });

    pipe.addEventListener("dragend", function() {
      setTimeout(() => {
        //draggedItem.style.display = "block";
        draggedItem = null;
      }, 0);
    });
  }
}
