const express = require('express')
const router = express.Router()

const {
    GetAllPlayers,
    GetPlayer,
    UpdatePlayer,
    DeletePlayer
} = require('../controllers/players.js')


router.route('/').get(GetAllPlayers)
router.route('/:playerSocketId').get(GetPlayer).patch(UpdatePlayer).delete(DeletePlayer)

module.exports = router
