import "./App.css";
import React from "react";
import NewGame from "./pages/new_game.jsx";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import GamePage from "./pages/game_page.jsx";

const App = () => {
  return (
    <Router>
      <div className="App">
        <Routes>
          {/*<Route exact path="/">*/}
          {/*  <Navigate to="/startgame" />*/}
          {/*</Route>*/}
          <Route exact path={"/"} element={<NewGame />} />
          <Route path="/startgame" element={<NewGame />} />
          <Route path="/gamepage" element={<GamePage />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
