import Taro from '@tarojs/taro'
import { fetchLoginInfo } from '../actions/user';
import store from '../store';
import { SESSION_KEY } from '../constants/user';
export * from './actionUtils'
export * from './reducerUtils'

export async function login () {
    Taro.showLoading({ title: '登陆中...' })
    const loginOriginInfo = await Taro.login()
    const loginInfo = await store.dispatch( fetchLoginInfo(loginOriginInfo.code) as any );
    await Taro.setStorage({ key: SESSION_KEY, data: loginInfo.sessionId })
    Taro.hideLoading()
}
