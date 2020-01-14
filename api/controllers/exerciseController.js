const bodyParser = require("body-parser");
const parser = bodyParser.urlencoded({extended:false});
const User = require("../models/users");
const Exercise = require("../models/exercices")

// var exercice = {
//     idUser: 5555,
//     day: "13/1/2020",
//     timestamp: parseInt(Date.now().toString()),
//     listExercise:[
//         {name: "Bai 1", score:10, note: "Good", typeExercise:"Bai thuc hanh DAY 01"},
//         {name: "Bai 2", score:10, note: "Good", typeExercise:"Bai thuc hanh DAY 01"},
//         {name: "Bai 3", score:10, note: "Good", typeExercise:"Bai thuc hanh DAY 01"},
//         {name: "Bai 4", score:10, note: "Good", typeExercise:"Bai ve nha DAY 01"},
//     ]
// }
// var user1 = {
//     id: 7777,
//     name:"Nguyen Thi Yen",
//     score: 50,
//     password:"12345678"
// }

// Exercise.create(JSON.parse(JSON.stringify(exercice)),function(err,data){
//     if (err){
//         console.log(err);
//     } else {
//         console.log(data);
//     }
// })

module.exports = function(app){
    app.post("/getPersonalResult",parser,(req,res)=>{
        const id = req.body.id;
        console.log(id);
        Exercise.find({idUser:id}).sort({timestamp:"descending"}).exec(function(err,data){
            if (!err){
                console.log(data);
                res.send(data);
            }
        })
    })
}