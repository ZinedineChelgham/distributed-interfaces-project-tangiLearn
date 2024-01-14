import PipeGameCell from "./PipeGameCell";
import "./PipeGameBoard.css";

function PipeGameBoard({
  pipeGameState,
  dimensions,
  cellSize,
  paramToCaseMapping,
}) {
  return (
    <div
      id="board"
      style={{
        width: dimensions.columns * cellSize + "px",
        height: dimensions.rows * cellSize + "px",
      }}
    >
      {[...Array(dimensions.rows)].map((_, row) =>
        [...Array(dimensions.columns)].map((_, column) => (
          <PipeGameCell
            key={row * 100 + column}
            size={cellSize}
            x={column}
            y={row}
            pipe={pipeGameState[row][column]}
          />
        )),
      )}
    </div>
  );
}
export default PipeGameBoard;
