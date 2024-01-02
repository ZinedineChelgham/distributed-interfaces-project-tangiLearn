import GameBoard from '../components/gameboard.js';
import EyeIcon from "../components/eyeIcon";
import React, {useEffect} from 'react';
import { useParams } from 'react-router-dom';
import Grille from "../components/Grille";

function GamePage() {
    const queryParameters = new URLSearchParams(window.location.search)
    const [gameData, setGameData] = React.useState(null);
    const [values, setValues] = React.useState(null);
    const [state_game, setState_game] = React.useState(null);
    const id = queryParameters.get("id");
    function getGameData() {
        fetch(`http://localhost:3000/api/tower-game/get-game-data/${id}`)
            .then(response => response.json())
            .then(data => {
                console.log(data);
                setGameData(data);
                setValues(data.gameData.selectedValues);
                setState_game(data.gameData.state_game);
            })
            .catch(error => console.log(error));

    }
    console.log(values);

    useEffect(() => {
        getGameData();
    }, []);

    return (
        <div>
            <h1>Game Page</h1>
            <p>Game ID: {id}</p>
            <p>Values: {values}</p>
            <p>State: {state_game}</p>
            <Grille StateGame={state_game} Values={values}/>
        </div>
    );
}

export default GamePage;
