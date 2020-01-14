const mongoose = require("mongoose");
const Schema = mongoose.Schema;

//user schema
const ResponseSchema = new Schema({
    id: Number,
    content: Number,
    day: String,
    timestamp: Number
});

module.exports = mongoose.model('Response',ResponseSchema);