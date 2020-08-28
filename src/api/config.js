/*
 * @Author: ZSH
 * @Date: 2020-08-28 16:27:22
 * @LastEditors: ZSH
 * @LastEditTime: 2020-08-28 16:29:43
 */
import axios from 'axios'

export const bsaeUrl = ''

const axiosInstace = axios.create({
  baseURL: bsaeUrl
})

axiosInstance.interceptors.response.use (
  res => res.data,
  err => {
    console.log (err, "网络错误")
  }
)

export {
  axiosInstance
}