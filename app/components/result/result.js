import React from 'react'
import ReactDOM from 'react-dom'
import Menu from '../common/menu'
import Footer from '../common/footer'
import $ from 'jquery'

var detail;
class ViewSingleResult extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      result: []
    }
    detail = this;
  }
  render(){
    return(<div class="container">
    <div class="modal fade" id="modalView" role="dialog">
      <div class="modal-dialog modal-lg">
        <div class="modal-content">
          <div class="modal-header">
            <h4 class="modal-title">CHI TIẾT</h4>
            <button type="button" class="close" data-dismiss="modal">&times;</button>
          </div>
          <div class="modal-body">
            <div class="row">
              <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12">
                <div class="form-group">
                  <label for="quanty">Danh sách kết quả bài làm:</label>
                  <table class='table table-hover'>
                    <thead>
                      <tr>
                        <th class="text-center">#</th>
                        <th class="text-center">Tên bài</th>
                        <th class="text-center">Điểm số</th>
                        <th class="text-center">Loại bài</th>
                        <th class="text-center">Đánh giá</th>
                      </tr>
                    </thead>
                    <tbody>
                      {this.state.result.map(function(exercise,index){
                        return(
                          <tr class='active' key={index}>
                            <td class="text-center">{index+1}</td>
                            <td class="text-center">{exercise.name}</td>
                            <td class="text-center">{exercise.score} điểm</td>
                            <td class="text-center">{exercise.typeExercise}</td>
                            <td class="text-center">{exercise.note}</td>
                          </tr>)
                      })}
                    </tbody>
                  </table>
                </div>  
              </div>
            </div>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
          </div>
        </div>
      </div>
    </div>
  </div>)
  }
}

class RowResult extends React.Component{
  constructor(props){
    super(props);
    this.viewDetail = this.viewDetail.bind(this);
  }
  viewDetail(){
    detail.setState({result:this.props.result.listExercise});
  }
  render(){
    var score= 0;
    if (this.props.result.listExercise){
      this.props.result.listExercise.forEach(element => {
        score+=element.score;
      });
    }
    return(<tr class='active'>
    <td class="text-center">{this.props.stt}</td>
    <td class="text-center">{this.props.result.day}</td>
    <td class="text-center">{this.props.result.listExercise.length}</td>
    <td class="text-center">{score}</td>
    <td class="text-center"><a class='btn btn-success btnDetail' data-toggle='tooltip' style={{ cursor: 'pointer' }} title='Chi tiết' data-toggle="modal"
      data-target="#modalView" onClick={this.viewDetail}>
      Xem chi tiết
    </a></td>
  </tr>)
  }
}
class Result extends React.Component{
    constructor(props){
        super(props);
        this.state = {
          listResult:[]
        }
    }
    componentDidMount(){
      var that = this;
      var id = localStorage.getItem("idUser");
      $.post("/getPersonalResult",{id:id},function(data){
        that.setState({listResult:data});
      });
    }
    render(){
        return(<div class="site-wrap">
        <Menu/>   
        <div class="intro-section single-cover" id="home-section">      
          <div class="slide-1 " style={{backgroundImage: "url('images/img_2.jpg')"}} data-stellar-background-ratio="0.5">
            <div class="container">
              <div class="row align-items-center">
                <div class="col-12">
                  <div class="row justify-content-center align-items-center text-center">
                    <div class="col-lg-6">
                      <h1 data-aos="fade-up" data-aos-delay="0">KẾT QUẢ BÀI LÀM</h1>
                    </div>
               
                  </div>
                </div>           
              </div>
            </div>
          </div>
        </div>
        <div class="site-section">
          <div class="container">
            <div class="row">
            <table class='table'>
            <thead>
              <tr>
                <th class="text-center">#</th>
                <th class="text-center">Ngày</th>
                <th class="text-center">Số bài tập hoàn thành</th>
                <th class="text-center">Tổng điểm</th>
                <th class='actions text-center'>
                  Thao tác
                </th>
              </tr>
            </thead>
            <tbody>
                {this.state.listResult.map(function(result,index){
                  return (<RowResult key={index} stt={index+1} result={result}/>)
                })}
            </tbody>
          </table>
            <ViewSingleResult/>
            </div>
          </div>
        </div>
        <Footer/>
      </div>)
    }
}
ReactDOM.render(
    <div>
        <Result/>
    </div>, document.getElementById('results')
)