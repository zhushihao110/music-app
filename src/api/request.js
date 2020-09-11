/*
 * @Author: ZSH
 * @Date: 2020-08-31 11:14:10
 * @LastEditors: ZSH
 * @LastEditTime: 2020-09-10 11:09:56
 */
import { axiosInstance } from './config'

export const BannerListRequest = () => {
  return axiosInstance.get('/banner')
}

export const getRecommendListRequest = () => {
  return axiosInstance.get ('/personalized');
}

export const getHotSingerListRequest = (count) => {
  return axiosInstance.get(`/top/artists?offset=${count}`);
}

export const getSingerListRequest= (category, alpha, count) => {
  return axiosInstance.get(`/artist/list?cat=${category}&initial=${alpha.toLowerCase()}&offset=${count}`);
}