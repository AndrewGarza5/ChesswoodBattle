module.exports = (io, socket) => {
    const disconnection = (payload, callback) => {
      try{
        console.log('somebody disconnected')
        
        //callback({status: 200})
        
      }
      catch(error){

      }
    }

    const randomTest = (payload, callback) => {
      console.log('randomTest :)')
      callback({status: 200})
    }
  
    socket.on("disconnect", disconnection)
    socket.on('randomTest', randomTest)
  }