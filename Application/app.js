const GameSessions = require('./routes/game_sessions.js')
const Players = require('./routes/players.js')
const port = 5000 || process.env.PORT
const express = require('express')
const path = require('path')
const { createServer } = require('http')
const {Server} = require('socket.io')
const { playersLogger, gameSessionsLogger } = require('./lib/logger.js')


const connectDB = require('./db/connect')
require('dotenv').config()

const app = express()
const httpServer = createServer(app)
const io = new Server(httpServer, { /* options */ });

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
app.use('/api/v1/game-sessions', GameSessions)
app.use('/api/v1/players', Players)

// Socket io
const mainLobby = require('./socketio/mainLobbySocket.js')
const globalEvents = require('./socketio/globalEventsSocket.js')

const onConnection = (socket) => {
  mainLobby(io, socket),
  globalEvents(io, socket)
}
io.on("connection", onConnection)

// io.of("/").adapter.on("create-room", (room) => {
//   console.log(`room ${room} was created`);
// });

// io.of("/").adapter.on("join-room", (room, id) => {
//   console.log(`socket ${id} has joined room ${room}`);
// });

// test endpoint
app.use('/test', (req,res) => {
    res.send("Hello World!");
})


// start server and mongodb
const start = async () => {
    try{
        await connectDB(process.env.MONGO_URI)
        httpServer.listen(port,()=>{
            console.log(`server listening on port ${port}...`)
        })
    }
    catch(error){
        console.log(error)
    }
}

start()