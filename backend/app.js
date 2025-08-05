require("dotenv").config();
const express = require("express");
const app = express();
const PORT = process.env.PORT || 3000;

// Routers
const gamesRouter = require("./routes/gamesRouter");

app.get("/", (req, res) => {
  res.send("Home");
});

app.use("/games", gamesRouter);

app.listen(PORT, () =>
  console.log(`Server running on http://localhost:${PORT}`)
);
