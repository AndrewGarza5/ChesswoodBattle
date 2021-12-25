const params = window.location.search
const id = new URLSearchParams(params).get('id')
const test = document.getElementById("test")
const textTest = document.getElementById("text-test")

const socket = io()

socket.on('message', message => {
    console.log(message)
})

test.addEventListener("click", async (e) => {
    e.preventDefault()
    textTest.textContent = id
    console.log('aa')
});
