import './App.css';
import React from 'react';
import NewGame from './pages/new_game.js';
import {BrowserRouter as Router, Redirect, Route, Switch} from "react-router-dom";
import GamePage from './pages/game_page.js';
const App = () => {
    return (
        <Router>
            <div className="App">
                <Switch>
                    <Route exact path="/">
                        <Redirect to="/startgame" />
                    </Route>
                    <Route path="/startgame">
                        <NewGame />
                    </Route>
                <Route path="/gamepage/:id">
                    <GamePage />
                </Route>
                </Switch>
            </div>
        </Router>
    );
}

export default App;