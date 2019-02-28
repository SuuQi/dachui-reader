import { ComponentClass } from 'react'
import Taro, { Component, Config } from '@tarojs/taro'
import { View, Button } from '@tarojs/components'
import { connect } from '@tarojs/redux'

import './bookshelf.scss'
import { fetchUserBook } from '../../actions/user';
import { IBookItem } from '../../constants/user';

type PageStateProps = {
  books: IBookItem[]
}

type PageDispatchProps = {
  fetchUserBook: () => any
}

type PageOwnProps = {}

type PageState = {
}

type IProps = PageStateProps & PageDispatchProps & PageOwnProps

interface Bookshelf {
  props: IProps
  state: PageState
}

@connect(({ user }) => ({
  books: user.books
}), (dispatch) => ({
  fetchUserBook: () => dispatch(fetchUserBook())
}))
class Bookshelf extends Component {

  config: Config = {
    navigationBarTitleText: '书架'
  }

  async componentWillMount () {
    this.props.fetchUserBook()
  }

  render () {
    console.log(this.props.books)
    return (
      <View className='bookshelf'>
        <View>Hello, 书架</View>
      </View>
    )
  }
}

export default Bookshelf as ComponentClass<PageOwnProps, PageState>
