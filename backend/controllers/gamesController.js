const db = require("../db/queries");

const getGameInfo = async (req, res) => {
  try {
    const games = await db.getGameInfo();
    return res.json(games);
  } catch (err) {
    console.error("Error fetching games:", err);
    return res.status(500).json({ error: "Failed to fetch games" });
  }
};

const getGameById = async (req, res) => {
  try {
    const gameId = Number(req.params.id);
    if (isNaN(gameId)) return res.status(400).json({ error: "Invalid game ID" });

    const game = await db.getGameById(gameId);
    if (!game) {
      return res.status(404).json({ error: "Game not found" });
    }
    return res.json(game);
  } catch (err) {
    console.error("Error fetching game:", err);
    return res.status(500).json({ error: "Error fetching game" });
  }
};

module.exports = {
  getGameInfo,
  getGameById,
};
