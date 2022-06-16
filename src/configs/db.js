const mongoose = require('mongoose')
require('dotenv').config()
const connectMongoDB = async () => {
    try{
        await mongoose.connect(process.env.DATABASE_URI, {
            autoIndex: true,
            serverSelectionTimeoutMS: 30000,
            
        })
        console.log("MongoDB connected");
    }catch(err){
        console.log("Mongoose: ", err);
    }
}

module.exports = {
    connectMongoDB
}