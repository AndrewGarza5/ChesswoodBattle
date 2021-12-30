const GameSession = require('./routes/game_session.js')
// const GameSessionPlayers = require('./routes/GameSessionPlayers.js')
const port = 5000 || process.env.PORT
const express = require('express')
const path = require('path')
const http = require('http')
const socketio = require('socket.io')
const axios = require('axios')

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
io.on('connection', async socket => {

     socket.emit('message', `welcome new user, your socket id is ${socket.id}`)
    // var response = await axios.post('http://localhost:5000/api/v1/game-session')
    // var value = response.value
    // console.log(response.data)


    // When someone joins specifically from the select name page
    socket.on('joinLobbyFromSelectNamePage', async ({ gameSessionId, playerName, playerTeam }) => {
        const createPlayerJSON = {
            gameSessionId: gameSessionId,
            playerName: playerName,
            playerTeam: playerTeam
        }
        const response = await axios.post(`http://localhost:5000/api/v1/game-session/${gameSessionId}/players`, createPlayerJSON)

        // If a 202 response, then add them to lobby
        if(response.status == 202){
          socket.join(gameSessionId);
    
          // Welcome current user
          socket.emit('message', `Welcome to room ${gameSessionId}`)
        }
        
    
        // Broadcast when a user connects
        /*socket.broadcast
          .to(user.room)
          .emit(
            'message',
            formatMessage(botName, `${user.username} has joined the chat`)
          );
    
        // Send users and room info
        io.to(user.room).emit('roomUsers', {
          room: user.room,
          users: getRoomUsers(user.room)
        });*/
      });

      socket.on("disconnect", (reason) => {
        try{
          console.log('someone disconnected')
        }
        catch(error){
          
        }
      });
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