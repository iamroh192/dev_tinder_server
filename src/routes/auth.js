const app = require("express")
const User = require("../models/user.js")


const authRouter = app.Router()
const bcrypt = require("bcrypt")
const jwt = require('jsonwebtoken');


const {validations} = require("../utils/validations.js")


authRouter.post("/signup",async (req,res)=>{
    try{
        console.log("in signup route",req.body)
        validations(req)
        console.log("after validations")
        const {password}=req.body
        const hashPassword = await bcrypt.hash(password, 10);
        const user = new User({...req.body,password:hashPassword})
        await user.save()
        res.send("data saved successfully")
    } catch (err){
        res.status(404).send(err.message)
    }

})


authRouter.post("/login",async (req,res)=>{
    try{
        const {emailId,password} = req.body
        console.log(emailId,password)
        const user = await User.findOne({emailId})
        console.log(user)
        if(!user){
            res.status(404).send("invalid details")
        } else{
            const isValidPassword = await bcrypt.compare(password,user.password)
            if(!isValidPassword){
            res.status(404).send("invalid details")
            } else {
                const userObj = user.toObject();
                delete userObj.password;
                delete userObj.createdAt;
                delete userObj.updatedAt;
                const token = jwt.sign({ _id: user._id }, 'Dev@tinder123',{expiresIn:"1d"})
                res.cookie("token",token)
                res.json({message:"Login successfully",status:200,data:user})
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
    res.send({message:"logout successful",status:200})
})

module.exports = authRouter