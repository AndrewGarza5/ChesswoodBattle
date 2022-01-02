module.exports = (io, socket) => {
    const joinLobbyFromSelectNamePage = (payload) => {
      try{
        socket.join(payload.gameSessionId);
  
        // Welcome current user
        socket.emit('message', `Welcome to room ${payload.gameSessionId}`)
        
      }
      catch(error){
        console.log(error)
        callback({
          status: "BAD"
        });
      }
    }

    const sendMessageToOthersInRoom = (payload) => {
      console.log(payload.gameSessionId, payload.message)
      socket.to(payload.gameSessionId).emit('message', payload.message)
    }
  

  
    socket.on("joinLobbyFromSelectNamePage", joinLobbyFromSelectNamePage)
    socket.on("sendMessageToOthersInRoom", sendMessageToOthersInRoom)
  }