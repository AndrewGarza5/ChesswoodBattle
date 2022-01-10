const axios = require('axios')

// Check All Sessions To See If They have 0 Players And Delete
// Check All Players To See If They Do Not Have A Game Session And Delete. Back up clean up

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

// test()