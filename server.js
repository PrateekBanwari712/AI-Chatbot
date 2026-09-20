import express from 'express'

const app = express()
const PORT = 3000;

app.get("/", (req , res)=>{
    res.send("Why are you here")
})

app.send("/", (req, res) => {
    res.send("bye")
})



app.listen(PORT, ()=>{
    console.log("Hello from the server")
})

