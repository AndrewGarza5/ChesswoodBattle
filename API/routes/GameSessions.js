const express = require('express')
const router = express.Router()

const {
    GetAllGameSessions, 
    GetGameSession, 
    CreateGameSession, 
    UpdateGameSession, 
    DeleteGameSession
} = require('../controllers/GameSession')

router.route('/').get(GetAllGameSessions).post(CreateGameSession)
router.route('/:id').get(GetGameSession).patch(UpdateGameSession).delete(DeleteGameSession)

module.exports = router