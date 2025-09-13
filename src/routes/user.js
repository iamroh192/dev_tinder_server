const app = require("express")
const { authMiddleware } = require("../middlewares/authMiddleware")
const userRouter = app.Router()
const connectionRequest = require("../models/connectionRequestModel")
const User = require("../models/user")


const populateUserData = ["firstName","lastName","age","gender","photoURL","about","skills"]

userRouter.get("/user/requests",authMiddleware,async (req,res)=>{
    try{
        const id = req.user._id;
        const data = await connectionRequest.find({
            toUserId:id,
            status:"interested"
        }).populate("fromUserId",populateUserData)
        if(!data.length){
            throw new Error("Invalid Request")
        }
        res.status(200).json({
            message:"data sent successfully",
            data
        })

    } catch(err){
        res.status(404).send(err.message)
    }
})

userRouter.get("/user/connections",authMiddleware, async(req,res)=>{
    try{
        const user = req.user
        const data = await connectionRequest.find( {$or:[{fromUserId:user._id,status:"accepted"},{toUserId:user._id,status:"accepted"}]})
            .populate("fromUserId",populateUserData)
            .populate("toUserId",populateUserData)
        if(!data.length){
            throw new Error("Invalid Request")
        }
        const userData = data.map(obj=>{
            if (obj.fromUserId.toString()===user._id.toString()){
                return obj.toUserId
            }
            return obj.fromUserId
        })
        res.status(200).json({message:"data fetched successfully",data:userData})
    } catch(err){
        res.status(400).send(err.message)
    }
})

userRouter.get("/feed",authMiddleware, async(req,res)=>{
    try{
        const page = parseInt(req.query.page) || 1
        let limit = parseInt(req.query.limit) || 10
        limit>50?limit=50:limit
        const skip = (page-1)*limit
        const user = req.user
        const connectionRequests = await connectionRequest.find({$or:[{fromUserId:user._id},{toUserId:user._id}]},["fromUserId","toUserId"])
        const hideUsers = new Set()
        connectionRequests.forEach((request)=>{
            hideUsers.add(request.fromUserId)
            hideUsers.add(request.toUserId)
        })
        const users = await User.find({$and:[{_id:{$nin:Array.from(hideUsers)}},{_id:{$ne:user._id}}]},populateUserData)
                        .skip(skip).limit(limit)
        // const data = await User.find({ _id: { $ne: user._id } },populateUserData)
        res.status(200).json({message:"data received successfully",users})
    } catch(err){
        res.status(404).send(err.message)
    }
    
})

module.exports = userRouter