import React, { useState } from "react";
import "./App.css";
import { BrowserRouter as Router, Route, Link, Routes } from "react-router-dom";
import StartMenu from "./components/StartMenu";
import Game from "./components/Game";
import Leaderboard from "./components/Leaderboard";

const App = () => {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<StartMenu />} />
          <Route path="/game" element={<Game />} />
          <Route path="/leaderboard" element={<Leaderboard />} />
          {/* <Route path="/gameover" element={<GameOver />} /> */}
        </Routes>
      </Router>
    </div>
  );
};

export default App;
