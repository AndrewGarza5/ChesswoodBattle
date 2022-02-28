const axios = require('axios')
const GameSession = require('../models/game_sessions.js')
const Player = require('../models/game_session_players.js')

exports.DeleteAllPlayersInGameSession = async function(gameSessionId){
    try{
        const players = await axios.get(`http://localhost:5000/api/v1/game-sessions/${gameSessionId}/players`)
        const JSONobj = players.data.playersList

        JSONobj.forEach(async element => {
            const response = await axios.delete(`http://localhost:5000/api/v1/players/${element.playerSocketId}`)
            if(response.status == 404 || response.status == 500){
                throw new Error('bad request')
            }
        });
        return true
    }
    catch(error){
        return false
    }
    
}

exports.CheckIfGameSessionExists = async function(gameSessionId){
    const gameSessionMongoResponse = await GameSession.find({gameSessionId:gameSessionId})
    if(gameSessionMongoResponse == ''){
        
        return false
    }
    else{
        return true
    }
}