const express = require("express");
const mongoose = require("mongoose");
const session = require("express-session");
const app = express();
const PORT = process.env.PORT|| 3000;
const homeController = require("./api/controllers/homeController");
const submitController = require("./api/controllers/submitController");
const deadlineController = require("./api//controllers/deadlineController");
const userController = require("./api//controllers/userController");
const resultController = require("./api//controllers/resultController");
const driveController = require("./api//controllers/driveController");
app.set("view engine","ejs");
app.set('trust proxy', 1) // trust first proxy
app.use(session({
  secret: "secret_key",
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false }
}));
app.use(function(req,res,next) {
  res.setHeader('Access-Control-Allow-Origin','*');
  res.setHeader('Access-Control-Allow-Methods','GET,POST,PUT,DELETE');
  res.setHeader('Access-Control-Allow-Headers','X-Requested-With,content-type,Authorization,x-access-token');
  next();
});
mongoose.connect("mongodb+srv://thanhgiau2604:enjoycoding@enjoycoding-7qryf.mongodb.net/test?retryWrites=true&w=majority");
// mongoose.connect("mongodb://localhost:27017/enjoycoding");
homeController(app);
submitController(app);
deadlineController(app);
userController(app);
resultController(app);
driveController(app);
app.use(express.static(__dirname+"/public"));
app.get("/",(req,res)=> res.render("trangchu"));
app.get("/submit",(req,res)=> res.render("nopbai"));
app.listen(PORT, ()=> console.log("App listening on PORT "+PORT));