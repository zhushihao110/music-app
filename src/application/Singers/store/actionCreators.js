/*
 * @Author: ZSH
 * @Date: 2020-09-11 10:34:34
 * @LastEditors: ZSH
 * @LastEditTime: 2020-09-16 15:45:21
 */
import { 
  getHotSingerListRequest, 
  getSingerListRequest
} from '../../../api/request'
import { 
  CHANGE_SINGER_LIST, 
  CHANGE_PAGE_COUNT, 
  CHANGE_ENTER_LOADING, 
  CHANGE_PULLUP_LOADING,
  CHANGE_PULLDOWN_LOADING,
} from './constants'
import { fromJS } from 'immutable'

const changeSingerList = (data) => ({
  type: CHANGE_SINGER_LIST,
  data: fromJS(data)
})

export const changePageCount = (data) => ({
  type: CHANGE_PAGE_COUNT,
  data: data
})

export const changeEnterLoading = (data) => ({
  type: CHANGE_ENTER_LOADING,
  data: data
})

export const changePullUpLoading = (data) => ({
  type: CHANGE_PULLUP_LOADING,
  data: data
})

export const changePullDownLoading = (data) => ({
  type: CHANGE_PULLDOWN_LOADING,
  data: data
})

//第一次加载热门歌手
export const getHotSingerList = () => {
  return (dispatch) => {
    getHotSingerListRequest(0).then( res=> {
      const data = res.artists;
      dispatch(changeSingerList(data))
      dispatch(changeEnterLoading(false))
      dispatch(changePullDownLoading(false))
      dispatch(changePullUpLoading(false))
    }).catch( () => {
      console.log('获取数据失败')
    })
  }
}
//加载更多热门歌手
export const refreshMoreHotSingerList = () => {
  return (dispatch, getState) => {
    const pageCount = getState().getIn(['singers', 'pageCount']);
    const singerList = getState().getIn(['singers', 'singerList']).toJS();
    getHotSingerListRequest(pageCount).then(res => {
      const data = [...singerList, ...res.artists];
      dispatch(changeSingerList(data))
      dispatch(changePullUpLoading(false))
    }).catch(() => {
      console.log('热门歌手数据获取失败')
    })
  }
}

//第一次加载对应类别的歌手
export const getSingerList = (type, area, alpha) => {
  return (dispatch, getState) => {
    getSingerListRequest(type, area, alpha, 0).then(res => {
      const data = res.artists
      dispatch(changeSingerList(data))
      dispatch(changeEnterLoading(false))
      dispatch(changePullDownLoading(false))
    }).catch(() => {
      console.log('歌手数据获取失败')
    })
  }
}

//加载更多歌手
export const refreshMoreSingerList = (category, alpha) => {
  return (dispatch, getState) => {
    const pageCount = getState().getIn(['singers', 'pageCount']);
    const singerList = getState().getIn(['singers', 'singerList']).toJS();
    getSingerListRequest(category, alpha, pageCount).then(res => {
      const data = [...singerList, ...res.artists]
      dispatch(changeSingerList(data))
      dispatch(changePullUpLoading(false))
    }).catch(() => {
      console.log('歌手数据获取失败')
    })
  }
}