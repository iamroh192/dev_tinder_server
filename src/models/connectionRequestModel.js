const mongoose = require("mongoose")
const User = require("./user")

const connectRequestModel = new mongoose.Schema({
    fromUserId:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        ref:"User"
    },
    toUserId:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        ref:"User"
    },
    status:{
        type:String,
        enum:{
            values:["ignored","interested","accepted","rejected"],
            message:`{value} is incorrect status type`
        }
    }
},
{timestamps:true})

connectRequestModel.pre("save",function (next){
    const connectionRequestObject = this;
    if(connectionRequestObject.fromUserId.equals(connectionRequestObject.toUserId)){
        throw new Error ("Request cannot be sent to same user")
    }
    next()
})

const connectionRequest = mongoose.model("connectionRequest",connectRequestModel)

module.exports = connectionRequest