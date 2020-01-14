import React from 'react'

class Footer extends React.Component{
    constructor(props){
        super(props);
    }
    render(){
        return(<footer class="footer-section bg">
        <div class="container">
          <div class="row">
            <div class="col-md-4 information">
              <h3>About EnjoyCoding</h3>
              <p>- Hỗ trợ học tập hiểu quả</p>
              <p>- Lưu trữ và quản lý bài tập</p>
              <p>- Tiết kiệm thời gian</p>
            </div>
  
            <div class="col-md-3 ml-auto">
              <h3>Links</h3>
              <ul class="list-unstyled footer-links">
                <li><a href="/">Trang chủ</a></li>
                <li><a href="/submit">Nộp bài</a></li>
                <li><a href="/result">Kết quả</a></li>
                <li><a href="/rank">Bảng xếp hạng</a></li>
              </ul>
            </div>
  
            <div class="col-md-4">
              <h3>Address</h3>
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3925.9453829184986!2d106.65342571411281!3d10.265984571216295!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x317556ca34d7782b%3A0x76332948b1827518!2zxJBUODc3QiwgUGjDuiBUaOG6oW5oLCBHw7IgQ8O0bmcgVMOieSwgVGnhu4FuIEdpYW5nLCBWaWV0bmFt!5e0!3m2!1sen!2s!4v1578909738510!5m2!1sen!2s"
                width="100%" height="150px" frameborder="0" allowfullscreen="true"></iframe>
            </div>
  
          </div>
  
          <div class="row pt-5 mt-5 text-center partend">
            <div class="col-md-12">
              <div class="border-top pt-5">
                <p>
                  Copyright &copy;
                  <script>2020</script> Author: Nguyen Thanh Giau <i
                    class="icon-heart" aria-hidden="true"></i>
                </p>
              </div>
            </div>
          </div>
        </div>
      </footer>)
    }
}
export default Footer;