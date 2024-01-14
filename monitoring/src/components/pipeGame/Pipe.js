import "./Pipe.css";
import { PIPE_IMAGES } from "../../util";

function Pipe({ type, fixed, rotation, size }) {
  console.log(type, fixed, rotation);

  return (
    <div className="pipe" style={{ height: size + "px", width: size + "px" }}>
      <img src={PIPE_IMAGES[type + (fixed ? "Fixed" : "")]} alt="pipe" />
    </div>
  );
}

export default Pipe;
