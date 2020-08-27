/*
 * @Author: ZSH
 * @Date: 2020-08-27 16:46:21
 * @LastEditors: ZSH
 * @LastEditTime: 2020-08-27 16:59:07
 */
import React from 'react'
import { ListWrapper, ListItem, List } from './style'
import { getCount } from '../../api/util'

function RecommendList (props) {
  return(
    <ListWrapper>
      <h1 className='title'> 推荐歌单 </h1>
      <List>
        {
          props.recommendList.map( item => {
            return(
              <ListItem key={item.id}>
                <div className="img_wrapper">
                  <div className="decorate"></div>
                  <img src={item.picUrl + "?param=300x300"} width="100%" height="100%" alt="music" />
                  <div className="play_count">
                    <i className="iconfont play">&#xe885;</i>
                    <span className="count">{getCount (item.playCount)}</span>
                  </div>
                </div>
                <div className="desc">{item.name}</div>
              </ListItem>
            )
          })
        }
      </List>
    </ListWrapper>
  )
}

export default RecommendList