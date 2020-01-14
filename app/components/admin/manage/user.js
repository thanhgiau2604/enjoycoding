import React from 'react'
import ReactDOM from 'react-dom'
import Navbar from '../common/navbar'
import Sidebar from '../common/sidebar'
import Tool from '../common/tool'
import $ from 'jquery'
var main;
class SingleUser extends React.Component {
  constructor(props){
    super(props);
    this.editUser = this.editUser.bind(this);
    this.deleteUser = this.deleteUser.bind(this);
  }

  editUser(){
    
  }
  deleteUser(){

  }
  render(){
    return(<tr class='active'>
    <td class="text-center">{this.props.stt}</td>
    <td class="text-center">{this.props.user.id}</td>
    <td class="text-center">{this.props.user.name}</td>
    <td class="text-center">{this.props.user.score}</td>
    <td class='action text-center'>
      <a class='btn btn-info' data-toggle='tooltip' style={{cursor:'pointer', marginLeft:"7px"}} title='Edit' onClick={this.editUser}>
        <i class='icon-edit'></i>
      </a>
        <a class='btn btn-danger' data-toggle='tooltip' style={{ cursor: 'pointer', marginLeft: '3px' }} title='Delete' onClick={this.deleteUser}>
          <i class='icon-trash'></i>
        </a>
    </td>
  </tr> )
  }
}

class UpdateUser extends React.Component{
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