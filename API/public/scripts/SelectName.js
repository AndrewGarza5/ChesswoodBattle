
const params = window.location.search
const lobbyId = new URLSearchParams(params).get('id')
const confirmNameButton = document.getElementById("confirm-name-button")
const emmaPicture = document.getElementById('emma-picture')
const emmaSpeech = document.getElementById('emma-speech')
const submitNameButton = document.getElementById("submit-name-button")
const nameChangeInput = document.getElementById("name-change-input")

const socket = io()

submitNameButton.addEventListener("click", async (e) => {
    try{
        const name = nameChangeInput.value
        socket.emit('joinLobby', {gameSessionId:lobbyId, playerName:name, playerTeam: '1'})
        window.location.href = `lobby.html?id=${lobbyId}`;

    }
    catch(error){
        // display to user that there was an error and to try again
    }
    
})

// Makes emma talk upon entering the page
async function talkingEmma(){
    await sleep(1000)
    emmaPicture.src='./images/emma-logo-rainbow-mouth.jpg'
    emmaSpeech.innerText='Hello human....'
    await sleep(150)
    emmaPicture.src='./images/emma-logo-rainbow.png'
    await sleep(230)
    emmaPicture.src='./images/emma-logo-rainbow-mouth.jpg'
    await sleep(300)
    emmaPicture.src='./images/emma-logo-rainbow.png'
    await sleep(200)
    emmaPicture.src='./images/emma-logo-rainbow-mouth.jpg'
    await sleep(120)
    emmaPicture.src='./images/emma-logo-rainbow.png'

    await sleep(1000)
    emmaPicture.src='./images/emma-logo-rainbow-mouth.jpg'
    emmaSpeech.innerText='what is your name?'
    await sleep(150)
    emmaPicture.src='./images/emma-logo-rainbow.png'
    await sleep(230)
    emmaPicture.src='./images/emma-logo-rainbow-mouth.jpg'
    await sleep(300)
    emmaPicture.src='./images/emma-logo-rainbow.png'
    await sleep(200)
    emmaPicture.src='./images/emma-logo-rainbow-mouth.jpg'
    await sleep(120)
    emmaPicture.src='./images/emma-logo-rainbow.png'

    
    await sleep(1000)
    emmaPicture.src='./images/emma-logo-rainbow-mouth.jpg'
    emmaSpeech.innerText='Tell me immediately. Or else.'
    await sleep(150)
    emmaPicture.src='./images/emma-logo-rainbow.png'
    await sleep(230)
    emmaPicture.src='./images/emma-logo-rainbow-mouth.jpg'
    await sleep(300)
    emmaPicture.src='./images/emma-logo-rainbow.png'
    await sleep(200)
    emmaPicture.src='./images/emma-logo-rainbow-mouth.jpg'
    await sleep(120)
    emmaPicture.src='./images/emma-logo-rainbow.png'
}

  function sleep(ms) {
    return new Promise((resolve) => {
      setTimeout(resolve, ms);
    });
  }

  talkingEmma()