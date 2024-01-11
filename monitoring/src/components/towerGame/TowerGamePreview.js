import react from "react";
import TowerGameBoard from "./TowerGameBoard";

function TowerGamePreview() {
    const towerGameState = {
        selectedValues: [
            '1', '1', '1', '1',
            '2', '2', '2', '2',
            '4', '4', '4', '4'
        ],
        gameId: '-mYmIgzp',
        state_game: [[1, 2, 0], [1, 0, 0], [1, 0, 4]],
    }

    const firstEntryValues = towerGameState.selectedValues;
    const paramToCaseMapping = {
        "01": firstEntryValues[0],
        "02": firstEntryValues[1],
        "03": firstEntryValues[2],
        "14": firstEntryValues[3],
        "24": firstEntryValues[4],
        "34": firstEntryValues[5],
        "43": firstEntryValues[6],
        "42": firstEntryValues[7],
        "41": firstEntryValues[8],
        "30": firstEntryValues[9],
        "20": firstEntryValues[10],
        "10": firstEntryValues[11]
    };


    return (
        <>
            <TowerGameBoard
                gameState={towerGameState.state_game}
                dimensions={{rows: 5, columns: 5}}
                cellSize={50}
                paramToCaseMapping={paramToCaseMapping}
            />
        </>
    );
}

export default TowerGamePreview;
