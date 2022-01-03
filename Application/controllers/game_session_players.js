const GameSession = require('../models/game_sessions.js')
const player = require('../models/game_session_players.js')

const GetAllPlayersInGameSession = async (req,res) => {
    try{
        const gameSessionIdValue = req.params['gameId']
        const playersList = await player.find({gameSessionId: gameSessionIdValue})
        res.status(200).json({playersList})
    }
    catch(error){
        res.status(500).json({mesg: error})
    }
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

        // check if lobby exists
        const checkIfLobbyExists = await GameSession.find({gameSessionId:gameSessionIdValue})
        console.log(checkIfLobbyExists)
        if(!checkIfLobbyExists){
            console.log('asfas')
            res.status(400).json({mesg: 'this lobby does not exist'})
            return 
        }

        const newPlayerJSON = {
            gameSessionId: gameSessionIdValue,
            playerName: req.body.playerName,
            playerSocketId: req.body.playerSocketId,
            playerTeam: req.body.playerTeam
        }
        
        const playerMongoResponse = await player.create(newPlayerJSON)
        console.log(newPlayerJSON)
        
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

        const playerMongoResponse = await player.findOneAndUpdate({gameSessionId:gameSessionIdValue, playerSocketId:playerSocketIdValue}, req.body, {
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

        const gameSessionIdValue = req.params['gameId']
        const playerSocketIdValue = req.params['playerId']  
        const playerMongoResponse = await player.findOneAndDelete({gameSessionId:gameSessionIdValue, playerSocketId:playerSocketIdValue})
        if(!playerMongoResponse){
            res.status(404).json({mesg: `No player with game id ${gameSessionIdValue} and player id ${playerSocketIdValue}`})
            return 
        }
        res.status(200).json({task:null, status: 'success'})
    }
    catch(error){
        res.status(500).json({mesg: error})
    }
}

module.exports = {
    GetAllPlayersInGameSession,
    GetPlayer,
    CreatePlayer,
    UpdatePlayer,
    DeletePlayer
}