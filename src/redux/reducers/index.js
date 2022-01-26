import {loginReducer} from './login'
import {combineReducers} from 'redux'
import { userReducer } from './login'
export default combineReducers({
  login: loginReducer,
  user: userReducer,
})