const params = window.location.search
const lobbyId = new URLSearchParams(params).get('id')
const confirmNameButton = document.getElementById("confirm-name-button")
const emmaPicture = document.getElementById('emma-picture')
const emmaSpeech = document.getElementById('emma-speech')
const submitNameButton = document.getElementById("submit-name-button")
const nameChangeInput = document.getElementById("name-change-input")
const lobbyWrapper = document.getElementById('lobby-wrapper')
const errorBoxFormDOM = document.getElementById('error-box-form')

socket.on('message', message => {
    console.log(message)
    //socket.message('what up')
})


submitNameButton.addEventListener("click", async (e) => {
    try{
        const name = nameChangeInput.value
        if(name.length < 1 || name.length > 16){
            throw new Error('Name must be between 1 and 16 characters')
        }

        //const response = await axios.post(`http://localhost:5000/api/v1/game-session/${gameSessionId}/players`, createPlayerJSON)
        socket.emit('joinLobbyTesting', lobbyId/*, {gameSessionId:lobbyId, playerName:name, playerTeam: '1'}*/)
        //console.lobby(socket.id)

        $('#lobby-wrapper').load('../components/main_lobby.html #main-lobby-component')
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


load_script = function(src) {
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