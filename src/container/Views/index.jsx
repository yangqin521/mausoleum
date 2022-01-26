import React, { Component } from 'react'
import axios from 'axios'
import Qs from 'qs'
import { connect } from 'react-redux'

import { Tabs, List, Card, Image, Upload, Button } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
class Views extends Component {
  state = {
    pictures: [],
    videos: [],
    isLogin: this.props.loginState
  }
  componentDidMount() {
    var data = {
      page: 1,
      limit: 100
    }
    axios.get("http://localhost:3000/mausoleum/picture/getList", {params: data})
    .then(res => {
      var code = res.data.code;
      var result = res.data.data;
      if(code === 0) {
        this.setState({pictures: [...result]});
      } else {
        return;
      }
    })
    axios.get("http://localhost:3000/mausoleum/video/getList")
    .then(res => {
      var code = res.data.code;
      var result = res.data.data;
      if(code === 0) {
        this.setState({videos: [...result]});
      } else {
        return;
      }
    })
  }
  
  render() {
    const props = {
      name: 'file',
      action: 'http://localhost:3000/mausoleum/video/save',
      data: Qs.stringify({
          auditType: 3,
          belongId: 0,
          fieldOne: "1111",
          fieldTwo: "11111"
      }),
      accept: '.mp4',
      maxCount:1,
      method: "post",

      onChange(info) {
        if (info.file.status !== 'uploading') {
          console.log(info.file, info.fileList);
        }
        // if (info.file.status === 'done') {
        //   message.success(`${info.file.name} file uploaded successfully`);
        // } else if (info.file.status === 'error') {
        //   message.error(`${info.file.name} file upload failed.`);
        // }
      },
    };
    return (
      <div className="audit">
          <Tabs defaultActiveKey="1"  centered>
            <Tabs.TabPane tab="图片" key="1">
                <List
                  grid={{ gutter: 9, column: 3 }}
                  dataSource={this.state.pictures}
                  pagination={{
                    pageSize: 6,
                  }}
                  renderItem={item => (
                    <List.Item>
                      <Card title={item.alt}>
                        <Image width={160} src={item.src}/>
                      </Card>
                    </List.Item>
                  )}
                />,
            </Tabs.TabPane>
            <Tabs.TabPane tab="视频" key="2">
                <List
                  grid={{ gutter: 9, column: 2 }}
                  dataSource={this.state.videos}
                  pagination={{
                    pageSize: 6,
                  }}
                  renderItem={item => (
                    <List.Item>
                      <Card title={item.alt}><video src={item.src}/></Card>
                    </List.Item>
                  )}
                />,
                <Upload {...props} style={{display: this.state.isLogin ? "block" : "none"}}>
                  <Button icon={<UploadOutlined />}>Upload</Button>
                </Upload>,
            </Tabs.TabPane>
          </Tabs>
        </div>
    )
  }
}
const mapStateToProps = (state) => ({
  loginState: state.login,
  username: state.user
})
const mapDispatchToProps = {
}
export default connect(mapStateToProps, mapDispatchToProps)(Views)

