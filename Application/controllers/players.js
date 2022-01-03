const GameSession = require('../models/game_sessions.js')
const Player = require('../models/game_session_players.js')

const GetAllPlayers = async (req, res) => {
    try{
        const playersMongoResponse = await Player.find({})
        res.status(200).json({playersMongoResponse})
    }
    catch(error){
        res.status(500).json({mesg: error})
    }
}

module.exports = {
    GetAllPlayers
}

