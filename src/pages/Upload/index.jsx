import React, { Component } from 'react'
import Text from '../Text'
import "simditor/styles/simditor.css"
import './index.css'
export default class index extends Component {
  
  
  render() {
    return (
      <div className='upload'>
        <Text type="1" router={this.props.history}/>
      </div>
    )
  }
}
