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
        max:[16, 'amountOfPlayers cannot exceed 16'],
        min:[1, 'amountOfPlayers cannot be below 1']
     }
})

module.exports = mongoose.model('GameSession', GameSessionSchema)