import GameBoard from '../components/gameboard.js';
import EyeIcon from "../components/eyeIcon";
import React from 'react';
import { useParams } from 'react-router-dom';

function GamePage() {
    const id = useParams();
    function getGameData() {
        fetch(`http://localhost:3000/api/tower-game/get-game-data/${id}`)
            .then(response => response.json())
            .then(data => console.log(data))
            .catch(error => console.log(error));
    }
    const values = getGameData();
    return (
        <div>
            <h1>Game Page</h1>
            <p>Game ID: {id}</p>
            <p>Values: {values}</p>
            <GameBoard/>
            <EyeIcon direction="left" />
            <EyeIcon direction="right" />
            <EyeIcon direction="top" />
            <EyeIcon direction="bottom" />
        </div>
    );
}

export default GamePage;
