/**
 * @typedef {"curve" | "straight" | "tshape" | "long" } PipeType
 */
export class GameLevel {
  /**
   * @param {number} number
   * @param {import("./pipesConfig.js").PipesConfig} pipes
   * @param {{x: number, side: "up"|"down"}} inlet
   * @param {{x: number, side: "up"|"down"}} outlet
   * @param {{x: number, y: number, rotation: 0|90|180|270, type: PipeType}[]} unmovablePipes
   */
  constructor(number, pipes, inlet, outlet, unmovablePipes) {
    this.number = number;
    this.pipes = pipes;
    this.inlet = inlet;
    this.outlet = outlet;
    this.unmovablePipes = unmovablePipes;
  }
}
