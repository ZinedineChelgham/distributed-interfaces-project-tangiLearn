import React, { useEffect } from "react";
import Grille from "../components/Grille.jsx";
import "./game_page.css";
import color from "../img/color.png";
import color180 from "../img/color180.png";
import color90 from "../img/color90.png";
import color270 from "../img/color270.png";

function GamePage() {
  const queryParameters = new URLSearchParams(window.location.search);
  const [gameData, setGameData] = React.useState(null);
  const [values, setValues] = React.useState(null);
  const [state_game, setState_game] = React.useState(null);
  const id = queryParameters.get("id");
  function getGameData() {
    fetch(`http://localhost:3000/api/tower-game/get-game-data/${id}`)
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setGameData(data);
        setValues(data.gameData.selectedValues);
        setState_game(data.gameData.state_game);
      })
      .catch((error) => console.log(error));
  }

  useEffect(() => {
    getGameData();
  }, []);

  return (
    <div className="full">
        <div className="code-couleur haut-code-couleur">
            <img className="gauchehaut-code-couleur" src={color180}/>
            <img className="droitehaut-code-couleur" src={color270}/>
        </div>
        <Grille StateGame={state_game} Values={values} />
        <div className="code-couleur bas-code-couleur">
            <img className="gauchebas-code-couleur" src={color90}/>
            <img className="droitebas-code-couleur" src={color}/>
        </div>
    </div>

  );
}

export default GamePage;
