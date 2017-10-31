// get an instance of mongoose and mongoose.Schema
const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const userSchema = new Schema({ 
    firstName: {type: String, required: true},
    lastName: {type: String, required: true}, 
    email: {type: String, required: true, unique: true},
    username: {type: String, required: true, unique: true},
    admin: Boolean 
});

// set up a mongoose model and pass it using module.exports
module.exports = mongoose.model('User', userSchema);