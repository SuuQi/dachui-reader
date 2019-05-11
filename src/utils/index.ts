import Taro, { clientRectElement } from '@tarojs/taro'
import { fetchLoginInfo } from '../actions/user'
import store from '../store'
import { SESSION_KEY } from '../constants/user'
export * from './actionUtils'
export * from './reducerUtils'

export async function login () {
    Taro.showLoading({ title: '登录中...' })
    const loginOriginInfo = await Taro.login()
    const loginInfo = await store.dispatch( fetchLoginInfo(loginOriginInfo.code) as any )
    await Taro.setStorage({ key: SESSION_KEY, data: loginInfo.sessionId })
    Taro.hideLoading()
}

export function getBoundingClientRect (selector: string, root?: any): Promise<clientRectElement> {
  return new Promise(resolve => {
    const query = Taro.createSelectorQuery()
    root && query.in(process.env.TARO_ENV === 'h5' ? root : root.$scope)
    query
      .select(selector)
      .boundingClientRect(rect => {
        resolve(Array.isArray(rect) ? rect[0] : rect)
      })
      .exec()
  })
}

export function sleep (time: number) {
  return new Promise(resolve => {
    setTimeout(resolve, time)
  })
}
