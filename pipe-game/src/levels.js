import { GameLevel } from "./gameLevel.js";

export const levels = [
  new GameLevel(
    1,
    {
      curved: 1,
      straight: 3,
      tshape: 1,
      long: 1,
    },
    { x: 1, side: "up" },
    { x: 9, side: "down" },
    [
      { x: 2, y: 0, rotation: 180, type: "tshape" },
      { x: 2, y: 2, rotation: 0, type: "straight" },
      { x: 4, y: 0, rotation: 90, type: "curved" },
      { x: 6, y: 2, rotation: 180, type: "curved" },
      { x: 4, y: 3, rotation: 180, type: "tshape" },
      { x: 7, y: 4, rotation: 90, type: "curved" },
      { x: 5, y: 5, rotation: 90, type: "straight" },
      { x: 9, y: 7, rotation: 90, type: "curved" },
      { x: 4, y: 6, rotation: 270, type: "curved" },
      { x: 6, y: 7, rotation: 90, type: "straight" },
    ],
  ),
];
