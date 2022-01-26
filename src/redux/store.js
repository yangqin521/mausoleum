import {createStore, applyMiddleware} from 'redux'
import {composeWithDevTools} from 'redux-devtools-extension'
//引入redux-thunk，用于支持异步action
import thunk from 'redux-thunk'
//汇总reducers
import allReducer from './reducers'
export default createStore(allReducer, composeWithDevTools(applyMiddleware(thunk)));