import "./Gate.css";
import gate from "../../assets/images/inlet.svg";

function Gate({ x, side, size }) {
  return (
    <div
      className={"gate " + side}
      style={{ left: x * size + "px", width: size + "px" }}
    >
      <img src={gate} alt="gate" />
    </div>
  );
}

export default Gate;
