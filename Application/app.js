const GameSession = require('./routes/game_session.js')
const port = 5000 || process.env.PORT
const express = require('express')
const path = require('path')
const { createServer } = require('http')
const {Server} = require('socket.io')
const axios = require('axios')


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
app.use('/api/v1/game-session', GameSession)

// Socket io
const lobby = require('./socketio/mainLobbySocket.js')

const onConnection = (socket) => {
  lobby(io, socket)
}

io.on("connection", onConnection)
io.of("/").adapter.on("create-room", (room) => {
  console.log(`room ${room} was created`);
});

io.of("/").adapter.on("join-room", (room, id) => {
  console.log(`socket ${id} has joined room ${room}`);
});

/*io.on('connection', async socket => {

     //socket.emit('message', `welcome new user, your socket id is ${socket.id}`)
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
        //const response = await axios.post(`http://localhost:5000/api/v1/game-session/${gameSessionId}/players`, createPlayerJSON)

        // If a 202 response, then add them to lobby
        if(trueresponse.status == 202){
          socket.join(gameSessionId);
    
          // Welcome current user
          socket.emit('message', `Welcome to room ${gameSessionId}`)
        }
        
    
        // Broadcast when a user connects
        // socket.broadcast
        //   .to(user.room)
        //   .emit(
        //     'message',
        //     formatMessage(botName, `${user.username} has joined the chat`)
        //   );
    
        // // Send users and room info
        // io.to(user.room).emit('roomUsers', {
        //   room: user.room,
        //   users: getRoomUsers(user.room)
        // });
      });

      socket.on('joinLobbyTesting', async (lobbyId) => {
        socket.emit('message', `Welcome user ${socket.id}`)
        socket.broadcast.emit('message', `User ${socket.id} has joined`)
        socket.join(lobbyId);
      });

      socket.on('getUserSocketId', async () => {
        socket.emit('message', `Your socket id is ${socket.id}`)
        socket.broadcast.emit('message', `A random user has the socket id ${socket.id}`)
      });

      socket.on('messageRoom', async (message) => {
        socket.broadcast.emit('message', message)
        console.log(socket.rooms)
      });

      socket.on("disconnect", (reason) => {
        try{
          socket.socket.reconnect()
        }
        catch(error){
          
        }
      });
})*/

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