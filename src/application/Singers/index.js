/*
 * @Author: ZSH
 * @Date: 2020-09-01 10:18:31
 * @LastEditors: ZSH
 * @LastEditTime: 2020-09-16 15:56:24
 */
import React, { useState, useEffect } from 'react'
import Horizen from '../../baseUI/horizen-item'
import { areaType, categoryTypes, alphaTypes } from '../../api/config'
import { NavContainer, ListItem, ListContainer, List } from './style'
import Scroll from '../../baseUI/scroll'
import  LazyLoad, {forceCheck} from 'react-lazyload';
import { 
  getSingerList, 
  getHotSingerList, 
  changeEnterLoading, 
  changePageCount, 
  refreshMoreSingerList, 
  changePullUpLoading, 
  changePullDownLoading, 
  refreshMoreHotSingerList 
} from './store/actionCreators';
import {connect} from 'react-redux';
import Loading from '../../baseUI/loading';

function Singers (props) {

  let [type, setType] = useState ('')
  let [area, setArea] = useState ('')
  let [alpha, setAlpha] = useState ('')

  const { enterLoading, singerList, pullUpLoading, pullDownLoading, pageCount } = props
  const { updateDispatch, getHotSingerDispatch, pullUpRefreshDispatch, pullDownRefreshDispatch } = props
  
  useEffect( () => {
    if(!singerList.length && !type && !area && !alpha) {
      getHotSingerDispatch();
    }
  }, [])

  const handleUpdateAlpha = (val) => {
    setAlpha (val)
    updateDispatch(type, area, val);
  }

  const handleUpdateCatetory = (val) => {
    setType (val)
    updateDispatch(val, area, alpha);
  }

  const handleUpdateArea = (val) => {
    setArea (val)
    updateDispatch(type, val, alpha);
  }

  const handlePullUp = () => {
    pullUpRefreshDispatch (type, area, alpha, type === '', pageCount);
  };
  
  const handlePullDown = () => {
    pullDownRefreshDispatch (type, area, alpha);
  };
  // 渲染函数，返回歌手列表
  const renderSingerList = () => {
    const { singerList } = props
    return (
      <List>
        {
          singerList.toJS().map ((item, index) => {
            return (
              <ListItem key={item.accountId+""+index}>
                <div className="img_wrapper">
                  <LazyLoad placeholder={<img width="100%" height="100%" src={require ('./singer.png')} alt="music"/>}>
                    <img src={`${item.picUrl}?param=300x300`} width="100%" height="100%" alt="music"/>
                  </LazyLoad>
                </div>
                <span className="name">{item.name}</span>
              </ListItem>
            )
          })
        }
      </List>
    )
  }

  return(
    <div>
      <NavContainer>
        <Horizen 
          title="类型 (默认热门):"
          list={categoryTypes}
          handleClick={handleUpdateCatetory}
          oldVal={type}
        ></Horizen>
        <Horizen 
          title="区域 :"
          list={areaType}
          handleClick={handleUpdateArea}
          oldVal={area}
        ></Horizen>
        <Horizen 
          list={alphaTypes} 
          title={"首字母:"}
          handleClick={handleUpdateAlpha}
          oldVal={alpha}
        ></Horizen>
      </NavContainer>
      <ListContainer>
        <Scroll
        onScroll={forceCheck}
        pullUp={ handlePullUp }
        pullDown = { handlePullDown }
        pullUpLoading = { pullUpLoading }
        pullDownLoading = { pullDownLoading }
        >
          {renderSingerList()}
        </Scroll>
        {enterLoading? <Loading ></Loading>: null}
      </ListContainer>
    </div>
    
  )
}

const mapStateToProps = (state) => ({
  singerList: state.getIn(['singers', 'singerList']),
  enterLoading: state.getIn(['singers', 'enterLoading']),
  pullUpLoading: state.getIn(['singers', 'pullUpLoading']),
  pullDownLoading: state.getIn(['singers', 'pullDownLoading']),
  pageCount: state.getIn(['singers', 'pageCount'])
})

const mapDispatchToProps = (dispatch) => {
  return {
    getHotSingerDispatch() {
      dispatch(getHotSingerList());
    },
    updateDispatch(type, area, alpha) {
      dispatch(changePageCount(0));//由于改变了分类，所以pageCount清零
      dispatch(changeEnterLoading(true));//loading，现在实现控制逻辑，效果实现放到下一节，后面的loading同理
      dispatch(getSingerList(type, area, alpha));
    },
    // 滑到最底部刷新部分的处理
    pullUpRefreshDispatch(type, area, alpha, hot, count) {
      dispatch(changePullUpLoading(true));
      dispatch(changePageCount(count+1));
      if(hot){
        dispatch(refreshMoreHotSingerList());
      } else {
        dispatch(refreshMoreSingerList(type, area, alpha));
      }
    },
    //顶部下拉刷新
    pullDownRefreshDispatch(type, area, alpha) {
      dispatch(changePullDownLoading(true));
      dispatch(changePageCount(0));//属于重新获取数据
      if(type === '' && area === '' && alpha === ''){
        dispatch(getHotSingerList());
      } else {
        dispatch(getSingerList(type, area, alpha));
      }
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(React.memo(Singers))