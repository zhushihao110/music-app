/*
 * @Author: ZSH
 * @Date: 2020-08-27 14:48:39
 * @LastEditors: ZSH
 * @LastEditTime: 2020-08-31 11:34:22
 */
import { combineReducers } from 'redux-immutable'
import { reducer as recommendReducer } from '../application/Recommend/store'

export default combineReducers ({
  recommend: recommendReducer
});