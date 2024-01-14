import "./PipeGameCell.css";
import Pipe from "./Pipe";

function PipeGameCell({ size, x, y, pipe }) {
  return (
    <div
      className="cell"
      style={{
        width: size + "px",
        height: size + "px",
        top: y * size + "px",
        left: x * size + "px",
      }}
    >
      {pipe && <Pipe type={pipe.type} fixed={true} rotation={pipe.rotation} />}
    </div>
  );
}

export default PipeGameCell;
