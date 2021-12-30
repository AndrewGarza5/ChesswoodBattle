const formDOM = document.querySelector('.game-selections-form')
const newGameButtonDOM = document.getElementById('new-game-button')
const joinGameButtonDOM = document.getElementById('join-game-button')
const joinGameInputDOM = document.getElementById('join-game-input')
const errorBoxFormDOM = document.getElementById('error-box-form')

  newGameButtonDOM.addEventListener('click', async (e) => {
    e.preventDefault()
    try {

        var min = 65
        var max = 90
        var gameSessionId = ''
        for(var i = 0; i < 4; i++){
            var randomInt = Math.floor(Math.random() * (max - min) + min)
            var character = String.fromCharCode(randomInt)
            gameSessionId += character
        }
        const JSONobj = {
          gameSessionId: gameSessionId,
          amountOfPlayers: 1
        }
        var res = await axios.post('http://localhost:5000/api/v1/game-session', JSONobj)
        console.log(res.body);
        window.location.href = `lobby.html?id=${gameSessionId}`

    } catch (error) {
      console.error(error);
      displayError(error)
    }
  });

  joinGameButtonDOM.addEventListener('click', async (e) => {
    e.preventDefault()
    const lobbyCode = joinGameInputDOM.value.toUpperCase()
    try{
      
      if(lobbyCode.length != 4){
        throw new Error('The lobby code must be 4 characters.')
      }
      console.log(lobbyCode)
      const response = await axios.get(`http://localhost:5000/api/v1/game-session/${lobbyCode}`) 
      console.log(response.status)
      if(response.status == 200){
        window.location.href = `lobby.html?id=${lobbyCode}`
      }
      
    }catch(error){
      if(error == 'Error: Request failed with status code 404'){
        console.error(`Error: Lobby ${lobbyCode} does not exist!`)
        displayError(`Error: Lobby ${lobbyCode} does not exist!`)
      }
      else{
        console.error(error)
        displayError(error)
      }
        

    }
  });

  function sleep(ms) {
    return new Promise((resolve) => {
      setTimeout(resolve, ms);
    });
  }

async function displayError(errorMessage) {

    errorBoxFormDOM.innerHTML = `<div class="error-box">${errorMessage}</div>`
    await sleep(5000)
    errorBoxFormDOM.innerHTML = ''
}