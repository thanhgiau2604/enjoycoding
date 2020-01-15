const bodyParser = require("body-parser");
const parser = bodyParser.urlencoded({extended:false});
const User = require("../models/users");
const Submit = require("../models/submit")

module.exports = function(app){
    app.get("/dashboard",(req,res)=>{
        res.render("dashboard");
    });
    app.get("/deadline",(req,res)=>{
        res.render("qldeadline");
    });
    app.post("/newDeadline",parser,(req,res)=>{
        const end = String(req.body.deadline);
        const subject = req.body.subject;
        const description = req.body.description;
        var deadline = end.substring(0,4)+"/"+end.substring(4,6)+"/"+end.substring(6,8)+" "+end.substring(8,10)+":"
        +end.substring(10,12);
        var newDeadline = {
            end: end,
            deadline:deadline,
            subject:subject,
            description: description,
            status:0  
        }
        Submit.create(newDeadline,function(err,data){
            if (!err){
                res.send({success:1});
            } else {
                res.send({success:0});
            }
        });

    });
    app.post("/updateDeadline",parser,(req,res)=>{
        const id = req.body.id;
        const end = String(req.body.deadline);
        const subject = req.body.subject;
        const description = req.body.description;
        var deadline = end.substring(0,4)+"/"+end.substring(4,6)+"/"+end.substring(6,8)+" "+end.substring(8,10)+":"
        +end.substring(10,12);
        Submit.update({_id:id},{subject:subject,end:end,deadline:deadline,description:description},function(err,data){
            if (!err){
                res.send({success:1});
            } else {
                res.send({success:0});
            }
        });
    })
    app.post("/onDeadline",parser,(req,res)=>{
        const id = req.body.id;
        Submit.update({_id:id},{status:1},function(err,data){
            if (!err){
                res.send("ok");
            }
        })
    })
    app.post("/offDeadline",parser,(req,res)=>{
        const id = req.body.id;
        Submit.update({_id:id},{status:0},function(err,data){
            if (!err){
                res.send("ok");
            }
        })

    });
    app.get("/listDeadline",(req,res)=>{
        Submit.find({}).sort({end:"descending"}).exec(function(err,data){
            if (!err){
                res.send(data);
            }
        })
    });
    app.post("/getListSubmits",parser,(req,res)=>{
        const id = req.body.id;
        Submit.findOne({_id:id},function(err,data){
            if (!err){
                res.send(data);
            }
        })
    })
}