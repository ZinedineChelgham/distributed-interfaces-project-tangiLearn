import { TUIOManager } from "@dj256/tuiomanager";
import { ImageElementWidget } from "@dj256/tuiomanager/widgets";

const managerAnchor = document.querySelector("body");
new TUIOManager(managerAnchor).start();

const outerCircles = document.querySelectorAll(".outer-circle");
const containers = document.querySelectorAll(".container");

function createMagnetImage(
  x,
  y,
  width,
  height,
  angle,
  zIndex,
  imagePath,
  container,
  classToAdd,
) {
  const img = new ImageElementWidget(
    x,
    y,
    width,
    height,
    angle,
    zIndex,
    imagePath,
  );
  img.canMove(false, false);
  img.domElem.get(0).classList.add(classToAdd);
  img.addTo(container);
  return img;
}

const magnetTopImg = createMagnetImage(
  60,
  60,
  80,
  80,
  -43,
  1,
  "./assets/images/magnet.png",
  containers[0],
  "magnet-top",
);
const magnetBopImg = createMagnetImage(
  60,
  60,
  80,
  80,
  137,
  1,
  "./assets/images/magnet.png",
  containers[1],
  "magnet-bot",
);

const containersState = { top: false, bot: false };

function setupMagnetEvents(magnetImg, outerCircle, stateKey) {
  magnetImg.onTagCreation(() => {
    if (!containersState[stateKey]) {
      outerCircle.style.backgroundColor = "green";
      containersState[stateKey] = true;
      checkAndNavigate();
    }
  });

  magnetImg.onTagDeletion(() => {
    if (containersState[stateKey]) {
      outerCircle.style.backgroundColor = "grey";
      containersState[stateKey] = false;
    }
  });
}

function checkAndNavigate() {
  if (containersState.top && containersState.bot) {
    //wait 500ms before navigating to index.js
    setTimeout(() => {
      window.location.href = "index.html"; // Navigate to index.js
    }, 500);
  }
}

setupMagnetEvents(magnetTopImg, outerCircles[0], "top");
setupMagnetEvents(magnetBopImg, outerCircles[1], "bot");
