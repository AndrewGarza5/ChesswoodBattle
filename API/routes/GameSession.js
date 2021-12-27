const express = require('express')
const router = express.Router()

const {
    GetAllGameSessions, 
    GetGameSession, 
    CreateGameSession, 
    UpdateGameSession, 
    DeleteGameSession
} = require('../controllers/GameSession.js')

const {
    GetAllPlayers,
    GetPlayer,
    CreatePlayer,
    UpdatePlayer,
    DeletePlayer
} = require('../controllers/GameSessionPlayers.js')

router.route('/').get(GetAllGameSessions).post(CreateGameSession)
router.route('/:gameId').get(GetGameSession).patch(UpdateGameSession).delete(DeleteGameSession)
router.route('/:gameId/players').get(GetAllPlayers).post(CreatePlayer)
router.route('/:gameId/players/playerId').get(GetPlayer).patch(UpdatePlayer).delete(DeletePlayer)

module.exports = router
