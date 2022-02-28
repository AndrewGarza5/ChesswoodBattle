const GameSession = require('../models/game_sessions.js')
const Player = require('../models/game_session_players.js')

const JoinLobby = async (req, res) => {
    try{
        const gameSessionIdValue = req.params['gameSessionId']
        const gameSessionMongoResponse = await GameSession.findOne({gameSessionId:gameSessionIdValue})

        if(!gameSessionMongoResponse){
            return res.status(404).json({msg: `No session with id: ${gameSessionIdValue}`})
        }

        res.status(200).json({status:'success'})
    }
    catch(error){
        res.status(500).json({mesg: error})
    }
}


module.exports = {
    JoinLobby
}

