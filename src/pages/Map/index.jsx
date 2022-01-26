import React from 'react'
import './index.css'
import axios from 'axios'
import { notification } from 'antd';
export default class Map extends React.Component{
  state = {
    map: {}
  }
  componentDidMount(){
    let map = new window.BMapGL.Map("container");    // 创建Map实例
    this.setState({map})
    map.centerAndZoom('西安市',8); // 初始化地图,设置中心点坐标和地图级别
    map.enableScrollWheelZoom(true);     //开启鼠标滚轮缩放
    //map.setMapType(window.BMAP_EARTH_MAP);      // 设置地图类型为地球模式 
    // var dataList;
    map.addEventListener("click",function(e){
      var xpoint = e.latlng.lng.toString();
      var ypoint = e.latlng.lat.toString();
      var xp = xpoint.substring(0,xpoint.indexOf(".") + 7);
      var yp = ypoint.substring(0,ypoint.indexOf(".") + 7);
      notification['success']({
        message: '',
        description: "当前坐标为("+xp+ " , "+yp+ ")!"
      });
    })
  }
  componentDidUpdate () {
  var currentProps = this.props;
    axios.get("http://localhost:3000/mausoleum/coordinate/getMCList").then(result=> {
      var dataList = result.data.data;
      for(let i = 0;i<dataList.length;i++){
        var data = dataList[i];
        //设置标记红点的方法
        var createMark = function(lng, lat, remark) {
          var point = new window.BMapGL.Point(lng,lat)
          var _marker = new window.BMapGL.Marker(point);
          _marker.addEventListener("click", function(e) {
              //点击跳转到详情页
            currentProps.history.replace('/detail/mInfoId='+remark);
              
          });
          return _marker;
      };

        var marker =createMark(data.x,data.y,data.coordinateId);
        this.state.map.addOverlay(marker);
        var label = new window.BMapGL.Label(data.name, { offset: new window.BMapGL.Size(30, -20) });
        label.setStyle({
            color: "red",
            fontSize: "14px",
            backgroundColor: "#fff",
            border: "0",
            opacity: "0.7"
        });
        marker.setLabel(label);
      }
    })
  }
  render(){
      return(
          <>
            <div id="container"></div>
          </>
      )
  }
}