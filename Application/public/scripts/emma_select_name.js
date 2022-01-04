const params = window.location.search
const gameSessionIdValue = new URLSearchParams(params).get('id')
const confirmNameButton = document.getElementById("confirm-name-button")
const emmaPicture = document.getElementById('emma-picture')
const emmaSpeech = document.getElementById('emma-speech')
const submitNameButton = document.getElementById("submit-name-button")
const nameInput = document.getElementById("name-input")
const lobbyWrapper = document.getElementById('lobby-wrapper')
const errorBoxFormDOM = document.getElementById('error-box-form')


submitNameButton.addEventListener("click", async (e) => {
    try{
        const name = nameInput.value
        if(name.length < 1 || name.length > 16){
            throw new Error('Name must be between 1 and 16 characters')
        }

        
        await socket.emit('joinLobbyFromSelectNamePage', {gameSessionId:gameSessionIdValue, playerName:name, playerTeam: '1'}, async (response) => {
          if(response.status == 200){

            const createPlayerJSON = {
              gameSessionId: gameSessionIdValue,
              playerName: name,
              playerTeam: 1,
              playerSocketId: socket.id
            }
            const createPlayerResponse = await axios.post(
              `http://localhost:5000/api/v1/game-sessions/${gameSessionIdValue}/players`, 
              createPlayerJSON
            )
            if(createPlayerResponse.status == 202){
              console.log('succ')
            }
            else{
              throw new Error('Something went wrong creating your player, please try again')
            }
          }
          else{
            throw new Error('Unable to connect to socket session, try again')
          }
        });
        //socket.emit('joinLobbyFromSelectNamePage', {gameSessionId:gameSessionIdValue, playerName:name, playerTeam: '1'})
        //console.lobby(socket.id)

        await $('#lobby-wrapper').load('../components/main_lobby.html #main-lobby-component')
        load_script('./scripts/lobby.js')

    }
    catch(error){
      console.log(error)
      displayError(error)
    }
    
})

// Makes emma talk upon entering the page
function startTalkingEmma(){
  var emmaSpeechesObj = new EmmaSpeeches()
}

async function displayError(errorMessage) {

    errorBoxFormDOM.innerHTML = `<div class="error-box">${errorMessage}</div>`
    await sleep(5000)
    errorBoxFormDOM.innerHTML = ''
}

function sleep(ms) {
    return new Promise((resolve) => {
      setTimeout(resolve, ms);
    });
  }


load_script =  async function(src) {
  // Initialize scripts queue
  if( load_script.scripts === undefined ) {
      load_script.scripts = [];
      load_script.index = -1;
      load_script.loading = false;
      load_script.next = function() {
          if( load_script.loading ) return;

          // Load the next queue item
          load_script.loading = true;
          var item = load_script.scripts[++load_script.index];
          var head = document.getElementsByTagName('head')[0];
          var script = document.createElement('script');
          script.type = 'text/javascript';
          script.src = item.src;
          // When complete, start next item in queue and resolve this item's promise
          script.onload = () => {
              load_script.loading = false;
              if( load_script.index < load_script.scripts.length - 1 ) load_script.next();
              item.resolve();
          };
          head.appendChild(script);
      };
  };

  // Adding a script to the queue
  if( src ) {
      // Check if already added
      for(var i=0; i < load_script.scripts.length; i++) {
          if( load_script.scripts[i].src == src ) return load_script.scripts[i].promise;
      }
      // Add to the queue
      var item = { src: src };
      item.promise = new Promise(resolve => {item.resolve = resolve;});
      load_script.scripts.push(item);
      load_script.next();
  }

  // Return the promise of the last queue item
  return load_script.scripts[ load_script.scripts.length - 1 ].promise;
};

  startTalkingEmma()