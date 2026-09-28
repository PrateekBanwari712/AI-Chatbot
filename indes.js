
import express from "express"

const app = express();

app.get("/login", (res) => {
  res.send("login first")
})

app.listen(3000, (err)=>{
  console.log("hello from the indes")
  if(err){
    console.log("Error from the indes", err)
  }
})