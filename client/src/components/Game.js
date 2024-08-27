import React, { useState, useEffect } from "react";
import GameOver from "./GameOver";
import "./Game.css";
import boatImg from "../assets/img/boat.png";
import p1Img from "../assets/img/p1.png";
import p2Img from "../assets/img/p2.png";
import p3Img from "../assets/img/p3.png";
import p4Img from "../assets/img/p4.png";
import e1Img from "../assets/img/e1.png";
import e2Img from "../assets/img/e2.png";

const items = [
  { img: p1Img, points: 50 },
  { img: p2Img, points: 50 },
  { img: p3Img, points: 50 },
  { img: p4Img, points: 50 },
  { img: e1Img, points: -100 },
  { img: e2Img, points: -100 },
];

function Game({ onGameOver }) {
  const [score, setScore] = useState(0);
  const [boatPos, setBoatPos] = useState(50);
  const [gameTime, setGameTime] = useState(60);
  // const [gameTime, setGameTime] = useState(1);
  const [fallingItems, setFallingItems] = useState([]);
  const [isGameOver, setIsGameOver] = useState(false);

  useEffect(() => {
    // Spawn a new item every 1 second
    const itemInterval = setInterval(() => {
      if (gameTime > 0) {
        spawnItem();
      }
    }, 1000);

    // Game timer
    const timerInterval = setInterval(() => {
      if (gameTime > 0) {
        setGameTime(gameTime - 1);
      } else {
        clearInterval(timerInterval);
        clearInterval(itemInterval);
        setIsGameOver(true);
        // const name = prompt("Game Over! Enter your name:");
        // if (name) {
        //   axios
        //     .post("/api/leaderboard", { name, score })
        //     .then(() => onGameOver())
        //     .catch((err) => console.error(err));
        // }
      }
    }, 1000);

    return () => {
      clearInterval(itemInterval);
      clearInterval(timerInterval);
    };
  }, [gameTime]);

  // Function to spawn a new item
  const spawnItem = () => {
    const randomItem = items[Math.floor(Math.random() * items.length)];
    const startPosition = Math.random() * 90;
    const newItem = {
      ...randomItem,
      left: `${startPosition}%`,
      top: 0,
    };
    setFallingItems((prevItems) => [...prevItems, newItem]);
  };

  // Function to move the boat
  const moveBoat = (direction) => {
    if (direction === "left" && boatPos > 0) {
      setBoatPos(boatPos - 5);
    } else if (direction === "right" && boatPos < 85) {
      setBoatPos(boatPos + 5);
    }
  };

  const handleKeyDown = (event) => {
    if (event.key === "ArrowLeft") {
      moveBoat("left");
    } else if (event.key === "ArrowRight") {
      moveBoat("right");
    }
  };

  useEffect(() => {
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [boatPos]);

  // Update the falling item's position and check for collision
  useEffect(() => {
    const fallInterval = setInterval(() => {
      setFallingItems(
        (prevItems) =>
          prevItems
            .map((item) => ({
              ...item,
              top: item.top + 5, // Move item down
            }))
            .filter((item) => item.top < 100) // Remove item if it passes the bottom of the screen
      );
    }, 100);

    return () => clearInterval(fallInterval);
  }, []);

  // Check if an item is caught
  useEffect(() => {
    fallingItems.forEach((item) => {
      const boatLeft = boatPos;
      const boatRight = boatPos + 10;

      const itemLeft = parseFloat(item.left);
      const itemRight = itemLeft + 5;

      if (item.top > 90 && itemLeft < boatRight && itemRight > boatLeft) {
        setScore((prevScore) => prevScore + item.points);
        setFallingItems((prevItems) => prevItems.filter((i) => i !== item));
      }
    });
  }, [fallingItems, boatPos]);

  return isGameOver ? (
    <GameOver score={score} />
  ) : (
    <div className="game">
      <div className="boat" style={{ left: `${boatPos}%` }}>
        <img src={boatImg} alt="Boat" />
      </div>
      {fallingItems.map((item, index) => (
        <div
          key={index}
          className="falling-item"
          style={{ left: item.left, top: `${item.top}%` }}
        >
          <img src={item.img} alt="Item" />
        </div>
      ))}
      <div className="d-flex flex-row bd-highlight mt-3 justify-content-around">
        <h1 className="mx-2">Time: {gameTime}</h1>
        <h1 className="score">Score: {score}</h1>
      </div>
    </div>
  );
}

export default Game;
