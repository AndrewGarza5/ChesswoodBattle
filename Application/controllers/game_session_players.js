const GameSession = require('../models/game_sessions.js')
const player = require('../models/game_session_players.js')

const GetAllPlayersInGameSession = async (req,res) => {
    try{
        const gameSessionIdValue = req.params['gameSessionId']
        const playersList = await player.find({gameSessionId: gameSessionIdValue})
            .catch(error => res.status(500).json({msg: error}))
        res.status(200).json({playersList})
    }
    catch(error){
        res.status(500).json({msg: error})
    }
}

const CreatePlayerAndAddToGameSession = async (req, res) => {

    try{
        const gameSessionIdValue = req.params['gameSessionId']

        // check if lobby exists
        const getGameSessionMongo = await GameSession.findOne({gameSessionId:gameSessionIdValue})
        if(!getGameSessionMongo){
            res.status(400).json({msg: 'this lobby does not exist'})
            return 
        }

        // creates new player
        const newPlayerJSON = {
            gameSessionId: gameSessionIdValue,
            playerName: req.body.playerName,
            playerSocketId: req.body.playerSocketId,
            playerTeam: req.body.playerTeam
        }
        
        const playerMongo = await player.create(newPlayerJSON)

        // Adds +1 to amount of players in game session
        const updatedAmountOfPlayers = getGameSessionMongo.amountOfPlayers + 1
        await GameSession.findOneAndUpdate(
            {gameSessionId:gameSessionIdValue}, 
            {amountOfPlayers: updatedAmountOfPlayers}, 
            {new:true, runValidators:true}
        ).catch(error => res.status(500).json({msg: error}))
        
        res.status(202).send({playerMongo})
    }
    catch(error){
        res.status(500).json({msg: error})
    }
    
}

const DeletePlayerAndRemoveFromGameSession = async (req, res) => {
    try{

        const gameSessionIdValue = req.params['gameSessionId']
        const playerSocketIdValue = req.params['playerSocketId']  

        const playerMongo = await player.findOneAndDelete({gameSessionId:gameSessionIdValue, playerSocketId:playerSocketIdValue})
            .catch(error => res.status(500).json({msg: error}))

        const getGameSessionMongo = await GameSession.findOne({gameSessionId:gameSessionIdValue})
        const updatedAmountOfPlayers = getGameSessionMongo.amountOfPlayers - 1
        const updateGameSessionMongo = await GameSession.findOneAndUpdate({gameSessionId:gameSessionIdValue},
            {amountOfPlayers: updatedAmountOfPlayers},
            {new:true, 
            runValidators:true
        }).catch(error => res.status(500).json({msg: error}))

        if(!playerMongo){
            res.status(404).json({msg: `No player with game id ${gameSessionIdValue} and player id ${playerSocketIdValue}`})
            return 
        }
        else if(!updateGameSessionMongo){
            res.status(500).json({msg:'Successfuly deleted player, but unsuccessfuly removed them from game session'})
        }
        
        res.status(200).json({task:null, status: 'success'})
    }
    catch(error){
        res.status(500).json({msg: error})
    }
}

module.exports = {
    GetAllPlayersInGameSession,
    CreatePlayerAndAddToGameSession,
    DeletePlayerAndRemoveFromGameSession
}