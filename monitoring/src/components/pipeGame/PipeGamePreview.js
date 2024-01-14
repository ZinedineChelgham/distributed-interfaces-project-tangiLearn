/**
 * Represents the board where pipes are placed.
 * Each cell is an element of the array. If the cell
 * is empty, the value is null. If there is a pipe in the
 * cell, the value is an object with the following properties:
 * - type: the type of the pipe (curved, straight, t-shape, long)
 * - rotation: the rotation of the pipe (0, 90, 180, 270)
 * @typedef PipeGameState {{type: PipeType, rotation: 0 | 90 | 180 | 270}[][]}
 */
import PipeGameBoard from "./PipeGameBoard";
import { useEffect, useState } from "react";
import { BACKEND_URL } from "../../util";

function PipeGamePreview({ gameId }) {
  const [state, setState] = useState(undefined);

  useEffect(() => {
    const id = setInterval(
      () =>
        fetch(`${BACKEND_URL}/api/pipe-game/${gameId}`)
          .then((response) => response.json())
          .then((game) => setState(game.state.board[0]))
          .catch((error) =>
            console.error("Error checking game status:", error),
          ),
      1000,
    );

    return () => clearInterval(id);
  }, []);
  return (
    <>
      {state && (
        <PipeGameBoard
          pipeGameState={state}
          dimensions={{ rows: 8, columns: 14 }}
          cellSize={50}
        />
      )}
    </>
  );
}

export default PipeGamePreview;
