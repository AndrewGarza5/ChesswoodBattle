const GameSession = require('../models/game_session.js')
const Player = require('../models/game_session_players.js')
const gameSessionUtils = require('../lib/game_session_helper.js')

const GetAllGameSessions = async (req, res) => {
    try{
        const gameSessionsMongoResponse = await GameSession.find({})
        res.status(200).json({gameSessionsMongoResponse})
    }
    catch(error){
        res.status(500).json({mesg: error})
    }
    
}

const GetGameSession = async (req, res) => {
    try{
        const {gameId:gameSessionIdValue} = req.params
        const gameSessionMongoResponse = await GameSession.findOne({gameSessionId:gameSessionIdValue})

        if(!gameSessionMongoResponse){
            return res.status(404).json({mesg: `No session with id: ${gameSessionIdValue}`})
        }
        res.status(200).json({gameSessionMongoResponse})
    }
    catch(error){
        res.status(500).json({mesg: error})
    }
}

const CreateGameSession = async (req, res) => {

    try{
        // check if player already exists
        const {gameId:gameSessionIdValue} = req.body.gameSessionId
        const checkifGameSessionExists = await GameSession.find({gameSessionId:gameSessionIdValue})
        if(checkifGameSessionExists != ''){
            res.status(400).json({mesg: 'this game session already exists'})
            return 
        }

        const gameSession = await GameSession.create(req.body)
        console.log(req.body)
        
        res.status(202).send({gameSession})
    }
    catch(error){
        res.status(500).json({mesg: error})
    }
    
}

const UpdateGameSession = async (req, res) => {
    try{
        const {gameId: gameSessionId} = req.params
        const gameSessionMongoResponse = await GameSession.findOneAndUpdate({gameSessionId:gameSessionId}, req.body, {
            new:true, 
            runValidators:true
        })
        if(!gameSessionMongoResponse){
            return res.status(404).json({mesg: `No session with id: ${gameSessionId}`})
        }
        res.status(200).json({gameSessionMongoResponse})
        
    }
    catch(error){
        res.status(500).json({mesg: error})
    }
}

// const del = async function DeleteAllPlayersInGameSession(JSONresponse){
//     console.log('asd')
//     JSONresponse.array.forEach(element => {
//         console.log(element)
//     });
// }

const DeleteGameSessionAndPlayers = async (req, res) => {
    try{
        const {gameId:gameSessionId} = req.params

        const playerMongoResponse = await Player.find({gameSessionId:gameSessionId})
        await gameSessionUtils.DeleteAllPlayersInGameSession(playerMongoResponse, gameSessionId)

        const gameSessionMongoResponse = await GameSession.findOneAndDelete({gameSessionId:gameSessionId})

        // if(!gameSessionMongoResponse){
        //    res.status(404).json({mesg: `No session with id: ${gameSessionId}`})
        //    return 
        // }
        res.status(200).json({task:null, status: 'success'})
    }
    catch(error){
        console.log(error)
        res.status(500).json({mesg: error})
    }
}



module.exports = {
    GetAllGameSessions,
    GetGameSession,
    CreateGameSession,
    UpdateGameSession,
    DeleteGameSessionAndPlayers
}

