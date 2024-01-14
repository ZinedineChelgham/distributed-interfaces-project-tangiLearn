import straight from "./assets/images/pipe_straight.svg";
import curved from "./assets/images/pipe_curved.svg";
import tshape from "./assets/images/pipe_t_shape.svg";
import long from "./assets/images/pipe_long.svg";
import straightFixed from "./assets/images/pipe_straight_fixed.svg";
import curvedFixed from "./assets/images/pipe_curved_fixed.svg";
import tshapeFixed from "./assets/images/pipe_t_shape_fixed.svg";
import longFixed from "./assets/images/pipe_long_fixed.svg";

export const BACKEND_URL =
  // eslint-disable-next-line no-undef
  process.env.REACT_APP_BACKEND_URL ?? "http://localhost:3000";

export const PIPE_IMAGES = {
  straight: straight,
  curved: curved,
  tshape: tshape,
  long: long,
  straightFixed: straightFixed,
  curvedFixed: curvedFixed,
  tshapeFixed: tshapeFixed,
  longFixed: longFixed,
};
