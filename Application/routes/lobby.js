const express = require('express')
const router = express.Router()

const {
    JoinLobby
} = require('../controllers/lobby.js')


router.route('/').get(JoinLobby)

module.exports = router
