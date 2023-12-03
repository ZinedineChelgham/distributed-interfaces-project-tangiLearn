// Import TUIOManager
//import TUIOManager from './tuiomanager/core/TUIOManager';
//import ImageElementWidget from './tuiomanager/widgets/ElementWidget/ImageElementWidget/ImageElementWidget';
/* * TUIOManager starter * */
// const tuioManager = new TUIOManager();
// tuioManager.start();

const BOARD_WIDTH = 500;
const BOARD_HEIGHT = 500;

const IMAGES_WIDTH = 100;
const IMAGES_HEIGHT = 100;

const placeableImgsInRow = BOARD_WIDTH / IMAGES_WIDTH;
const placeableImgsInCol = BOARD_HEIGHT / IMAGES_HEIGHT;


window.onload = initGame;



let draggedItem = null;



function initGame() {
    initBoard();
    initInventory();

}

let pipeRotationTracker = {};

function initBoard() {
    let board = document.getElementById("board");

    for (let i = 0; i < placeableImgsInRow; i++) {
        for (let j = 0; j < placeableImgsInCol; j++) {
            let cell = document.createElement("div");
            cell.id = i + "-" + j;
            cell.classList.add("cell");
            cell.addEventListener("dragover", function (event) {
                event.preventDefault();
            });
            cell.addEventListener("dragenter", function (event) {
                event.preventDefault();
            });
            cell.addEventListener("drop", function (event) {
                if (!cell.children.length && draggedItem) {
                    let clone = draggedItem.cloneNode(true);
                    clone.addEventListener("dragstart", function () {
                        draggedItem = clone;
                        setTimeout(() => {
                            draggedItem.style.display = "flex";
                        }, 0);
                    });

                    clone.addEventListener("dragend", function (e) {
                        console.log(e);
                        setTimeout(() => {
                            //remove from the dom
                            draggedItem.remove();
                            draggedItem = null;
                        }, 0);
                    });

                    clone.addEventListener("click", function (e) {
                        let curAngle = pipeRotationTracker[clone] || 0;
                        curAngle += 90;
                        clone.style.transition = "transform 0.4s ease"; // Adding transition to the transform property
                        clone.style.transform = "rotate(" + curAngle + "deg)";
                        pipeRotationTracker[clone] = curAngle;
                    })

                    cell.appendChild(clone);
                }
            });
            document.getElementById("board").appendChild(cell);
        }
    }
}

function handleDrop(e) {
    console.log(e);
    var dt = e.dataTransfer
    var img = dt.files
}

function preventDefaults(e) {
    e.preventDefault()
    e.stopPropagation()
    console.log(e.srcElement.dataset.pipecat);
}


function initInventory() {
    const pipes = document.querySelectorAll(".pipe");
    pipes.forEach(pipe => {
        pipe.addEventListener("dragstart", function () {
            draggedItem = pipe;
            setTimeout(() => {
                //pipe.style.display = "none";
            }, 0);
        });

        pipe.addEventListener("dragend", function () {
            setTimeout(() => {
                //draggedItem.style.display = "block";
                draggedItem = null;
            }, 0);
        });
    });

}
