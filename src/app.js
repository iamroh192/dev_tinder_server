const express = require("express")

const connectDB = require("./config/database.js");
const User = require("./models/user.js")
const validations = require("./utils/validations.js")
const bcrypt = require("bcrypt")
const app = express()

app.use(express.json())
  
app.post("/signup",async (req,res)=>{
    try{
        validations(req)
        console.log("after validation")
        const {firstName,lastName,emailId,password}=req.body
        const hashPassword = await bcrypt.hash(password, 10);
        console.log(hashPassword)
        const user = new User({firstName,lastName,emailId,password:hashPassword})
        await user.save()
        res.send("data saved successfully")
    } catch (err){
        res.status(404).send(err)
    }

})

app.post("/login",async (req,res)=>{
    try{
        const {emailId,password} = req.body
        const user = await User.findOne({emailId})
        if(!user){
            res.status(404).send("invalid details")
        } else{
            const isValidPassword = await bcrypt.compare(password,user.password)
            if(!isValidPassword){
            res.status(404).send("invalid details")
            } else {
                res.status(200).send("Login Successfull")
            }
        }       
    } catch (err){
        res.status(404).send(err)
    }
})

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

