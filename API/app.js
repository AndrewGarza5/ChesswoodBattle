const express = require('express')
const port = 5000
const GameSessions = require('./routes/GameSessions')
const app = express()
const connectDB = require('./db/connect')
require('dotenv').config()

// middleware 
app.use(express.static('./public'));
app.use(express.json())
app.use(function(req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type, Authorization');
    next();
  });


// routes
app.get('/test', (req, res)=>{

    res.status(200).send('GET TEST!!!!')
})

app.post('/test', (req, res)=>{

    //const obj = JSON.parse(req.body)
    console.log(req.body)
    res.status(201).send('posted!!')
})

app.use('/api/v1/game-sessions', GameSessions)

//Handle 404 for accessing resources that dont exist in the app
app.all('*',(req,res) =>{

    res.status(200).send()
})

// start server and mongodb
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