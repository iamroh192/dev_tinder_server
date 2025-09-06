const express = require("express")

const app = express()

app.use("/abc",(req,res)=>{
    res.send("erripuka")
})
app.use("/abcd",(req,res)=>{
    res.send("erripuka2")
})
app.use((req,res)=>{
    res.send("hello")
})

app.listen(3000,()=>{
    console.log('app is listening on port 3000')
})