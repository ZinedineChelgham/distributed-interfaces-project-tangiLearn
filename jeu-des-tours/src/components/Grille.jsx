// Gameboard.js
import React, { useEffect } from "react";
import "./gameboard.css";
import Gameboard from "./gameboard.jsx";


const Grille = ({ StateGame, Values }) => {
  return (
    <div id="jeu">
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
    </div>
  );
};

export default Grille;
