const bodyParser = require("body-parser");
const parser = bodyParser.urlencoded({extended:false});
const User = require("../models/users");
module.exports = function(app){
    app.get("/rank",(req,res)=>{
        res.render("xephang");
    })
    app.get("/result",(req,res)=>{
        res.render("ketqua");
    })
    app.post("/login",parser,(req,res)=>{
        const id = req.body.id;
        const password = String(req.body.password);
        if (!id || !password){
            res.send("Hãy điền đầy đủ thông tin");
        } else {
            User.findOne({id:id,isDelete:0},function(err,user){
                if (err){
                    res.send("Lỗi: "+ err);
                } else {
                    if (!user){
                        res.send("Id hoặc mật khẩu không đúng");
                    } else if (password!=user.password){
                        res.send("Id hoặc mật khẩu không đúng");
                    } else {
                        res.send({success:1,user:user});
                    }
                }
            })
        }
    });
    app.post("/getInformation",parser,(req,res)=>{
        const id = req.body.id;
        User.findOne({id:id},function(err,data){
            if (!err){
                res.send(data);
            }
        })
    });

    //xep hang
    app.post("/getRank",(req,res)=>{
        User.find({isDelete:0,role:"user"}).sort({score:"descending"}).exec(function(err,data){
            if (!err){
                res.send(data);
            }
        })
    })
}