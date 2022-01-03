const express = require('express')
const router = express.Router()



const {
    GetAllPlayers
} = require('../controllers/players.js')


router.route('/').get(GetAllPlayers)

module.exports = router
