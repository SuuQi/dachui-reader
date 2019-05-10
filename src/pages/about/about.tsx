import { ComponentClass } from 'react'
import Taro, { Component, Config } from '@tarojs/taro'
import { View, Text } from '@tarojs/components'
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
      <View className='about at-article'>
        <View className='at-article__h2'>
          关于大锤读书
        </View>
        <Text className='at-article__info' decode>
          2019-05-20&nbsp;&nbsp;&nbsp;大锤爸爸
        </Text>
        <View className='at-article__content'>
          <View className='at-article__section'>
            <View className='at-article__h2'></View>
            <View className='at-article__h3'>关于小程序</View>
            <View className='at-article__p'>“大锤读书”是一款免费、绿色、无广告的读书应用。如果喜欢，可以通过点击右上角“添加到我的小程序”和“添加到桌面”保存。</View>
            <View className='at-article__h2'></View>
            <View className='at-article__h3'>关于源码</View>
            <View className='at-article__p'>源码托管在GitHub，搜索 dachui-reader，欢迎Star。</View>
            <View className='at-article__h2'></View>
            <View className='at-article__h3'>免责声明</View>
            <View className='at-article__p'>小程序仅供学习使用，不从事商业活动，侵权联删。</View>
          </View>
        </View>
      </View>
    )
  }
}

export default About as ComponentClass<PageOwnProps, PageState>
