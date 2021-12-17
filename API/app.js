const express = require('express')
const port = 5000
const games = require('./routes/games')
const app = express()
const connectDB = require('./db/connect')
require('dotenv').config()

// middleware 

app.use (express.json() )

// routes
app.get('/api/v1/create-new-game', (req, res)=>{
    res.status(201).send('OTHER PAGE!!!!!!!!!')
})

app.use('/api/v1/games', games)

//Handle 404 for accessing resources that dont exit in the app
app.all('*',(req,res) =>{
    res.status(404).send('<h1>404 NOT FOUND</h1>')
})

const start = async () => {
    try{
        await connectDB(process.env.MONGO_URI)
        app.listen(port,()=>{
            console.log(`server listening on port ${port}...`)
        })
    }
    catch(error){
        console.log(error)
    }
}

start()