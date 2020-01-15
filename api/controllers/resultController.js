const bodyParser = require("body-parser");
const parser = bodyParser.urlencoded({extended:false});
const User = require("../models/users");
const Submit = require("../models/submit")

module.exports = function(app){
    app.get("/manageResult",(req,res)=>{
        res.render("qlketqua");
    })
}