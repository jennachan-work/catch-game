const express = require("express");
const apicache = require("apicache");
const router = express.Router();
const leaderboardController = require("../../controllers/leaderboardController");

const routes = express.Router();
const cache = apicache.middleware;

//workout
router.get("/", leaderboardController.getTopScores);
router.post("/", leaderboardController.addScore);

module.exports = router;
