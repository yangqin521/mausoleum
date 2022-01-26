const initState = false;
export function loginReducer(preState=initState, action) {
  const {type} = action;
  switch(type) {
    case 'login': {
      sessionStorage.setItem("isLogin", true);
      return true;
    }
    case 'logout': {
      sessionStorage.removeItem('isLogin')
      sessionStorage.setItem("isLogin", false);
      return false;
    }
    default:
      console.log(initState)
      return preState;
  }
  
}
export function userReducer(preState=initState, action) {
  const {type, data} = action;
  switch(type) {
    case 'user': {
      sessionStorage.setItem("user", data.username);
      return data;
    }
    default:
      sessionStorage.removeItem("user");
      return sessionStorage.getItem('user')
  }
  
}