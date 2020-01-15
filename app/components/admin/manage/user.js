import React from 'react'
import ReactDOM from 'react-dom'
import Navbar from '../common/navbar'
import Sidebar from '../common/sidebar'
import Tool from '../common/tool'
import $ from 'jquery'
var main,edit;
class SingleUser extends React.Component {
  constructor(props){
    super(props);
    this.editUser = this.editUser.bind(this);
    this.deleteUser = this.deleteUser.bind(this);
  }

  editUser(){
    $.post("/getUser",{id:this.props.user._id},function(data){
      edit.setState({curUser:data});
    })
  }
  deleteUser(){
    $.post("/deleteUser",{id:this.props.user._id},function(data){
      if (data.success==1){
        $.get("/listUser",function(data){
          main.setState({listUser:data});
        })
      }
    })
  }
  render(){
    var statusUser;
    if (this.props.user.isDelete==1){
      statusUser = 'Deleted'
    } else {
      statusUser = "Active"
    }
    return(<tr class='active'>
    <td class="text-center">{this.props.stt}</td>
    <td class="text-center">{this.props.user.id}</td>
    <td class="text-center">{this.props.user.name}</td>
    <td class="text-center">{this.props.user.score}</td>
    <td class="text-center">{statusUser}</td>
    <td class='action text-center'>
      <a class='btn btn-info' data-toggle="modal" data-target="#modalEdit" style={{cursor:'pointer', marginLeft:"7px"}} title='Edit' onClick={this.editUser}>
        <i class='icon-edit'></i>
      </a>
        <a class='btn btn-danger'  style={{ cursor: 'pointer', marginLeft: '3px' }} title='Delete' onClick={this.deleteUser}>
          <i class='icon-trash'></i>
        </a>
    </td>
  </tr> )
  }
}

class EditUser extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      curUser:{},
      updateSuccess: 0
    }
    this.updateInfor = this.updateInfor.bind(this);
    edit = this;
  }
  updateInfor(){
    const id = this.refs.id.value;
    const name = this.refs.name.value;
    var that = this;
    $.post("/updateUser",{_id:that.state.curUser._id,id:id,name:name},function(data){
      if (data.success==1){
        that.setState({updateSuccess:1});
        $.get("/listUser",function(data){
          main.setState({listUser:data});
        })
      }
    })
  }
  render(){
    var notifyUpdateSuccess = "";
    if (this.state.updateSuccess==1){
      notifyUpdateSuccess = 
        <div class="alert alert-success">
          <strong>Update User Successfully!</strong>
        </div>
      }
    return(<div class="container">
    <div class="modal fade" id="modalEdit" role="dialog">
      <div class="modal-dialog modal-lg">
        <div class="modal-content">
          <div class="modal-header">
            <button type="button" class="close" data-dismiss="modal">&times;</button>
            <h4 class="modal-title">EDIT USER</h4>
          </div>
          <div class="modal-body">
              <div class="row">
                <div class="col-xs-6 col-sm-6 col-md-6 col-lg-6">
                  <div class="form-group">
                    <label for="email">ID:</label>
                    <input type="text" class="form-control" defaultValue={this.state.curUser.id} ref="id"/>
                  </div>
                </div>
              </div>
              <div class="row">
                <div class="col-xs-10 col-sm-10 col-md-10 col-lg-10">
                  <div class="form-group">
                    <label for="email">Name:</label>
                    <input type="text" class="form-control" defaultValue={this.state.curUser.name} ref="name"/>
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
class AddUser extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      addSuccess: 0,
      err:""
    }
    this.saveInfor = this.saveInfor.bind(this);
  }
  saveInfor(){
    const id = this.refs.id.value;
    const name = this.refs.name.value;
    const password = this.refs.password.value;
    var that = this;
    $.post("/saveUser",{id:id,name:name,password:password},function(data){
      if (data.success==1){
        that.setState({addSuccess:1,err:""});
        $.get("/listUser",function(data){
          main.setState({listUser:data});
        })
      } else {
        that.setState({err:data.err});
      }
    })
  }
  render(){
    var notifyAddSuccess = "";
    if (this.state.addSuccess==1){
      notifyAddSuccess = 
        <div class="alert alert-success">
          <strong>Add User Successfully!</strong>
        </div>
      }
    return(<div class="container">
    <div class="modal fade" id="modalNew" role="dialog">
      <div class="modal-dialog modal-lg">
        <div class="modal-content">
          <div class="modal-header">
            <button type="button" class="close" data-dismiss="modal">&times;</button>
            <h4 class="modal-title">ADD USER</h4>
          </div>
          <div class="modal-body">
              <div class="row">
                <div class="col-xs-6 col-sm-6 col-md-6 col-lg-6">
                  <div class="form-group">
                    <label for="email">ID:</label>
                    <input type="text" class="form-control"  ref="id" required/>
                  </div>
                </div>
              </div>
              <div class="row">
                <div class="col-xs-10 col-sm-10 col-md-10 col-lg-10">
                  <div class="form-group">
                    <label for="email">Name:</label>
                    <input type="text" class="form-control" ref="name" required/>
                  </div>
                </div>
              </div>
              <div class="row">
                <div class="col-xs-10 col-sm-10 col-md-10 col-lg-10">
                  <div class="form-group">
                    <label for="email">Password:</label>
                    <input type="password" class="form-control" ref="password" required/>
                  </div>
                </div>
              </div>
          </div>
          {notifyAddSuccess}
          <div class="alert alert-danger">
          <strong>{this.state.err}</strong>
        </div>
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
class ManageUser extends React.Component{
    constructor(props){
        super(props);
        main=this;
        this.state = {
          listUser:[]
        }
    }
    componentDidMount(){
      var that = this;
      $.get("/listUser",function(data){
        that.setState({listUser:data});
      })
    }
    render(){
        return(<div id='content'>
        <div class='panel panel-default'>
          <div class='panel-heading'>
            <i class='icon-beer icon-large'></i>
            Users
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
            <h3 class="text-center"><b>LIST USERS</b></h3>
          </div>
          <div class='row'>
            <div class='col-md-9'>
            </div>
            <div class='col-md-3'>
            </div>
                <div class="text-right" style={{ marginTop: '50px', paddingRight: '10%' }}>
                  <button class="btn btn-primary" data-toggle="modal" data-target="#modalNew">
                    <i class="icon-plus-sign"></i>New User
                </button>
                </div>
          </div>
        </div>
        <table class='table table-hover'>
          <thead>
            <tr>
              <th class="text-center">#</th>
              <th class="text-center">ID</th>
              <th class="text-center">Name</th>
              <th class="text-center">Score</th>
              <th class="text-center">Status</th>
              <th class='actions text-center'>
                Actions
                </th>
            </tr>
          </thead>
          <tbody>
            {this.state.listUser.map(function (user, index) {
              return <SingleUser key={index} stt={index+1} user={user}/>
            })}
          </tbody>
        </table>
        <EditUser/>
        <AddUser/>
        </div>
      </div>)
    }
}
ReactDOM.render(
    <div>
        <Navbar/>
        <div id="wrapper">
            <Sidebar active={2}/>
            <Tool curpage="Users"/>
            <ManageUser/>
        </div>
    </div>,document.getElementById("users")
)