import './App.css';
import React from 'react';
import NewGame from './pages/new_game.js';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
const App = () => {
    return (
        <Router>
            <div className="App">
                    <Route path="/">
                        <NewGame />
                    </Route>
            </div>
        </Router>
    );
}

export default App;