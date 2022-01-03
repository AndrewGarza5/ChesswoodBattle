const GameSession = require('../models/game_sessions.js')
const Player = require('../models/game_session_players.js')
const gameSessionUtils = require('../lib/game_session_helper.js')

const GetAllGameSessions = async (req, res) => {
    try{
        const gameSessionsMongoResponse = await GameSession.find({})
        res.status(200).json({gameSessionsMongoResponse})
    }
    catch(error){
        res.status(500).json({msg: error})
    }
    
}

const GetGameSession = async (req, res) => {
    try{
        const gameSessionIdValue = req.params['gameId']
        const gameSessionMongoResponse = await GameSession.findOne({gameSessionId:gameSessionIdValue})
        if(!gameSessionMongoResponse){
            return res.status(404).json({msg: `No session with id: ${gameSessionIdValue}`})
        }
        res.status(200).json({gameSessionMongoResponse})
    }
    catch(error){
        res.status(500).json({msg: error})
    }
}

const CreateGameSession = async (req, res) => {

    try{
        // check if session already exists
        if(await gameSessionUtils.CheckIfGameSessionExists(req.body.gameSessionId)){
            res.status(400).json({msg: 'this game session already exists'})
            return 
        }

        // adds expiration date to JSON
        var currDate = new Date()
        var gameSessionExpirationDate = new Date(currDate.getTime() + 500*60000);
        requestBody = req.body
        requestBody['gameSessionExpirationDate'] = gameSessionExpirationDate.toISOString()

        const gameSession = await GameSession.create(requestBody)
        console.log(requestBody)
        
        res.status(202).send({gameSession})
    }
    catch(error){
        res.status(500).json({msg: error})
    }
    
}

const UpdateGameSession = async (req, res) => {
    try{
        const gameSessionId = req.params['gameId']
        const gameSessionMongoResponse = await GameSession.findOneAndUpdate({gameSessionId:gameSessionId}, req.body, {
            new:true, 
            runValidators:true
        })
        if(!gameSessionMongoResponse){
            return res.status(404).json({msg: `No session with id: ${gameSessionId}`})
        }
        res.status(200).json({gameSessionMongoResponse})
        
    }
    catch(error){
        res.status(500).json({msg: error})
    }
}

const DeleteGameSessionAndPlayers = async (req, res) => {
    try{
        const gameSessionIdValue = req.params['gameId']
        // check if game session exists
        if(!await gameSessionUtils.CheckIfGameSessionExists(gameSessionIdValue)){
            res.status(404).json({msg: `No session with id: ${gameSessionIdValue}`})
            return 
        }


        if(!await gameSessionUtils.DeleteAllPlayersInGameSession(gameSessionIdValue)){
            res.status(500).json({msg: 'Something went wrong, try again'})
            return
        }

        const gameSessionMongoResponse = await GameSession.findOneAndDelete({gameSessionId:gameSessionIdValue})

        res.status(200).json({task:null, status: 'success'})
    }
    catch(error){
        console.log(error)
        res.status(500).json({msg: error})
    }
}



module.exports = {
    GetAllGameSessions,
    GetGameSession,
    CreateGameSession,
    UpdateGameSession,
    DeleteGameSessionAndPlayers
}

