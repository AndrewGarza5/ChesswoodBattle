const axios = require('axios')

exports.DeleteAllPlayersInGameSession = async function(JSONobj, gameSessionId){
    try{
        console.log(0)
        const response = await axios.delete(`http://localhost:5000/api/v1/game-session/ASFS/players/asf`)
        console.log(11)
        for(var i = 0; i < 1000; i++){
            console.log(i)
        }
        console.log(response)
        // JSONobj.forEach(async element => {
        //     const response = await axios.delete(`http://localhost:5000/api/v1/game-session/${gameSessionId}/players/${element.playerSocketId}`)
        //     console.log(response.status)
        //     if(response.status == 404 || response.status == 500){
        //         throw new Error(response.body)
        //     }
        // });
    }
    catch(error){
        //console.log(error)
        //return error
    }
    
}