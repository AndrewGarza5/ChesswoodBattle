const express = require('express')
const router = express.Router()

const {
    GetAllGames, 
    GetGame, 
    CreateGame, 
    UpdateGame, 
    DeleteGame
} = require('../controllers/games')

router.route('/').get(GetAllGames).post(CreateGame)
router.route('/:id').get(GetGame).patch(UpdateGame).delete(DeleteGame)

module.exports = router