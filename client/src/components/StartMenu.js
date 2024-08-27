import React from "react";
import { Link } from "react-router-dom";
import "./StartMenu.css";

// Import the images
import bg1 from "../assets/img/bg1.png";
import p1 from "../assets/img/p1.png";
import p2 from "../assets/img/p2.png";
import p3 from "../assets/img/p3.png";
import p4 from "../assets/img/p4.png";
import e1 from "../assets/img/e1.png";
import e2 from "../assets/img/e2.png";
import boat from "../assets/img/boat.png";

const StartMenu = () => {
  return (
    <div className="start-menu d-flex flex-column justify-content-center align-items-center vh-100">
      <div className="start-menu-background">
        <img src={bg1} alt="Background" className="bg-image" />
      </div>
      <h1 className="title mb-4">Welcome to the Catch Game!</h1>
      <div className="instructions-container mb-4">
        <h2 className="mb-3">How to Play:</h2>
        <ul className="instructions-list">
          <li>The game lasts for 60 seconds.</li>
          <li>
            Use the left and right arrow keys to move the catcher and catch the
            falling items.
          </li>
          <li>
            Catching the positive items (
            <img src={p1} alt="Positive Item 1" className="item-image" />
            <img src={p2} alt="Positive Item 2" className="item-image" />
            <img src={p3} alt="Positive Item 3" className="item-image" />
            <img src={p4} alt="Positive Item 4" className="item-image" />) will
            add 50 points to your score.
          </li>
          <li>
            Catching the negative items (
            <img src={e1} alt="Negative Item 1" className="item-image" />
            <img src={e2} alt="Negative Item 2" className="item-image" />) will
            subtract 100 points from your score.
          </li>
          <li>
            <img src={boat} alt="Catcher" className="catcher-image" /> is the
            catcher you'll be moving to catch the items.
          </li>
        </ul>
      </div>
      <div className="button-container d-flex gap-4">
        <Link to="/game" className="btn btn-primary btn-lg">
          Start Game
        </Link>
        <Link to="/leaderboard" className="btn btn-secondary btn-lg">
          Leaderboard
        </Link>
      </div>
    </div>
  );
};

export default StartMenu;
