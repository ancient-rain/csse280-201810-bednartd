const mongoose = require('mongoose');

const memberSchema = new mongoose.Schema({
    name: {type: String, required: true},
    email: {type: String, required: true},
    note: String
});
const showSchema = new mongoose.Schema({
    name: {type: String, required: true},
    location: {type: String, required: true},
    start: {type: Date, required: true},
    end: {type: Date, required: true},
    members: [memberSchema]
});

module.exports = mongoose.model('Show', showSchema);