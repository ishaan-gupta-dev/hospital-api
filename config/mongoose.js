require('dotenv').config()
const mongoose = require('mongoose');
// db url
const DB_URL = process.env.DB_URL || 'mongodb://localhost/hospital-api-db';

mongoose.connect(DB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

const db = mongoose.connection;

// if error in starting the db
db.on('error', console.error.bind(console, "Error connecting to MongoDB-development"));


// once db is connected
db.once('open', function () {
    console.log("Connected to Database - MongoDB-development");
});

module.exports = db;


