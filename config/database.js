const mongoose = require('mongoose')

mongoose.connect('mongodb://localhost/flights')

const db = mongoose.connection;

db.on('connected', function(){
    console.log(`Connected to MongoDB at ${db.host}:${db.port}`);
});