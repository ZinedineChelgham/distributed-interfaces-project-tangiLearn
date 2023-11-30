// GameBoard.js
import React from 'react';
import PropTypes from 'prop-types';
import './gameboard.css';

const GameBoard = () => {
    const renderCells = () => {
        const cells = [];
        const totalCells = 9;

        for (let i = 1; i <= totalCells; i++) {
            cells.push(<div key={i} className="grid-item"></div>);
        }

        return cells;
    }

    return (
        <div className="grid-container">
            {renderCells()}
        </div>
    );
}

GameBoard.propTypes = {
    gridSize: PropTypes.number.isRequired,
};

export default GameBoard;