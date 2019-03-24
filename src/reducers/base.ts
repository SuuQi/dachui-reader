import Taro from '@tarojs/taro'
import { createReducer, defaultSuccessByKey } from '../utils'
import { GET_SYSTEM_INFO } from '../constants/base';

export default createReducer({
  isFetching: false,
  systemInfo: Taro.getSystemInfoSync(),
}, {
  [GET_SYSTEM_INFO]: defaultSuccessByKey('systemInfo')
})
