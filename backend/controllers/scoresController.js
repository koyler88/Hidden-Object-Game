const db = require("../db/queries");

const getScoresByGameId = async (req, res) => {
  try {
    const gameId = Number(req.params.gameId);
    if (isNaN(gameId)) {
      return res.status(400).json({ error: "Invalid game ID" });
    }

    const scores = await db.getScoresByGameId(gameId);
    return res.json(scores);
  } catch (err) {
    console.error("Error fetching scores:", err);
    return res.status(500).json({ error: "Error fetching scores" });
  }
};

const postScore = async (req, res) => {
  try {
    const { name, time, gameId } = req.body;

    if (!name || !time || !gameId) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    const postedScore = await db.postScore(name, time, gameId);

    return res.json(postedScore);
  } catch (err) {
    console.error("Error posting Score:", err);
    return res.status(500).json({ error: "Error posting Score" });
  }
};

module.exports = {
  getScoresByGameId,
  postScore,
};
