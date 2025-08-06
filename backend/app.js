require("dotenv").config();
const express = require("express");
const app = express();
const PORT = process.env.PORT || 3000;
const cors = require('cors')
app.use(cors({ origin: 'http://localhost:5173'}))

// Routers
const gamesRouter = require("./routes/gamesRouter");
const scoresRouter = require("./routes/scoresRouter");

// middleware to parse JSON
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Home");
});

app.use("/games", gamesRouter);

app.use("/scores", scoresRouter);

app.listen(PORT, () =>
  console.log(`Server running on http://localhost:${PORT}`)
);
