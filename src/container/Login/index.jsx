import React, { Component } from 'react'
import { notification, Space, Input } from 'antd';
import axios from 'axios'
import Qs from 'qs'
//引入connect用于连接ui组件和redux
import { connect } from 'react-redux'
import {Link, Route} from 'react-router-dom'

import {login, user} from '../../redux/actions/login'
import Register from '../../pages/Register'
import './index.css'
import ModifyPassword from '../ModifyPassword';
class Login extends Component {
  changeImg = ()=> {
    const {imgSrc} = this;
    imgSrc.src ="/mausoleum/user/changeCode?timestamp=" + (new Date()).valueOf();
  }

  Login = ()=> {
    const {username, password, imgValue} = this;
    var data = {
      username: username.state.value,
      password: password.state.value,
      identifyCode: imgValue.state.value
    } 
    axios.post("http://localhost:3000/mausoleum/user/login", Qs.stringify(data))
    .then(res=> {
      var code = res.data.code;
      var msg = res.data.msg;
      if(code === 0) {
        this.props.login();
        this.props.user(data.username);
        this.props.history.replace('/map')
      } else {
          notification['warning']({
            message: '',
            description: msg
          });
      }
    })
  }

  render() {
    return (
      <div className='login'>
        <div className="layui-show">
          <div className="login-title" >用户登录</div>
          <div className="layui-form layui-form-pane">
                <div className="layui-form-item">
                    <div className="layui-input-inline">
                        <Input   placeholder="用户名" className="layui-input" ref={(event) => {this.username = event}} onChange={this.inputValue}/>
                    </div>
                </div>
                <div className="layui-form-item">
                    <div className="layui-input-inline">
                        <Input.Password   placeholder="用户密码" ref={(event) => {this.password = event}} className="layui-input"/>
                    </div>
                </div>
                <div className="layui-form-item">
                    <div className="layui-input-inline">
                        <Input  name="identifyCode" id="identifyCode" ref={(e) => {this.imgValue = e}} placeholder="验证码"
                                className="layui-input-safe"/>
                    </div>
                    <div className="layui-form-mid">
                        <img id="captchaImage" ref={(e) => {this.imgSrc = e}} src="http://localhost:8088/mausoleum/user/changeCode" style={{height: "40px",width: "85px"}} onClick={this.changeImg}/>
                    </div>
                </div>
                <div className="layui-form-item">
                    <Space><button  id="login-success" className="layui-btn"  lay-filter="login_submit" onClick={this.Login}>登录</button></Space>
                    <div className="not-register"><Link to='/login/register'>去注册</Link></div>
                    <div className="findFassword"><Link to='/login/modifyPassword'>忘记密码？</Link></div>
                </div>
        </div>
       </div>
       <div> <Route path='/login/register' component={Register}></Route></div>
       <div> <Route path='/login/modifyPassword' component={ModifyPassword}></Route></div>
      </div>
    )
  }
}
//mapStateToProps函数的返回值作为状态传递给了ui组件
//返回对象中的key：value作为props传递给ui组件
//用于传递状态
const mapStateToProps = (state) => ({
  loginState: state.login,
  username: state.user,
})


//mapDispatchToProps返回的对象中的key作为传递给ui组件的props的key，value作为
//传递给ui组件的props的value
//用于传递方法
//react-redux会帮助分发，不需要自己dispatch
const mapDispatchToProps = {
  login,
  user,
}
//创建并暴露一个Count容器组件
export default connect(mapStateToProps, mapDispatchToProps)(Login)
