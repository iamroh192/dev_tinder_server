const express = require("express")
const cors = require("cors")

const connectDB = require("./config/database.js");
const User = require("./models/user.js")
const app = express()
const cookieParser = require('cookie-parser')
const authRouter = require("./routes/auth.js")
const requestRouter = require("./routes/request.js")
const profileRouter = require("./routes/profile.js")
const userRouter = require("./routes/user.js")

// app.all("*", function(req, res, next) {
//     res.header("Access-Control-Allow-Origin", "http://localhost:5173");
//     next();
// })


app.use(cors());

app.use((req, res, next) => {
  res.set('Cache-Control', 'no-store');
  next();
});

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

