const params = window.location.search
const lobbyId = new URLSearchParams(params).get('id')
const team1ListDOM = document.getElementById('team-1-list')
const team2ListDOM = document.getElementById('team-2-list')
const switchToTeam1Button = document.getElementById('team-1-button')
const switchToTeam2Button = document.getElementById('team-2-button')


const socket = io()

socket.on('message', message => {
    console.log(message)
    //socket.message('what up')
})

// test.addEventListener("click", async (e) => {
//     e.preventDefault()
//     //textTest.textContent = id
//     console.log('aa')
// });

const ShowTeam1 = async () => {
    
}

switchToTeam1Button.addEventListener("click", async (e) => {
    const allTeam1Players = [
        {
            "_id": "61bc1a7180696864d2cfacb51",
            "name": "Andrew"
        },
        {
            "_id": "61bc1a7180696864d2cfacb52",
            "name":"Xavi"
        },
        {
            "_id": "61bc1a7180696864d2cfacb53",
            "name":"Johnny"
        }
    ]
    const createTeam1List = allTeam1Players.map((player) => {
        const {_id: personID, name } = player
        return `<div class="player-label">${name}</div>`
    }).join('')
    team1ListDOM.innerHTML = createTeam1List
})

switchToTeam2Button.addEventListener("click", async (e) => {
    
})