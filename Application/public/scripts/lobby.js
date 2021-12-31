const team1ListDOM = document.getElementById('team-1-list')
const team2ListDOM = document.getElementById('team-2-list')
const switchToTeam1ButtonDOM = document.getElementById('team-1-button')
const switchToTeam2ButtonDOM = document.getElementById('team-2-button')
const startGameDOM = document.getElementById('start-game-button')



const ShowTeam1 = async () => {
    
}

switchToTeam1ButtonDOM.addEventListener("click", async (e) => {

    const allTeam1Players = [
        {
            "_id": "61bc1a7180696864d2cfacb51",
            "name": "Xavi"
        },
        {
            "_id": "61bc1a7180696864d2cfacb52",
            "name":"Johnny"
        },
        {
            "_id": "61bc1a7180696864d2cfacb53",
            "name":"Andy"
        }
    ]
    const createTeam1List = allTeam1Players.map((player) => {
        const {_id: personID, name } = player
        return `<div class="player-label">${name}</div>`
    }).join('')
    team1ListDOM.innerHTML = createTeam1List
})

switchToTeam2ButtonDOM.addEventListener("click", async (e) => {
    //dynamicCode.innerHTML = '<h1>BIG POOPOO HAHAHAHAHA</h1>'
    $('#dynamic').load('../test.html #test-switch')
    //console.log(extraCode)
})

startGameDOM.addEventListener("click", async (e) => {
    socket.emit('getUserSocketId')
})