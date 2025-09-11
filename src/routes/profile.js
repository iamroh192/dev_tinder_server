const app = require("express")

const profileRouter = app.Router()
const bcrypt = require("bcrypt")


const {authMiddleware} = require("../middlewares/authMiddleware")
const {validateEditFields} = require("../utils/validations.js")



profileRouter.get("/profile", authMiddleware,async(req,res)=>{
    try{
        const user = req.user
        res.send(user)

    }catch (err){
        res.status(404).send(err)
    }
})

profileRouter.patch("/profile/edit", authMiddleware,async (req,res)=>{
    try {
        const isValid = validateEditFields(req)
        const user = req.user
        if(!isValid){
            throw new Error("update not allowed")
        }
        Object.keys(req.body).forEach((key)=>user[key]=req.body[key])
        await user.save()
        res.send("user updated successfully")
    } catch (err){
        res.status(404).send(err.message)
    }
})

profileRouter.patch("/updatePassword",authMiddleware, async(req,res)=>{
    try {
        const {password} = req.body
        if(!password){
            throw new Error("password required")
        }
        const user = req.user
        const hashPassword = await bcrypt.hash(password,10)
        user.password = hashPassword
        await user.save()
        res.send("password updated successfully")
    }catch (err){
        res.status(404).send(err.message)
    }
})
module.exports = profileRouter