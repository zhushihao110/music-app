/*
 * @Author: ZSH
 * @Date: 2020-08-27 10:39:35
 * @LastEditors: ZSH
 * @LastEditTime: 2020-08-27 14:56:18
 */
import React from 'react';
import { renderRoutes } from 'react-router-config' //renderRoutes 读取路由配置转化为 Route 标签
import { BrowserRouter } from "react-router-dom"
import { GlobalStyle } from './style'
import { Provider } from 'react-redux'
import { IconStyle } from './assets/iconfont/iconfont'
import routes from './routes'
import store from './store'

function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <GlobalStyle></GlobalStyle>
        <IconStyle></IconStyle>
        {renderRoutes(routes)}
      </BrowserRouter>
    </Provider>
  )
}

export default App;
