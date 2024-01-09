import {
  HORIZONTAL_MARGIN_HEIGHT,
  IMAGE_SIZE,
  INVENTORY_WIDTH,
  PIPE_TYPES,
} from "./constants.js";
import { PIPE_DATA } from "./util.js";

export class Pipe {
  constructor(pipeType, onDropped) {
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
    this.onDropped = onDropped;
    this.element.addEventListener("tuiotagdown", this.onTagDown.bind(this));
    document.addEventListener("tuiotagmove", this.onTagMove.bind(this));
    this.element.addEventListener("tuiotagup", this.onTagUp.bind(this));
  }

  onTagDown({ detail: tuioTag }) {
    if (this.tagId !== undefined) return;
    this.tagId = tuioTag.id;
    this.element.classList.add(`drag-${tuioTag.id}`);
    const pipeX = (this.x = this.element.style.left.match(/\d+/)[0]);
    const pipeY = (this.y = this.element.style.top.match(/\d+/)[0]);
    this.tagOffset = {
      x: pipeX - tuioTag.x,
      y: pipeY - tuioTag.y,
      angle: this.angle - tuioTag.angle,
    };
    this.tagLastPosition = {
      x: pipeX,
      y: pipeY,
      angle: this.angle,
    };
  }

  onTagMove({ detail: tuioTag }) {
    if (this.tagId === undefined || this.tagId !== tuioTag.id) return;
    if (
      Math.sqrt(
        Math.pow(Math.abs(this.tagLastPosition.x - tuioTag.x), 2) +
          Math.pow(Math.abs(this.tagLastPosition.y - tuioTag.y), 2),
      ) > 50
    ) {
      this.setPosition(
        tuioTag.x + this.tagOffset.x,
        tuioTag.y + this.tagOffset.y,
      );
    }
    this.setAngle(tuioTag.angle + this.tagOffset.angle);
  }

  onTagUp({ detail: tuioTagId }) {
    if (this.tagId === undefined || this.tagId !== tuioTagId) return;
    this.tagId = undefined;
    this.element.classList.remove(`drag-${tuioTagId}`);
    const closestCellX = Math.round((this.x - INVENTORY_WIDTH) / 100);
    const closestCellY = Math.round((this.y - HORIZONTAL_MARGIN_HEIGHT) / 100);
    const closestCellPosition = {
      x: closestCellX * 100 + INVENTORY_WIDTH,
      y: closestCellY * 100 + HORIZONTAL_MARGIN_HEIGHT,
    };
    const rotation = (Math.round((this.angle * 2) / Math.PI) * 90) % 360;
    console.log(rotation);
    this.setAngle((rotation * Math.PI) / 180);

    if (this.pipeType === PIPE_TYPES.LONG) {
      if (rotation === 90 || rotation === 270) {
        closestCellPosition.x -= IMAGE_SIZE / 2;
        closestCellPosition.y -= IMAGE_SIZE / 2;
      }
    }
    this.setPosition(closestCellPosition.x, closestCellPosition.y);
    if (this.element.classList.contains("new")) {
      this.element.classList.remove("new");
      this.onDropped(true, { x: closestCellX, y: closestCellY });
    } else {
      this.onDropped(false, { x: closestCellX, y: closestCellY });
    }
    this.boardX = closestCellX;
    this.boardY = closestCellY;
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
