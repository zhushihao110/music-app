/*
 * @Author: ZSH
 * @Date: 2020-08-28 14:55:17
 * @LastEditors: ZSH
 * @LastEditTime: 2020-08-31 14:34:58
 */
import React, { useState, useRef, useEffect, forwardRef, useImperativeHandle  } from 'react' 
import BScroll from "better-scroll"
import { ScrollContainer } from './style'
import PropTypes from "prop-types"

const Scroll = forwardRef( (props, ref) => {

  //better-scroll 实例对象
  const [bScroll, setBScroll] = useState()
  //current 指向初始化 bs 实例需要的 DOM 元素 
  const scrollContaninerRef = useRef()

  const { direction, click, refresh, pullUpLoading, pullDownLoading, bounceTop, bounceBottom } = props
  const { pullUp, pullDown, onScroll } = props

  useEffect (() => {
    const scroll = new BScroll (scrollContaninerRef.current, {
      scrollX: direction === "horizental",
      scrollY: direction === "vertical",
      probeType: 3,
      click: click,
      bounce:{
        top: bounceTop,
        bottom: bounceBottom
      }
    });
    setBScroll (scroll);
    return () => {
      setBScroll (null);
    }
  }, [])

  // 每次重新渲染都要刷新实例，防止无法滑动:
  useEffect (() => {
    if (refresh && bScroll){
      bScroll.refresh ()
    }
  })

  // 给实例绑定 scroll 事件
  useEffect (() => {
    if (!bScroll || !onScroll) return;
    bScroll.on ('scroll', (scroll) => {
      onScroll (scroll)
    })
    
    return () => {
      // 返回函数，用来清除绑定
      bScroll.off ('scroll')
    }
  }, [onScroll, bScroll])

  // 进行上拉到底的判断，调用上拉刷新的函数
  useEffect (() => {
    if (!bScroll || !pullUp) return;
    bScroll.on ('scrollEnd', () => {
      // 判断是否滑动到了底部
      if (bScroll.y <= bScroll.maxScrollY + 100){
        pullUp ()
      }
    });
    return () => {
      bScroll.off ('scrollEnd');
    }
  }, [pullUp, bScroll])

  // 进行下拉的判断，调用下拉刷新的函数
  useEffect (() => {
    if (!bScroll || !pullDown) return;
    bScroll.on ('touchEnd', (pos) => {
      // 判断用户的下拉动作
      if (pos.y > 50) {
        pullDown ();
      }
    });
    return () => {
      bScroll.off ('touchEnd');
    }
  }, [pullDown, bScroll])

  // react hook,一般和 forwardRef 一起使用，ref 已经在 forWardRef 中默认传入
  useImperativeHandle (ref, () => ({
    // 给外界暴露 refresh 方法
    refresh () {
      if (bScroll) {
        bScroll.refresh ();
        bScroll.scrollTo (0, 0);
      }
    },
    // 给外界暴露 getBScroll 方法，提供 bs 实例
    getBScroll () {
      if (bScroll) {
        return bScroll;
      }
    }
  }))
  return (
    <ScrollContainer ref={scrollContaninerRef}>
      { props.children }
    </ScrollContainer>
  )
})

Scroll.defaultProps = {
  direction: "vertical",
  click: true,
  refresh: true,
  onScroll:null,
  pullUpLoading: false,
  pullDownLoading: false,
  pullUp: null,
  pullDown: null,
  bounceTop: true,
  bounceBottom: true
}

Scroll.propTypes = {
  direction: PropTypes.oneOf (['vertical', 'horizental']),
  refresh: PropTypes.bool,
  onScroll: PropTypes.func,
  pullUp: PropTypes.func,
  pullDown: PropTypes.func,
  pullUpLoading: PropTypes.bool,
  pullDownLoading: PropTypes.bool,
  bounceTop: PropTypes.bool,// 是否支持向上吸顶
  bounceBottom: PropTypes.bool// 是否支持向上吸顶
}

export default Scroll