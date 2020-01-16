const bodyParser = require("body-parser");
const parser = bodyParser.urlencoded({extended:false});
const User = require("../models/users");
const Submit = require("../models/submit")

module.exports = function(app){
    app.get("/manageResult",(req,res)=>{
        res.render("qlketqua");
    });
    app.post("/getPersonalResult",parser,(req,res)=>{
        const id = parseInt(req.body.id);
        Submit.find({}).sort({end:"descending"}).exec(function(err,data){
            if (!err&&data){
                var arrResult=[];
                if (data.length!=0){
                    data.forEach(deadline => {
                        if (deadline.listSubmit.length!=0){
                            deadline.listSubmit.forEach(submit => {
                                if (submit.user==id){
                                    arrResult.push(submit);
                                }
                            });
                        } 
                    });
                }
                res.send(arrResult);
            }
        })
    });
    app.get("/getListSubmit",parser,(req,res)=>{
        Submit.find({}).sort({end:"descending"}).exec(function(err,data){
            if (!err&&data){
                var arrResult=[];
                if (data.length!=0){
                    data.forEach(deadline => {
                        if (deadline.listSubmit.length!=0){
                            deadline.listSubmit.forEach(submit => {
                                arrResult.push(submit);
                            });
                        } 
                    });
                }
                for (var i=0; i<arrResult.length-1; i++){
                    for (var j=i+1; j<arrResult.length; j++){
                        if (arrResult[i].timestamp<arrResult[j].timestamp){
                            var tmp = arrResult[i];
                            arrResult[i]=arrResult[j];
                            arrResult[j]=tmp;
                        }
                    }
                }
                res.send(arrResult);
            }
        })
    });

    app.post("/addScore",parser,(req,res)=>{
        const idSubmit = req.body.idSubmit;
        const arrScore = JSON.parse(req.body.arrScore);
        Submit.findOne({listSubmit:{$elemMatch:{_id:idSubmit}}},function(err,data){
            if (!err&&data){
                Submit.findOneAndUpdate({_id:data._id,"listSubmit._id":idSubmit},{"$set":{"listSubmit.$.listScore":arrScore}},{new:true},function(err,response){
                    if (!err){
                        res.send("ok");
                    }
                })
            }
        })
    })
}