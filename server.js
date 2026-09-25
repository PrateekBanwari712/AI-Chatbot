import express, { response } from 'express'

const app = express()
const PORT = 3000;

app.get("/", (req , res)=>{
    res.send("Why are you here")
    alert("Why are you here");
})

app.get("/hello", (res)=>{
    res.send("hello world")
})

app.listen(PORT, ()=>{
    console.log("Hello from the server")
})

