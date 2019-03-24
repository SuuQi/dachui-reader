import Taro from '@tarojs/taro'
import { GET_SYSTEM_INFO } from '../constants/base';

export async function getSystemInfo () {
  const info = await Taro.getSystemInfo()
  return {
    type: GET_SYSTEM_INFO,
    data: info
  }
}
