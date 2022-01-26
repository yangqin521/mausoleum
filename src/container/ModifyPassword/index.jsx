import React, { Component } from 'react'
import Qs from 'qs'
import { connect } from 'react-redux'
import axios from 'axios'

import { notification, Space, Input } from 'antd';

import {login,user, logout} from '../../redux/actions/login'

import './index.css'
class ModifyPassword extends Component {
  componentDidMount() {
    const {username} = this;
    if(this.props.username !== '') {
      username.value = this.props.username;
    }
  }
  changeImg = ()=> {
    const {imgSrc} = this;
    imgSrc.src ="/mausoleum/user/changeCode?timestamp=" + (new Date()).valueOf();
  }

  submit = ()=> {
    var password_test = /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,12}$/;
    const {username, password, passwords, email, identifyCode} = this;
    var data = {
      username: this.props.username=== '' ? username.state.value : this.props.username,
      email: email.state.value,
      password: password.state.value,
      identifyCode: identifyCode.state.value,
    }
    var password_msg = password_test.test(data.password);
    var samePassword = (data.password === passwords.state.value)
    if(!password_msg) {
      notification['warning']({
        message: '',
        description: "请检查密码格式",
      })} else if(!samePassword) {
        notification['warning']({
          message: '',
          description: "请再次确认密码是否一致",
        });
      } else {
        axios.post("http://localhost:3000/mausoleum/user/modify", Qs.stringify(data))
        .then(res=> {
          let code = res.data.code;
          let msg = res.data.msg
          if(code === 0) {
            notification['warning']({
              message: '',
              description: "修改成功，3s后将自动跳转到重新登录页面",
            });
            setTimeout(()=> {
              this.props.logout();
              this.props.history.replace('login');
            },1000)
          } else {
              notification['warning']({
                message: '',
                description: msg
              });
          }})
        .catch(reason=> {
          
        })
      }
  }


  goLogin = ()=> {
    this.props.history.goBack();
  }
  render() {
    return (
        <div className="mod_password">
          <div className="register-title">修改密码</div>
                  <div className="layui-form-item">
                      <div className="layui-input-inline">
                          <Input  ref={e => {this.username = e}} id="username"  placeholder="用户名（请输入4-12位字母或数字）" className="layui-input"/>
                      </div>
                  </div>
                  <div className="layui-form-item">
                      <div className="layui-input-inline">
                          <Input ref={e => {this.email = e}} id="email"  placeholder="请输入注册邮箱" className="layui-input"/>
                      </div>
                  </div>
                  <div className="layui-form-item">
                      <div className="layui-input-inline">
                          <Input.Password ref={e => {this.password = e}} id="password" placeholder="新密码（6-12位字母和数字，不能包含空格）" className="layui-input"/>
                      </div>
                  </div>
                  <div className="layui-form-item">
                      <div className="layui-input-inline">
                          <Input.Password ref={e => {this.passwords = e}} placeholder="确认密码（请与上次输入密码一致）"  className="layui-input"/>
                      </div>
                  </div>
                  <div className="layui-form-item">
                      <div className="layui-input-inline">
                          <Input  placeholder="验证码" ref={e => {this.identifyCode = e}} className="layui-input-safe"/>
                      </div>
                      <div className="layui-form-mid">
                          <img id="captchaImage" src="/mausoleum/user/changeCode" ref={(e) => {this.imgSrc = e}} style={{height: "38px",width: "85px"}} onClick={this.changeImg}/>
                      </div>
                  </div>

                  <div className="layui-form-item">
                      <Space><button id="register-success" onClick={this.submit} >提交</button></Space>
                      <button className="back-to-login" onClick={this.goLogin}>返回</button>
                  </div>
        </div>
    )
  }
}
const mapStateToProps = (state) => ({
  loginState: state.login,
  username: state.user
})


//mapDispatchToProps返回的对象中的key作为传递给ui组件的props的key，value作为
//传递给ui组件的props的value
//用于传递方法
//react-redux会帮助分发，不需要自己dispatch
const mapDispatchToProps = {
  login,
  user,
  logout
}
//创建并暴露一个Count容器组件
export default connect(mapStateToProps, mapDispatchToProps)(ModifyPassword)