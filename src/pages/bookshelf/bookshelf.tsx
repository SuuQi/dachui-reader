import { ComponentClass } from 'react'
import Taro, { Component, Config } from '@tarojs/taro'
import { View } from '@tarojs/components'
import { connect } from '@tarojs/redux'

import './bookshelf.scss'
import { AtMessage } from 'taro-ui';

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

@connect(({ counter }) => ({
}), (dispatch) => ({
}))
class Bookshelf extends Component {

  config: Config = {
    navigationBarTitleText: '书架'
  }

  componentWillReceiveProps (nextProps) {
    console.log(this.props, nextProps)
  }

  componentWillUnmount () { }

  componentDidShow () { }

  componentDidHide () { }

  render () {
    return (
      <View className='bookshelf'>
        <AtMessage />
        <View>Hello, 书架</View>
      </View>
    )
  }
}

export default Bookshelf as ComponentClass<PageOwnProps, PageState>
