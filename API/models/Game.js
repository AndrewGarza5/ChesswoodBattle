const mongoose = require('mongoose')

const GameSchema = new mongoose.Schema({
    GameId:String, AmountOfPlayers:Number
})

module.exports = mongoose.model('Game', GameSchema)