const gameSession = require('../models/game_session.js')
const player = require('../models/game_session_players.js')
const { v1: uuidv1 } = require('uuid');

const GetAllPlayers = async (req, res) => {
    try{
        const playersMongoResponse = await player.find({})
        res.status(200).json({playersMongoResponse})
    }
    catch(error){
        res.status(500).json({mesg: error})
    }
    
}

const GetPlayer = async (req, res) => {

    try{
        const {gameId:gameSessionIdValue} = req.params
        const {playerId:playerIdValue} = req.params
        const playerMongoResponse = await player.findOne({gameSessionId:gameSessionIdValue, playerId:playerIdValue})

        if(!playerMongoResponse){
            return res.status(404).json({mesg: `Player ${playerIdValue} in game session ${gameSessionIdValue} does not exist`})
        }
        res.status(200).send(playerMongoResponse)
    }
    catch(error){
        res.status(500).json({mesg: error})
    }
}

const CreatePlayer = async (req, res) => {

    try{
        const gameSessionIdValue = req.params['gameId']
        const playerIdValue = uuidv1()
        console.log('tets')

        // check if player already exists
        const checkifPlayerExists = await player.find({gameSessionId:gameSessionIdValue, playerSocketId:playerIdValue})
        if(checkifPlayerExists != ''){
            res.status(400).json({mesg: 'this player already exists'})
            return 
        }

        const newPlayerJSON = {
            gameSessionId: req.body.gameSessionId,
            playerName: req.body.playerName,
            playerSocketId: playerIdValue,
            playerTeam: req.body.playerTeam
        }
        
        const playerMongoResponse = await player.create(newPlayerJSON)
        // console.log(newPlayerJSON)
        
        res.status(202).send({playerMongoResponse})
    }
    catch(error){
        res.status(500).json({mesg: error})
    }
    
}

const UpdatePlayer = async (req, res) => {
    try{
        const {gameId: gameSessionIdValue} = req.params
        const {playerId: playerIdValue} = req.params

        const playerMongoResponse = await player.findOneAndUpdate({gameSessionId:gameSessionIdValue, playerId:playerIdValue}, req.body, {
            new:true, 
            runValidators:true
        })
        if(!playerMongoResponse){
            return res.status(404).json({mesg: `No session with id: ${uniqueId}`})
        }
        res.status(200).json({playerMongoResponse})
        
    }
    catch(error){
        res.status(500).json({mesg: error})
    }
}

const DeletePlayer = async (req, res) => {
    try{
        const {gameId:gameSessionIdValue} = req.params
        const {playerId:playerSocketIdValue} = req.params  
        const playerMongoResponse = await player.findOneAndDelete({gameSessionId:gameSessionIdValue, playerId:playerSocketIdValue})
        console.log(2131)
        if(!playerMongoResponse){
            res.status(404).json({mesg: `No player with game id ${gameSessionIdValue} and player id ${playerSocketIdValue}`})
            return 
        }
        console.log(2131124124)
        res.status(200).json({task:null, status: 'success'})
    }
    catch(error){
        res.status(500).json({mesg: error})
    }
}

module.exports = {
    GetAllPlayers,
    GetPlayer,
    CreatePlayer,
    UpdatePlayer,
    DeletePlayer
}