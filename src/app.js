const express = require("express")

const connectDB = require("./config/database.js");
const User = require("./models/user.js")
const app = express()
const cookieParser = require('cookie-parser')
const authRouter = require("./routes/auth.js")
const requestRouter = require("./routes/request.js")
const profileRouter = require("./routes/profile.js")

app.use(express.json())
app.use(cookieParser())
  
app.use("/",authRouter)
app.use("/",requestRouter)
app.use("/",profileRouter)

app.get("/user", async (req,res)=>{
    const {emailId} = req.body
    try{
        const user = await User.find({emailId})
        res.send(user)
    } catch (err){
        res.status(404).send(err)
    }
})
app.get("/feed", async (req,res)=>{
    try{
        const users = await User.find({})
        res.send(users)
    } catch (err){
        res.status(404).send(err)
    }
})
app.get("/userById", async (req,res)=>{
    try{
        const {id} = req.body
        const user = await User.findById(id)
        res.send(user)
    } catch (err){
        res.status(404).send(err)
    }
})
app.delete("/user", async (req,res)=>{
    try{
        const {id} = req.body
        const user = await User.findByIdAndDelete(id)
        res.send(user)
    } catch (err){
        res.status(404).send(err)
    }
})

app.patch("/user",async (req,res)=>{
    try{
        const allowUpdates = ["firstName","lastName","about","skills"]
        const {id} = req.body
        const data = req.body
        const updates={}
        Object.keys(data).forEach((key)=>{
            if(allowUpdates.includes(key)){
                updates[key]=data[key]
            }
        })
        if(Object.keys(updates).length===0){
            return res.status(400).send("valid updated fields are:"+allowUpdates.join(","))
        }
        const user = await User.findByIdAndUpdate(id,updates,{returnDocument:'after',runValidators: true})
        if (!user) {
            return res.status(404).send({ error: "User not found" });
        }
        res.send(user)
    } catch (err){
        res.status(404).send(err)
    }    
})

connectDB()
.then(()=>{
    console.log("DB connection established")
    app.listen(7777,()=>{
        console.log('app is listening on port 7777')
    })
})
.catch((err)=>{
    console.error(err)
})

