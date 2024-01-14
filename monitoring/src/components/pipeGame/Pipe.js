import "./Pipe.css";
import { PIPE_IMAGES } from "../../util";

function Pipe({ type, fixed, rotation, size }) {
  return (
    <div
      className="pipe"
      style={{
        height: size + "px",
        width: size + "px",
        rotate: rotation + "deg",
      }}
    >
      <img src={PIPE_IMAGES[type + (fixed ? "Fixed" : "")]} alt="pipe" />
    </div>
  );
}

export default Pipe;
