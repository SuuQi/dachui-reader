import { ComponentClass } from 'react'
import Taro, { Component, Config } from '@tarojs/taro'
import { View } from '@tarojs/components'
import { connect } from '@tarojs/redux'

import './index.scss'
import { AtMessage } from 'taro-ui';

type PageStateProps = {
}

type PageDispatchProps = {
}

type PageOwnProps = {}

type PageState = {
}

type IProps = PageStateProps & PageDispatchProps & PageOwnProps

interface Index {
  props: IProps
  state: PageState
}

@connect(({ counter }) => ({
}), (dispatch) => ({
}))
class Index extends Component {

  config: Config = {
    navigationBarTitleText: '首页'
  }

  componentWillReceiveProps (nextProps) {
    console.log(this.props, nextProps)
  }

  componentWillUnmount () { }

  componentDidShow () { }

  componentDidHide () { }

  render () {
    return (
      <View className='index'>
        <AtMessage />
        <View>Hello, 首页</View>
      </View>
    )
  }
}

export default Index as ComponentClass<PageOwnProps, PageState>
