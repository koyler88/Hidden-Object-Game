const prisma = require("./prismaClient");

const getGameInfo = async () => {
  return await prisma.game.findMany();
};

const getGameById = async (id) => {
  return await prisma.game.findUnique({
    where: { id },
  });
};

const getScoresByGameId = async (gameId) => {
  return await prisma.score.findMany({
    where: { gameId },
    orderBy: { time: "asc" },
  });
};

const postScore = async (name, time, gameId) => {
  return await prisma.score.create({
    data: {
      gameId,
      time,
      playerName: name,
    },
  });
};

module.exports = {
  getGameInfo,
  getGameById,
  getScoresByGameId,
  postScore,
};
