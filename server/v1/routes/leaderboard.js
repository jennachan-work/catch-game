const express = require("express");
const router = express.Router();
const Leaderboard = require("../../models/Leaderboard"); // Assuming you have a Leaderboard model

// Example of a route to get the leaderboard data
router.get("/leaderboard", async (req, res) => {
  try {
    const leaderboard = await Leaderboard.find().sort({ score: -1 }).limit(100);
    res.json(leaderboard);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Example of a route to add a new score
router.post("/", async (req, res) => {
  const { name, score } = req.body;

  const newEntry = new Leaderboard({
    name,
    score,
  });

  try {
    const savedEntry = await newEntry.save();
    res.status(201).json(savedEntry);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

module.exports = router;
