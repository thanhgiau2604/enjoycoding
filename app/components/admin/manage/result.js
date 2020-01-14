import React from 'react'
import ReactDOM from 'react-dom'
import Navbar from '../common/navbar'
import Sidebar from '../common/sidebar'
import Tool from '../common/tool'
import $ from 'jquery'
var main;

class ViewResult extends React.Component{
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
class Result extends React.Component{
    constructor(props){
        super(props);
        main=this;
        this.state = {
          listResult:[]
        }
    }
    // componentDidMount(){
    //   var that = this;
    //   $.get("/listDeadline",function(data){
    //     that.setState({listDeadline:data});
    //   })
    // }
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
        {/* <table class='table table-hover'>
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
              description={dea.description} deadline={dea.deadline} status={dea.status}/>
            })}
          </tbody>
        </table> */}
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
    </div>,document.getElementById("result")
)