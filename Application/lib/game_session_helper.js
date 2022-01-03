const axios = require('axios')
const GameSession = require('../models/game_sessions.js')
const Player = require('../models/game_session_players.js')

exports.DeleteAllPlayersInGameSession = async function(gameSessionId){
    try{
        console.log(0)
        const response = await axios.delete(`http://localhost:5000/api/v1/game-sessions/id/players/asf`)
         console.log(11)
        // for(var i = 0; i < 1000; i++){
        //     console.log(i)
        // }
        // console.log(response)
        // JSONobj.forEach(async element => {
        //     const response = await axios.delete(`http://localhost:5000/api/v1/game-session/${gameSessionId}/players/${element.playerSocketId}`)
        //     console.log(response.status)
        //     if(response.status == 404 || response.status == 500){
        //         throw new Error(response.body)
        //     }
        // });
    }
    catch(error){
        console.log(error)
        //console.log(error)
        //return error
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