import './App.css';
import React, { useState } from 'react';
import GameBoard from './components/gameboard.js';
    const App = () => {
        const [gridSize, setGridSize] = useState(3);

        const handleGridSizeChange = (event) => {
            const newSize = parseInt(event.target.value, 10);
            setGridSize(newSize || 3);
        }

        return (
            <div>
                <h1>Ma Application</h1>
                <label>
                    Choisissez la taille de la grille:
                    <input
                        type="number"
                        min="1"
                        value={gridSize}
                        onChange={handleGridSizeChange}
                    />
                </label>
                <GameBoard gridSize={gridSize} />
            </div>
        );
    }

    export default App;