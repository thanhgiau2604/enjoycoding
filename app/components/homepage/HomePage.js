import React from 'react'
import ReactDOM from 'react-dom'
import Menu from '../common/menu'
import Footer from '../common/footer'
import $ from 'jquery'
var main;
class LoginForm extends React.Component{
    constructor(props){
        super(props);
        this.handleLogin = this.handleLogin.bind(this);
        this.state = {
          err:""
        }
    }
    handleLogin(e){
      const id = this.id.value;
      const password = this.password.value;
      var that = this;
      $.post("/login",{id:id,password:password},function(data){
        console.log(data);
        if (data.success!=1){
          that.setState({err:data});
        } else {
          localStorage.setItem("idUser",data.user.id);
          localStorage.setItem("name",data.user.name);
          main.setState({form:<InforForm/>})
        }
      })
      e.preventDefault();
    }
    render(){
        return(<form class="form-box" onSubmit={this.handleLogin}>
        <h3 class="h4 text-black mb-4">ĐĂNG NHẬP</h3>
        <div class="form-group">
          <input type="text" class="form-control" placeholder="Nhập ID" required ref={(data) => { this.id = data; }}/>
        </div>
        <div class="form-group">
          <input type="password" class="form-control" placeholder="Nhập mật khẩu" required ref={(data) => { this.password = data; }}/>
        </div>
        <h4 style={{color:'red'}}>{this.state.err}</h4>
        <div class="form-group">
          <input type="submit" class="btn btn-primary btn-pill" value="Đăng nhập"/>
        </div>
      </form>)
    }
}
class InforForm extends React.Component{
    constructor(props){
        super(props);
        this.state = {
          user:{}
        }
        this.logOut = this.logOut.bind(this);
    }
    componentDidMount(){
      var that = this;
      $.post("/getInformation",{id:localStorage.getItem("idUser")},function(data){
        that.setState({user:data});
      });
    }
    logOut(){
      localStorage.removeItem("idUser");
      localStorage.removeItem("name");
      main.setState({form:<LoginForm/>})
    }
    render(){
        return (<form class="form-box">
            <h3 class="h4 text-black mb-4">THÔNG TIN CÁ NHÂN</h3>
            <div class="form-group">
                <label>Id: </label>
                <span style={{paddingLeft:'3px',color:'blue',fontWeight:'700'}}>{this.state.user.id}</span>
            </div>
            <div class="form-group">
                <label>Họ tên: </label>
                <span style={{paddingLeft:'3px',color:'blue',fontWeight:'700'}}>{this.state.user.name}</span>
            </div>
            <div class="form-group">
                <label>Điểm tích lũy: </label>
                <span style={{paddingLeft:'3px',color:'blue',fontWeight:'700'}}>{this.state.user.score}</span>
            </div>
            <div class="form-group text-center">
                <button className="btn btn-danger" onClick={this.logOut}>Đăng xuất</button>
            </div>
        </form>)
    }
}
class HomePage extends React.Component{
    constructor(props){
        super(props);
        this.state = {
          form: <LoginForm/>
        }
        main = this;
    }
    componentDidMount(){
      const idUser = localStorage.getItem("idUser");
      if (!idUser){
        this.setState({form:<LoginForm/>})
      } else {
        this.setState({form:<InforForm/>})
      }
    }
    render(){
        
        return(<div class="site-wrap">
        <Menu/>
        <div class="intro-section" id="home-section"> 
          <div class="slide-1" style={{backgroundImage: "url('images/hero_1.jpg')"}} data-stellar-background-ratio="0.5">
            <div class="container">
              <div class="row align-items-center">
                <div class="col-12">
                  <div class="row align-items-center">
                    <div class="col-lg-6 mb-4">
                      <h1 data-aos="fade-up" data-aos-delay="100">VUI HỌC LẬP TRÌNH</h1>
                    </div>
                    <div class="col-lg-5 ml-auto" data-aos="fade-up" data-aos-delay="500">
                      {this.state.form}
                    </div>
                  </div>
                </div>   
              </div>
            </div>
          </div>
        </div>

        <div class="site-section courses-title" id="courses-section">
          <div class="container">
            <div class="row mb-5 justify-content-center">
              <div class="col-lg-7 text-center" data-aos="fade-up" data-aos-delay="">
                <h2 class="section-title">CHỨC NĂNG</h2>
              </div>
            </div>
          </div>
        </div>
        <div class="site-section courses-entry-wrap" data-aos="fade-up" data-aos-delay="100">
          <div class="container">
            <div class="row">
    
              <div class="owl-carousel col-12 nonloop-block-14">
    
                <div class="course bg-white h-100 align-self-stretch">
                  <figure class="m-0">
                    <a href="course-single.html"><img src="images/img_1.jpg" alt="Image" class="img-fluid"/></a>
                  </figure>
                  <div class="course-inner-text py-4 px-4">
                    <span class="course-price">1</span>
                    <h3><a href="#">Nộp bài tập</a></h3>
                    <p>Nộp bài tập cho người quản trị, xem xét và đánh giá. Bài tập sẽ được gửi qua Google Drive</p>
                  </div>
                </div>
    
                <div class="course bg-white h-100 align-self-stretch">
                  <figure class="m-0">
                    <a href="course-single.html"><img src="images/img_2.jpg" alt="Image" class="img-fluid"/></a>
                  </figure>
                  <div class="course-inner-text py-4 px-4">
                    <span class="course-price">2</span>
                    <h3><a href="#">Xem đánh giá</a></h3>
                    <p>Xem được chi tiết việc đánh giá bài tập cũng như điểm số mà bạn đã nộp cho người quản trị. </p>
                  </div>
                </div>
    
                <div class="course bg-white h-100 align-self-stretch">
                  <figure class="m-0">
                    <a href="course-single.html"><img src="images/img_3.jpg" alt="Image" class="img-fluid"/></a>
                  </figure>
                  <div class="course-inner-text py-4 px-4">
                    <span class="course-price">3</span>
                    <h3><a href="#">Tích lũy điểm</a></h3>
                    <p>Với mỗi bài tập hoàn thành, bạn sẽ nhận được số điểm tương ứng với bài tập đó</p>
                  </div>
                </div>
    
    
    
                <div class="course bg-white h-100 align-self-stretch">
                  <figure class="m-0">
                    <a href="course-single.html"><img src="images/img_4.jpg" alt="Image" class="img-fluid"/></a>
                  </figure>
                  <div class="course-inner-text py-4 px-4">
                    <span class="course-price">4</span>
                    <h3><a href="#">Xem bảng xếp hạng</a></h3>
                    <p>Xem được thứ hạng của bạn và các thành viên khác trong quá trình tích lũy điểm số</p>
                  </div>
                </div>
              </div>
        
            </div>
            <div class="row justify-content-center">
              <div class="col-7 text-center">
                <button class="customPrevBtn btn btn-primary m-1">Trước</button>
                <button class="customNextBtn btn btn-primary m-1">Kế</button>
              </div>
            </div>
          </div>
        </div>
      
        <div class="site-section pb-0">
    
          <div class="future-blobs">
            <div class="blob_2">
              <img src="images/blob_2.svg" alt="Image"/>
            </div>
            <div class="blob_1">
              <img src="images/blob_1.svg" alt="Image"/>
            </div>
          </div>
          <div class="container">
            <div class="row mb-5 justify-content-center" data-aos="fade-up" data-aos-delay="">
              <div class="col-lg-7 text-center">
                <h2 class="section-title">Một số quy định chung</h2>
              </div>
            </div>
            <div class="row">
              <div class="col-lg-4 ml-auto align-self-start" data-aos="fade-up" data-aos-delay="100">
    
                <div class="p-4 rounded bg-white why-choose-us-box">
    
                  <div class="d-flex align-items-center custom-icon-wrap custom-icon-light mb-3">
                    <div class="mr-3"><span class="custom-icon-inner"><span class="icon icon-graduation-cap"></span></span>
                    </div>
                    <div>
                      <h3 class="m-0">Nộp bài phải nén folder lại (ZIP/RAR)</h3>
                    </div>
                  </div>
    
                  <div class="d-flex align-items-center custom-icon-wrap custom-icon-light mb-3">
                    <div class="mr-3"><span class="custom-icon-inner"><span class="icon icon-university"></span></span>
                    </div>
                    <div>
                      <h3 class="m-0">Đặt tên theo đúng quy định</h3>
                    </div>
                  </div>
    
                  <div class="d-flex align-items-center custom-icon-wrap custom-icon-light mb-3">
                    <div class="mr-3"><span class="custom-icon-inner"><span class="icon icon-graduation-cap"></span></span>
                    </div>
                    <div>
                      <h3 class="m-0">Bài tập thực hành: deadline 17h15 cùng ngày </h3>
                    </div>
                  </div>
    
                  <div class="d-flex align-items-center custom-icon-wrap custom-icon-light mb-3">
                    <div class="mr-3"><span class="custom-icon-inner"><span class="icon icon-university"></span></span>
                    </div>
                    <div>
                      <h3 class="m-0">Bài tập về nhà: deadline 10h30 ngày hôm sau</h3>
                    </div>
                  </div>
    
                  <div class="d-flex align-items-center custom-icon-wrap custom-icon-light mb-3">
                    <div class="mr-3"><span class="custom-icon-inner"><span class="icon icon-graduation-cap"></span></span>
                    </div>
                    <div>
                      <h3 class="m-0">Hết hạn nộp bài, không thể nộp bài</h3>
                    </div>
                  </div>
    
                  <div class="d-flex align-items-center custom-icon-wrap custom-icon-light">
                    <div class="mr-3"><span class="custom-icon-inner"><span class="icon icon-university"></span></span>
                    </div>
                    <div>
                      <h3 class="m-0">GOOD LUCK!!!</h3>
                    </div>
                  </div>
    
                </div>
              </div>
              <div class="col-lg-7 align-self-end" data-aos="fade-left" data-aos-delay="200">
                <img src="images/person_transparent.png" alt="Image" class="img-fluid"/>
              </div>
            </div>
          </div>
        </div>
        <Footer/>
      </div>)
    }
}
ReactDOM.render(
    <div>
        <HomePage/>
    </div>, document.getElementById('homepage')
)