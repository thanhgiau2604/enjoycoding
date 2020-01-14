import React from 'react'

class Menu extends React.Component{
    constructor(props){
        super(props);
    }
    render(){
        const idUser = localStorage.getItem("idUser");
        var btnInfor="";
        if (idUser){
          btnInfor = <li class="cta"><a class="nav-link"><span>Hello {localStorage.getItem('name')}</span></a></li>
        }
        return(<div>
            <div class="site-mobile-menu site-navbar-target">
              <div class="site-mobile-menu-header">
                <div class="site-mobile-menu-close mt-3">
                  <span class="icon-close2 js-menu-toggle"></span>
                </div>
              </div>
              <div class="site-mobile-menu-body"></div>
            </div>
            <header class="site-navbar py-4 js-sticky-header site-navbar-target" role="banner">
              <div class="container-fluid">
                <div class="d-flex align-items-center">
                  <div class="site-logo mr-auto w-25"><a href="/">EnjoyCoding</a></div>
      
                  <div class="mx-auto text-center">
                    <nav class="site-navigation position-relative text-right" role="navigation">
                      <ul class="site-menu main-menu js-clone-nav mx-auto d-none d-lg-block  m-0 p-0">
                        <li><a href="/" class="nav-link">Trang chủ</a></li>
                        <li><a href="/submit" class="nav-link">Nộp bài</a></li>
                        <li><a href="/result" class="nav-link">Kết quả</a></li>
                        <li><a href="/rank" class="nav-link">Bảng xếp hạng</a></li>
                      </ul>
                    </nav>
                  </div>
      
                  <div class="ml-auto w-25">
                    <nav class="site-navigation position-relative text-right" role="navigation">
                      <ul class="site-menu main-menu site-menu-dark js-clone-nav mr-auto d-none d-lg-block m-0 p-0">
                        {btnInfor}
                      </ul>
                    </nav>
                    <a href="#" class="d-inline-block d-lg-none site-menu-toggle js-menu-toggle text-black float-right"><span
                        class="icon-menu h3"></span></a>
                  </div>
                </div>
              </div>
            </header>
          </div>)
    }
}
export default Menu;