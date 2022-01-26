export const login = (data) => {
  return (dispatch) => {
    dispatch({type:'login', data});
  }
}
export const logout = (data) => {
  return (dispatch) => {
    dispatch({type:'logout', data});
  }
}
export const user = (data) => {
  return (dispatch) => {
    dispatch({type:'user', data});
  }
}
