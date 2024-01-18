import react, {useEffect} from "react";
import TowerGameBoard from "./TowerGameBoard";
import {BACKEND_URL} from "../../util";

function TowerGamePreview() {

    const [gameState, setGameState] = react.useState([]);
    const [selectedValues, setSelectedValues] = react.useState([]);
    const [gameId, setGameId] = react.useState('');

    useEffect(() => {
        fetch(`${BACKEND_URL}/api/tower-game/get-id`)
            .then((response) => response.json())
            .then((data) => {
                setGameId(data.gameId)
            })
            .catch((error) => console.log(error));
    }, []);

    useEffect(() => {
        const fetchData = () => {
            fetch(`${BACKEND_URL}/api/tower-game/get-game-data/${gameId}`)
                .then((response) => response.json())
                .then((data) => {
                    setGameState(data.gameData.state_game);
                    setSelectedValues(data.gameData.selectedValues);
                })
                .catch((error) => console.log(error));
        };
        fetchData();
        const intervalId = setInterval(fetchData, 200);
        return () => clearInterval(intervalId);
    }, [gameId]);

    const firstEntryValues = selectedValues || [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
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
            {gameState.length > 0 && selectedValues.length > 0 && (
                <TowerGameBoard
                    gameState={gameState}
                    dimensions={{rows: 5, columns: 5}}
                    cellSize={80}
                    paramToCaseMapping={paramToCaseMapping}
                />
            )}
        </>
    );

}

export default TowerGamePreview;
