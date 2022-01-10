const express = require('express')
const router = express.Router()

const {
    GetAllGameSessions, 
    GetGameSession, 
    CreateGameSession, 
    UpdateGameSession, 
    DeleteGameSessionAndPlayers
} = require('../controllers/game_sessions.js')

const {
    GetAllPlayersInGameSession,
    GetPlayer,
    CreatePlayerAndAddToGameSession,
    UpdatePlayer,
    DeletePlayerAndRemoveFromGameSession
} = require('../controllers/game_session_players.js')

router.route('/').get(GetAllGameSessions).post(CreateGameSession)
router.route('/:gameId').get(GetGameSession).patch(UpdateGameSession).delete(DeleteGameSessionAndPlayers)

router.route('/:gameId/players').get(GetAllPlayersInGameSession).post(CreatePlayerAndAddToGameSession)
router.route('/:gameId/players/:playerId').get(GetPlayer).patch(UpdatePlayer).delete(DeletePlayerAndRemoveFromGameSession)

module.exports = router
