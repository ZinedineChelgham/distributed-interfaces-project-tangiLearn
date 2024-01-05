import Home from "../assets/styles/home.module.css";
import logo from "/logo.svg";

export class GameManager {
  /**
   * @param {HTMLElement} root
   * @param {import("./levels.js").GameLevel[]} levels
   */
  constructor(root, levels) {
    this.root = root;
    this.levels = levels;
  }
  displayHomeScreen() {
    const homeScreen = document.createElement("div");
    homeScreen.id = "home-screen";
    homeScreen.innerHTML = `
      <div class="logo">
        <img src=${logo} alt="Logo TangiLearn" />
      </div>
      <div class=${Home.loader}>
        <p class=${Home.waitingMessage}>En attente d'un lancement de jeu</p>
      </div>
     <div class=${Home.reversed}>
        <img src=${logo} alt="Logo TangiLearn" />
      </div>
    `;
    homeScreen.classList.add(Home.home);
    this.root.innerHTML = "";
    this.root.append(homeScreen);
  }
}
