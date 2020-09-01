/*
 * @Author: ZSH
 * @Date: 2020-09-01 10:04:20
 * @LastEditors: ZSH
 * @LastEditTime: 2020-09-01 10:29:40
 */
import React, { useState, useRef, useEffect, memo } from 'react'
import styled from 'styled-components'
import style from '../../assets/global-style'
import Scroll from '../scroll'
import { PropTypes } from 'prop-types'

const List = styled.div`
  display: flex;
  align-items: center;
  height: 30px;
  overflow: hidden;
  >span:first-of-type {
    display: block;
    flex: 0 0 auto;
    padding: 5px 0;
    margin-right: 5px;
    color: grey;
    font-size: ${style["font-size-m"]};
  }
`

const ListItem = styled.span`
  flex: 0 0 auto;
  font-size: ${style ["font-size-m"]};
  padding: 5px 8px;
  border-radius: 10px;
  &.selected {
    color: ${style ["theme-color"]};
    border: 1px solid ${style ["theme-color"]};
    opacity: 0.8;
  }
`

function Horizen (props) {

  const { list, title, oldVal } = props
  const { handleClick } = props

  // 加入声明
  const Category = useRef (null);

  // 加入初始化内容宽度的逻辑
  useEffect (() => {
    let categoryDOM = Category.current;
    let tagElems = categoryDOM.querySelectorAll ("span");
    let totalWidth = 0;
    Array.from (tagElems).forEach (ele => {
      totalWidth += ele.offsetWidth;
    });
    categoryDOM.style.width = `${totalWidth}px`;
  }, []);

  return(
    <Scroll direction={"horizental"}>
      <div ref={Category}>
        <List>
          <span>{title}</span>
          {
            list.map( item => {
              return(
                <ListItem
                key={item.key}
                className={`${oldVal === item.key ? 'selected': ''}`}
                onClick={() => handleClick(item.key)}
                >
                  {item.name}
                </ListItem>
              )
            })
          }
        </List>
      </div>
    </Scroll>
  )
}

Horizen.defaultProps = {
  list: [],
  title: '',
  oldVal: '',
  handleClick: null
}

Horizen.propTypes = {
  list: PropTypes.array,
  oldVal: PropTypes.string,
  title: PropTypes.string,
  handleClick: PropTypes.func
}

export default memo (Horizen);