const { Router } = require("express");
const gamesRouter = Router();
const gamesController = require("../controllers/gamesController");

gamesRouter.get("/", gamesController.getGameInfo);

gamesRouter.get("/:id", gamesController.getGameById)

module.exports = gamesRouter;
