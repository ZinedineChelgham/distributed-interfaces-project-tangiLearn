import PipeGamePreview from "./pipeGame/PipeGamePreview";
import TowerGamePreview from "./towerGame/TowerGamePreview";

function GamePreview({ game }) {
  return (
    <>
      {game === "pipe" && <PipeGamePreview />}
      {game === "tower" && <TowerGamePreview />}
    </>
  );
}

export default GamePreview;
