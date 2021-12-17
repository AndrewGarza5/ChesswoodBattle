const GameSession = require('../models/GameSession')

const GetAllGameSessions = async (req, res) => {
    try{
        const gameSessions = await GameSession.find({})
        res.status(200).json({gameSessions})
    }
    catch(error){
        res.status(500).json({mesg: error})
    }
    
}

const GetGameSession = async (req, res) => {
    try{
        const {id:uniqueId} = req.params
        const gameSession = await GameSession.findOne({_id:uniqueId})

        if(!gameSession){
            return res.status(404).json({mesg: `No session with id: ${uniqueId}`})
        }
        res.status(200).json({gameSession})
    }
    catch(error){
        res.status(500).json({mesg: error})
    }
}

const CreateGameSession = async (req, res) => {
    try{
        const gameSession = await GameSession.create(req.body)
        res.status(201).json(gameSession)
    }
    catch(error){
        res.status(500).json({mesg: error})
    }
    
}

const UpdateGameSession = async (req, res) => {
    try{
        const {id: uniqueId} = req.params
        console.log('sa')
        const gameSession = await GameSession.findOneAndUpdate({_id:uniqueId}, req.body, {
            new:true, 
            runValidators:true
        })
        if(!gameSession){
            return res.status(404).json({mesg: `No session with id: ${uniqueId}`})
        }
        res.status(200).json({gameSession})
        
    }
    catch(error){
        res.status(500).json({mesg: error})
    }
}

const DeleteGameSession = async (req, res) => {
    try{
        const {id:uniqueId} = req.params
        const gameSession = await GameSession.findOneAndDelete({_id:uniqueId})

        if(!gameSession){
            return res.status(404).json({mesg: `No session with id: ${uniqueId}`})
        }
        res.status(200).json({task:null, status: 'success'})
    }
    catch(error){
        res.status(500).json({mesg: error})
    }
}

module.exports = {
    GetAllGameSessions,
    GetGameSession,
    CreateGameSession,
    UpdateGameSession,
    DeleteGameSession
}