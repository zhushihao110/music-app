/*
 * @Author: ZSH
 * @Date: 2020-08-31 11:17:25
 * @LastEditors: ZSH
 * @LastEditTime: 2020-08-31 16:24:16
 */
import * as actionType from './constants'
import { fromJS } from 'immutable' // 将 JS 对象转换成 immutable 对象
import { BannerListRequest, getRecommendListRequest } from '../../../api/request'

export const changeBannerList = (data) => ({
  type: actionType.CHANGE_BANNER,
  data: fromJS (data)
})

export const changeRecommendList = (data) => ({
  type: actionType.CHANGE_RECOMMEND_LIST,
  data: fromJS (data)
})

export const changeEnterLoading = (data) => ({
  type: actionType.CHANGE_ENTER_LOADING,
  data: data
})

export const getBannerList = () => {
  return (dispatch, getState) => {
    console.log(getState().toJS())
    BannerListRequest().then( res => {
      dispatch(changeBannerList(res.banners))
    }).catch( () => {
      console.log ("轮播图数据传输错误")
    })
  }
}

export const getRecommendList = () => {
  return (dispatch) => {
    getRecommendListRequest().then( res => {
      dispatch(changeRecommendList(res.result))
      dispatch(changeEnterLoading(false))
    }).catch( () => {
      console.log ("推荐歌单数据传输错误")
    })
  }
}
