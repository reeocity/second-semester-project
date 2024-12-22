const mongoose = require('mongoose');
require("dotenv").config()


const MONGO_DB_CONNECTION_URL = process.env.MONGO_DB_CONNECTION_URL
function connectToDB(){
    mongoose.connect(MONGO_DB_CONNECTION_URL)

    mongoose.connection.on('connected', () => {
        console.log('MongoDB connected')
    })

    mongoose.connection.on('error', () => {
        console.log('MongoDB connection failed')
    })
}

module.exports = connectToDB