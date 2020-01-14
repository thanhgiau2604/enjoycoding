import React from 'react'
import ReactDOM from 'react-dom'
import Navbar from '../common/navbar'
import Sidebar from '../common/sidebar'
import Tool from '../common/tool'
import $ from 'jquery'
var main;

class Dashboard extends React.Component{
    constructor(props){
        super(props);
        main=this;
    }

    render(){
        return(<div id='content'>
        <div class='panel panel-default'>
          <div class='panel-heading'>
            <i class='icon-beer icon-large'></i>
            Dashboard!
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
          <div class='panel-body'>
            
            <div class='progress'>                
            </div>
              <div class='page-header'>
                <div class="row">
                  <div class="col-xs-10 col-sm-10 col-md-10 col-lg-10 col-md-push-1">
                    <div class="col-xs-5 col-sm-5 col-md-5 col-lg-5">
                      
                    </div>
                    <div class="col-xs-5 col-sm-5 col-md-5 col-lg-5">

                    </div>
                  </div>
                </div>
              </div>
          </div>
        </div>
      </div>)
    }
}
ReactDOM.render(
    <div>
        <Navbar/>
        <div id="wrapper">
            <Sidebar active={1}/>
            <Tool curpage="Dashboard"/>
            <Dashboard/>
        </div>
    </div>,document.getElementById("dashboard")
)