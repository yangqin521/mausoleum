import React, { Component } from 'react'
import Simditor  from 'simditor';
import "simditor/styles/simditor.css"
import './index.css'
import { Button, notification, Input } from 'antd';

import Qs from 'qs'
import axios from 'axios'
export default class Text extends Component {
  
  state = {
    detail: {...this.props.detail},
    detailChange:''
  }
  componentDidMount() {
    var details = new Simditor({
      textarea: document.getElementById('detailUpload'),  //textarea的id
      toolbar : [ 'title', 'bold', 'italic', 'underline', 'strikethrough', 'color', '|', 'ol', 'ul', 'blockquote', 'table', '|', 'image', 'hr', '|', 'indent', 'outdent', 'alignment'],
      toolbarFloat: false,
      defaultImage : './simditor/images/image.png', //编辑器插入图片时使用的默认图片
      upload : {
          url : '/mausoleum/picture/save', //文件上传的接口地址
          params: null, //键值对,指定文件上传接口的额外参数,上传的时候随文件一起提交
          fileKey: 'file', //服务器端获取文件数据的参数名
          connectionCount: 3,
          leaveConfirm: '正在上传图片...你确定要离开这个页面吗？'
      }
    });
    if(this.props.type === "1") {
      details.setValue("");
    } else {
      details.setValue(this.state.detail.details);
    }
    details.on('valuechanged', (e, src) => {
      var text = details.sync();
        this.setState({detailChange: text});
    })

  }
  submitUpload = () => {
    var isUpload = (this.props.type === "1");
    var uploadname;
    if(isUpload) {
      const {uploadName} = this;
      uploadname = uploadName.state.value;
    }
    var data = {
      auditType: isUpload ? 1 : 2,
      belongId: isUpload ? 0 : this.state.detail.mInfoId,
      fieldOne: isUpload ? uploadname : this.state.detail.name,
      fieldTwo: this.state.detailChange
    }
    axios.post("http://localhost:3000/mausoleum/audit/save",
    Qs.stringify(data)
    )
    .then(res=> {
      if(res.data.code === 0) {
        notification['success']({
          message: '',
          description: "提交成功，请耐心等待审核! 2s后将自动返回首页"
        });
        setTimeout(()=> {
          this.props.router.replace('/map');
        },2000)
      } else {
        notification['error']({
          message: '',
          description: res.data.msg
        });
      }
    })
  }
  render() {
    return (
      <div className='modText'>
        <Input addonBefore="名称"  defaultValue="" style={{display: this.props.type ? "block" : "none"}} ref={e => {this.uploadName = e}} className='uploadName'/>
        <textarea  name="details" id="detailUpload" readOnly value="detail" ref={e => {this.modText = e}} onChange={this.changeDetail} autoFocus> </textarea>
        <Button type="primary" onClick={this.submitUpload}>立即提交</Button>
      </div>
    )
  }
}
