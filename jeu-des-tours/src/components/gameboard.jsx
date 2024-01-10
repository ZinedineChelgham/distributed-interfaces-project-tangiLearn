// Gameboard.js
import React, {useEffect, useState} from "react";
import "./gameboard.css";
import {ImageElementBis} from "./ImageElementBis.js";
import {BACKEND_URL} from "../util.js";

const socket = new WebSocket("ws://localhost:8080/connection");

const Gameboard = ({stateGame, setStateGame}) => {


  console.log("from gameboard", stateGame)
  let flattenedArray = [0,0,0,0,0,0,0,0,0];
  if (stateGame) {
    flattenedArray = [...stateGame].flat();
  }

  //console.log("flattened : " + flattenedArray)
  const [cellValues, setCellValues] = useState(Array(9).fill(0));
  const [tangibleObjectsCount, setTangibleObjectsCount] = useState({});


  useEffect(() => {
    cellValues.forEach((_, index) => {
      const square1Div = document.getElementById(`cell-${index}`);
      const position = square1Div.getBoundingClientRect();
      const square1Img = new ImageElementBis(position.x, position.y, position.width, position.height, 0, 1, './assets/pipe.png', `img-${index}`);
      square1Img.canMove(true,false);
      square1Img.domElem.get(0).style.opacity = "0";
      square1Img.addTo(square1Div);
      square1Img.onTagCreation((tagId) => {
        tangibleObjectsCount[square1Img.idImage] = (tangibleObjectsCount[square1Img.idImage] || 0) + 1;
        handleIncrement(index);
      });
      square1Img.onTagDeletion((tagId) => {
        tangibleObjectsCount[square1Img.idImage] = (tangibleObjectsCount[square1Img.idImage] || 0) - 1;
        handleDecrement(index);
      });
    });
  }, []); // Le tableau vide indique que cet effet ne s'exécute qu'après le premier rendu

const handleIncrement = (index) => {
    const newCellValues = [...cellValues];
    newCellValues[index] = Math.min(newCellValues[index] + 1, 4);
    setCellValues(newCellValues);
    updateGameData(index, "increment").then();

  };

  const handleDecrement = (index) => {
    const newCellValues = [...cellValues];
    newCellValues[index] = Math.max(newCellValues[index] - 1, 0);
    setCellValues(newCellValues);
    updateGameData(index, "decrement").then();
  };
  const convertIndexToCoordinates = (index) => {
    const row = Math.floor(index / 3); // Obtenez la ligne en divisant l'index par la largeur de la grille
    const col = index % 3; // Obtenez la colonne en prenant le reste de la division par la largeur de la grille
    return { row, col };
  };
  const convertCoordinatesToIndex = (column, row) => {
    const totalColumns = 3; // Le nombre total de colonnes dans votre grille
    return row * totalColumns + column;
  };
  // Fonction pour faire briller la case correspondante
  const shineCell = (column, row) => {
    const index = convertCoordinatesToIndex(column, row);

    // Ajoutez une classe spéciale pour déclencher l'animation
    const cellElement = document.getElementById(`cell-${index}`);
    cellElement.classList.add("shining");

    // Supprimez la classe après 3 secondes pour arrêter l'animation
    setTimeout(() => {
      cellElement.classList.remove("shining");
    }, 5000);
  };

  // Fonction ping pour traiter les messages reçus
  const ping = (event) => {
    try {
      // Extrait les valeurs de colonne et de ligne du message
      const match = event.data.match(/column:(\d+); row:(\d+); action:\d+/);

      // Vérifie si le match a réussi
      if (match) {
        const column = parseInt(match[1], 10); // Convertit la valeur de colonne en nombre entier
        const row = parseInt(match[2], 10); // Convertit la valeur de ligne en nombre entier

        // Appelez la fonction ping avec les coordonnées reçues
        shineCell(column, row);
      } else {
        console.log("Le message ne correspond pas au format attendu");
      }
    } catch (error) {
      console.error("Erreur lors de l'analyse du message :", error);
    }
  };

  // Écoutez les mises à jour du backend
  socket.addEventListener("message", ping);

  const updateGameData = async (index, action) => {
    const { row, col } = convertIndexToCoordinates(index);
    const gameId = new URLSearchParams(window.location.search).get("id");
    try {
      const response = await fetch(
        `${BACKEND_URL}/api/tower-game/update-data/${gameId}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ gameId, row, col, action }),
        },
      );

      if (response.ok) {
        console.log("Données mises à jour avec succès !");
      } else {
        console.error(
          "Erreur lors de la requête au backend :",
          response.statusText,
        );
      }
    } catch (error) {
      console.error(
        "Erreur lors de la mise à jour des données au backend :",
        error,
      );
    } finally {
      const queryParameters = new URLSearchParams(window.location.search);
      const gameId = queryParameters.get('id');
      if (!gameId) return;
      fetch(`${BACKEND_URL}/api/tower-game/get-game-data/${gameId}`)
          .then((response) => response.json())
          .then((data) => {
            setStateGame(data.gameData.state_game);
          })
          .catch((error) => console.log(error));
    }
  };
  const renderCells = () => {
    const getClass = (value) => {
      switch (value) {
        case 1: return 'color-1'; // Classe pour la valeur 1
        case 2: return 'color-2'; // Classe pour la valeur 2
        case 3: return 'color-3'; // Classe pour la valeur 3
        case 4: return 'color-4'; // Classe pour la valeur 4
        default: return 'color-default'; // Classe par défaut si aucune valeur ou valeur non reconnue

      }
    };

    return cellValues.map((value, index) => (
      <div key={index} id={`cell-${index}`}  className={`grid-item case ${getClass(flattenedArray[index])}`}>
        <span>{flattenedArray[index]}</span>
      </div>
    ));

  };

  return <div className="conteneur-central">{renderCells()}</div>;
};

export default Gameboard;
