const mongoose = require("mongoose");
const Schema = mongoose.Schema;

//user schema
const ExerciseSchema = new Schema({
    idUser: Number,
    day: String,
    timestamp: Number,
    listExercise: [{name:String,score:Number,note:String, typeExercise:String}],
});

module.exports = mongoose.model('Exercise',ExerciseSchema);