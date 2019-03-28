import { ComponentClass } from 'react'
import Taro, { Component, Config } from '@tarojs/taro'
import { View } from '@tarojs/components'
import { connect } from '@tarojs/redux'

import './about.scss'

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
class About extends Component<IProps, PageState> {

  config: Config = {
    navigationBarTitleText: '关于'
  }

  componentWillReceiveProps (nextProps: IProps) {
    console.log(this.props, nextProps)
  }

  componentWillUnmount () { }

  componentDidShow () { }

  componentDidHide () { }

  render () {
    return (
      <View className='index'>
        <View>大锤读书： 免费、绿色、无广告的读书应用！</View>
      </View>
    )
  }
}

export default About as ComponentClass<PageOwnProps, PageState>
