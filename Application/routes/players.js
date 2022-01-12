const express = require('express')
const router = express.Router()

const {
    GetAllPlayers,
    GetPlayer,
    UpdatePlayer
} = require('../controllers/players.js')


router.route('/').get(GetAllPlayers)
router.route('/:playerSocketId').get(GetPlayer).patch(UpdatePlayer)

module.exports = router
