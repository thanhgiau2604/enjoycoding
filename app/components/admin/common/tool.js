import React from 'react'

class Tool extends React.Component{
    constructor(props){
        super(props);
    }
    render(){
        return(<section id='tools'>
        <ul class='breadcrumb' id='breadcrumb'>
          <li class='title'>{this.props.curpage}</li>
        </ul>
        <div id='toolbar'>
        </div>
      </section>)
    }
}
export default Tool;