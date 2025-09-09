const mongoose = require("mongoose");

const connectDB = async ()=>{
    await mongoose.connect(
        // "mongodb+srv://rohithbalaga_db_user:KOmIQEgqddFvHXv2@cluster0.q7bb49t.mongodb.net/"
        "mongodb://localhost:27017/devTinder",
        // "mongodb+srv://rohithbalaga_db_user:KOmIQEgqddFvHXv2@cluster0.q7bb49t.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
    );
}

module.exports = connectDB


