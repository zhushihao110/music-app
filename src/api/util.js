/*
 * @Author: ZSH
 * @Date: 2020-08-27 16:56:50
 * @LastEditors: ZSH
 * @LastEditTime: 2020-08-27 16:56:54
 */
export const getCount = (count) => {
  if (count < 0) return;
  if (count < 10000) {
    return count;
  } else if (Math.floor (count / 10000) < 10000) {
    return Math.floor (count/1000)/10 + "万";
  } else  {
    return Math.floor (count / 10000000)/ 10 + "亿";
  }
}