// GameBoard.js
import React, {useState} from 'react';
import './gameboard.css';

const GameBoard = () => {
    const [cellValues, setCellValues] = useState(Array(9).fill(0));

    const handleIncrement = (index) => {
        const newCellValues = [...cellValues];
        newCellValues[index] = Math.min(newCellValues[index] + 1, 4);
        setCellValues(newCellValues);
    };

    const handleDecrement = (index) => {
        const newCellValues = [...cellValues];
        newCellValues[index] = Math.max(newCellValues[index] - 1, 0);
        setCellValues(newCellValues);
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