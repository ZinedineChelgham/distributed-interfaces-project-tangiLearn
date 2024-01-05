import { GameLevel } from "./gameLevel.js";

export const levels = [
  new GameLevel(
    1,
    {
      curved: 1,
      straight: 2,
      tshape: 0,
      long: 0,
    },
    { x: 0, side: "up" },
    { x: 0, side: "down" },
    [
      { x: 0, y: 0, rotation: 0, type: "straight" },
      { x: 0, y: 1, rotation: 90, type: "straight" },
      { x: 0, y: 2, rotation: 180, type: "straight" },
      { x: 0, y: 3, rotation: 270, type: "straight" },
    ],
  ),
];
