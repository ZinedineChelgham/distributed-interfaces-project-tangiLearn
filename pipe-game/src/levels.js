import { GameLevel } from "./gameLevel.js";
import { PIPE_TYPES } from "./constants.js";

export const levels = [
  new GameLevel(
    1,
    {
      [PIPE_TYPES.CURVED]: 15,
      [PIPE_TYPES.STRAIGHT]: 10,
      [PIPE_TYPES.T_SHAPE]: 5,
      [PIPE_TYPES.LONG]: 1,
    },
    { x: 1, side: "up" },
    { x: 8, side: "down" },
    [
      { x: 2, y: 0, rotation: 180, type: PIPE_TYPES.T_SHAPE },
      { x: 2, y: 2, rotation: 0, type: PIPE_TYPES.STRAIGHT },
      { x: 4, y: 0, rotation: 90, type: PIPE_TYPES.CURVED },
      { x: 6, y: 2, rotation: 180, type: PIPE_TYPES.CURVED },
      { x: 4, y: 3, rotation: 180, type: PIPE_TYPES.T_SHAPE },
      { x: 7, y: 4, rotation: 90, type: PIPE_TYPES.CURVED },
      { x: 5, y: 5, rotation: 90, type: PIPE_TYPES.STRAIGHT },
      { x: 8, y: 7, rotation: 90, type: PIPE_TYPES.CURVED },
      { x: 4, y: 6, rotation: 270, type: PIPE_TYPES.CURVED },
      { x: 6, y: 7, rotation: 90, type: PIPE_TYPES.STRAIGHT },
    ],
  ),
];
