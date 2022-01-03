const axios = require('axios')

async function CheckAllGameSessionsForExpirationAndDelete(){
    const response = await axios.get(`http://localhost:5000/api/v1/game-sessions`)
    const currTime = new Date().toISOString()
    try{
        response.forEach(async element => {
            if(element.gameSessionExpirationDate < currTime){
                await axios.delete(`http://localhost:5000/api/v1/game-sessions/${element.gameSessionId}`)
                console.log(`deleted session ${element.gameSessionId}`)
            }
        });
    }
    catch(error){
        console.log(error)
    }
}

async function test(){
    console.log('asdsaf')
}

test()