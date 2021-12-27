const GameSession = require('./routes/GameSession.js')
// const GameSessionPlayers = require('./routes/GameSessionPlayers.js')
const port = 5000 || process.env.PORT
const express = require('express')
const path = require('path')
const http = require('http')
const socketio = require('socket.io')

const connectDB = require('./db/connect')
require('dotenv').config()

const app = express()
const server = http.createServer(app)
const io = socketio(server)

// middleware 
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json())
app.use(function(req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type, Authorization');
    next();
  });

// routes
app.use('/api/v1/game-session', GameSession)

// Socket io
io.on('connection', socket => {

    socket.emit('message', 'welcome new user')

    socket.broadcast.emit('message', 'somebody joined socket')
    
})

// start server and mongodb
const start = async () => {
    try{
        await connectDB(process.env.MONGO_URI)
        server.listen(port,()=>{
            console.log(`server listening on port ${port}...`)
        })
    }
    catch(error){
        console.log(error)
    }
}

start()