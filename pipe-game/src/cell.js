import { IMAGE_SIZE } from "./constants.js";

export class Cell extends HTMLElement {
  constructor(x, y) {
    super();
    this.x = x * IMAGE_SIZE;
    this.y = y * IMAGE_SIZE;
  }
  connectedCallback() {
    this.classList.add("cell");
    this.style.left = `${this.x}px`;
    this.style.top = `${this.y}px`;
  }
}

customElements.define("pipe-cell", Cell);
