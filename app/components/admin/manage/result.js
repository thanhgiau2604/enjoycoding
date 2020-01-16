import React from 'react'
import ReactDOM from 'react-dom'
import Navbar from '../common/navbar'
import Sidebar from '../common/sidebar'
import Tool from '../common/tool'
import $ from 'jquery'
var main,detail,evalua,edit;

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
            <h4 class="modal-title">DETAIL</h4>
            <button type="button" class="close" data-dismiss="modal">&times;</button>
          </div>
          <div class="modal-body">
            <div class="row">
              <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12">
                <div class="form-group">
                  <label for="quanty">The results of the exercies:</label>
                  <table class='table table-hover'>
                    <thead>
                      <tr>
                        <th class="text-center">#</th>
                        <th class="text-center">Name</th>
                        <th class="text-center">Score</th>
                        <th class="text-center">Comment</th>
                      </tr>
                    </thead>
                    <tbody>
                      {this.state.result.map(function(exercise,index){
                        return(
                          <tr class='active' key={index}>
                            <td class="text-center">{index+1}</td>
                            <td class="text-center">{exercise.name}</td>
                            <td class="text-center">{exercise.score} điểm</td>
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
class FormEvaluate extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      countItem:1,
      addSuccess:-1
    }
    this.submitForm = this.submitForm.bind(this);
    this.addExercise = this.addExercise.bind(this);
    this.add = this.add.bind(this);
    evalua = this;
  }
  submitForm(){
    var arrScore = []
    for(var i=0; i<this.state.countItem;i++){
      var item = {
        name: this.refs["name"+i].value,
        score: parseInt(this.refs["score"+i].value),
        note:this.refs["comment"+i].value
      }
      if (this.refs["name"+i].value&&this.refs["score"+i].value){
        arrScore.push(item);
      }
    }
    var idSubmit = localStorage.getItem("idSubmit");
    var user = localStorage.getItem("submitUser");
    var that = this;
    $.post("/addScore",{idSubmit:idSubmit,arrScore:JSON.stringify(arrScore),user:user},function(data){
      if (data=="ok"){
        $.get("/getListSubmit",function(data){
          main.setState({listResult:data});
          that.setState({addSuccess:1});
        });
      } else {
        that.setState({addSuccess:0})
      }
    })
  }
  addExercise(){
    this.setState({countItem:this.state.countItem+1});
  }
  add(e){
    if (e.key==="Enter"){
      this.setState({countItem:this.state.countItem+1});
    }
  }
  render(){
    var tableHtml = [];
    for (var i=0; i<this.state.countItem; i++){
      var item = <tr class='active' key={i}>
        <td class="text-center">{i + 1}</td>
        <td class="text-center"><input type="text" className="form-control" ref={"name"+i} onKeyPress={this.add}/></td>
        <td class="text-center"><input type="text" className="form-control" ref={"score"+i} onKeyPress={this.add}/></td>
        <td class="text-center"><input type="text" className="form-control" ref={"comment"+i} onKeyPress={this.add}/></td>
      </tr>
      tableHtml.push(item);
    }
    var notifyHtml = "";
    if (this.state.addSuccess==1){
      notifyHtml = 
        <div class="alert alert-success">
          <strong>Add Scores Successfully!</strong>
        </div>
    } else if (this.state.addSuccess==0){
      notifyHtml = 
        <div class="alert alert-danger">
          <strong>A error occurred. Please try it again!</strong>
        </div>
    }
    return(<div class="container">
    <div class="modal fade" id="modalEvaluate" role="dialog">
      <div class="modal-dialog modal-lg">
        <div class="modal-content">
          <div class="modal-header">
            <h4 class="modal-title">EVALUATING</h4>
            <button type="button" class="close" data-dismiss="modal">&times;</button>
          </div>
          <div class="modal-body">
            <div class="row">
              <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12">
                <div class="form-group">
                  <label for="quanty">Give a score and comment for a exercise:</label><br/>
                  <button className="btn btn-success" onClick={this.addExercise} style={{float:'right'}}>Add</button>
                  <table class='table table-hover'>
                    <thead>
                      <tr>
                        <th class="text-center">#</th>
                        <th class="text-center">Name</th>
                        <th class="text-center">Score</th>
                        <th class="text-center">Comment</th>
                      </tr>
                    </thead>
                    <tbody>
                      {tableHtml}
                    </tbody>
                  </table>
                </div>  
              </div>
            </div>
          </div>
          {notifyHtml}
          <div class="modal-footer">
            <button type="button" className="btn btn-danger" type="submit" onClick={this.submitForm}>Save</button>
            <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
          </div>
        </div>
      </div>
    </div>
  </div>)
  }
}
class FormEditEvaluate extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      listScore: [],
      countItem:0,
      updateSuccess:-1
    }
    this.submitForm = this.submitForm.bind(this);
    this.addExercise = this.addExercise.bind(this);
    this.add = this.add.bind(this);
    this.changeValue = this.changeValue.bind(this);
    edit = this;
  }
  submitForm(){
    var arrScore = []
    for(var i=0; i<this.state.countItem;i++){
      var item = {
        name: this.refs["name"+i].value,
        score: parseInt(this.refs["score"+i].value),
        note:this.refs["comment"+i].value
      }
      if (this.refs["name"+i].value&&this.refs["score"+i].value){
        arrScore.push(item);
      }
    }
    var idSubmit = localStorage.getItem("idSubmit");
    var user = localStorage.getItem("submitUser");
    var that = this;
    $.post("/addScore",{idSubmit:idSubmit,arrScore:JSON.stringify(arrScore),user:user},function(data){
      if (data=="ok"){
        $.get("/getListSubmit",function(data){
          main.setState({listResult:data});
          that.setState({updateSuccess:1});
        });
      } else {
        that.setState({updateSuccess:0})
      }
    })
  }
  addExercise(){
    this.setState({countItem:this.state.countItem+1});
  }
  add(e){
    if (e.key==="Enter"){
      this.setState({countItem:this.state.countItem+1});
    }
  }
  changeValue(e){
    if (this.state.updateSuccess!=-1){
      this.setState({updateSuccess:-1});
    }
  }
  render(){
    var tableHtml = [];
    if (this.state.listScore.length!=0){
      for (var i=0; i<this.state.listScore.length; i++){
        var item = <tr class='active' key={i}>
          <td class="text-center">{i + 1}</td>
          <td class="text-center"><input type="text" className="form-control" ref={"name"+i} onKeyPress={this.add} defaultValue={this.state.listScore[i].name} onChange={this.changeValue}/></td>
          <td class="text-center"><input type="text" className="form-control" ref={"score"+i} onKeyPress={this.add} defaultValue={this.state.listScore[i].score} onChange={this.changeValue}/></td>
          <td class="text-center"><input type="text" className="form-control" ref={"comment"+i} onKeyPress={this.add} defaultValue={this.state.listScore[i].note} onChange={this.changeValue}/></td>
        </tr>
        tableHtml.push(item);
      }
      for (var i=this.state.listScore.length; i<this.state.countItem; i++){
        var item = <tr class='active' key={i}>
          <td class="text-center">{i + 1}</td>
          <td class="text-center"><input type="text" className="form-control" ref={"name"+i} onKeyPress={this.add} onChange={this.changeValue}/></td>
          <td class="text-center"><input type="text" className="form-control" ref={"score"+i} onKeyPress={this.add} onChange={this.changeValue}/></td>
          <td class="text-center"><input type="text" className="form-control" ref={"comment"+i} onKeyPress={this.add} onChange={this.changeValue}/></td>
        </tr>
        tableHtml.push(item);
      }
    }
    
    var notifyHtml = "";
    if (this.state.updateSuccess==1){
      notifyHtml = 
        <div class="alert alert-success">
          <strong>Update Scores Successfully!</strong>
        </div>
    } else if (this.state.updateSuccess==0){
      notifyHtml = 
        <div class="alert alert-danger">
          <strong>A error occurred. Please try it again!</strong>
        </div>
    }
    return(<div class="container">
    <div class="modal fade" id="modalEditEvaluate" role="dialog">
      <div class="modal-dialog modal-lg">
        <div class="modal-content">
          <div class="modal-header">
            <h4 class="modal-title">UPDATE EVALUATING</h4>
            <button type="button" class="close" data-dismiss="modal">&times;</button>
          </div>
          <div class="modal-body">
            <div class="row">
              <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12">
                <div class="form-group">
                  <label for="quanty">Update scores:</label><br/>
                  <table class='table table-hover'>
                    <thead>
                      <tr>
                        <th class="text-center">#</th>
                        <th class="text-center">Name</th>
                        <th class="text-center">Score</th>
                        <th class="text-center">Comment</th>
                      </tr>
                    </thead>
                    <tbody>
                      {tableHtml}
                    </tbody>
                  </table>
                  <button className="btn btn-success" onClick={this.addExercise} style={{margin:"0 50%"}}>+</button>
                </div>  
              </div>
            </div>
          </div>
          {notifyHtml}
          <div class="modal-footer">
            <button type="button" className="btn btn-danger" type="submit" onClick={this.submitForm}>Save</button>
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
    this.evaluate = this.evaluate.bind(this);
    this.editScore = this.editScore.bind(this);
  }
  viewDetail(){
    if (this.props.result.listScore){
      detail.setState({result:this.props.result.listScore});
    } else {
      detail.setState({result:[]});
    }
  }
  evaluate(){
    localStorage.setItem("idSubmit",this.props.result._id);
    localStorage.setItem("submitUser",this.props.result.user);
  }
  editScore(){
    localStorage.setItem("idSubmit",this.props.result._id);
    localStorage.setItem("submitUser",this.props.result.user);
    edit.setState({listScore:this.props.result.listScore, countItem:this.props.result.listScore.length});
  }
  render(){
    var score=0;
    if (this.props.result.listScore){
      this.props.result.listScore.forEach(element => {
        score+=element.score;
      });
    }
    return(<tr class='active'>
    <td class="text-center">{this.props.stt}</td>
    <td class="text-center">{this.props.result.name}</td>
    <td class="text-center">{this.props.result.time}</td>
    <td class="text-center">{score}</td>
    <td class='action text-center'>
    <a data-toggle="modal" data-target="#modalEvaluate"  class="btn btn-warning btnAction" title='Evaluate' onClick={this.evaluate}><i class='icon-check'></i></a>
      <a data-toggle="modal" data-target="#modalView"  class="btn btn-primary btnAction" title='View results' onClick={this.viewDetail} style={{cursor:'pointer', marginLeft:"5px"}}><i class='icon-zoom-in'></i></a>
      <a class='btn btn-info'data-toggle="modal" data-target="#modalEditEvaluate"  style={{cursor:'pointer', marginLeft:"5px"}} title='Edit Score' onClick={this.editScore}>
        <i class='icon-edit'></i>
      </a>
    </td>
  </tr>)
  }
}
class Result extends React.Component{
    constructor(props){
        super(props);
        main=this;
        this.state = {
          listResult:[]
        }
    }
    componentDidMount(){
      var that = this;
      $.get("/getListSubmit",function(data){
        that.setState({listResult:data});
      });
    }
    render(){
        return(<div id='content'>
        <div class='panel panel-default'>
          <div class='panel-heading'>
            <i class='icon-beer icon-large'></i>
            Result
            <div class='panel-tools'>
              <div class='btn-group'>
                <a class='btn' href='#'>
                </a>
                <a class='btn' data-toggle='toolbar-tooltip' href='#' title='Toggle'>
                  <i class='icon-chevron-down'></i>
                </a>
              </div>
            </div>
          </div>
          <div class='panel-body filters'>
          <div class="row">
            <h3 class="text-center"><b>RESULTS</b></h3>
          </div>
          <div class='row'>
            <div class='col-md-9'>
            </div>
            <div class='col-md-3'>
            </div>
            <div class="text-right" style={{ marginTop: '50px', paddingRight: '10%' }}>
            </div>
          </div>
        </div>
        <table class='table'>
            <thead>
              <tr>
                <th class="text-center">#</th>
                <th class="text-center">Tên bài bài</th>
                <th class="text-center">Thời gian</th>
                <th class="text-center">Tổng điểm đạt được</th>
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
          <FormEvaluate/>
          <FormEditEvaluate/>
        </div>
      </div>)
    }
}
ReactDOM.render(
    <div>
        <Navbar/>
        <div id="wrapper">
            <Sidebar active={4}/>
            <Tool curpage="Result"/>
            <Result/>
        </div>
    </div>,document.getElementById("manageResult")
)