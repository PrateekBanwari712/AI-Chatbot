import express, { response } from 'express'

const app = express()
const PORT = 3000;

app.get("/", (req , res)=>{
    res.send("Why are you here")
    alert("Why are you here");
})

app.get("/login", (req, res) => {
    const test = req.body;
    res.send("hello wrold")
})
app.get("/logout", (req, res) => {
    return (
        <div>
            logout
        </div>
    )
})
app.get("/dashboard", ()=>{
    return (
        <div>
            welocme to the world of magic
        </div>
    )
})


app.listen(PORT, ()=>{
    console.log("Hello from the server")
})

