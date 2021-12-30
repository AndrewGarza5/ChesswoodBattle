const params = window.location.search
const lobbyId = new URLSearchParams(params).get('id')
const confirmNameButton = document.getElementById("confirm-name-button")
const emmaPicture = document.getElementById('emma-picture')
const emmaSpeech = document.getElementById('emma-speech')
const submitNameButton = document.getElementById("submit-name-button")
const nameChangeInput = document.getElementById("name-change-input")
const lobbyWrapper = document.getElementById('lobby-wrapper')

const socket = io()

submitNameButton.addEventListener("click", async (e) => {
    try{
        const name = nameChangeInput.value
        //socket.emit('joinLobbyFromSelectNamePage', {gameSessionId:lobbyId, playerName:name, playerTeam: '1'})

        $('#lobby-wrapper').load('../components/main_lobby.html #main-lobby-component')
        // adds Lobby.js as a script to lobby.html
        load_script('./scripts/lobby.js')

    }
    catch(error){
      console.log(error)
        // display to user that there was an error and to try again
    }
    
})

// Makes emma talk upon entering the page
async function talkingEmma(){
    await sleep(1000)
    emmaPicture.src='./images/emma-logo-rainbow-mouth.png'
    emmaSpeech.innerText='Hello human....'
    await sleep(150)
    emmaPicture.src='./images/emma-logo-rainbow.png'
    await sleep(230)
    emmaPicture.src='./images/emma-logo-rainbow-mouth.png'
    await sleep(300)
    emmaPicture.src='./images/emma-logo-rainbow.png'
    await sleep(200)
    emmaPicture.src='./images/emma-logo-rainbow-mouth.png'
    await sleep(120)
    emmaPicture.src='./images/emma-logo-rainbow.png'


    await sleep(1000)
    emmaPicture.src='./images/emma-logo-rainbow-mouth.png'
    emmaSpeech.innerText='what is your name?'
    await sleep(150)
    emmaPicture.src='./images/emma-logo-rainbow.png'
    await sleep(130)
    emmaPicture.src='./images/emma-logo-rainbow-mouth.png'
    await sleep(200)
    emmaPicture.src='./images/emma-logo-rainbow.png'
    await sleep(100)
    emmaPicture.src='./images/emma-logo-rainbow-mouth.png'
    await sleep(50)
    emmaPicture.src='./images/emma-logo-rainbow.png'
    await sleep(230)
    emmaPicture.src='./images/emma-logo-rainbow-mouth.png'
    await sleep(100)
    emmaPicture.src='./images/emma-logo-rainbow.png'
    await sleep(120)
    emmaPicture.src='./images/emma-logo-rainbow-mouth.png'
    await sleep(50)
    emmaPicture.src='./images/emma-logo-rainbow.png'
    
    await sleep(1000)
    emmaPicture.src='./images/emma-logo-rainbow-mouth.png'
    emmaSpeech.innerText='Tell me immediately. Or else.'
    await sleep(150)
    emmaPicture.src='./images/emma-logo-rainbow.png'
    await sleep(230)
    emmaPicture.src='./images/emma-logo-rainbow-mouth.png'
    await sleep(300)
    emmaPicture.src='./images/emma-logo-rainbow.png'
    await sleep(200)
    emmaPicture.src='./images/emma-logo-rainbow-mouth.png'
    await sleep(120)
    emmaPicture.src='./images/emma-logo-rainbow.png'
    await sleep(130)
    emmaPicture.src='./images/emma-logo-rainbow-mouth.png'
    await sleep(200)
    emmaPicture.src='./images/emma-logo-rainbow.png'
    await sleep(100)
    emmaPicture.src='./images/emma-logo-rainbow-mouth.png'
    await sleep(150)
    emmaPicture.src='./images/emma-logo-rainbow.png'
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

  talkingEmma()