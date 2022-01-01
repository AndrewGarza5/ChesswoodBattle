module.exports = (io, socket) => {
    const joinLobbyFromSelectNamePage = (payload) => {
      try{
        socket.join(payload.gameSessionId);
  
        // Welcome current user
        socket.emit('message', `Welcome to room ${payload.gameSessionId}`)
        
      }
      catch(error){
        console.log(error)
      }
    }
  

  
    socket.on("joinLobbyFromSelectNamePage", joinLobbyFromSelectNamePage)
    //socket.on("joinLobbyFromSelectNamePage", joinLobbyFromSelectNamePage)
  }