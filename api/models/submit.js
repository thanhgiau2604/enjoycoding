const mongoose = require("mongoose");
const Schema = mongoose.Schema;

//user schema
const SubmitSchema = new Schema({
    end: String,
    deadline: String,
    subject: String,
    description: String,
    listSubmit: [{user:Number, name:String,url:String,timestamp:Number, time:String, 
        listScore:{name:String, score: Number, note:String}}],
    status: Number 
});

module.exports = mongoose.model('Submit',SubmitSchema);