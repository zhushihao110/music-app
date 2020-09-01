/*
 * @Author: ZSH
 * @Date: 2020-08-31 11:14:10
 * @LastEditors: ZSH
 * @LastEditTime: 2020-08-31 11:47:07
 */
import { axiosInstance } from './config'

export const BannerListRequest = () => {
  return axiosInstance.get('/banner')
}

export const getRecommendListRequest = () => {
  return axiosInstance.get ('/personalized');
}