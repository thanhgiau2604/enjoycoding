import React from 'react'
import ReactDOM from 'react-dom'
import Navbar from '../common/navbar'
import Sidebar from '../common/sidebar'
import Tool from '../common/tool'
import $ from 'jquery'
var view,edit,main;
class SingleDeadline extends React.Component {
  constructor(props){
    super(props);
    this.editDeadline = this.editDeadline.bind(this);
    this.viewSubmit = this.viewSubmit.bind(this);
    this.onDeadline = this.onDeadline.bind(this);
    this.offDeadline = this.offDeadline.bind(this);
    this.state = {
      on: this.props.status
    }
  }
  viewSubmit(){
    $.post("/getListSubmits",{id:this.props.id},function(data){
      view.setState({curDeadline:data,listFile:data.listSubmit});
    })
  }
  editDeadline(){
    $.post("/getListSubmits",{id:this.props.id},function(data){
      edit.setState({curDeadline:data});
    })
  }
  onDeadline(){
    var that = this;
    $.post("/onDeadline",{id:this.props.id},function(data){
      that.setState({on:1});
    })
  }
  offDeadline(){
    var that = this;
    $.post("/offDeadline",{id:this.props.id},function(data){
      that.setState({on:0});
    })
  }
  render(){
    var status;
    if (this.state.on==0){
      status=<button className="btn btn-danger" onClick={this.onDeadline}>OFF</button>
    } else {
      status=<button className="btn btn-success" onClick={this.offDeadline}>ON</button>
    }
    return(<tr class='active'>
    <td class="text-center">{this.props.stt}</td>
    <td class="text-center">{this.props.subject}</td>
    <td class="text-center">{this.props.description}</td>
    <td class="text-center">{this.props.deadline}</td>
    <td class="text-center">{status}</td>
    <td class='action text-center'>
      <a data-toggle="modal" data-target="#modalView"  class="btn btn-primary btnAction" title='View list submits' onClick={this.viewSubmit}><i class='icon-zoom-in'></i></a>
      <a class='btn btn-info'data-toggle="modal" data-target="#modalEdit"  style={{cursor:'pointer', marginLeft:"7px"}} title='Edit' onClick={this.editDeadline}>
        <i class='icon-edit'></i>
      </a>
    </td>
  </tr>)
  }
}

class ViewDeadline extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      curDeadline:{},
      listFile: []
    }
    view = this;
  }
  render(){
    return(<div class="container">
    <div class="modal fade" id="modalView" role="dialog">
      <div class="modal-dialog modal-lg">
        <div class="modal-content">
          <div class="modal-header">
            <button type="button" class="close" data-dismiss="modal">&times;</button>
            <h4 class="modal-title">List submits</h4>
          </div>
          <div class="modal-body">
            <div class="row">
              <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12">
                <div class="form-group">
                  <label for="quanty">List product:</label>
                    <table class='table table-hover'>
                      <thead>
                        <tr>
                          <th class="text-center">#</th>
                          <th class="text-center">Tên file</th>
                          <th class="text-center">Thời gian nộp</th>
                          <th class="text-center">Download</th>
                        </tr>
                      </thead>
                      <tbody>
                        {this.state.listFile.map(function (file, index) {
                          return (
                            <tr class='active' key={index}>
                              <td class="text-center">{index + 1}</td>
                              <td class="text-center">{file.name}</td>
                              <td class="text-center">{file.time}</td>
                              <td class="text-center"><a href={file.url}>Click để download</a></td>
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
class EditDeadline extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      curDeadline:{},
      updateSuccess: 0
    }
    this.updateInfor = this.updateInfor.bind(this);
    edit = this;
  }
  updateInfor(){
    const deadline = this.refs.deadline.value;
    const subject = this.refs.subject.value;
    const description = this.refs.description.value;
    var that = this;
    $.post("/updateDeadline",{id:that.state.curDeadline._id,deadline:deadline,subject:subject,description:description},function(data){
      if (data.success==1){
        that.setState({updateSuccess:1});
        $.get("/listDeadline",function(data){
          main.setState({listDeadline:data});
        })
      }
    })
  }
  render(){
    var notifyUpdateSuccess = "";
    if (this.state.updateSuccess==1){
      notifyUpdateSuccess = 
        <div class="alert alert-success">
          <strong>Update Deadline Successfully!</strong>
        </div>
      }
    return(<div class="container">
    <div class="modal fade" id="modalEdit" role="dialog">
      <div class="modal-dialog modal-lg">
        <div class="modal-content">
          <div class="modal-header">
            <button type="button" class="close" data-dismiss="modal">&times;</button>
            <h4 class="modal-title">EDIT DEADLINE</h4>
          </div>
          <div class="modal-body">
              <div class="row">
                <div class="col-xs-6 col-sm-6 col-md-6 col-lg-6">
                  <div class="form-group">
                    <label for="email">Deadline:</label>
                    <input type="text" class="form-control" defaultValue={this.state.curDeadline.end} ref="deadline"/>
                  </div>
                </div>
              </div>
              <div class="row">
                <div class="col-xs-10 col-sm-10 col-md-10 col-lg-10">
                  <div class="form-group">
                    <label for="email">Subject:</label>
                    <input type="text" class="form-control" defaultValue={this.state.curDeadline.subject} ref="subject"/>
                  </div>
                </div>
              </div>
              <div class="row">
                <div class="col-xs-10 col-sm-10 col-md-10 col-lg-10">
                  <div class="form-group">
                    <label for="email">Description:</label>
                    <input type="text" class="form-control" defaultValue={this.state.curDeadline.description} ref="description"/>
                  </div>
                </div>
              </div>
          </div>
          {notifyUpdateSuccess}
          <div class="modal-footer">
            <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
            <button type="button" className="btn btn-danger" type="submit" onClick={this.updateInfor}>Save</button>
          </div>
        </div>
      </div>
    </div>
  </div>)
  }
}
class NewDeadline extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      addSuccess: 0
    }
    this.saveInfor = this.saveInfor.bind(this);
  }
  saveInfor(){
    const deadline = this.refs.deadline.value;
    const subject = this.refs.subject.value;
    const description = this.refs.description.value;
    var that = this;
    $.post("/newDeadline",{deadline:deadline,subject:subject,description:description},function(data){
      if (data.success==1){
        that.setState({addSuccess:1});
        $.get("/listDeadline",function(data){
          main.setState({listDeadline:data});
        })
      }
    })
  }
  render(){
    var notifAddSuccess = "";
    if (this.state.addSuccess==1){
      notifAddSuccess = 
        <div class="alert alert-success">
          <strong>Add Deadline Successfully!</strong>
        </div>
      }
    return(<div class="container">
    <div class="modal fade" id="modalNew" role="dialog">
      <div class="modal-dialog modal-lg">
        <div class="modal-content">
          <div class="modal-header">
            <button type="button" class="close" data-dismiss="modal">&times;</button>
            <h4 class="modal-title">NEW DEADLINE</h4>
          </div>
          <div class="modal-body">
              <div class="row">
                <div class="col-xs-6 col-sm-6 col-md-6 col-lg-6">
                  <div class="form-group">
                    <label for="email">Deadline:</label>
                    <input type="text" class="form-control" ref="deadline"/>
                  </div>
                </div>
              </div>
              <div class="row">
                <div class="col-xs-10 col-sm-10 col-md-10 col-lg-10">
                  <div class="form-group">
                    <label for="email">Subject:</label>
                    <input type="text" class="form-control"  ref="subject"/>
                  </div>
                </div>
              </div>
              <div class="row">
                <div class="col-xs-10 col-sm-10 col-md-10 col-lg-10">
                  <div class="form-group">
                    <label for="email">Description:</label>
                    <input type="text" class="form-control"  ref="description"/>
                  </div>
                </div>
              </div>
          </div>
          {notifAddSuccess}
          <div class="modal-footer">
            <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
            <button type="button" className="btn btn-danger" type="submit" onClick={this.saveInfor}>Save</button>
          </div>
        </div>
      </div>
    </div>
  </div>)
  }
}
class Deadline extends React.Component{
    constructor(props){
        super(props);
        main=this;
        this.state = {
          listDeadline:[]
        }
    }
    componentDidMount(){
      var that = this;
      $.get("/listDeadline",function(data){
        that.setState({listDeadline:data});
      })
    }
    render(){
        return(<div id='content'>
        <div class='panel panel-default'>
          <div class='panel-heading'>
            <i class='icon-beer icon-large'></i>
            Deadline
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
            <h3 class="text-center"><b>LIST DEADLINES</b></h3>
          </div>
          <div class='row'>
            <div class='col-md-9'>
            </div>
            <div class='col-md-3'>
            </div>
            <div class="text-right" style={{ marginTop: '50px', paddingRight: '10%' }}>
              <button class="btn btn-warning" data-toggle="modal" data-target="#modalNew">
                <i class="icon-plus-sign"></i>New Deadline
                </button>
            </div>
          </div>
        </div>
        <table class='table table-hover'>
          <thead>
            <tr>
              <th class="text-center">#</th>
              <th class="text-center">Subject</th>
              <th class="text-center">Description</th>
              <th class="text-center">Deadline</th>
              <th class="text-center">Status</th>
              <th class='actions text-center'>
                Actions
                </th>
            </tr>
          </thead>
          <tbody>
            {this.state.listDeadline.map(function (dea, index) {
              return <SingleDeadline key={index} stt={index+1} subject={dea.subject} 
              description={dea.description} deadline={dea.deadline} status={dea.status} id={dea._id}/>
            })}
          </tbody>
        </table>
        <ViewDeadline/>
        <EditDeadline/>
        <NewDeadline/>
        </div>
      </div>)
    }
}
ReactDOM.render(
    <div>
        <Navbar/>
        <div id="wrapper">
            <Sidebar active={3}/>
            <Tool curpage="Deadline"/>
            <Deadline/>
        </div>
    </div>,document.getElementById("deadline")
)