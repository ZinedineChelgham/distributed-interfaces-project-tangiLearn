import './App.css';
import React from 'react';
import GameBoard from './components/gameboard.js';
    const App = () => {
        return (

            <div>
                <h1>Jeu des tours</h1>
                <GameBoard/>
            </div>
        );
    }

    export default App;