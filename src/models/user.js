const mongoose = require("mongoose");

const validator = require('validator');


const userSchema = new mongoose.Schema({
    firstName:{
        type:String,
        required:true
    },
    lastName:{
        type:String
    },
    emailId:{
        type:String,
        required:true,
        lowercase:true,
        trim:true,
        unique:true,
        validate(value){
            if(!validator.isEmail(value)){
                throw new Error("Enter valid email:" + value)
            }
        }
    },
    password:{
        type:String,
        validate(value){
            if(!validator.isStrongPassword(value)){
                throw new Error ("Password not strong" + value)
            }
        }
    },
    age:{
        type:Number,
        min:18
    },
    gender:{
        type:String,
        enum:["male","female","other"]
    },
    photoURL:{
        type:String,
        default:function(){
            if(this.gender==='male'){
                return "https://png.pngtree.com/png-vector/20231019/ourmid/pngtree-user-profile-avatar-png-image_10211467.png";
            } else if(this.gender==="female"){
                return "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTmpmpEzitjsJ1t_CLp9LE6Kzg5RPvmFApZ_Q&s"
            } else {
                return "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS08t3lZlT_JscMUhdU5tbWMj9vnLBm9K3yKA&s"
            }
        }
    },
    about:{
        type:String,
        default:"This is default about"
    },
    skills:{
        type:[String]
    }
},{
    timestamps:true
})

const User = mongoose.model("User",userSchema)

module.exports = User

