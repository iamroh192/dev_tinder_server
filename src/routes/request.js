const app = require("express")

const requestRouter = app.Router()

const {authMiddleware} = require("../middlewares/authMiddleware.js")


requestRouter.post("/sendConnectionRequest",authMiddleware,async (req,res)=>{
    try{
        res.send("connection request sent")
    }catch (err){
        res.status(404).send(err)
    }
})

module.exports = requestRouter