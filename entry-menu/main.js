import "./style.scss";
import "material-icons/iconfont/material-icons.css";
import { TUIOManager } from "@dj256/tuiomanager";
import { animateWithClass, getPupil, toKebabCase } from "./lib/util.js";
import { API, GAME_URL_MAPPER } from "./lib/config.js";

TUIOManager.start();

const root = document.getElementById("root");
const startButton = root.querySelector("button.start");
function checkGameStatus() {
  return fetch(`${API}/monitoring/current-game`)
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      const gameName = data;
      if (!gameName) return;
      clearInterval(interval);
      // if (gameName === "tower") {
      //   fetch(`${API}/tower-game/get-id`)
      //     .then((response) => response.json())
      //     .then((data) => {
      //       console.log(data);
      //       if (data.gameId) {
      //         window.location.href =
      //           GAME_URL_MAPPER[gameName] + "gamepage?id=" + data.gameId;
      //       }
      //     });
      // } else window.location.href = GAME_URL_MAPPER[gameName];
      onNewGameLaunch(gameName);
    })
    .catch((error) => console.error("Error checking game status:", error));
}

const onNewGameLaunch = (gameName) => {
  root.classList.add("login");
  root.querySelector(".ring").classList.add("full");
  const info = root.querySelector(".info .text");
  info.innerText =
    "Chaque joueur doit poser son token sur la table pour s’identifier";
  root.querySelector(".token-slots").classList.add("enter-scale");
  root.querySelector(".token-slots").style.visibility = "visible";

  handleLogin(gameName);
};

const onStartButtonClick = (gameName) => {
  console.log("start");
  window.location.href = GAME_URL_MAPPER[gameName] + "gamepage?id=" + gameName;
};

const handleLogin = (gameName) => {
  const loginMap = {
    upperLeft: undefined,
    upperRight: undefined,
    lowerLeft: undefined,
    lowerRight: undefined,
  };
  const tokenSlots = {
    upperLeft: document.querySelector(".token-slot.upper-left"),
    upperRight: document.querySelector(".token-slot.upper-right"),
    lowerLeft: document.querySelector(".token-slot.lower-left"),
    lowerRight: document.querySelector(".token-slot.lower-right"),
  };
  let count = 0;

  Object.keys(tokenSlots).forEach((key) => {
    tokenSlots[key].addEventListener("tuiotagdown", ({ detail: tag }) => {
      if (loginMap[key]) return;
      count++;
      loginMap[key] = tag.id;
      tokenSlots[key].classList.add("active");
      getPupil(tag.id).then((pupil) => {
        console.log(pupil);
        tokenSlots[key].querySelector(".pupil-name").innerText =
          `${pupil.name} ${pupil.surname[0]}.`;
        if (count === 1) {
          startButton.style.visibility = "visible";
          startButton.classList.add("inactive");
          startButton.classList.add(toKebabCase(key));
          animateWithClass(startButton, "enter-scale-fast");
        } else if (count === 2) {
          startButton.classList.remove("inactive");
          startButton.addEventListener("click", () =>
            onStartButtonClick(gameName),
          );
        }
        return animateWithClass(
          tokenSlots[key].querySelector(".pupil-name"),
          "enter-scale-fast",
        );
      });
    });

    document.addEventListener("tuiotagup", ({ detail: tag }) => {
      if (loginMap[key] !== tag.id) return;
      count--;
      loginMap[key] = undefined;
      tokenSlots[key].classList.remove("active");
      return animateWithClass(
        tokenSlots[key].querySelector(".pupil-name"),
        "exit-scale-fast",
      ).then(
        () => (tokenSlots[key].querySelector(".pupil-name").innerText = ""),
      );
    });
  });
};

const interval = setInterval(checkGameStatus, 1000);
