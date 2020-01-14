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
    })
}