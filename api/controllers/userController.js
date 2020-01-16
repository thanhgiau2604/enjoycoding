const bodyParser = require("body-parser");
const parser = bodyParser.urlencoded({extended:false});
const User = require("../models/users");
const Submit = require("../models/submit")

module.exports = function(app){
    app.get("/user",(req,res)=>{
        res.render("qlnguoidung");
    });
    app.get("/listUser",(req,res)=>{
        User.find({},function(err,data){
            if (!err){
                res.send(data);
            }
        })
    });
    app.post("/updateUser",parser,(req,res)=>{
        const _id = req.body._id;
        const id = req.body.id;
        const name = req.body.name;
        User.update({_id:_id},{id:id,name:name},function(err,data){
            if (!err){
                res.send({success:1});
            } else {
                res.send({success:0});
            }
        })
    });
    app.post("/deleteUser",parser,(req,res)=>{
        const id = req.body.id;
        User.update({_id:id},{isDelete:1},function(err,data){
            if (!err){
                res.send({success:1});
            } else {
                res.send({success:0});
            }
        })
    });
    app.post("/restoreUser",parser,(req,res)=>{
        const id = req.body.id;
        User.update({_id:id},{isDelete:0},function(err,data){
            if (!err){
                res.send({success:1});
            } else {
                res.send({success:0});
            }
        })
    });
    app.post("/getUser",parser,(req,res)=>{
        const id = req.body.id;
        User.findOne({_id:id},function(err,data){
            if(!err){
                res.send(data);
            }
        })
    });
    app.post("/saveUser",parser,(req,res)=>{
        const id = parseInt(req.body.id);
        const name = req.body.name;
        const password = req.body.password;
        console.log(id);
        console.log(name);
        console.log(password);
        User.findOne({id:id},function(err,data){
            if (!err&&data){
                res.send({err:"ID User Exist. Try other ones!"});
            } else {
                if (id=="" || name=="" || password==""){
                    res.send("All fields are required");
                } else {
                    var user = {
                        id:id,
                        name:name,
                        password:password,
                        score:0,
                        isDelete:0
                    }
                    User.create(user,function(err,data){
                        if (!err){
                            res.send({success:1});
                        }
                    })
                }
            }
        })
    })
}