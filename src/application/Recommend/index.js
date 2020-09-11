/*
 * @Author: ZSH
 * @Date: 2020-08-27 11:14:46
 * @LastEditors: ZSH
 * @LastEditTime: 2020-08-31 14:58:38
 */
import React, { useEffect } from 'react'
import Slider from '../../components/Slider'
import RecommendList from '../../components/list'
import Scroll from '../../baseUI/scroll'
import { Content } from './style'
import { connect } from "react-redux"
import * as actionTypes from './store/actionCreators'
import { forceCheck } from 'react-lazyload'
import Loading from '../../baseUI/loading'
 
function Recommend (props) {

  const { bannerList, recommendList, enterLoading } = props

  const { getBannerDataDispatch, getRecommendListDataDispatch } = props

  useEffect( () => {
    if(!bannerList.size) {
      getBannerDataDispatch()
    }
    if(!recommendList.size) {
      getRecommendListDataDispatch()
    }
  }, [])

  const bannerListJS = bannerList ? bannerList.toJS () : []
  const recommendListJS = recommendList ? recommendList.toJS () :[]

  return (
    <Content>
      <Scroll onScroll={forceCheck}>
        <div>
          <Slider bannerList={bannerListJS}></Slider>
          <RecommendList recommendList={recommendListJS}></RecommendList>
        </div>
      </Scroll>
      { enterLoading ? <Loading></Loading> : null}
    </Content>
  )
}

// 映射 Redux 全局的 state 到组件的 props 上
const mapStateToProps = (state) => ({
  // 不要在这里将数据 toJS
  // 不然每次 diff 比对 props 的时候都是不一样的引用，还是导致不必要的重渲染，属于滥用 immutable
  bannerList: state.getIn (['recommend', 'bannerList']),
  recommendList: state.getIn (['recommend', 'recommendList']),
  enterLoading: state.getIn (['recommend', 'enterLoading'])
})

// 映射 dispatch 到 props 上
const mapDispatchToProps = (dispatch) => {
  return {
    getBannerDataDispatch () {
      dispatch (actionTypes.getBannerList ());
    },
    getRecommendListDataDispatch () {
      dispatch (actionTypes.getRecommendList ());
    },
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(React.memo(Recommend))