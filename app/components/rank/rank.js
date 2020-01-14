import React from 'react'
import ReactDOM from 'react-dom'
import Menu from '../common/menu'
import Footer from '../common/footer'
import $ from 'jquery'

class Contestant extends React.Component {
  constructor(props){
    super(props);
  }
  render(){
    return(
    <div class="candidates-item">
      <span class="circle-40 circle-blue">{this.props.stt}</span>
      <div class="candidates-info">
        <span class="class-students">{this.props.user.name} - 
          <span class="sub-txt">{this.props.user.score} <span>điểm</span></span>
        </span>
      </div>
    </div>)
  }
}
class Ranking extends React.Component{
    constructor(props){
        super(props);
        this.state = {
          listRanking:[]
        }
    }
    componentDidMount(){
      var that = this;
      $.post("/getRank",function(data){
        that.setState({listRanking:data});
      })
    }
    render(){
        return(<div class="site-wrap">
        <Menu/>   
        <div class="intro-section" id="home-section">      
          <div class="slide-1 " style={{backgroundImage: "url('images/img_2.jpg')"}} data-stellar-background-ratio="0.5">
            <div class="container">
              <div class="row align-items-center">
                <div class="col-12">
                  <div class="row justify-content-center align-items-center text-center">
                    <div class="col-lg-6">
                      <h1 data-aos="fade-up" data-aos-delay="0">BẢNG XẾP HẠNG</h1>
                    </div>
                    <div class="ioe-parent container" style={{paddingLeft:"35%"}}>
                      {this.state.listRanking.map(function(user,index){
                        return(<Contestant key={index} stt={index+1} user={user}/>)
                      })}
                    </div>
                  </div>
                </div>           
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
        <Ranking/>
    </div>, document.getElementById('rank')
)