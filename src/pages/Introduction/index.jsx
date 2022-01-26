import React, { Component } from 'react'
import { Tabs, Radio, Space } from 'antd';
import AllList from './AllList'
import SearchList from './SearchList'
const { TabPane } = Tabs;
export default class Introdunction extends Component {
  state = {
    tabPosition: 'left',
  };

  changeTabPosition = e => {
    this.setState({ tabPosition: e.target.value });
  };
  render() {
    const { tabPosition } = this.state;
    return (
      <>
        <Tabs tabPosition={tabPosition}>
          <TabPane tab="所有介绍" key="1">
            <AllList/>
          </TabPane>
          <TabPane tab="去搜索" key="2">
            <SearchList/>
          </TabPane>
        </Tabs>
      </>
    )
  }
}
