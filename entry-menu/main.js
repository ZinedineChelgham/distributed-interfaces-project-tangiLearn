import "./style.scss";
import "material-icons/iconfont/material-icons.css";
import { TUIOManager } from "@dj256/tuiomanager";
import {
  animateWithClass,
  getCurrentGame,
  getPupil,
  postNewGame,
  setPlayingStatus,
  toKebabCase,
} from "./lib/util.js";
import { API_URL, GAME_URL_MAPPER } from "./lib/config.js";

TUIOManager.start();

const root = document.getElementById("root");
const startButton = root.querySelector("button.start");

function checkGameStatus() {
  return getCurrentGame()
    .then((gameName) => {
      if (!gameName) return;
      clearInterval(interval);
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
  let first = undefined;

  const onStartButtonClick = (gameName) => {
    const players = Object.values(loginMap)
      .filter((v) => v !== undefined)
      .map((v) => v.pupil);
    return Promise.all(
      players.map((player) => setPlayingStatus(player.tokenId, true)),
    )
      .then(() => postNewGame(gameName, players))
      .then((game) => {
        if (gameName === "tower") {
          fetch(`${API_URL}/tower-game/get-id`)
            .then((response) => response.json())
            .then((data) => {
              console.log(data);
              if (data.gameId) {
                window.location.href =
                  GAME_URL_MAPPER[gameName] + "gamepage?id=" + data.gameId;
              }
            });
        } else window.location.href = GAME_URL_MAPPER[gameName];
      });
  };
  const listener = () => onStartButtonClick(gameName);

  Object.keys(tokenSlots).forEach((key) => {
    tokenSlots[key].addEventListener("tuiotagdown", ({ detail: tag }) => {
      if (loginMap[key]) return;
      getPupil(tag.id)
        .then((pupil) => {
          count++;
          loginMap[key] = {};
          loginMap[key].tagId = tag.id;
          tokenSlots[key].classList.add("active");
          tokenSlots[key].querySelector(".pupil-name").innerText =
            `${pupil.name} ${pupil.surname[0]}.`;
          loginMap[key].pupil = pupil;
          if (count === 1) {
            first = key;
            startButton.style.visibility = "visible";
            startButton.classList.add("inactive");
            startButton.classList.add(toKebabCase(key));
            animateWithClass(startButton, "enter-scale-fast");
          } else if (count === 2) {
            startButton.classList.remove("inactive");
            startButton.addEventListener("tuioclick", listener);
          }
          return animateWithClass(
            tokenSlots[key].querySelector(".pupil-name"),
            "enter-scale-fast",
          );
        })
        .catch((error) => console.error("Error getting pupil:", error));
    });

    document.addEventListener("tuiotagup", ({ detail: tag }) => {
      if (!loginMap[key] || loginMap[key].tagId !== tag.id) return;
      loginMap[key] = undefined;
      count--;
      if (count < 2) {
        startButton.classList.add("inactive");
        startButton.removeEventListener("tuioclick", listener);
      }
      if (count === 1) {
        if (first === key)
          first = Object.keys(loginMap).find((k) => loginMap[k]);
        startButton.classList.remove(toKebabCase(key));
        startButton.classList.add(toKebabCase(first));
      } else if (count === 0) {
        startButton.style.visibility = "hidden";
        startButton.classList.remove(toKebabCase(first));
        animateWithClass(startButton, "exit-scale-fast");
      }
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
