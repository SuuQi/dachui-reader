/*
 * @Author: hzsuqin 
 * @description: redux action相关的utils
 */
import Taro from '@tarojs/taro'

import { FETCH_REQUESTED, FETCH_SUCCEEDED, FETCH_FAILED, HTTP_METHOD } from '../constants'
import { login } from './'
import { SESSION_KEY } from '../constants/user'
import store from '../store'

/**
 * 异步ajax请求的action生成参数
 * @interface AjaxData
 */
interface AjaxData {
  url: string
  type: any
  method?: HTTP_METHOD
  data?: any
  showLoading?: boolean
}

/**
 * 生成异步ajax请求的action，通过redux-thunk中间件解析
 * 并做了一些通用的错误处理
 * @export
 * @param {AjaxData} { url, method = 'get', type, data = {}, showLoading = false } 
 * @returns {Function} 异步ajax请求的action
 */
export function fetchAjax ({ url, method = 'GET', type, data = {}, showLoading = false }: AjaxData) {
  // 返回函数执行后返回ajax操作的promise，以返回值标识成功请求的的数据或者失败
  return async function (dispatch) {
    // 触发一次开始ajax的action
    dispatch({ type, status: FETCH_REQUESTED })
    showLoading && Taro.showLoading({
      title: '正在加载...',
      mask: true
    })
    // 发送ajax请求
    return Taro.request({
        url,
        method,
        header: {
          'x-reader-session': Taro.getStorageSync(SESSION_KEY) || ''
        },
        data
      })
      .then(function (resData) {
        switch (resData.statusCode) {
          case 200:
          case 204:
            // ajax请求成功action
            resData.data = resData.data || {}
            dispatch({ type, status: FETCH_SUCCEEDED, data: resData.data })
            showLoading && Taro.hideLoading()
            return resData.data
          default:
            throw resData
        }
      })
      .catch(async e => {
        dispatch({ type, status: FETCH_FAILED })
        showLoading && Taro.hideLoading()
        if (e.statusCode === 401) {
          // 未登录，登录后重新请求
          await login()
          return store.dispatch( fetchAjax({ url, method, type, data, showLoading }) as any )
        }
        // 全局的错误处理
        Taro.showToast({
          title: `错误: ${e.statusCode || e.message || e.errMsg}`,
          duration: 3000,
          mask: true,
          icon: 'none'
        })
        return false
      })
  }
}
