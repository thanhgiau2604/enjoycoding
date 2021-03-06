import React from 'react'
class Navbar extends React.Component{
    constructor(props){
        super(props);
        this.handleSignOut = this.handleSignOut.bind(this);
        this.goMessage = this.goMessage.bind(this);
    }
    componentDidMount(){
        var idAdmin = localStorage.getItem("idAdmin");
        if (!idAdmin){
            window.location.replace("/");
        }
    }
    handleSignOut(){
        localStorage.removeItem("idAdmin");
        localStorage.removeItem("name");
        window.location.assign("/");
    }
    goMessage(){
        
    }
    render(){
        return (<div class='navbar navbar-default' id='navbar'>
            <a class='navbar-brand' href='/dashboard'>
                <h3>EnjoyCoding</h3>
            </a>
            <ul class='nav navbar-nav pull-right'>
                <li class='dropdown'>
                    <a style={{cursor:'pointer'}} onClick={this.goMessage}>
                        <i class='icon-envelope'></i>
                        Messages
                    </a>
                </li>
                <li class='dropdown user'>
                    <a class='dropdown-toggle' data-toggle='dropdown' href='#'>
                        <i class='icon-user'></i>
                        <strong>{localStorage.getItem('name')}</strong>
                        <b class='caret'></b>
                    </a>
                    <ul class='dropdown-menu'>
                        <li class='divider'></li>
                        <li>
                            <a onClick={this.handleSignOut} style={{cursor:'pointer'}}>Sign out</a>
                        </li>
                    </ul>
                </li>
            </ul>
        </div>)
    }
}
export default Navbar;