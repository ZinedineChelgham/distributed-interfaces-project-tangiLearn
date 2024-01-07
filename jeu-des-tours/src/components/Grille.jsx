
import  React, {useEffect, useState} from "react";
import Gameboard from "./gameboard.jsx";
import "./Grille.css";


const Grille = ({ StateGame, Values }) => {
  const [checkboxesChecked, setCheckboxesChecked] = useState({
    top: false,
    bottom: false,
    left: false,
    right: false
  });
  const handleCheckboxChange = (position) => {
    const updatedCheckboxes = {
      ...checkboxesChecked,
      [position]: !checkboxesChecked[position]
    };

    setCheckboxesChecked(updatedCheckboxes);
    console.log("État des cases à cocher:", updatedCheckboxes);

    if (Object.values(updatedCheckboxes).every(value => value)) {
      console.log("Toutes les cases sont cochées, envoi de la requête...");
      fetch('http://localhost:3000/api/monitoring/need-help', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ needHelp: true })
      })
          .then(response => {
            console.log("Réponse reçue:", response);
            return response.json();
          })
          .then(data => console.log("Données reçues:", data))
          .catch(error => console.error('Erreur:', error));
    } else {
      console.log("Toutes les cases ne sont pas cochées.");
    }
  };
   // console.log("stateGame de la grille  : " + StateGame);
  return (

    <div id="jeu">
      <input type="checkbox" id="checkboxtop"className="checkbox" onChange={() => handleCheckboxChange('top')} />
      <div className="conteneur-numeros haut rotate-180">
        <div className="numero" id="case2">
          {Values && Values[2]}
        </div>
        <div className="numero" id="case1">
          {Values && Values[1]}
        </div>
        <div className="numero" id="case0">
          {Values && Values[0]}
        </div>
      </div>
      <input type="checkbox" id="checkboxleft" className="checkbox" onChange={() => handleCheckboxChange('left')} />
      <div className="conteneur-lateral">
        <div className="conteneur-numeros gauche rotate-90">
          <div className="numero" id="case11">
            {Values && Values[11]}
          </div>
          <div className="numero" id="case10">
            {Values && Values[10]}
          </div>
          <div className="numero" id="case9">
            {Values && Values[9]}
          </div>
        </div>
        <Gameboard stateGame={StateGame} />
        <div className="conteneur-numeros droite rotate-moins-90">
          <div className="numero" id="case5">
            {Values && Values[5]}
          </div>
          <div className="numero" id="case4">
            {Values && Values[4]}
          </div>
          <div className="numero" id="case3">
            {Values && Values[3]}
          </div>
        </div>
      </div>
      <input type="checkbox" id="checkboxbottom" className="checkbox" onChange={() => handleCheckboxChange('right')} />

      <div className="conteneur-numeros bas ">
        <div className="numero" id="case8">
          {Values && Values[8]}
        </div>
        <div className="numero" id="case7">
          {Values && Values[7]}
        </div>
        <div className="numero" id="case6">
          {Values && Values[6]}
        </div>
      </div>
      <input type="checkbox" id="checkboxright" className="checkbox" onChange={() => handleCheckboxChange('bottom')} />
    </div>
  );
};

export default Grille;
