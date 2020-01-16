const bodyParser = require("body-parser");
const multer = require('multer');
const parser = bodyParser.urlencoded({extended:false});
const Submit = require("../models/submit");
function getCurrentDayTime() {
    var dateObj = new Date();
    var month = dateObj.getMonth() + 1; //months from 1-12
    var day = dateObj.getDate();
    var year = dateObj.getFullYear();
    var hour = dateObj.getHours();
    var minute = dateObj.getMinutes();
    var nowday = day.toString()+"-"+month.toString()+"-"+year.toString()+" "+hour.toString()+"h"+minute.toString();
    return nowday;
  }
// var submit = {
//     day:"1412020",
//     end:"15120201030",
//     deadline:"15/1/2020 10:30",
//     subject: "Nộp bài tập về nhà",
//     description: "Nộp đúng hạn - nộp file nén",
//     listSubmit: [],
//     status: 1
// }
// Submit.create(submit);
module.exports = function(app){
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