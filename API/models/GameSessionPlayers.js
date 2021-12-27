const mongoose = require('mongoose')

const GameSessionPlayersSchema = new mongoose.Schema({
    gameSessionId:{
        type:String,
        required:[true, 'gameSessionId required'],
        trim:true,
        maxlength:[4, 'gameSessionId must be 4 characters'],
        minlength:[4, 'gameSessionId must be 4 characters']
    },
     totalAmountOfPlayers:{
        type:Number,
        required:[true, 'amountOfPlayers required'],
        trim: true,
        max:[16, 'amountOfPlayers cannot exceed 16'],
        min:[1, 'amountOfPlayers cannot be below 1']
     },
     totalAmountOfPlayersInTeam1:{
        type:Number,
        required:[true, 'amountOfPlayers required'],
        trim: true,
        max:[8, 'amountOfPlayers cannot exceed 16'],
        min:[1, 'amountOfPlayers cannot be below 1']
     },
     team1Player1:{
         type:String,
         required:false,
         trim:true,
         maxlength:[16, 'player name cannot exceed 16 characters'],
         minlength:[1, 'player name must be at least 1 character long']
     },
     team1Player2:{
        type:String,
        required:false,
        trim:true,
        maxlength:[16, 'player name cannot exceed 16 characters'],
        minlength:[1, 'player name must be at least 1 character long']
    },
     team1Player3:{
        type:String,
        required:false,
        trim:true,
        maxlength:[16, 'player name cannot exceed 16 characters'],
        minlength:[1, 'player name must be at least 1 character long']
    },
     team1Player4:{
        type:String,
        required:false,
        trim:true,
        maxlength:[16, 'player name cannot exceed 16 characters'],
        minlength:[1, 'player name must be at least 1 character long']
    },
     team1Player5:{
        type:String,
        required:false,
        trim:true,
        maxlength:[16, 'player name cannot exceed 16 characters'],
        minlength:[1, 'player name must be at least 1 character long']
    },
     team1Player6:{
        type:String,
        required:false,
        trim:true,
        maxlength:[16, 'player name cannot exceed 16 characters'],
        minlength:[1, 'player name must be at least 1 character long']
    },
     team1Player7:{
        type:String,
        required:false,
        trim:true,
        maxlength:[16, 'player name cannot exceed 16 characters'],
        minlength:[1, 'player name must be at least 1 character long']
    },
     team1Player8:{
        type:String,
        required:false,
        trim:true,
        maxlength:[16, 'player name cannot exceed 16 characters'],
        minlength:[1, 'player name must be at least 1 character long']
    },
    totalAmountOfPlayersInTeam2:{
        type:Number,
        required:[true, 'amountOfPlayers required'],
        trim: true,
        max:[8, 'amountOfPlayers cannot exceed 16'],
        min:[1, 'amountOfPlayers cannot be below 1']
     },
     team2Player1:{
         type:String,
         required:false,
         trim:true,
         maxlength:[16, 'player name cannot exceed 16 characters'],
         minlength:[1, 'player name must be at least 1 character long']
     },
     team2Player2:{
        type:String,
        required:false,
        trim:true,
        maxlength:[16, 'player name cannot exceed 16 characters'],
        minlength:[1, 'player name must be at least 1 character long']
    },
     team2Player3:{
        type:String,
        required:false,
        trim:true,
        maxlength:[16, 'player name cannot exceed 16 characters'],
        minlength:[1, 'player name must be at least 1 character long']
    },
     team2Player4:{
        type:String,
        required:false,
        trim:true,
        maxlength:[16, 'player name cannot exceed 16 characters'],
        minlength:[1, 'player name must be at least 1 character long']
    },
     team2Player5:{
        type:String,
        required:false,
        trim:true,
        maxlength:[16, 'player name cannot exceed 16 characters'],
        minlength:[1, 'player name must be at least 1 character long']
    },
     team2Player6:{
        type:String,
        required:false,
        trim:true,
        maxlength:[16, 'player name cannot exceed 16 characters'],
        minlength:[1, 'player name must be at least 1 character long']
    },
     team2Player7:{
        type:String,
        required:false,
        trim:true,
        maxlength:[16, 'player name cannot exceed 16 characters'],
        minlength:[1, 'player name must be at least 1 character long']
    },
     team2Player8:{
        type:String,
        required:false,
        trim:true,
        maxlength:[16, 'player name cannot exceed 16 characters'],
        minlength:[1, 'player name must be at least 1 character long']
    }
})

module.exports = mongoose.model('GameSessionPlayers', GameSessionPlayersSchema)