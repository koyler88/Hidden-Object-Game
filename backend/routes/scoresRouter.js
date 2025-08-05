const { Router } = require('express')
const scoresRouter = Router();
const scoresController = require('../controllers/scoresController')

scoresRouter.get('/:gameId', scoresController.getScoresByGameId)

scoresRouter.post('/', scoresController.postScore)

module.exports = scoresRouter