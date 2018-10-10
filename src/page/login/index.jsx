import React from 'react';
import './index.scss';
import MUtil from 'util/mm.jsx';
import User from 'service/user-service.jsx';

const _mm = new MUtil();
const _user = new User();

class Login extends React.Component{

  constructor(props){
    super(props);
    this.state = {
      username: '',
      password: '',
      redirect : _mm.getUrlParam('redirect') || '/'
    }
  }
  componentWillMount(){
    document.title = 'login - MMALL ADMIN';
  }
  onInputChange(e){
    let inputName = e.target.name;
    let inputValue = e.target.value;

    this.setState(
      {[inputName]:inputValue}
    );
  }
  onInputKeyup(e){
    if(e.keyCode === 13){
      this.onSubmit(e);
    }
  }
  //登陆
  onSubmit(e){
    let loginInfo = {
      username : this.state.username,
      password: this.state.password
    },
    checkResult = _user.checkLoginInfo(loginInfo);
    if(checkResult.status){
      _user.login(loginInfo).then((res)=>{
        _mm.setStorage('userInfo', res);
        this.props.history.push(this.state.redirect);
      },(errMsg)=>{
        _mm.errorTips(errMsg);

     });

   }else{
     _mm.errorTips(checkResult.msg);
   }



  }

  render(){
    return(


          <div className="col-md-4 col-md-offset-4">
            <div className="panel panel-default login-panel">
              <div className="panel-heading">欢迎登陆 -MMALL管理系统</div>
              <div className="panel-body">
                <div>
                  <div className="form-group">

                    <input type="text"
                      name="username"
                      className="form-control"
                      placeholder="Username"
                      onKeyUp = {e=> this.onInputKeyup(e)}
                    onChange={e => this.onInputChange(e)}/>
                  </div>
                  <div className="form-group">

                    <input name="password"
                      type="password"
                      className="form-control"
                      placeholder="Password"
                      onKeyUp = {e=> this.onInputKeyup(e)}
                      onChange={e => this.onInputChange(e)}/>
                  </div>


                  <button
                    className="btn btn-lg btn-primary btn-block"
                    onClick={e =>{this.onSubmit(e)}}>Submit</button>
                </div>
              </div>
            </div>

        </div>






    );
  }
}

export default Login;
