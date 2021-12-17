const Game = require('../models/Game')

const GetAllGames = (req, res) => {
    res.send('get all gamessssss')
}

const GetGame = (req, res) => {
    res.json({id: req.params.id})
}

const CreateGame = (req, res) => {
    res.json(req.body)
}

const UpdateGame = (req, res) => {
    res.send('update game')
}

const DeleteGame = (req, res) => {
    res.send('delete game')
}

module.exports = {
    GetAllGames,
    GetGame,
    CreateGame,
    UpdateGame,
    DeleteGame
}