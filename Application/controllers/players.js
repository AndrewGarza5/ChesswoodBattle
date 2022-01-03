const GameSession = require('../models/game_sessions.js')
const Player = require('../models/game_session_players.js')

const GetAllPlayers = async (req, res) => {
    res.send(':)')
}

module.exports = {
    GetAllPlayers
}

