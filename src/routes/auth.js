const app = require("express")
const User = require("../models/user.js")


const authRouter = app.Router()
const bcrypt = require("bcrypt")
const jwt = require('jsonwebtoken');


const {validations} = require("../utils/validations.js")


authRouter.post("/signup",async (req,res)=>{
    try{
        validations(req)
        const {firstName,lastName,emailId,password}=req.body
        const hashPassword = await bcrypt.hash(password, 10);
        const user = new User({firstName,lastName,emailId,password:hashPassword})
        await user.save()
        res.send("data saved successfully")
    } catch (err){
        res.status(404).send(err)
    }

})


authRouter.post("/login",async (req,res)=>{
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
                const token = jwt.sign({ _id: user._id }, 'Dev@tinder123',{expiresIn:"1d"})
                res.cookie("token",token)
                res.status(200).send("Login Successfull")
            }
        }       
    } catch (err){
        res.status(404).send(err.message)
    }
})

authRouter.post("/logout", async (req,res)=>{
    res.cookie("token",null,{
        expires:new Date(Date.now())
    })
    res.send("logout successful")
})

module.exports = authRouter