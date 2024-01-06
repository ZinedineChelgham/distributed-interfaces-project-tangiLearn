export const GAME_WIDTH = 1920;
export const GAME_HEIGHT = 1080;
export const IMAGE_SIZE = 100;
export const BOARD_WIDTH = 14 * IMAGE_SIZE;
export const BOARD_HEIGHT = 8 * IMAGE_SIZE;
export const INVENTORY_WIDTH = (GAME_WIDTH - BOARD_WIDTH) / 2;
export const HORIZONTAL_MARGIN_HEIGHT = (GAME_HEIGHT - BOARD_HEIGHT) / 2;

export const PIPE_TYPES = {
  CURVED: "curved",
  STRAIGHT: "straight",
  T_SHAPE: "tshape",
  LONG: "long",
};
