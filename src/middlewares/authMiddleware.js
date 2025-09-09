const authMiddleware = (req,res,next)=>{
    const token="xyz"
    const isauthenticated=token==="xyz"
    if(!isauthenticated){
        res.status(401).send("unauthorized token")
    } else{
        next()
    }
}

module.exports = {authMiddleware}