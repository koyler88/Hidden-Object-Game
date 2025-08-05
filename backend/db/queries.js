const prisma = require("./prismaClient");

const getGameInfo = async () => {
  return await prisma.game.findMany();
};

const getGameById = async (id) => {
  return await prisma.game.findUnique({
    where: { id },
  });
};

module.exports = {
  getGameInfo,
  getGameById,
  
};
