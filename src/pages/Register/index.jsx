import React, { Component } from 'react'
import Qs from 'qs'

import axios from 'axios'

import { notification, Space, Input } from 'antd';

import './index.css'
export default class Register extends Component {

  changeImg = ()=> {
    const {imgSrc} = this;
    imgSrc.src ="/mausoleum/user/changeCode?timestamp=" + (new Date()).valueOf();
  }

  register_submit = ()=> {
    var username_test = /^[A-Za-z0-9]{4,12}$/;
    var password_test = /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,12}$/;
    const {username, password, passwords, email, identifyCode} = this;
    var data = {
      username: username.state.value,
      password: password.state.value,
      email: email.state.value,
      identifyCode: identifyCode.state.value,
      role: 1
    }
    var username_msg = username_test.test(data.username);
    var password_msg = password_test.test(data.password);
    var samePassword = (data.password === passwords.state.value)
    if(!(username_msg && password_msg)) {
      notification['warning']({
        message: '',
        description: !username_msg ? "请检查用户名格式" : "请检查密码格式",
      })} else if(!samePassword) {
        notification['warning']({
          message: '',
          description: "请再次确认密码是否一致",
        });
      } else {
        axios.post("http://localhost:3000/mausoleum/user/register", Qs.stringify(data))
        .then(res=> {
          let code = res.data.code;
          let msg = res.data.msg
          if(code === 0) {
            notification['success']({
              message: '',
              description: "注册成功，1s后将自动跳转到登录页面",
            });
            setTimeout(()=> {
              this.props.history.goBack();
            },1000)
          } else {
              notification['error']({
                message: '',
                description: msg
              });
          }})
        .catch(reason=> {
          console.log(reason)
        })
      }
  }


  goLogin = ()=> {
    this.props.history.goBack();
  }
  render() {
    return (
        <div className="register">
          <div className="register-title">用户注册</div>
                  <div className="layui-form-item">
                      <div className="layui-input-inline">
                          <Input  ref={e => {this.username = e}} id="username"  placeholder="用户名（请输入4-12位字母或数字）" className="layui-input"/>
                      </div>
                  </div>
                  <div className="layui-form-item">
                      <div className="layui-input-inline">
                          <Input.Password  ref={e => {this.password = e}} id="password" placeholder="用户密码（6-12位字母和数字，不能包含空格）" className="layui-input"/>
                      </div>
                  </div>
                  <div className="layui-form-item">
                      <div className="layui-input-inline">
                          <Input.Password  ref={e => {this.passwords = e}} placeholder="确认密码（请与上次输入密码一致）"  className="layui-input"/>
                      </div>
                  </div>
                  <div className="layui-form-item">
                      <div className="layui-input-inline">
                          <Input   ref={e => {this.email = e}} placeholder="邮箱"  className="layui-input"/>
                      </div>
                  </div>
                  <div className="layui-form-item">
                      <div className="layui-input-inline">
                          <Input   placeholder="验证码" ref={e => {this.identifyCode = e}} className="layui-input-safe"/>
                      </div>
                      <div className="layui-form-mid">
                          <img id="captchaImage" src="/mausoleum/user/changeCode" ref={(e) => {this.imgSrc = e}} style={{height: "38px",width: "85px"}} onClick={this.changeImg}/>
                      </div>
                  </div>

                  <div className="layui-form-item">
                      <Space><button id="register-success" onClick={this.register_submit} >提交</button></Space>
                      <button className="back-to-login" onClick={this.goLogin}>去登录</button>
                  </div>
        </div>
    )
  }
}
