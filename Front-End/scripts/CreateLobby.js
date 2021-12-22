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
        var jsonPost = '{"employees":[' +
        '{"firstName":"John","lastName":"Doe" },' +
        '{"firstName":"Anna","lastName":"Smith" },' +
        '{"firstName":"Peter","lastName":"Jones" }]}'
        
        const obj = JSON.parse(jsonPost)
        console.log(obj)
        const params = new URLSearchParams();
params.append('param1', 'value1');
params.append('param2', 'value2');
        var res = await axios.post('http://localhost:5000/api/v1/game-sessions', 'andrew');
        console.log(res);

    } catch (error) {
      console.error(error);
    }
  });

  document.getElementById("join-game-button").addEventListener("click", async (e) => {
    e.preventDefault()
    try{
      
      var res = await axios.post('http://localhost:5000/test')
      console.log(res)
    }catch(error){
      console.error(error)
    }
  });