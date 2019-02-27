import { ComponentClass } from 'react'
import Taro, { Component, Config } from '@tarojs/taro'
import { View, Button } from '@tarojs/components'
import { connect } from '@tarojs/redux'

import './bookshelf.scss'
import { login } from '../../utils';

type PageStateProps = {
}

type PageDispatchProps = {
}

type PageOwnProps = {}

type PageState = {
}

type IProps = PageStateProps & PageDispatchProps & PageOwnProps

interface Bookshelf {
  props: IProps
  state: PageState
}

@connect(({}) => ({
}), (dispatch) => ({
}))
class Bookshelf extends Component {

  config: Config = {
    navigationBarTitleText: '书架'
  }

  async componentWillMount () {
    await login()
    // todo...
  }
  
  async handleGetUserInfo (detail) {
    console.log(detail)
    // const loginInfo = await Taro.login()
    // console.log(loginInfo)
  }

  render () {
    return (
      <View className='bookshelf'>
        <View>Hello, 书架</View>
        <Button onGetUserInfo={this.handleGetUserInfo} openType='getUserInfo'>获取用户信息</Button>
      </View>
    )
  }
}

export default Bookshelf as ComponentClass<PageOwnProps, PageState>
