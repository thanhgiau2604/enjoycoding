const bodyParser = require("body-parser");
const multer = require('multer');
const parser = bodyParser.urlencoded({extended:false});
const Submit = require("../models/submit");
function getCurrentDayTime() {
    offset = "+7";
    var d = new Date();
    var utc = d.getTime() + (d.getTimezoneOffset() * 60000);
    var day = new Date(utc + (3600000*offset));
    var nowday = day.getDate().toString()+"-"+(day.getMonth()+1).toString()+"-"+day.getFullYear().toString()+" "
    +day.getHours().toString()+"h"+day.getMinutes().toString();
    return nowday;
  }
module.exports = function(app){
    console.log(getCurrentDayTime());
    var nameFile;
    var time;
    const storage = multer.diskStorage({
        destination: (req, file, cb) => cb(null, "./public/upload"),
        filename: (req, file, cb) => {
            time = getCurrentDayTime();
            nameFile = time+" "+ file.originalname;
            cb(null, nameFile);
        }
    });

    const fileFilter = (req, file, cb) => {
        console.log(file.mimetype);
        if (file.mimetype == "application/x-zip-compressed" || file.mimetype=="application/octet-stream"){
            cb(null, true);
        } else {
            req.fileValidationError = 'Bạn chỉ được phép nộp file ZIP hoặc RAR';
            cb(null, false, new Error("Bạn chỉ được phép nộp file ZIP hoặc RAR"));
        }
    }
    const upload = multer({
        storage: storage,
        limits: {
            fileSize: 1024 * 1024 * 20
        },
        fileFilter:fileFilter
    })
    app.post("/uploadFile", upload.single("fileData"), (req, res, next) => {
        if (req.fileValidationError){
            res.send({err:req.fileValidationError});
        } else {
            res.send({name:nameFile, time:time});
        }
    });

    app.post("/saveSubmit",parser,(req,res)=>{
        var submit = {
            user:parseInt(req.body.user),
            name: req.body.name.toString(),
            url: req.body.url.toString(),
            timestamp:parseInt(req.body.timestamp),
            time:req.body.time.toString(),
        }
        //console.log(submit);
        Submit.findOne({status:1},function(err,data){
            if (!err){
                console.log(data);
                Submit.findOneAndUpdate({_id:data._id},{"$push":{listSubmit:{user:submit.user,name:submit.name,url:submit.url,
                    timestamp:submit.timestamp,time:submit.time,listScore:[]}}},{new:true},function(err,newdata){

                    res.send(newdata);
                })
            }
        })
    });

    app.get("/getSubmit",(req,res)=>{
        Submit.findOne({status:1},function(err,data){
            if (!err){
                res.send(data);
            }
        })
    })

    app.post("/getListFile",parser,(req,res)=>{
        const user = req.body.user;
        Submit.find({},function(err,data){
            if (!err&&data){
                var arrResult = [];
                data.forEach(submit => {
                    submit.listSubmit.forEach(file => {
                        if (file.user==user){
                            arrResult.push(file);
                        }
                    });
                });
                if (arrResult.length==0){
                    res.send([]);
                } else {
                     var tmp;
                    for (var i=0; i<arrResult.length-1; i++){
                        for (var j=i+1; j<arrResult.length; j++){
                            if (arrResult[i].timestamp<arrResult[j].timestamp){
                                tmp = arrResult[i];
                                arrResult[i] = arrResult[j];
                                arrResult[j] = tmp;
                            }
                        }
                    }
                    
                    res.send(arrResult);
                }
            }
        })
    })
}