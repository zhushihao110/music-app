/*
 * @Author: ZSH
 * @Date: 2020-08-27 14:50:35
 * @LastEditors: ZSH
 * @LastEditTime: 2020-08-27 14:53:57
 */
import { createStore, compose, applyMiddleware } from 'redux'
import thunk from "redux-thunk"
import reducer from './reducer'

const conposeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

const store = createStore(reducer, conposeEnhancers(
  applyMiddleware(thunk)
))

export default store