const express = require('express')
const port = 5000
const GameSessions = require('./routes/GameSessions')
const app = express()
const connectDB = require('./db/connect')
require('dotenv').config()

// middleware 

app.use (express.json() )

// routes
app.get('/api/v1/create-new-GameSession', (req, res)=>{
    res.status(201).send('OTHER PAGE!!!!!!!!!')
})

app.use('/api/v1/game-sessions', GameSessions)

//Handle 404 for accessing resources that dont exist in the app
app.all('*',(req,res) =>{
    res.status(404).send('<h1>404 NOT FOUND</h1>')
})

// start server and mongodb
const start = async () => {
    try{
        await connectDB(process.env.MONGO_URI)
        app.listen(port,()=>{
            console.log(`server listening on port ${port}...`)
        })
    }
    catch(error){
        console.log(error)
    }
}

start()