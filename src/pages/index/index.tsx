import { ComponentClass } from 'react'
import Taro, { Component, Config } from '@tarojs/taro'
import { View } from '@tarojs/components'
import { connect } from '@tarojs/redux'

import './index.scss'

type PageStateProps = {
}

type PageDispatchProps = {
}

type PageOwnProps = {
  
}

type PageState = {
}

type IProps = PageStateProps & PageDispatchProps & PageOwnProps

@connect(() => ({
}), () => ({
}))
class Index extends Component<IProps, PageState> {

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
        <View>Hello, 首页</View>
      </View>
    )
  }
}

export default Index as ComponentClass<PageOwnProps, PageState>
