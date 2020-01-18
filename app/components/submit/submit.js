import React from 'react'
import ReactDOM from 'react-dom'
import Menu from '../common/menu'
import Footer from '../common/footer'
import $ from 'jquery'
function getCurrentDay() {
    offset = "+7";
    var d = new Date();
    var utc = d.getTime() + (d.getTimezoneOffset() * 60000);
    var day = new Date(utc + (3600000*offset));
  var nowday = "Ngày: "+day.getDate().toString()+"/"+(day.getMonth+1).toString()+"/"+day.getFullYear().toString();
  return nowday;
}
function getDateTime(){
  offset = "+7";
  var d = new Date();
  var utc = d.getTime() + (d.getTimezoneOffset() * 60000);
  var dateObj = new Date(utc + (3600000*offset));
  var month = (dateObj.getMonth() + 1).toString(); 
  if (month.length==1) month="0"+month;
  var day = dateObj.getDate().toString();
  if (day.length==1) day="0"+month;
  var year = dateObj.getFullYear().toString();
  var hour = dateObj.getHours().toString();
  if (hour.length==1) hour="0"+hour;
  var minu = dateObj.getMinutes().toString();
  if (minu.length==1) minu="0"+minu;
  var nowdatetime = year+month+day+hour+minu;
  return parseInt(nowdatetime);
}
var filePlace;
class ListFile extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      listFile:[]
    }
    filePlace=this;
  }
  componentDidMount(){
    var that = this;
    $.post("/getListFile",{user:localStorage.getItem('idUser')},function(data){
      that.setState({listFile:data});
    })
  }
  render(){
    return(<table class='table table-hover'>
    <thead>
      <tr>
        <th class="text-center">#</th>
        <th class="text-center">Tên file</th>
        <th class="text-center">Thời gian nộp</th>
        <th class="text-center">Download</th>
      </tr>
    </thead>
    <tbody>
      {this.state.listFile.map(function(file,index){
        return(
          <tr class='active' key={index}>
            <td class="text-center">{index+1}</td>
            <td class="text-center">{file.name}</td>
            <td class="text-center">{file.time}</td>
            <td class="text-center"><a href={file.url}>Click để download</a></td>
          </tr>)
      })}
    </tbody>
  </table>)
  }
}

var file;
class Submit extends React.Component{
    constructor(props){
        super(props);
        this.ChangeFile = this.ChangeFile.bind(this);
        this.submitExercise = this.submitExercise.bind(this);
        this.state = {
          addSuccess:-1,
          submit: "",
          note: "",
          htmlListFile: ""
        }
        this.getListFile = this.getListFile.bind(this);
        this.goLogin = this.goLogin.bind(this);
    }
    ChangeFile(e){
      this.setState({addSuccess:-1})
      file = e.target.files[0];
    }
    submitExercise(){
      var curTime = getDateTime();
      var requireTime = parseInt(this.state.submit.end);
      console.log(curTime);
      console.log(requireTime);
      if (curTime>requireTime){
        this.setState({addSuccess:0});
      } else {
        var that = this;
      let fileFormObj = new FormData();
      fileFormObj.append("fileData",file);
      $.ajax({
        type: "POST",
        url: "/uploadFile",
        data: fileFormObj,
        processData: false,
        contentType: false,
        success: function (data) {
          if (data.err){
            that.setState({addSuccess:0});
          } else {
            that.setState({addSuccess:1});
            var Url = window.location.protocol + "//" + window.location.host;
            var save = {
              user: localStorage.getItem("idUser"),
              name: data.name,
              url: Url+"/upload/"+data.name,
              timestamp: parseInt(Date.now().toString()),
              time: data.time
            }
            $.post("/saveSubmit",{user:save.user,name:save.name,url:save.url,timestamp:save.timestamp,time:save.time},function(data){
              $.post("/getListFile",{user:localStorage.getItem('idUser')},function(data){
                filePlace.setState({listFile:data});
              })
            })
          }
        },
        fail: function (err) {
          that.setState({addSuccess:0})
        }
      })
      }
    }
    getListFile(){
      this.setState({htmlListFile:<ListFile/>})
    }
    componentDidMount(){
      var that = this;
      $.get("/getSubmit",function(data){
        if (data){
          that.setState({submit:data});
        } else {
          that.setState({note:"Không có bất kỳ deadline nào đang diễn ra!"})
        }
      })
    }
    goLogin(){
      window.location.replace("/");
    }
    render(){
      var notify = <div></div>
      if (this.state.addSuccess == 1) {
        notify =
          <div class="alert alert-success" style={{marginTop:"10px"}}>
            <strong>Nộp bài thành công!</strong>
          </div>
      } else if (this.state.addSuccess==0){
        notify =
          <div class="alert alert-danger" style={{marginTop:"10px"}}>
            <strong>Có lỗi xảy ra! Hãy thử lại. Có thể bạn chọn không định dạng .ZIP hoặc .RAR hoặc hết hạn nộp</strong>
          </div>
      }
      var submitInfor = "";
      if (this.state.submit !=""){
        submitInfor = <div>
          <h5>Hạn nộp: {this.state.submit.deadline}</h5>
          <h5>Ghi chú: {this.state.submit.description}</h5>
          <h5 class="text-center">Chọn file cần nộp</h5>
          <input type="file" className="form-control" onChange={(e) => this.ChangeFile(e)} />
          <div className="text-center">
            <button class="btn btn-primary text-center" style={{ marginTop: '10px' }} onClick={this.submitExercise}>Nộp bài</button>
          </div>
        </div>
      }
      var idUser = localStorage.getItem("idUser");
       var htmlMain = <div></div>;
       if (!idUser){
         htmlMain=<div class="text-center" style={{margin:"0 auto", paddingBottom:"30px", paddingTop:"20px"}}>
           <h3 className="text-center">Bạn chưa đăng nhập?</h3>
           <button class="btn btn-primary text-center" onClick={this.goLogin}>Đăng nhập</button>
         </div>
       } else {
         htmlMain=<div class="site-section">
         <div class="container submitFile">
             <h3 class="text-center">{getCurrentDay()}</h3>
             <h3 class="text-center" style={{color:'red'}}>{this.state.note}</h3>
             <div className="row" style={{ marginTop: "10px" }}>
               <div className="col-xs-3 col-sm-3 col-md-3 col-lg-3">
                 <h5>{this.state.submit.subject}</h5>
               </div>
             </div>
             {submitInfor}
             {notify}
             <div className="text-center" style={{marginTop:"15px"}}>
               <button className="btn btn-danger" onClick={this.getListFile}>XEM DANH SÁCH CÁC FILE ĐÃ NỘP</button>
               {this.state.htmlListFile}
             </div>
         </div>
       </div>
       }
        return(<div class="site-wrap">
        <Menu/>   
        <div class="intro-section single-cover" id="home-section">      
          <div class="slide-1 " style={{backgroundImage: "url('images/img_2.jpg')"}} data-stellar-background-ratio="0.5">
            <div class="container">
              <div class="row align-items-center">
                <div class="col-12">
                  <div class="row justify-content-center align-items-center text-center">
                    <div class="col-lg-6">
                      <h1 data-aos="fade-up" data-aos-delay="0">NỘP BÀI</h1>
                    </div>
               
                  </div>
                </div>           
              </div>
            </div>
          </div>
        </div>
          {htmlMain}
        <Footer/>
      </div>)
    }
}
ReactDOM.render(
    <div>
        <Submit/>
    </div>, document.getElementById('submit')
)