import react, {useEffect} from "react";
import TowerGameBoard from "./TowerGameBoard";
import {BACKEND_URL} from "../../util";
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Tooltip from '@mui/material/Tooltip';

function TowerGamePreview() {

    const [gameState, setGameState] = react.useState([]);
    const [selectedValues, setSelectedValues] = react.useState([]);
    const [gameId, setGameId] = react.useState('');
    const [players, setPlayers] = react.useState([{
        name: 'John',
        surname: 'Doe',
        avatar: 'https://i.pravatar.cc/150?img=3'
    }]);

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

    useEffect(() => {
        // Function to fetch current players
        const fetchPlayers = () => {
            fetch(`${BACKEND_URL}/api/monitoring/current-players`)
                .then((response) => {
                    if (!response.ok) {
                        throw new Error("Network response was not ok");
                    }
                    return response.json(); // Assuming the response is JSON
                })
                .then((data) => {
                    // Update state with the retrieved current players
                    setPlayers(data);
                })
                .catch((error) => {
                    console.error("Error fetching current players:", error);
                });
        };

        // Call the function when the component mounts
        fetchPlayers();

        // Set an interval to call the function every 5 seconds
        const interval = setInterval(fetchPlayers, 5000);

        // Clear the interval when the component unmounts
        return () => clearInterval(interval);
    }, []);

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
                <Box display={'flex'} alignItems={'center'} justifyContent={'center'} flexDirection={'column'}>
                    <Box width={'100%'}>
                        <TowerGameBoard
                            gameState={gameState}
                            dimensions={{rows: 5, columns: 5}}
                            cellSize={70}
                            paramToCaseMapping={paramToCaseMapping}
                        />
                    </Box>

                    <Box display={'flex'} alignItems={'center'} justifyContent={'center'} direction={'row'}>
                        {players.map((player) => (
                            <Tooltip key={player.name} title={`${player.name} ${player.surname}`} placement="top" arrow>
                                <Avatar alt={`${player.name} ${player.surname}`} src={player.avatar} sx={{m: 1}}/>
                            </Tooltip>
                        ))}
                    </Box>
                </Box>
            )}
        </>
    );

}

export default TowerGamePreview;
