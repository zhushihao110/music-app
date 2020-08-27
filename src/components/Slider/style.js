/*
 * @Author: ZSH
 * @Date: 2020-08-27 15:05:55
 * @LastEditors: ZSH
 * @LastEditTime: 2020-08-27 15:51:52
 */
import styled from 'styled-components'
import style from '../../assets/global-style'

export const SliderContainer = styled.div`
  position: relative;
  box-sizing: border-box;
  width: 100%;
  height: 100%;
  margin: auto;
  background-color: white;
  .befor {
    position: absolute;
    top: 0;
    height: 100px;
    width: 100%;
    background: ${style["theme-color"]};
    z-index: 1;
  }
  .slider-container {
    position: relative;
    width: 98%;
    height: 160px;
    overflow: hidden;
    margin: auto;
    border-radius: 6px;
    .slider-nav {
      position: absolute;
      display: block;
      width: 100%;
      height: 100%;
    }
    .swiper-pagination-bullet-active {
      background: ${style["theme-color"]}
    }
  }
`