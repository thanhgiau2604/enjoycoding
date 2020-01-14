const mongoose = require("mongoose");
const Schema = mongoose.Schema;

//user schema
const UserSchema = new Schema({
    name: String,
    id: Number,
    score: Number,
    password: String
});

module.exports = mongoose.model('User',UserSchema);