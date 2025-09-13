const express = require("express")

const connectDB = require("./config/database.js");
const User = require("./models/user.js")
const app = express()
const cookieParser = require('cookie-parser')
const authRouter = require("./routes/auth.js")
const requestRouter = require("./routes/request.js")
const profileRouter = require("./routes/profile.js")
const userRouter = require("./routes/user.js")

app.use(express.json())
app.use(cookieParser())
  
app.use("/",authRouter)
app.use("/",requestRouter)
app.use("/",profileRouter)
app.use("/",userRouter)


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

