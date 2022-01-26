//异步action，action的值为函数，同步action，action的值为object的一般对象
export const goMap = (data, ownProps) => {
  return (dispatch) => {
    dispatch({type:'goMap', data:{data, ownProps}});
  }
}
