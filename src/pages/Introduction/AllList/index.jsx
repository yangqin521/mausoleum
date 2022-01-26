import React, { Component } from 'react'
import axios from 'axios'
import { List } from 'antd';
import { NavLink } from 'react-router-dom';
import './index.css'
export default class AllList extends Component {
  state = {
    listData: [],
  }
  componentDidMount() {
    var data = {
      page: 1,
      limit: 100,
      isHtml : false
    }
    axios.get("http://localhost:3000/mausoleum/minfo/getList",
    {params: data}
    )
    .then(res=> {
      this.setState({listData: [...res.data.data]})
    })
  }
  render() {
    return (
      <div className='allList'>
        <List
        itemLayout="vertical"
        size="large"
        pagination={{
          pageSize: 3,
        }}
        dataSource={this.state.listData}
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
          </List.Item>
        )}
      />,
      </div>
    )
  }
}
