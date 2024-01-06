import React, {useEffect, useState} from "react";
import Grille from "../components/Grille.jsx";
import "./game_page.css";
import color from "../img/color.png";
import color180 from "../img/color180.png";
import color90 from "../img/color90.png";
import color270 from "../img/color270.png";

function GamePage() {
    const [gameData, setGameData] = React.useState(null);
    const [values, setValues] = React.useState(null);
    const [state_game, setState_game] = React.useState(null);
    //const [gameId, setGameId] = useState("");
    const queryParameters = new URLSearchParams(window.location.search);
    const gameId = queryParameters.get('id');


    function getGameData() {
        console.log("gameIdIsosu", gameId);
        if(!gameId) return;
        fetch(`http://localhost:3000/api/tower-game/get-game-data/${gameId}`)
            .then((response) => response.json())
            .then((data) => {
                console.log("GameDAta", data);
                setGameData(data);
                setValues(data.gameData.selectedValues);
                setState_game(data.gameData.state_game);
            })
            .catch((error) => console.log(error));
    }

    useEffect(() => {
        const interval = setInterval(getGameData, 500); // Récupérer les données toutes les secondes
        return () => clearInterval(interval); // Nettoyer l'intervalle lors du démontage du composant
    }, []);

    console.log("state_game de la game page : " + state_game);

    return (
        <div className="full">
            <div className="code-couleur haut-code-couleur">
                <img className="gauchehaut-code-couleur" src={color180}/>
                <img className="droitehaut-code-couleur" src={color270}/>
            </div>
            <Grille StateGame={state_game} Values={values}/>
            <div className="code-couleur bas-code-couleur">
                <img className="gauchebas-code-couleur" src={color90}/>
                <img className="droitebas-code-couleur" src={color}/>
            </div>
        </div>
    );
}

export default GamePage;
