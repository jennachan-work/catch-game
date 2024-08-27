const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const leaderboardRoutes = require("./v1/routes/leaderboardRoutes");
const path = require("path");
// const apicache = require("apicache");

const app = express();
// const cache = apicache.middleware;
const PORT = process.env.PORT || 5001;

// Enable CORS middleware
app.use(cors());
// app.use(
//   cors({
//     origin: "http://localhost:3000", // Allowed origin
//     methods: ["GET", "POST", "PUT", "DELETE"], // Allowed HTTP methods
//     allowedHeaders: ["Content-Type"], // Allowed headers
//   })
// );
app.use(bodyParser.json());
// app.use(cache("2 minutes"));
app.use("/api/v1/leaderboard", leaderboardRoutes);

mongoose
  .connect(process.env.MONGODB_URI, {})
  .then(() => console.log("Connected to MongoDB"))
  .catch((error) => console.error("Connection error", error));

// Serve static files from the React app
app.use(express.static(path.join(__dirname, "client/build")));

// app.get("*", (req, res) => {
//   res.sendFile(path.join(__dirname, "client/build/index.html"));
// });

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
