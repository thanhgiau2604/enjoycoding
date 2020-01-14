const bodyParser = require("body-parser");
const parser = bodyParser.urlencoded({extended:false});
const User = require("../models/users");
const Submit = require("../models/submit")

module.exports = function(app){
    app.get("/dashboard",(req,res)=>{
        res.render("dashboard");
    });
    app.get("/deadline",(req,res)=>{
        res.render("deadline");
    });
    app.post("/newDeadline",parser,(req,res)=>{
        const subject = req.body.subject;
        const description = req.body.description;
        const date = req.body.date;

    })
    app.post("/onDeadline",parser,(req,res)=>{

    })
    app.post("/offDeadline",parser,(req,res)=>{

    });
    app.get("/listDeadline",(req,res)=>{
        Submit.find({},function(err,data){
            if (!err){
                res.send(data);
            }
        })
    })
}