import React from 'react';
import {Link} from 'react-router-dom';



class TopNav extends React.Component{

  constructor(props){
    super(props);
  }
  //退出登陆

  render(){

    return(
      <div className="navbar navbar-default top-navbar" >
          <div className="navbar-header">
              <Link className="navbar-brand" to="/"><b>HAPPY </b>MMALL</Link>
          </div>

          <ul className="nav navbar-top-links navbar-right">
              <li className="dropdown">
                  <span className="dropdown-toggle"  href="javascript:;" aria-expanded="false">
                      <i className="fa fa-user fa-fw"></i>

                      <span>欢迎</span>

                      <i className="fa fa-caret-down"></i>
                  </span>

                  <ul className="dropdown-menu dropdown-user">
                      <li className="dropdown-item">
                          <a onClick={this.onLogout}>
                              <i className="fa fa-sign-out fa-fw"></i> 退出登录
                          </a>
                      </li>
                  </ul>
              </li>
          </ul>
      </div>

    );
  }
}


export default TopNav;
