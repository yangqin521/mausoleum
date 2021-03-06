import React, { Component } from 'react'
import axios from 'axios'
import Qs from 'qs'
import { Table,  Space, Modal, notification } from 'antd';
import {  ExclamationCircleOutlined } from '@ant-design/icons';
import './index.css'
const { Column } = Table;

export default class Manager extends Component {
  state = {
    type: this.props.type,
    list: [],
  }
  componentDidMount() {
    var type = this.props.type;
    switch(type) {
      case 'user': {
          this.getUser();
          break;
        }
      case 'minfo': {
        this.auditMinfo();
        break;
      }
      case 'coordinate': {
        this.auditCoordinate();
        break;
      }
      case 'video': {
        this.auditVideo();
        break;
      }
      case 'feedback': {
        this.getFeedback();
        break;
      }
      case 'allMinfo': {
        this.getAllMinfo();
        break;
      }
      case 'allCoordinate': {
        this.getAllCoordinate();
        break;
      }
      case 'allVideo': {
        this.getAllvideo();
        break;
      }
      default:
        return;
    }
  }
  getAllMinfo = ()=> {
    var data = {
      page: 1,
      limit: 100,
      isHtml: false
    }
    axios.get("http://localhost:3000/mausoleum/minfo/getList",
    {params: data})
    .then(res => {
      this.setState({list: [...res.data.data]});
    })
  }

  getAllvideo = ()=> {
    var data = {
      page: 1,
      limit: 100
    }
    axios.get("http://localhost:3000/mausoleum/video/getList",
    {params: data})
    .then(res => {
      this.setState({list: [...res.data.data]});
    })
  }

  getAllCoordinate = ()=> {
    var data = {
      page: 1,
      limit: 100
    }
    axios.get("http://localhost:3000/mausoleum/coordinate/getList",
    {params: data})
    .then(res => {
      this.setState({list: [...res.data.data]});
    })
  }
  getUser = ()=> {
    var data1 = {
      page: 1,
      limit: 100
    }
    axios.get("http://localhost:3000/mausoleum/user/getList",
      {params: data1}
      ).then(res => {
        var newRes = res.data.data.map(item => {
          if(item.role===0) {
            return {...item, role: '?????????'}
          } else {
              return {...item, role: '????????????'}
          }
        })
        this.setState({list: [...newRes]});
      })
  }
  auditMinfo = ()=> {
    var data2 = {
      type: 12
    }
    axios.get("http://localhost:3000/mausoleum/audit/getList",
    {params: data2}
    ).then(res => {
      var newRes = res.data.data.map(item => {
        if(item.auditStatus===0) {
          if(item.auditType === 1) {
            return {...item, auditStatus: '?????????', auditType: '??????'};
          } else {
            return {...item, auditStatus: '?????????', auditType: '??????'};
          }
        } else if(item.auditStatus === 1){
          if(item.auditType === 1) {
            return {...item, auditStatus: '?????????', auditType: '??????'};
          } else {
            return {...item, auditStatus: '?????????', auditType: '??????'};
          }
        } else {
          if(item.auditType === 2) {
            return {...item, auditStatus: '?????????', auditType: '??????'};
          } else {
            return {...item, auditStatus: '?????????', auditType: '??????'};
          }
        }
      })
      this.setState({list: [...newRes]});
    })
  }
  auditCoordinate = ()=> {
    var data3 = {
      type: "45"
    }
    axios.get("http://localhost:3000/mausoleum/audit/getList",
    {params: data3}
    ).then(res => {
      var newRes = res.data.data.map(item => {
        if(item.auditStatus===0) {
          return {...item, auditStatus: '?????????'}
        } else if(item.auditStatus === 1){
          return {...item, auditStatus: '?????????'}
        } else {
          return {...item, auditStatus: '?????????'}
        }
      })
      this.setState({list: [...newRes]});
    })
  }
  auditVideo = ()=> {
    var data4 = {
      type: "3"
    }
    axios.get("http://localhost:3000/mausoleum/audit/getList",
    {params: data4}
    ).then(res => {
      var newRes = res.data.data.map(item => {
        if(item.auditStatus===0) {
          return {...item, auditStatus: '?????????'}
        } else if(item.auditStatus === 1){
          return {...item, auditStatus: '?????????'}
        } else {
          return {...item, auditStatus: '?????????'}
        }
      })
      this.setState({list: [...newRes]});
    })
  }
  getFeedback = ()=> {
    axios.get("http://localhost:3000/mausoleum/feedback/getList")
    .then(res => {
      var newRes = res.data.data.map(item => {
        if(item.status===0) {
          return {...item, status: '??????'}
        } else {
          return {...item, status: '??????'}
        }
      })
      this.setState({list: [...newRes]})
    })
  }
  //????????????
  detailLooking = (id)=> {
    var content;
    if(id!==undefined) {
      if(this.state.type === "feedback") {
        content = this.state.list.filter(function(item){
          return item.feedbackId === id;
        })
        var data = {
          feedbackId: id
        }
        axios.post("http://localhost:3000/mausoleum/feedback/read", Qs.stringify(data))
        .then(res => {
          if(res.data.code === 0) {
            this.info(content[0].content);
            this.getFeedback();
          } else {
            this.info(res.data.msg+"??????????????????");
          }
        })
      } else {
        content = this.state.list.filter(function(item){
          return item.auditId === id;
        })
        this.info(content[0].fieldTwo);
      }
    } else {
      return;
    }
  }
  //??????????????????
  info = (contents)=> {
    Modal.info({
      title: 'This is a  message',
      content: (
        <div>
          <div dangerouslySetInnerHTML={{"__html": contents}}></div>
        </div>
      ),
    });
  }

  deleteUser = (id)=> {
    var data = {
      userId: id
    }
    const { confirm } = Modal;
    const getUser = this.getUser;
    confirm({
      title: 'Do you Want to logout now?',
      icon: <ExclamationCircleOutlined />,
      onOk() {
        axios.post('http://localhost:3000/mausoleum/user/destroy', Qs.stringify(data))
        .then(res=> {
          if(res.data.code === 0 ) {
            notification['success']({
              message: '',
              description: "????????????"
            });
            getUser();
          } else {
            return;
          }
        })
      }
    });
  }

  deleteMinfo = (id)=> {
    var data = {
      mInfoId: id
    }
    const { confirm } = Modal;
    const getAllMinfo = this.getAllMinfo;
    confirm({
      title: 'Do you Want to delete it?',
      icon: <ExclamationCircleOutlined />,
      onOk() {
        axios.post('http://localhost:3000/mausoleum/minfo/destroy', Qs.stringify(data))
        .then(res=> {
          if(res.data.code === 0 ) {
            notification['success']({
              message: '',
              description: "?????????"
            });
          getAllMinfo();
          } else {
            return;
          }
        })
      }
    });
  }

  deleteCoordinate = (id)=> {
    var data = {
      coordinateId: id
    }
    const { confirm } = Modal;
    const getAllCoordinate = this.getAllCoordinate;
    confirm({
      title: 'Do you Want to delete it?',
      icon: <ExclamationCircleOutlined />,
      onOk() {
        axios.post('http://localhost:3000/mausoleum/coordinate/destroy', Qs.stringify(data))
        .then(res=> {
          if(res.data.code === 0 ) {
            notification['success']({
              message: '',
              description: "?????????"
            });
            getAllCoordinate();
          } else {
            return;
          }
        })
      }
    });
  }

  deleteVideo = (id)=> {
    var data = {
      videoId: id
    }
    const { confirm } = Modal;
    const getAllvideo = this.getAllvideo;
    confirm({
      title: 'Do you Want to delete it?',
      icon: <ExclamationCircleOutlined />,
      onOk() {
        axios.post('http://localhost:3000/mausoleum/video/destroy', Qs.stringify(data))
        .then(res=> {
          if(res.data.code === 0 ) {
            notification['success']({
              message: '',
              description: "?????????"
            });
            getAllvideo();
          } else {
            return;
          }
        })
      }
    });
  }
  //??????
  agree = (id)=> {
    var current = this.state.list.filter(function(item){
      return item.auditId === id;
    })[0];
    var data = {
      auditId : current.auditId,
      auditType: current.auditType ==="??????" ? 2 : (current.auditType === "??????" ? 1 : current.auditType),
      belongId : current.belongId,
      fieldOne : current.fieldOne,
      fieldTwo : current.fieldTwo,
      status: current.auditStatus,
      fieldThree: current.fieldThree === '' ? '' : current.fieldThree
    }
    if(this.state.type === 'minfo') {
      const auditMinfo = this.auditMinfo;
      this.confirmAgree(data, auditMinfo)
    } else if(this.state.type === 'video') {
      const auditVideo = this.auditVideo;
      this.confirmAgree(data, auditVideo);
    } else if(this.state.type === 'coordinate'){
      const auditCoordinate = this.auditCoordinate;
      this.confirmAgree({...data, fieldThree:current.fieldThree}, auditCoordinate);
    }
  }
  //????????????
  confirmAgree = (data,getCurrentStatus)=> {
    const { confirm } = Modal;
    confirm({
      title: 'Do you Want to agree now?',
      icon: <ExclamationCircleOutlined />,
      onOk() {
        if(data.status === "?????????") {
          axios.post('http://localhost:3000/mausoleum/audit/agree', Qs.stringify(data))
          .then(res=> {
            var code = res.data.code;
            if(code === 0 ) {
              notification['success']({
                message: '',
                description: "???????????????"
              });
              getCurrentStatus();
            } else {
              return;
            }
          })
        } else {
          notification['error']({
            message: '',
            description: "??????????????????"
          });
        }
      }
    });
    this.setState({isChange: true});
  }
  //??????
  reject = (id)=> {
    var current = this.state.list.filter(function(item){
      return item.auditId === id;
    })[0];
    var data = {
      auditId : id,
      status: current.auditStatus
    }
    if(this.state.type === 'minfo') {
      const auditMinfo = this.auditMinfo;
      this.confirmReject(data, auditMinfo)
    } else if(this.state.type === 'video') {
      const auditVideo = this.auditVideo;
      this.confirmReject(data, auditVideo);
    } else if(this.state.type === 'coordinate'){
      const auditCoordinate = this.auditCoordinate;
      this.confirmReject(data, auditCoordinate);
    }
  }
  //??????????????????
  confirmReject = (data,getCurrentStatus)=> {
    const { confirm } = Modal;
    confirm({
      title: 'Do you Want to reject now?',
      icon: <ExclamationCircleOutlined />,
      onOk() {
        if(data.status === "?????????") {
          axios.post('http://localhost:3000/mausoleum/audit/reject', Qs.stringify(data))
          .then(res=> {
            if(res.data.code === 0 ) {
              notification['success']({
                message: '',
                description: "?????????"
              });
              getCurrentStatus();
              this.setState({isChange: true});
            } else {
              return;
            }
          })
        } else {
            notification['error']({
              message: '',
              description: "??????????????????"
            })
        }
      }
    });
  }
  allMinfo = ()=> {
    this.setState({type: 'allMinfo'});
    this.getAllMinfo();
  }
  allCoordinate = ()=> {
    this.setState({type: 'allCoordinate'});
    this.getAllCoordinate();
  }
  allVideo = ()=> {
    this.setState({type: 'allVideo'});
    this.getAllvideo();
  }
  getAuditMinfo = ()=> {
    this.setState({type: 'minfo'});
    this.auditMinfo();
  }
  getAuditCoordinate = ()=> {
    this.setState({type: 'coordinate'});
    this.auditCoordinate();
  }
  getAuditVideo = ()=> {
    this.setState({type: 'video'});
    this.auditVideo();
  }
  render() {
    const state = this.state;
    return (
      <div className='manager'>
        <div className="audit-user" style={{display: state.type==="user" ? 'block' : 'none'}}>
          <Table dataSource={state.list}>
            <Column title="????????????" dataIndex='userId' key="userId" />
            <Column title="?????????" dataIndex="username" key="userId" />
            <Column title="????????????" dataIndex="password" key="userId" />
            <Column title="????????????" dataIndex="email" key="userId" />
            <Column title="????????????" dataIndex="role" key="userId" />1
            <Column
              title="Action"
              key={state.list.userId}
              render={(text, record) => (
                <Space size="middle">
                  <a onClick={s=>{this.deleteUser(record.userId)}}>Delete</a>
                </Space>
              )}
            />
          </Table>
        </div>
        <div className="audit-minfo" style={{display: state.type==="minfo" ? 'block' : 'none'}}>
          <Table dataSource={state.list}>
            <Column title="??????" dataIndex='auditId' key="auditId" />
            <Column title="??????" dataIndex="fieldOne" key="auditId" />
            <Column title="?????????" dataIndex="submitUsername" key="auditId" />
            <Column title="????????????" dataIndex="auditType" key="auditId" />
            <Column title="????????????" dataIndex="submitTime" key="auditId" />
            <Column title="????????????" dataIndex="auditStatus" key="auditId" />
            <Column
              title="Action"
              key={state.list.auditId}
              render={(text, record) => (
                <Space size="middle">
                  <a onClick={(s=>{this.detailLooking(record.auditId)})}>Look</a>
                  <a onClick={(s=>{this.agree(record.auditId)})}>Agree</a>
                  <a onClick={(s=>{this.reject(record.auditId)})}>Reject</a>
                </Space>
              )}
            />
          </Table>
          <a onClick={this.allMinfo} className='changeUrl'>????????????????????????</a>
        </div>
        <div className="audit-coordinate" style={{display: state.type==="coordinate" ? 'block' : 'none'}}>
          <Table dataSource={state.list}>
            <Column title="??????" dataIndex='auditId' key="auditId" />
            <Column title="??????" dataIndex="fieldThree" key="auditId" />
            <Column title="?????????" dataIndex="submitUsername" key="auditId" />
            <Column title="??????" dataIndex="fieldOne" key="auditId" />
            <Column title="??????" dataIndex="fieldTwo" key="auditId" />
            <Column title="????????????" dataIndex="submitTime" key="auditId" />
            <Column title="????????????" dataIndex="auditStatus" key="auditId" />
            <Column
              title="Action"
              key={state.list.auditId}
              render={(text, record) => (
                <Space size="middle">
                  <a onClick={(s=>{this.agree(record.auditId)})}>Agree</a>
                  <a onClick={(s=>{this.reject(record.auditId)})}>Reject</a>
                </Space>
              )}
            />
          </Table>
          <a onClick={this.allCoordinate} className='changeUrl'>????????????????????????</a>
        </div>
        <div class="audit-video" style={{display: state.type==="video" ? 'block' : 'none'}}>
          <Table dataSource={state.list}>
            <Column title="??????" dataIndex='auditId' key="auditId" />
            <Column title="????????????" dataIndex="fieldOne" key="auditId" />
            <Column title="?????????" dataIndex="submitUsername" key="auditId" />
            <Column title="????????????" dataIndex="submitTime" key="auditId" />
            <Column title="????????????" dataIndex="auditStatus" key="auditId" >555</Column>
            <Column
              title="Action"
              key={state.list.auditId}
              render={(text, record) => (
                <Space size="middle">
                  <a onClick={(s=>{this.agree(record.auditId)})}>Agree</a>
                  <a onClick={(s=>{this.reject(record.auditId)})}>Reject</a>
                </Space>
              )}
            />
          </Table>
          <a onClick={this.allVideo} className='changeUrl'>????????????????????????</a>
        </div>
        <div class="audit-feedback" style={{display: state.type==="feedback" ? 'block' : 'none'}}>
          <Table dataSource={state.list}>
            <Column title="??????" dataIndex='feedbackId' key="feedbackId" />
            <Column title="?????????" dataIndex="username" key="feedbackId" />
            <Column title="????????????" dataIndex="time" key="feedbackId" />
            <Column title="??????" dataIndex="status" key="feedbackId" />
            <Column
              title="Action"
              key={state.list}
              render={(text, record) => (
                <Space size="middle">
                  <a onClick={(s=>{this.detailLooking(record.feedbackId)})}>Look</a>
                </Space>
              )}
            />
          </Table>
        </div>
        <div className="all-minfo" style={{display: state.type==="allMinfo" ? 'block' : 'none'}}>
          <Table dataSource={state.list}>
            <Column title="??????" dataIndex='mInfoId' key="mInfoId" />
            <Column title="??????" dataIndex="name" key="mInfoId" />
            <Column title="?????????" dataIndex="lastAuditUsername" key="mInfoId" />
            <Column title="????????????" dataIndex="lastAuditTime" key="mInfoId" />
            <Column
              title="Action"
              key={state.list.mInfoId}
              render={(text, record) => (
                <Space size="middle">
                  <a onClick={(s=>{this.deleteMinfo(record.mInfoId)})}>Delete</a>
                </Space>
              )}
            />
          </Table>
          <a  className='changeUrl' onClick={this.getAuditMinfo}>????????????????????????</a>
        </div>
        <div className="allCoordinate" style={{display: state.type==="allCoordinate" ? 'block' : 'none'}}>
          <Table dataSource={state.list}>
            <Column title="??????" dataIndex='coordinateId' key="coordinateId" />
            <Column title="??????" dataIndex="remark" key="coordinateId" />
            <Column title="??????" dataIndex="x" key="coordinateId" />
            <Column title="??????" dataIndex="y" key="coordinateId" />
            <Column title="?????????" dataIndex="auditUsername" key="coordinateId" />
            <Column title="????????????" dataIndex="auditTime" key="coordinateId" />
            <Column
              title="Action"
              key={state.list.coordinateId}
              render={(text, record) => (
                <Space size="middle">
                  <a onClick={(s=>{this.deleteCoordinate(record.coordinateId)})}>Delete</a>
                </Space>
              )}
            />
          </Table>
          <a  className='changeUrl' onClick={this.getAuditMinfo}>????????????????????????</a>
        </div>
        <div class="allVideo" style={{display: state.type==="allVideo" ? 'block' : 'none'}}>
          <Table dataSource={state.list}>
            <Column title="??????" dataIndex='videoId' key="videoId" />
            <Column title="????????????" dataIndex="alt" key="videoId" />
            <Column title="?????????" dataIndex="auditUsername" key="videoId" />
            <Column title="????????????" dataIndex="auditTime" key="videoId" />
            <Column
              title="Action"
              key={state.list.id}
              render={(text, record) => (
                <Space size="middle">
                  {/* <a onClick={(s=>{this.deleteMinfo(record.videoId)})}>Look</a> */}
                  <a onClick={(s=>{this.deleteVideo(record.videoId)})}>Delete</a>
                </Space>
              )}
            />
          </Table>
          <a  className='changeUrl' onClick={this.getAuditMinfo}>????????????????????????</a>
        </div>
      </div>
    )
  }
}
