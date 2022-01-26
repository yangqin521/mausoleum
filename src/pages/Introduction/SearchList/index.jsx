import React, { Component } from 'react'
import axios from 'axios'
import Qs from 'qs'
import { Input, Space, List } from 'antd';
import { NavLink } from 'react-router-dom';
import './index.css'

export default class SearchList extends Component {
  state = {
    SearchList: []
  }
  onSearch = ()=> {
    const {name} = this;
    var data = {
      page: 1,
      limit: 100,
      name: name.state.value,
      isHtml: false
    }
    axios.get("http://localhost:3000/mausoleum/minfo/getList",
    {params: data}
    )
    .then(res=> {
      this.setState({searchList: [...res.data.data]})
    })
  }
  
  render() {
    return (
      <div className='search-item'>
        <div className='search-header'>
          <Space direction="vertical">
            <Input.Search placeholder="input search text" onSearch={this.onSearch} ref={e => {this.name = e}} enterButton />
          </Space>
        </div>
        <List
          itemLayout="vertical"
          size="default"
          pagination={{
            pageSize: 3,
          }}
          dataSource={this.state.searchList}
          renderItem={item => (
            <List.Item
              key={item.coordinateId}
              extra={
                <img
                  width={272}
                  alt="logo"
                  src={item.cover}
                />
              }
            >
              <List.Item.Meta style={{height: "150px", overflow:"hidden",textOverflow: "ellipsis"}}
                title={<NavLink to={"/detail/mInfoId="+item.mInfoId}>{item.name}</NavLink>}
                description={item.details}
              />
              {item.content}
            </List.Item>
          )}
        />,
      </div>
    )
  }
}
