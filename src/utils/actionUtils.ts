/*
 * @Author: hzsuqin 
 * @description: redux action相关的utils
 */
import Taro from '@tarojs/taro'
import includes from 'lodash/includes'
import axios from 'axios'

import { FETCH_REQUESTED, FETCH_SUCCEEDED, FETCH_FAILED, PARAMS_METHOD } from '../constants'

/**
 * 异步ajax请求的action生成参数
 * @interface AjaxData
 */
interface AjaxData {
  url: string
  type: any
  method?: string
  data?: any
}

/**
 * 生成异步ajax请求的action，通过redux-thunk中间件解析
 * 并做了一些通用的错误处理
 * @export
 * @param {AjaxData} { url, method = 'get', type, data = {} } 
 * @returns {Function} 异步ajax请求的action
 */
export function fetchAjax ({ url, method = 'get', type, data = {} }: AjaxData) {
  // 返回函数执行后返回ajax操作的promise，以返回值标识成功请求的的数据或者失败
  return function (dispatch) {
    // 触发一次开始ajax的action
    dispatch({ type, status: FETCH_REQUESTED })
    // 发送ajax请求
    return axios.request({
        url,
        method,
        [includes(PARAMS_METHOD, method) ? 'params' : 'data']: data
      })
      .then(function (resData) {
        // ajax请求成功action
        dispatch({ type, status: FETCH_SUCCEEDED, data: resData })
        return resData
      })
      .catch(e => {
        dispatch({ type, status: FETCH_FAILED })
        // if (e.response && e.response.status === 401) {
        //     // 401时重新登录
        //     return false
        // }
        // if (e.response && e.response.status === 403) {
        //     // 403弹出无权限
        //     return false
        // }
        // 全局的错误处理
        Taro.atMessage({
          'message': `服务器返回了错误 ${e.response && e.response.status} ${e.message}`,
          'type': 'error',
        })
        return false
      })
  }
}
