const formDOM = document.querySelector('.game-selections-form')
const newGameButton = document.getElementById("new-game-button")
const joinGameButton = document.getElementById("join-game-button")

  newGameButton.addEventListener("click", async (e) => {
    e.preventDefault()
    try {

        var min = 65
        var max = 90
        var gameSessionId = ""
        for(var i = 0; i < 4; i++){
            var randomInt = Math.floor(Math.random() * (max - min) + min)
            var character = String.fromCharCode(randomInt)
            gameSessionId += character
        }
        const JSONobj = {
          gameSessionId: gameSessionId,
          amountOfPlayers: 1
        }
        var res = await axios.post('http://localhost:5000/api/v1/game-session', JSONobj);
        console.log(res.body);
        window.location.href = `selectName.html?id=${gameSessionId}`;

    } catch (error) {
      console.error(error);
    }
  });

  joinGameButton.addEventListener("click", async (e) => {
    e.preventDefault()
    try{
      console.log(1);
      await sleep(1000);
      console.log(2);
      
    }catch(error){
      console.error(error)
    }
  });

  function sleep(ms) {
    return new Promise((resolve) => {
      setTimeout(resolve, ms);
    });
  }