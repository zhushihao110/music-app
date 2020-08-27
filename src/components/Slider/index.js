/*
 * @Author: ZSH
 * @Date: 2020-08-27 15:03:22
 * @LastEditors: ZSH
 * @LastEditTime: 2020-08-27 17:29:03
 */
import React, { useEffect, useState } from 'react'
import { SliderContainer } from './style'
import "swiper/dist/css/swiper.css"
import Swiper from "swiper";

function Slider (props) {
  const [ sliderSwiper, setSliderSwiper ] = useState(null)
  const { bannerList } = props

  useEffect(() => {
    if(bannerList.length && !sliderSwiper) {
      let sliderSwiper = new Swiper(".slider-container", {
        loop: true,
        autoplay: {
          delay: 1000,
          disableOnInteraction: false
        },
        pagination: {el: '.swiper-pagination'}
      })
      setSliderSwiper(sliderSwiper)
    }
  }, [bannerList.length])

  return (
    <SliderContainer>
      <div className="befor"></div>
      <div className="slider-container">
        <div className='swiper-wrapper'>
          {
            bannerList.map( item => {
              return (
                <div className="swiper-slide" key={item.imageUrl}>
                  <div className='slider-nav'>
                    <img src={item.imageUrl} alt="推荐" width="100%" height="100%"/>  
                  </div>                  
                </div>
              )
            })
          }
        </div>
        <div className="swiper-pagination"></div>
      </div>
    </SliderContainer>
  )
}

export default React.memo(Slider)