const GameSession = require('../models/game_sessions.js')
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

const GetAllPlayersInGameSession = async (req,res) => {

}

const GetPlayer = async (req, res) => {

    try{
        const {gameId:gameSessionIdValue} = req.params
        const {playerId:playerSocketIdValue} = req.params

        const playerMongoResponse = await player.findOne({gameSessionId:gameSessionIdValue, playerSocketId:playerSocketIdValue})

        if(!playerMongoResponse){
            return res.status(404).json({mesg: `Player ${playerSocketIdValue} in game session ${gameSessionIdValue} does not exist`})
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
        const playerSocketIdValue = req.params['playerId']

        // check if lobby exists
        const checkIfLobbyExists = await GameSession.find({gameSessionId:gameSessionIdValue})
        console.log(checkIfLobbyExists)
        if(!checkIfLobbyExists){
            console.log('asfas')
            res.status(400).json({mesg: 'this lobby does not exist'})
            return 
        }

        // makes sure codes match
        if(req.params['gameId'] != req.body.gameSessionId){
            
            res.status(400).json({mesg: 'the lobby codes in body and params do not match, bad request'})
            return
        }

        const newPlayerJSON = {
            gameSessionId: gameSessionIdValue,
            playerName: req.body.playerName,
            playerSocketId: playerSocketIdValue,
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
        const {playerId: playerSocketIdValue} = req.params

        const playerMongoResponse = await player.findOneAndUpdate({gameSessionId:gameSessionIdValue, playerId:playerSocketIdValue}, req.body, {
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
        console.log(88)
        // const {gameId:gameSessionIdValue} = req.params
        // const {playerId:playerSocketIdValue} = req.params  
        // const playerMongoResponse = await player.findOneAndDelete({gameSessionId:gameSessionIdValue, playerId:playerSocketIdValue})
        // console.log(gameSessionId, playerId)
        // if(!playerMongoResponse){
        //     res.status(404).json({mesg: `No player with game id ${gameSessionIdValue} and player id ${playerSocketIdValue}`})
        //     return 
        // }
        // console.log(2131124124)
        res.status(200).json({task:null, status: 'success'})
    }
    catch(error){
        res.status(500).json({mesg: error})
    }
}

module.exports = {
    GetAllPlayers,
    GetAllPlayersInGameSession,
    GetPlayer,
    CreatePlayer,
    UpdatePlayer,
    DeletePlayer
}