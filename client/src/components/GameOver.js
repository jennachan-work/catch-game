import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./GameOver.css";

const GameOver = ({ score }) => {
  const [username, setUsername] = useState("");
  const [error, setError] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!username.trim()) {
      setError("Please enter your username");
      return;
    }

    try {
      const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

      await axios.post(`${API_BASE_URL}/api/v1/leaderboard`, {
        username,
        score,
      });
      setIsSubmitted(true);
      navigate("/leaderboard");
    } catch (err) {
      setError("Error submitting score. Please try again.");
      console.error(err);
    }
  };

  return isSubmitted ? (
    <div className="container d-flex justify-content-center align-items-center vh-100">
      <div className="text-center">
        <div className="spinner-border text-success" role="status">
          <span className="visually-hidden">Submitting...</span>
        </div>
        <h2 className="text-success mt-3">Submitting your score...</h2>
      </div>
    </div>
  ) : (
    <div className="container d-flex justify-content-center align-items-center vh-100">
      <div className="card text-center shadow-lg w-100 max-w-md">
        <div className="card-header bg-primary text-white">
          <h1 className="card-title">Time Out!</h1>
        </div>
        <div className="card-body">
          <p className="card-text display-4 fw-bold">
            Final Score: <span className="text-primary">{score}</span>
          </p>
          <form onSubmit={handleSubmit} className="mt-4">
            <div className="form-group mb-3">
              <label htmlFor="username" className="form-label fw-bold">
                Enter your username:
              </label>
              <input
                type="text"
                className="form-control form-control-lg"
                id="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
            {error && (
              <div className="alert alert-danger alert-dismissible fade show">
                {error}
                <button
                  type="button"
                  className="btn-close"
                  data-bs-dismiss="alert"
                  aria-label="Close"
                ></button>
              </div>
            )}
            <button
              type="submit"
              className="btn btn-primary text-white btn-lg px-5"
            >
              Submit Score
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default GameOver;
