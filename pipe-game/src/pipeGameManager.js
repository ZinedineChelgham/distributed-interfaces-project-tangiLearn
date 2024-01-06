import logo from "../assets/images/pipes_game_logo.svg";
import magnet from "../assets/images/magnet.png";
import Pipes from "../assets/styles/pipes.module.css";
import Animations from "../assets/styles/animations.module.css";
import inlet from "../assets/images/inlet.svg";
import sign from "../assets/images/works_sign.png";
import { HTMLElementWidget } from "@dj256/tuiomanager/widgets";
import { levels } from "./levels.js";
import straightFixed from "../assets/images/pipe_straight_fixed.svg";
import curvedFixed from "../assets/images/pipe_curved_fixed.svg";
import tshapeFixed from "../assets/images/pipe_t_shape_fixed.svg";
import longFixed from "../assets/images/pipe_long_fixed.svg";

const pipeImages = {
  straight: straightFixed,
  curved: curvedFixed,
  tshape: tshapeFixed,
  long: longFixed,
};

export class PipeGameManager {
  constructor() {
    this.root = document.getElementById("root");
    this.pipesGameContainer = document.createElement("div");
  }

  displayLogo() {
    let count = 0;
    this.pipesGameContainer.id = "logo-container";
    this.pipesGameContainer.innerHTML = `
      <div class="${Pipes.startScreen}">
        <div class="${Pipes.playerStart} reverse">
          <p>Déposez votre jeton pour commencer une partie</p>
          <div class="${Pipes.tokenContainer}">
            <div class="${Pipes.tokenContainerBackground}"></div>
            <div class="${Pipes.tokenContainerInnerBackground}"></div>
            <img src=${magnet} alt="Magnet" />
          </div>
        </div>
        <img class="${Pipes.logo}" src=${logo} alt="Logo TangiLearn" />
         <div class="${Pipes.playerStart}">
          <p>Déposez votre jeton pour commencer une partie</p>
          <div class="${Pipes.tokenContainer}">
            <div class="${Pipes.tokenContainerBackground}"></div>
            <div class="${Pipes.tokenContainerInnerBackground}"></div>
            <img src=${magnet} alt="Magnet" />
          </div>
         </div>
      </div>
`;

    this.pipesGameContainer.classList.add(Pipes.pipesGameContainer);
    this.root.innerHTML = "";
    this.root.append(this.pipesGameContainer);
    setTimeout(() => {
      this.root
        .querySelector(`.${Pipes.logo}`)
        .classList.add(Animations.slowSpin);
      const slots = this.root.querySelectorAll(
        `.${Pipes.playerStart} .${Pipes.tokenContainer}`,
      );
      slots.forEach((container) => {
        const playerSlot = new HTMLElementWidget(container);
        playerSlot.addOnTagDownListener(() => {
          count += 1;
          playerSlot.domElem
            .querySelector(`.${Pipes.tokenContainerBackground}`)
            .classList.add(Pipes.tokenContainerBackgroundActive);
          if (count === 2) {
            slots.forEach((slot) => {
              slot.parentElement.querySelector("p").innerText = "C'est parti !";
              setTimeout(() => {
                this.pipesGameContainer
                  .querySelector(`.${Pipes.startScreen}`)
                  .classList.add(Animations.fadeOut);
                setTimeout(() => {
                  this.launchGame();
                }, 500);
              }, 2500);
            });
          }
        });
        playerSlot.addOnTagUpListener(() => {
          count -= 1;
        });
      });
      setTimeout(() => {
        this.pipesGameContainer
          .querySelector(`.${Pipes.startScreen}`)
          .classList.add(Animations.fadeOut);
        setTimeout(() => {
          this.pipesGameContainer
            .querySelector(`.${Pipes.startScreen}`)
            .remove();
          this.launchGame();
        }, 1000);
      }, 2000);
    }, 500);
  }

  launchGame() {
    const level = levels[0];
    this.pipesGameContainer.innerHTML = `
      <div class="${Pipes.gameContainer}">
        <div class="${Pipes.inventory} ${Pipes.inventoryLeft}">
          <div class="${Pipes.inventorySign}">
            <img src=${sign} alt="Works" />
            <p>Inventaire</p>
          </div>
          <div class="${Pipes.inventorySign} reverse">
            <img src=${sign} alt="Works" />
            <p>Inventaire</p>
          </div>
        </div>
        <div class="margin up"></div>
        <div id="board"></div>
        <div class="margin down"></div>
        <div class="${Pipes.inventory} ${Pipes.inventoryRight}">
          <div class="${Pipes.inventorySign}">
            <img src=${sign} alt="Works" />
            <p>Inventaire</p>
          </div>
          <div class="${Pipes.inventorySign} reverse">
            <img src=${sign} alt="Works" />
            <p>Inventaire</p>
          </div>
        </div>
      </div>
    `;
    this.placeWaterGates(level);
    this.placeUnmovablePipes(level);
  }

  /**
   * @param {import("./gameLevel.js").GameLevel} level
   */
  placeWaterGates(level) {
    for (const gateDescription of [level.inlet, level.outlet]) {
      const gateElement = document.createElement("div");
      gateElement.classList.add(Pipes.waterGate);
      gateElement.innerHTML = `
        <img src=${inlet} alt="Inlet" />
      `;
      this.pipesGameContainer
        .querySelector(`.margin.${gateDescription.side}`)
        .append(gateElement);
      gateElement.style.transform = `translateX(${gateDescription.x * 100}px)`;
    }
  }

  /**
   * @param {import("./gameLevel.js").GameLevel} level
   */
  placeUnmovablePipes(level) {
    level.unmovablePipes.forEach((pipeDescription) => {
      const pipeElement = document.createElement("img");
      pipeElement.src = pipeImages[pipeDescription.type];
      pipeElement.classList.add(Pipes[pipeDescription.type]);
      this.pipesGameContainer.querySelector("#board").append(pipeElement);
      pipeElement.style.position = "absolute";
      pipeElement.style.left = `${pipeDescription.x * 100}px`;
      pipeElement.style.top = `${pipeDescription.y * 100}px`;
      pipeElement.style.transform = `rotate(${pipeDescription.rotation}deg)`;
    });
  }

  start(onFinish) {
    this.onFinish = onFinish;
    this.displayLogo();
  }
}
