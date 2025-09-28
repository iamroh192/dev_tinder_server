const mongoose = require("mongoose");

const connectDB = async ()=>{
    await mongoose.connect(
        "mongodb+srv://rohithbalaga_db_user:KOmIQEgqddFvHXv2@cluster0.q7bb49t.mongodb.net/"
        // "mongodb://localhost:27017/devTinder",
        // "mongodb://rohithbalaga_db_user:KOmIQEgqddFvHXv2@cluster0.q7bb49t.mongodb.net/devTinder",
        // "mongodb+srv://rohithbalaga_db_user:KOmIQEgqddFvHXv2@ac-todiwmt-shard-00-00.q7bb49t.mongodb.net:27017/?retryWrites=true&w=majority&appName=Cluster0"
    );
}

module.exports = connectDB


