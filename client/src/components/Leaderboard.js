import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
// import "./Leaderboard.css";

const Leaderboard = () => {
  const navigate = useNavigate();
  const [scores, setScores] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchLeaderboard = async () => {
      try {
        const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

        const res = await axios.get(`${API_BASE_URL}/api/v1/leaderboard`);
        setScores(res.data);
        setIsLoading(false);
      } catch (err) {
        setIsLoading(false);
        setError("Error fetching leaderboard data. Please try again later.");
        console.log(err);
      }
    };
    fetchLeaderboard();
  }, []);

  return (
    <div className="leaderboard container my-5">
      <div className="card">
        <h2 className="card-header">Top 100 Players</h2>
        <div className="card-body">
          {isLoading ? (
            <div>Loading...</div>
          ) : error ? (
            <div className="alert alert-danger">{error}</div>
          ) : scores.length > 0 ? (
            <table className="table">
              <thead>
                <tr>
                  <th scope="col">Ranking</th>
                  <th scope="col">Name</th>
                  <th scope="col">Score</th>
                </tr>
              </thead>
              <tbody>
                {scores.map((score, index) => (
                  <tr key={index}>
                    <th scope="row">{index + 1}</th>
                    <td>{score.username}</td>
                    <td>{score.score}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <div>No records found.</div>
          )}
          <button className="btn btn-primary" onClick={() => navigate("/")}>
            Back to Menu
          </button>
        </div>
      </div>
    </div>
  );
};

export default Leaderboard;
