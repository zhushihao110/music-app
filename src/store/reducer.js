/*
 * @Author: ZSH
 * @Date: 2020-08-27 14:48:39
 * @LastEditors: ZSH
 * @LastEditTime: 2020-09-16 11:15:20
 */
import { combineReducers } from 'redux-immutable'
import { reducer as recommendReducer } from '../application/Recommend/store'
import { reducer as singersReducer } from '../application/Singers/store';

export default combineReducers ({
  recommend: recommendReducer,
  singers: singersReducer
})