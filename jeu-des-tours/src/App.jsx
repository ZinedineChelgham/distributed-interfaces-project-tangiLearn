import "./App.css";
import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import GamePage from "./pages/game_page.jsx";

const App = () => {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route exact path={"/jeu-des-tours"} element={<GamePage />} />
          <Route path="/startgame" element={<GamePage />} />
          <Route path="/gamepage/" element={<GamePage />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
