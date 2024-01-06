import Home from "../assets/styles/home.module.css";
import logo from "/logo.svg";
import { PipeGameManager } from "./pipeGameManager.js";

export class TangiLearnApp {
  /**
   * @param {HTMLElement} root
   */
  constructor(root) {
    this.root = root;
  }
  displayHomeScreen() {
    const homeScreen = document.createElement("div");
    homeScreen.id = "home-screen";
    homeScreen.innerHTML = `
      <div class="logo">
        <img src=${logo} alt="Logo TangiLearn" />
      </div>
      <div class=${Home.loaderContainer}>
        <div class="${Home.loader}"></div>
        <p class="${Home.waitingMessage} ${Home.loading}">En attente d'un lancement de jeu</p>
      </div>
     <div class="logo ${Home.reversed}">
        <img src=${logo} alt="Logo TangiLearn" />
      </div>
    `;
    homeScreen.classList.add(Home.home);
    this.root.innerHTML = "";
    this.root.append(homeScreen);
  }

  removeHomeScreen() {}

  loadPipeGame() {
    const waitingMessage = document.querySelector(`.${Home.waitingMessage}`);
    waitingMessage.classList.add(Home.ready);
    waitingMessage.innerHTML = "Chargement du jeu en cours...";
    setTimeout(() => {
      const angle = window
        .getComputedStyle(waitingMessage)
        .rotate.match(/-?\d+/)[0];
      waitingMessage.style.transform = `rotate(${-angle}deg)`;

      setTimeout(() => {
        const logos = document.querySelectorAll(".logo");
        logos.forEach((logo) => {
          logo.classList.add(Home.fadeOut);
        });
        setTimeout(() => {
          document
            .querySelector(`.${Home.loaderContainer}`)
            .classList.add(Home.fadeOut);
          setTimeout(() => {
            new PipeGameManager().start(() => {
              this.displayHomeScreen();
            });
          }, 500);
        }, 500);
      }, 1000);
    }, 0);
  }
}
