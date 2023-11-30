// GameBoard.js
import React from 'react';
import PropTypes from 'prop-types';
import './gameboard.css';

const GameBoard = ({ gridSize }) => {
    const renderCells = () => {
        const cells = [];
        const totalCells = gridSize * gridSize;

        for (let i = 1; i <= totalCells; i++) {
            cells.push(<div key={i} className="grid-item">{i}</div>);
        }

        return cells;
    }

    return (
        <div className="grid-container" style={{ '--grid-size': gridSize }}>
            {renderCells()}
        </div>
    );
}

GameBoard.propTypes = {
    gridSize: PropTypes.number.isRequired,
};

export default GameBoard;