import React from 'react';
import {Link} from 'react-router-dom';
import MUtil from 'util/mm.jsx';
const _mm = new MUtil();
import User from 'service/user-service.jsx';
const _user = new User();



class TopNav extends React.Component{

  constructor(props){
    super(props);
    this.state = {
      username: _mm.getStorage('userInfo').username || ''
    }
  }
  //退出登陆
  onLogout(){
    _user.logout().then(res => {
      _mm.removeStorage('userInfo');
      window.location.href = '/login'

    },errMsg =>{
      _mm.errorTips(errMsg);
    });
  }

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
                      {
                        this.state.username ?
                        <span>welcome,{this.state.username}</span> :
                        <span>welcome</span>

                      }



                      <i className="fa fa-caret-down"></i>
                  </span>

                  <ul className="dropdown-menu dropdown-user">
                      <li className="dropdown-item">
                          <a onClick={this.onLogout}>
                              <i className="fa fa-sign-out fa-fw"></i> logout
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
