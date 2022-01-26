import {Component} from 'react'
import React from 'react'
import {Route, NavLink, Switch, Redirect} from 'react-router-dom'
//引入connect用于连接ui组件和redux
import { connect } from 'react-redux'

import Qs from 'qs'
import axios from 'axios'
import Map from './pages/Map'
import Introduction from './pages/Introduction'
import ModPassword from './container/ModifyPassword'
import Detail from './container/Detail'
import Upload from './pages/Upload'
import Audit from './pages/Audit'
import Views from './container/Views'

import { Menu, Dropdown, Button, Avatar,Modal, Input, notification } from 'antd';
import { UserOutlined } from '@ant-design/icons';

import "./index.css"
import 'antd/dist/antd.css'

import Login from './container/Login'
import {login,user, logout} from './redux/actions/login'
class App extends Component {
  state = {
    header: [
      {id:"001", name: '首页'},
      {id:"002", name: '详细介绍'},
      {id:"003", name: '实景风貌'},
      {id:"004", name: '后台管理'},
      {id:"006", name: '上传资料'},
      {id:"007", name: '登录'},
    ],
    manager: '123456',
    isSuggesting: false,
    isAdd: false,
    currentView: {
      fieldOne:'',
      fieldTwo:''
    },
  };
  
  logOut =()=> {
    const logout = this.props.logout;
    logout();
    notification['success']({
      message: '',
      description: "已退出登录"
    });
  }

  suggestions = ()=> {
    this.setState({isSuggesting: true});
  }

  showModal = () => {
    this.setState({isSuggesting: true});
  };

  ok = () => {
    const {inputText} = this;
    const data = {
      content: inputText.resizableTextArea.textArea.value
    }
    axios.post("http://localhost:3000/mausoleum/feedback/save", Qs.stringify(data))
    .then(res=> {
      var code = res.data.code;
      var msg = res.data.msg;
      if(code === 0) {
        notification['success']({
          message: '',
          description: "提交成功，请耐心等待审核"
        });
        this.setState({isSuggesting: false});
      } else {
        notification['error']({
          message: '',
          description: msg
        });
    }
    })
  }

  cancel = () => {
    this.setState({isSuggesting: false});
  };

  handleCancel = () => {
    this.setState({isAdd: false});
  };

  handleOk = () => {
    const { x, y, viewName } = this;
    var data = {
      auditType: 4,
      belongId: 0,
      fieldOne: x.state.value,
      fieldTwo: y.state.value,
      fieldThree: viewName.state.value
    }
    axios.post("http://localhost:3000/mausoleum/audit/save", Qs.stringify(data))
    .then(res=> {
      var code = res.data.code;
      var msg = res.data.msg;
      if(code === 0) {
        notification['success']({
          message: '',
          description: "提交成功，请耐心等待审核"
        });
        this.setState({isSuggesting: false});
      } else {
        notification['error']({
          message: '',
          description: msg
        });
    }
    })
    this.setState({isAdd: false});
  }

  isAdd = ()=> {
    this.setState({isAdd: true});
  }
  render() {
    
    console.log(this.props.loginState)
    const menu = (
      <Menu id="meau-list">
        <Menu.Item key="112">
          <div target="_blank" rel="noopener noreferrer" onClick={this.isAdd} style={{"textAlign":"center", color: "cornflowerblue"}}>
            添加坐标
          </div>
        </Menu.Item>
        <Menu.Item key="111">
          <div target="_blank" rel="noopener noreferrer" onClick={this.suggestions} style={{"textAlign":"center", color: "cornflowerblue"}}>
            意见反馈
          </div>
        </Menu.Item>
        <Menu.Item key="222">
          <div target="_blank" rel="noopener noreferrer" style={{"textAlign":"center",color: "cornflowerblue"}}>
          <NavLink to='/modPassword'>修改密码</NavLink>
          </div>
        </Menu.Item>
        <Menu.Item key="333">
          <div target="_blank" rel="noopener noreferrer" onClick={this.logOut} style={{"textAlign":"center",color: "cornflowerblue"}}>
            <NavLink to='/login'>退出登录</NavLink>
          </div>
        </Menu.Item>
      </Menu>
    );
    const {header} = this.state;
    const { TextArea } = Input;
    return (
      <div className='app'>
        <div className="header">
          <button className="header-list-item" ><NavLink to='/map' activeClassName='activeClass'>{header[0].name}</NavLink></button>
          <button className="header-list-item"><NavLink to='/introduction' activeClassName='activeClass'>{header[1].name}</NavLink></button>
          <button className="header-list-item"><NavLink to='/views' activeClassName='activeClass'>{header[2].name}</NavLink></button>
          <button className="header-list-item" style={{display: this.props.loginState && this.props.username===this.state.manager ? "flex" : "none" }}><NavLink to='/audit' activeClassName='activeClass'>{header[3].name}</NavLink></button>
          <button className="header-list-item" style={{display: this.props.loginState ? "flex" : "none" }}><NavLink to='/upload' activeClassName='activeClass'>{header[4].name}</NavLink></button>
          <button className="header-list-item" style={{display: this.props.loginState ? "none" : "flex" }}><NavLink to='/login' activeClassName='activeClass'>{header[5].name}</NavLink></button>
          <Dropdown overlay={menu} placement="bottomCenter" class="header-list-item" arrow style={{display: "flex",border: 0}}>
            <Button className="header-list-item" style={{display: this.props.loginState ? "flex" : "none" }}><Avatar size="small" icon={<UserOutlined />}/>用户{this.props.username}</Button>
          </Dropdown>
          <div><Redirect to='/map' component={Map}></Redirect></div>
        </div>
        <Modal title="请输入您的反馈" visible={this.state.isSuggesting} onOk={this.ok} onCancel={this.cancel}>
          <TextArea ref={ e => this.inputText = e}/>
        </Modal>
        <Modal title="请输入您需要添加的名称和坐标信息" visible={this.state.isAdd} onOk={this.handleOk} onCancel={this.handleCancel}>
          <Input placeholder="请输入经度" ref={e => this.x = e} />
          <Input placeholder="请输入纬度" ref={e => this.y = e} />
          <Input placeholder="请输入名称" ref={e => this.viewName = e} />
        </Modal>
        <Switch>
          <Route path='/map' component={Map}/>
          <Route path='/introduction' component={Introduction}></Route>
          <Route path='/login' component={Login}></Route>
          <Route path='/modPassword' component={ModPassword}></Route>
          <Route path='/upload' component={Upload}></Route>
          <Route path='/detail/mInfoId=:mInfoId' component={Detail}></Route>
          <Route path='/audit' component={Audit}></Route>
          <Route path='/views' component={Views}></Route>
        </Switch>
      </div>
    )
  }
}
const mapStateToProps = (state) => ({
  loginState: state.login,
  username: state.user
})


const mapDispatchToProps = {
  login,
  user,
  logout
}
export default connect(mapStateToProps, mapDispatchToProps)(App)
