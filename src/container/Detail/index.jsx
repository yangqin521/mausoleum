import React, { Component } from 'react'
import axios from 'axios'
import { Tabs, Collapse, Image, List } from 'antd';
import { CaretRightOutlined } from '@ant-design/icons';
import { connect } from 'react-redux'
import Text from '../../pages/Text'
import './index.css'
class Detail extends Component {
  state = {
    detail: {},
    isLogin: this.props.loginState,
    detailHtml: {}
  }
  componentDidMount() {
    const {mInfoId} = this.props.match.params;
    var data = {
      mInfoId : mInfoId,
      isHtml : false
    }
    axios.get("http://localhost:3000/mausoleum/minfo/get",
    {params: data}
    )
    .then(res=> {
      this.setState({detail: {...res.data.data}});
    })

    var data1 = {
      mInfoId : mInfoId,
      isHtml : true
    }
    axios.get("http://localhost:3000/mausoleum/minfo/get",
    {params: data1}
    )
    .then(res=> {
      this.setState({detailHtml: {...res.data.data}});
    })
  }

  render() {
    const {details, name, cover} = this.state.detail;
    const detailList = [];
    detailList.push(this.state.detail);
    return (
      <div className='details'>
        <Tabs defaultActiveKey="1" centered style={{display: this.state.isLogin ? "block" : "none"}}>
          <Tabs.TabPane tab={this.state.detail.name} key="1">
            
            <Collapse
              bordered={false}
              defaultActiveKey={['1']}
              expandIcon={({ isActive }) => <CaretRightOutlined rotate={isActive ? 90 : 0} />}
              className="site-collapse-custom-collapse"
            >
              <Collapse.Panel header={name+"介绍"} key="1" className="site-collapse-custom-panel">
                <List
                  itemLayout="vertical"
                  size="large"
                  pagination={{
                    
                    pageSize: 1,
                  }}
                  dataSource={detailList}
                  renderItem= { item =>(
                    <List.Item
                      key={item.coordinateId}
                    >
                      <List.Item.Meta style={{height: "150px", overflowY: "scroll"}}
                        title={item.name}
                        description={<div dangerouslySetInnerHTML={{"__html": item.details}}></div>}
                      />
                    </List.Item>
                  )}
                />,
              </Collapse.Panel>
              <Collapse.Panel header="图片" key="2" className="site-collapse-custom-panel">
                <img
                  width={272}
                  alt="logo"
                  src="https://gw.alipayobjects.com/zos/rmsportal/mqaQswcyDLcXyDKnZfES.png"
                />
              </Collapse.Panel>
            </Collapse>
          </Tabs.TabPane>
          <Tabs.TabPane tab="进行修改" key="2">
            <Text detail={this.state.detailHtml} router={this.props.history}/>
          </Tabs.TabPane>
        </Tabs>
        <Collapse style={{display: this.state.isLogin ? "none" : "block", marginTop: "50px"}}
          bordered={false}
          defaultActiveKey={['1']}
          expandIcon={({ isActive }) => <CaretRightOutlined rotate={isActive ? 90 : 0} />}
          className="site-collapse-custom-collapse"
        >
          <Collapse.Panel header={name+"介绍"} key="1" className="site-collapse-custom-panel">
            <p>{details}</p>
          </Collapse.Panel>
          <Collapse.Panel header="图片" key="2" className="site-collapse-custom-panel">
          <Image
            width={200}
            src={cover}
          />
          </Collapse.Panel>
        </Collapse>
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
export default connect(mapStateToProps, mapDispatchToProps)(Detail)

