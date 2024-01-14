import "./style.scss";
import "material-icons/iconfont/material-icons.css";
import { TUIOManager } from "@dj256/tuiomanager";

const BACKEND_URL = "http://localhost:3000";

// Get the IP address and port separately
const ipAddress = BACKEND_URL.substring(0, BACKEND_URL.lastIndexOf(":"));

const GAME_URL_MAPPER = {
  pipe: `${ipAddress}:5174/`,
  tower: `${ipAddress}:5173/`,
};

const API = `${BACKEND_URL}/api`;

TUIOManager.start();

const root = document.getElementById("root");
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

const doAfter = (time, callback) =>
  new Promise((resolve) => setTimeout(() => resolve(callback()), time));

const onNewGameLaunch = (gameName) => {
  root.classList.add("login");
  root.querySelector(".ring").classList.add("full");
  const info = root.querySelector(".info .text");
  info.innerText =
    "Chaque joueur doit poser son token sur la table pour s’identifier";
  root.querySelector(".token-slots").classList.add("enter-scale");
  root.querySelector(".token-slots").style.visibility = "visible";

  handleLogin();
};

const getPupil = (tokenId) =>
  fetch(`${API}/pupil/?tokenId=${tokenId}`).then((response) => response.json());

const animateWithClass = (element, className, delay = 201) => {
  element.classList.add(className);
  return doAfter(delay, () => element.classList.remove(className));
};

const handleLogin = () => {
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

  Object.keys(tokenSlots).forEach((key) => {
    tokenSlots[key].addEventListener("tuiotagdown", ({ detail: tag }) => {
      if (loginMap[key]) return;
      loginMap[key] = tag.id;
      tokenSlots[key].classList.add("active");
      getPupil(tag.id).then((pupil) => {
        console.log(pupil);
        tokenSlots[key].querySelector(".pupil-name").innerText =
          `${pupil.name} ${pupil.surname[0]}.`;
        return animateWithClass(
          tokenSlots[key].querySelector(".pupil-name"),
          "enter-scale-fast",
        );
      });
    });

    document.addEventListener("tuiotagup", ({ detail: tag }) => {
      if (loginMap[key] !== tag.id) return;
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
