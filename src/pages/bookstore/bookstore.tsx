import { ComponentClass } from 'react'
import Taro, { Component, Config } from '@tarojs/taro'
import { View, Button, Text } from '@tarojs/components'
import { connect } from '@tarojs/redux'
import { AtSearchBar, AtMessage } from 'taro-ui'

import './bookstore.scss'

type PageStateProps = {
}

type PageDispatchProps = {
}

type PageOwnProps = {}

type PageState = {
  searchString: string
}

type IProps = PageStateProps & PageDispatchProps & PageOwnProps

interface Bookstore {
  props: IProps
  state: PageState
}

@connect(({ counter }) => ({
}), (dispatch) => ({
}))
class Bookstore extends Component {
  state = {
    searchString: ''
  }
  config: Config = {
    navigationBarTitleText: '书城'
  }

  componentWillReceiveProps (nextProps) {
    console.log(this.props, nextProps)
  }

  componentWillUnmount () { }

  componentDidShow () { }

  componentDidHide () { }

  handleSearchChange = (searchString) => {
    this.setState({
      searchString
    })
  }

  render () {
    const { searchString } = this.state
    return (
      <View className='bookstore'>
        <AtMessage />
        <AtSearchBar
          value={searchString}
          onChange={this.handleSearchChange}
        />
      </View>
    )
  }
}

export default Bookstore as ComponentClass<PageOwnProps, PageState>
