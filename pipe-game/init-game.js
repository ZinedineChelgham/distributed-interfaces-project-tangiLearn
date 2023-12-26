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
  classToAdd
) {
  const img = new ImageElementWidget(
    x,
    y,
    width,
    height,
    angle,
    zIndex,
    imagePath
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
  "magnet-top"
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
  "magnet-bot"
);

const containersState = { top: false, bot: false };
const tagIds = { top: "", bot: "" };

function setupMagnetEvents(magnetImg, outerCircle, stateKey) {
  magnetImg.onTagCreation((tag) => {
    if (!containersState[stateKey]) {
      outerCircle.style.backgroundColor = "green";
      containersState[stateKey] = true;
      tagIds[stateKey] = tag._id;
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
    updatePupilState(tagIds.top);
    updatePupilState(tagIds.bot);
    setTimeout(() => {
      window.location.href = "index.html"; // Navigate to index.js
    }, 500);
  }
}

function updatePupilState(tagId) {
  fetch(`http://localhost:3000/api/pupil/playing/${tagId}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ isPlaying: true }),
  }).then((r) => console.log(r));
}

setupMagnetEvents(magnetTopImg, outerCircles[0], "top");
setupMagnetEvents(magnetBopImg, outerCircles[1], "bot");
