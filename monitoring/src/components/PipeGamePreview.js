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

function PipeGamePreview() {
  const pipeGameState = [
    [
      null,
      null,
      {
        type: "tshape",
        rotation: 180,
      },
      null,
      {
        type: "curved",
        rotation: 90,
      },
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
    ],
    [
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
    ],
    [
      null,
      null,
      {
        type: "straight",
        rotation: 0,
      },
      null,
      null,
      null,
      {
        type: "curved",
        rotation: 180,
      },
      null,
      null,
      null,
      null,
      null,
      null,
      null,
    ],
    [
      null,
      null,
      null,
      null,
      {
        type: "tshape",
        rotation: 180,
      },
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
    ],
    [
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      {
        type: "curved",
        rotation: 90,
      },
      null,
      null,
      null,
      null,
      null,
      null,
    ],
    [
      null,
      null,
      null,
      null,
      null,
      {
        type: "straight",
        rotation: 90,
      },
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
    ],
    [
      null,
      null,
      null,
      null,
      {
        type: "curved",
        rotation: 270,
      },
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
    ],
    [
      null,
      null,
      null,
      null,
      null,
      null,
      {
        type: "straight",
        rotation: 90,
      },
      null,
      {
        type: "curved",
        rotation: 90,
      },
      null,
      null,
      null,
      null,
      null,
    ],
  ];
  return (
    <>
      <PipeGameBoard
        pipeGameState={pipeGameState}
        dimensions={{ rows: 8, columns: 14 }}
        cellSize={50}
      />
    </>
  );
}

export default PipeGamePreview;
