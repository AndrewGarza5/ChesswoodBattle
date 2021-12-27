const mongoose = require('mongoose')

const playersSchema = new mongoose.Schema({
    gameSessionId:{
        type:String,
        required:[true, 'gameSessionId required'],
        trim:true,
        maxlength:[4, 'gameSessionId must be 4 characters'],
        minlength:[4, 'gameSessionId must be 4 characters']
    },
    playerId:{
        type:String,
        required:[true, 'player id required']
    },
    playerName:{
        type:String,
        required:[true, 'player name required'],
        maxlength:[16, 'player name must be less than 16 characters'],
        minlength:[4, 'player name must be more than 1 character']
    },
    playerTeam:{
        type:String,
        required:[true, 'player team required']
    }
})

module.exports = mongoose.model('players', playersSchema)