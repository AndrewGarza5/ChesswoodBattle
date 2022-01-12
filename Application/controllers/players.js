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

const GetPlayer = async (req, res) => {
    try{
        const playerSocketIdValue = req.params['playerSocketId']

        const playerMongo = await Player.findOne({playerSocketId:playerSocketIdValue})
            .catch(error => res.status(500).json({msg: error}))
        if(!playerMongo){
            return res.status(404).json({msg: `Player ${playerSocketIdValue} in game session ${gameSessionIdValue} does not exist`})
        }
        res.status(200).send(playerMongo)
    }
    catch(error){
        res.status(500).json({msg: error})
    }
}

const UpdatePlayer = async (req, res) => {
    try{
        const playerSocketIdValue = req.params['playerSocketId']

        const playerMongo = await Player.findOneAndUpdate({playerSocketId:playerSocketIdValue}, req.body, {
            new:true, 
            runValidators:true
        }).catch(error => res.status(500).json({msg: error}))
        if(!playerMongo){
            return res.status(404).json({msg: `No session with id: ${uniqueId}`})
        }
        res.status(200).json({playerMongo})
        
    }
    catch(error){
        res.status(500).json({msg: error})
    }
}

module.exports = {
    GetAllPlayers,
    GetPlayer,
    UpdatePlayer
}

