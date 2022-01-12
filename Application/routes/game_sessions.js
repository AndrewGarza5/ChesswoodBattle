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
    CreatePlayerAndAddToGameSession,
    DeletePlayerAndRemoveFromGameSession
} = require('../controllers/game_session_players.js')

router.route('/').get(GetAllGameSessions).post(CreateGameSession)
router.route('/:gameSessionId').get(GetGameSession).patch(UpdateGameSession).delete(DeleteGameSessionAndPlayers)

router.route('/:gameSessionId/players').get(GetAllPlayersInGameSession).post(CreatePlayerAndAddToGameSession)
router.route('/:gameSessionId/players/:playerSocketId').delete(DeletePlayerAndRemoveFromGameSession)

module.exports = router
