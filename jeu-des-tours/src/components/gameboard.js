// GameBoard.js
import React, {useState} from 'react';
import './gameboard.css';

const GameBoard = () => {
    const [cellValues, setCellValues] = useState(Array(9).fill(0));

    const handleIncrement = (index) => {
        const newCellValues = [...cellValues];
        newCellValues[index] = Math.min(newCellValues[index] + 1, 4);
        setCellValues(newCellValues);
        updateGameData(index, 'increment');
    };

    const handleDecrement = (index) => {
        const newCellValues = [...cellValues];
        newCellValues[index] = Math.max(newCellValues[index] - 1, 0);
        setCellValues(newCellValues);
        updateGameData(index, 'decrement');
    };
    const convertIndexToCoordinates = (index) => {
        const row = Math.floor(index / 3); // Obtenez la ligne en divisant l'index par la largeur de la grille
        const col = index % 3; // Obtenez la colonne en prenant le reste de la division par la largeur de la grille
        return { row, col };
    };
    const updateGameData = async (index, action) => {
        const { row, col } = convertIndexToCoordinates(index);
        const gameId = new URLSearchParams(window.location.search).get('id');
        try {
            const response = await fetch(`http://127.0.0.1:3000/api/tower-game/update-data/${gameId}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ gameId, row,col, action }),
            });

            if (response.ok) {
                console.log('Données mises à jour avec succès !');
            } else {
                console.error('Erreur lors de la requête au backend :', response.statusText);
            }
        } catch (error) {
            console.error('Erreur lors de la mise à jour des données au backend :', error);
        }
    };

    const renderCells = () => {
            return cellValues.map((value, index) => (
                <div key={index} className="grid-item">
                    <button onClick={() => handleDecrement(index)}>-</button>
                    <span>{value}</span>
                    <button onClick={() => handleIncrement(index)}>+</button>
                </div>
            ));
        };



    return (
        <div className="grid-container">
            {renderCells()}
        </div>
    );
}

export default GameBoard;