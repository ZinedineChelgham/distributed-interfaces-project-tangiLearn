// Gameboard.js
import React, { useState } from "react";
import "./gameboard.css";

const socket = new WebSocket("ws://localhost:8080/connection");

const Gameboard = (stateGame) => {
  console.log(stateGame);
  const [cellValues, setCellValues] = useState(Array(9).fill(0));

  const handleIncrement = (index) => {
    const newCellValues = [...cellValues];
    newCellValues[index] = Math.min(newCellValues[index] + 1, 4);
    setCellValues(newCellValues);
    updateGameData(index, "increment");
  };

  const handleDecrement = (index) => {
    const newCellValues = [...cellValues];
    newCellValues[index] = Math.max(newCellValues[index] - 1, 0);
    setCellValues(newCellValues);
    updateGameData(index, "decrement");
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
        `http://127.0.0.1:3000/api/tower-game/update-data/${gameId}`,
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
    }
  };
  const renderCells = () => {
    return cellValues.map((value, index) => (
      <div key={index} id={`cell-${index}`} className="grid-item case">
        <button onClick={() => handleDecrement(index)}>-</button>
        <span>{value}</span>
        <button onClick={() => handleIncrement(index)}>+</button>
      </div>
    ));
  };

  return <div className="conteneur-central">{renderCells()}</div>;
};

export default Gameboard;
