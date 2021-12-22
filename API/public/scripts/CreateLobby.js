const formDOM = document.querySelector('.game-selections-form')

  document.getElementById("new-game-button").addEventListener("click", async (e) => {
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
        var res = await axios.post('http://localhost:5000/api/v1/game-sessions', JSONobj);
        console.log(res);

    } catch (error) {
      console.error(error);
    }
  });

  document.getElementById("join-game-button").addEventListener("click", async (e) => {
    e.preventDefault()
    try{
      /*var stri = 'poop'
      var res = await axios({ 
        method: 'post', 
        url: 'http://localhost:5000/test', 
        headers: { 'Content-Type': 'text/plain', },
        data: stri
      });*/
      var res = await axios.post('http://localhost:5000/test', {aa:'bb'})
      console.log(res)
    }catch(error){
      console.error(error)
    }
  });