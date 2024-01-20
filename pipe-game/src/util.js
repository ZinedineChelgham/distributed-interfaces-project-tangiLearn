import straightFixed from "../assets/images/pipe_straight_fixed.svg";
import straight from "../assets/images/pipe_straight.svg";
import {
  GAME_HEIGHT,
  GAME_WIDTH,
  IMAGE_SIZE,
  INVENTORY_WIDTH,
} from "./constants.js";
import curvedFixed from "../assets/images/pipe_curved_fixed.svg";
import curved from "../assets/images/pipe_curved.svg";
import tshapeFixed from "../assets/images/pipe_t_shape_fixed.svg";
import tshape from "../assets/images/pipe_t_shape.svg";
import longFixed from "../assets/images/pipe_long_fixed.svg";
import long from "../assets/images/pipe_long.svg";

export const BACKEND_URL =
  import.meta.env.VITE_BACKEND_URL ?? "http://localhost:3000";

export const PIPE_DATA = {
  straight: {
    images: {
      fixed: straightFixed,
      movable: straight,
    },
    inventoryPosition: {
      x: INVENTORY_WIDTH / 2 - IMAGE_SIZE / 2,
      y: GAME_HEIGHT / 2 - (5 / 2) * IMAGE_SIZE,
    },
  },
  curved: {
    images: {
      fixed: curvedFixed,
      movable: curved,
    },
    inventoryPosition: {
      x: INVENTORY_WIDTH / 2 - IMAGE_SIZE / 2,
      y: GAME_HEIGHT / 2 - IMAGE_SIZE / 2,
    },
  },
  tshape: {
    images: {
      fixed: tshapeFixed,
      movable: tshape,
    },
    inventoryPosition: {
      x: INVENTORY_WIDTH / 2 - IMAGE_SIZE / 2,
      y: GAME_HEIGHT / 2 + (3 / 2) * IMAGE_SIZE,
    },
  },
  long: {
    images: {
      fixed: longFixed,
      movable: long,
    },
    inventoryPosition: {
      x: GAME_WIDTH - INVENTORY_WIDTH / 2 - IMAGE_SIZE / 2,
      y: GAME_HEIGHT / 2 - IMAGE_SIZE,
    },
  },
};

export const getPingValue = () =>
  fetch(`${BACKEND_URL}/api/pipe-game/ping`).then((res) => res.json());

export const clearPing = () =>
  fetch(`${BACKEND_URL}/api/pipe-game/ping`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ x: undefined, y: undefined }),
  });

export const getAllNeighbours = (x, y) => ({
  up: { x: x, y: y - 1 },
  down: { x: x, y: y + 1 },
  left: { x: x - 1, y: y },
  right: { x: x + 1, y: y },
});
