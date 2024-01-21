import { IMAGE_SIZE, PIPE_TYPES } from "./constants.js";
import { PIPE_DATA } from "./util.js";

export class Pipe {
  constructor(pipeType) {
    this.pipeType = pipeType;
    const pipeElement = document.createElement("img");
    pipeElement.src = PIPE_DATA[pipeType].images.movable;
    pipeElement.style.position = "absolute";
    pipeElement.style.left = `${PIPE_DATA[pipeType].inventoryPosition.x}px`;
    pipeElement.style.top = `${PIPE_DATA[pipeType].inventoryPosition.y}px`;
    pipeElement.style.width = `${IMAGE_SIZE}px`;
    pipeElement.style.height = `${
      pipeType === PIPE_TYPES.LONG ? IMAGE_SIZE * 2 : IMAGE_SIZE
    }px`;
    pipeElement.classList.add("new");
    this.element = pipeElement;

    this.x = 0;
    this.y = 0;
    this.boardX = undefined;
    this.boardY = undefined;
    this.angle = 0;
    this.rotation = 0;
  }

  setPosition(x, y) {
    this.element.style.left = `${x}px`;
    this.element.style.top = `${y}px`;
    this.x = x;
    this.y = y;
  }

  setAngle(angle) {
    this.element.style.transform = `rotate(${angle}rad)`;
    this.angle = angle;
  }
}
