const mongoose = require('mongoose')

const GameSessionSchema = new mongoose.Schema({
    gameSessionId:{
        type:String,
        required:[true, 'gameSessionId required'],
        trim:true,
        maxlength:[4, 'gameSessionId must be 4 characters'],
        minlength:[4, 'gameSessionId must be 4 characters']
    },
     amountOfPlayers:{
        type:Number,
        required:[true, 'amountOfPlayers required'],
        trim: true,
        max:12,
        min:4
     }
})

module.exports = mongoose.model('GameSession', GameSessionSchema)