import React, { Component } from 'react'
import { Tabs } from 'antd';
import Manager from './Manager'
export default class Audit extends Component {
  render() {
    return (
        <div className="audit">
          <Tabs defaultActiveKey="1"  centered>
            <Tabs.TabPane tab="用户信息管理" key="1">
              <Manager type="user"/>
            </Tabs.TabPane>
            <Tabs.TabPane tab="地点信息管理" key="2">
              <Manager type="minfo"/>
            </Tabs.TabPane>
            <Tabs.TabPane tab="坐标信息管理" key="3">
              <Manager type="coordinate"/>
            </Tabs.TabPane>
            <Tabs.TabPane tab="视频信息管理" key="4">
              <Manager type="video"/>
            </Tabs.TabPane>
            <Tabs.TabPane tab="查看反馈" key="5">
              <Manager type="feedback"/>
            </Tabs.TabPane>
          </Tabs>
        </div>
    )
  }
}
