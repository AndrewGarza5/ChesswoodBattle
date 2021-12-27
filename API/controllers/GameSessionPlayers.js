const Player = require('../models/GameSession.js')

const GetAllPlayers = async (req, res) => {
    try{
        const Players = await Player.find({})
        res.status(200).json({Players})
    }
    catch(error){
        res.status(500).json({mesg: error})
    }
    
}

const GetPlayer = async (req, res) => {
    console.log('asfaf')
    try{
        // const {id:uniqueId} = req.params
        // const Player = await Player.findOne({_id:uniqueId})

        // if(!Player){
        //     return res.status(404).json({mesg: `No session with id: ${uniqueId}`})
        // }
        res.status(200).send('aaaa')
    }
    catch(error){
        res.status(500).json({mesg: error})
    }
}

const CreatePlayer = async (req, res) => {

    try{
        const Player = await Player.create(req.body)
        console.log(req.body)
        
        res.status(202).send({Player})
    }
    catch(error){
        res.status(500).json({mesg: error})
    }
    
}

const UpdatePlayer = async (req, res) => {
    try{
        const {id: uniqueId} = req.params
        console.log('sa')
        const Player = await Player.findOneAndUpdate({_id:uniqueId}, req.body, {
            new:true, 
            runValidators:true
        })
        if(!Player){
            return res.status(404).json({mesg: `No session with id: ${uniqueId}`})
        }
        res.status(200).json({Player})
        
    }
    catch(error){
        res.status(500).json({mesg: error})
    }
}

const DeletePlayer = async (req, res) => {
    try{
        const {id:PlayerId} = req.params
        const Player = await Player.findOneAndDelete({PlayerId:PlayerId})

        if(!Player){
            return res.status(404).json({mesg: `No session with id: ${uniqueId}`})
        }
        res.status(200).json({task:null, status: 'success'})
    }
    catch(error){
        res.status(500).json({mesg: error})
    }
}

module.exports = {
    GetAllPlayers,
    GetPlayer,
    CreatePlayer,
    UpdatePlayer,
    DeletePlayer
}