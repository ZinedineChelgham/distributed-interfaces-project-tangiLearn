import './App.css';
import React from 'react';
import GameBoard from './components/gameboard.js';
import EyeIcon from "./components/eyeIcon";
    const App = () => {
        return (
            <div>
                <GameBoard/>
                <EyeIcon direction="left" />
                <EyeIcon direction="right" />
                <EyeIcon direction="top" />
                <EyeIcon direction="bottom" />
            </div>
        );
    }

    export default App;