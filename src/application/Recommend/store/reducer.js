/*
 * @Author: ZSH
 * @Date: 2020-08-31 11:17:01
 * @LastEditors: ZSH
 * @LastEditTime: 2020-08-31 11:42:53
 */
import * as actionTypes from './constants'
import { fromJS } from 'immutable'

const defaultState = fromJS({
  bannerList: [],
  recommendList: [],
  enterLoading: true
})

export default (state = defaultState, action) => {
  switch(action.type) {
    case actionTypes.CHANGE_BANNER:
      return state.set('bannerList', action.data)
    case actionTypes.CHANGE_RECOMMEND_LIST:
      return state.set('recommendList', action.data)
    case actionTypes.CHANGE_ENTER_LOADING:
      return state.set('enterLoading', action.data)
    default:
      return state
  }
}