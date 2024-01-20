import "./PipeGameCell.css";
import Pipe from "./Pipe";
import { BACKEND_URL } from "../../util";

function PipeGameCell({ size, x, y, pipe }) {
  const onClick = () => {
    return fetch(`${BACKEND_URL}/api/pipe-game/ping`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ x, y }),
    });
  };
  return (
    <div
      className="cell"
      style={{
        width: size + "px",
        height: size + "px",
        top: y * size + "px",
        left: x * size + "px",
      }}
      onClick={onClick}
    >
      {pipe && (
        <Pipe
          type={pipe.type}
          fixed={pipe.fixed}
          rotation={pipe.rotation}
          size={size}
        />
      )}
    </div>
  );
}

export default PipeGameCell;
