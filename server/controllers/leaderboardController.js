const Score = require("../models/Leaderboard");

exports.getTopScores = async (req, res) => {
  try {
    const scores = await Score.find().sort({ score: -1 }).limit(100);
    res.json(scores);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.addScore = async (req, res) => {
  try {
    const { username, score } = req.body;
    console.log("Received score submission:", { username, score });
    const newScore = new Score({ username, score });
    await newScore.save();
    res.status(201).json(newScore);
  } catch (err) {
    console.error("Error saving score:", err);
    res.status(400).json({ message: "Error saving score" });
  }
};
