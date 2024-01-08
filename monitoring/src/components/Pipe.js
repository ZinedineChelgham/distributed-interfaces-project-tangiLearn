import "./Pipe.css";
import straight from "../assets/images/pipe_straight.svg";
import curved from "../assets/images/pipe_curved.svg";
import tshape from "../assets/images/pipe_t_shape.svg";
import long from "../assets/images/pipe_long.svg";
import straightFixed from "../assets/images/pipe_straight_fixed.svg";
import curvedFixed from "../assets/images/pipe_curved_fixed.svg";
import tshapeFixed from "../assets/images/pipe_t_shape_fixed.svg";
import longFixed from "../assets/images/pipe_long_fixed.svg";

function Pipe({ type, fixed, rotation, size }) {
  console.log(type, fixed, rotation);
  const images = {
    straight: straight,
    curved: curved,
    tshape: tshape,
    long: long,
    straightFixed: straightFixed,
    curvedFixed: curvedFixed,
    tshapeFixed: tshapeFixed,
    longFixed: longFixed,
  };
  return (
    <div className="pipe" style={{ height: size + "px", width: size + "px" }}>
      <img src={images[type + (fixed ? "Fixed" : "")]} alt="pipe" />
    </div>
  );
}

export default Pipe;
