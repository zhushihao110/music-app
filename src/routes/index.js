/*
 * @Author: ZSH
 * @Date: 2020-08-27 11:09:07
 * @LastEditors: ZSH
 * @LastEditTime: 2020-08-27 11:22:42
 */
import React from "react";
import { Redirect } from 'react-router-dom'
import Home from '../application/Home'
import Recommend from '../application/Recommend'

export default [
  {
    path: '/',
    component: Home,
    routes: [
      {
        path: '/',
        exact: true,
        render: () => (<Redirect to={'/recommend'}/>)
      },
      {
        path: '/recommend',
        component: Recommend
      }
    ]
  }
]