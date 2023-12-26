export class Cell extends HTMLElement {
  constructor(x, y) {
    super();
    this.x = x;
    this.y = y;
  }
  connectedCallback() {
    this.classList.add("cell");
    this.style.left = `${this.x}px`;
    this.style.top = `${this.y}px`;
  }
}

customElements.define("pipe-cell", Cell);
