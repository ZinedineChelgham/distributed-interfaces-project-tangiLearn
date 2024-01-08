import { COLUMNS, ROWS } from "./constants.js";

export class GameState {
  /**
   * Represents the board where pipes are placed.
   * Each cell is an element of the array. If the cell
   * is empty, the value is null. If there is a pipe in the
   * cell, the value is an object with the following properties:
   * - type: the type of the pipe (curved, straight, t-shape, long)
   * - rotation: the rotation of the pipe (0, 90, 180, 270)
   * @type {{type: PipeType, rotation: 0 | 90 | 180 | 270}[][]}
   */
  board;

  constructor() {
    this.board = Array(ROWS).fill([]);
    this.board = this.board.map(() => Array(COLUMNS).fill(null));
  }
}
