/*
 * @Author: ZSH
 * @Date: 2020-09-01 10:18:31
 * @LastEditors: ZSH
 * @LastEditTime: 2020-09-01 11:01:43
 */
import React, { useState, useEffect } from 'react'
import Horizen from '../../baseUI/horizen-item'
import { categoryTypes, alphaTypes } from '../../api/config'
import { NavContainer } from './style'

function Singers (props) {

  let [category, setCategory] = useState ('')
  let [alpha, setAlpha] = useState ('')

  let handleUpdateAlpha = (val) => {
    setAlpha (val)
  }

  let handleUpdateCatetory = (val) => {
    setCategory (val)
  }

  return(
    <NavContainer>
      <Horizen 
        title="分类 (默认热门):"
        list={categoryTypes}
        handleClick={handleUpdateCatetory}
        oldVal={category}
      ></Horizen>
      <Horizen 
        list={alphaTypes} 
        title={"首字母:"}
        handleClick={handleUpdateAlpha}
        oldVal={alpha}
      ></Horizen>
    </NavContainer>
  )
}

export default React.memo(Singers)