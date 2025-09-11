const jwt = require("jsonwebtoken")
const User = require("../models/user")
const authMiddleware = async (req,res,next)=>{
    try{
        const {token} = req.cookies
        if(!token){
            throw new Error ("invalid request")
        }
        const decoded = await jwt.verify(token,"Dev@tinder123")
        const user = await User.findById(decoded._id)
        if(!user){
            throw new Error ("invalid request")
        }
        req.user = user
        next()
    }catch (err){
        res.status(404).send(err.message)
    }
    
}

module.exports = {authMiddleware}