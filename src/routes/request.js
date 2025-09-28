const app = require("express")

const requestRouter = app.Router()

const {authMiddleware} = require("../middlewares/authMiddleware.js")
const connectionRequest = require("../models/connectionRequestModel.js")


requestRouter.post("/send/:status/:toUserId",authMiddleware,async (req,res)=>{
    try{
        const fromUserId = req.user._id
        const toUserId = req.params.toUserId
        const status = req.params.status
        const allowedStatus = ["interested","ignored"]
        if (!allowedStatus.includes(status)) {
            throw new Error("Status is invalid");
        }
        if(!status || !toUserId){
            throw new Error ("Invalid Request")
        }
        const existingRequest = await connectionRequest.findOne({
            $or:[
                {fromUserId,toUserId},
                {fromUserId:toUserId,toUserId:fromUserId}
            ]
        })
        console.log(existingRequest)
        if(existingRequest){
            throw new Error ("Request already sent")
        }
        const data = new connectionRequest({fromUserId,toUserId,status})
        console.log(data)
        await data.save()
        res.json({message:"request sent successfully",data})

        // res.send("connection request sent")
    }catch (err){
        res.status(404).send(err.message)
    }
})

requestRouter.post("/review/:status/:requestId", authMiddleware,async(req,res)=>{
    try{        
        const toUserId = req.user._id
        const status = req.params.status
        const requestId = req.params.requestId
        console.log(requestId)
        if(!status || !requestId){
            throw new Error("invalid request")
        }
        console.log("in review route")
        const allowedStatus = ["accepted","rejected"]
        if(!allowedStatus.includes(status)){
            throw new Error("invalid status")
        }
        const data = await connectionRequest.findOne({_id:requestId,toUserId,status:"interested"})
        if(!data){
            throw new Error ("invalid request")
        } 
        data.status = status
        data.save()
        res.status(200).json({message:"status updated successfully",data})

    } catch(err){
        res.status(404).send(err.message)
    }
})

module.exports = requestRouter