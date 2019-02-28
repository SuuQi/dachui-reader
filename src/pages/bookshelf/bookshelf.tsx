import { ComponentClass } from 'react'
import Taro, { Component, Config } from '@tarojs/taro'
import { View, Button } from '@tarojs/components'
import { connect } from '@tarojs/redux'

import './bookshelf.scss'

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

  render () {
    return (
      <View className='bookshelf'>
        <View>Hello, 书架</View>
      </View>
    )
  }
}

export default Bookshelf as ComponentClass<PageOwnProps, PageState>
