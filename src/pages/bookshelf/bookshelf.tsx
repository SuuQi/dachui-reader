import { ComponentClass } from 'react'
import Taro, { Component, Config } from '@tarojs/taro'
import { View } from '@tarojs/components'
import { connect } from '@tarojs/redux'

import './bookshelf.scss'
import { fetchUserBook } from '../../actions/user'
import { IUserBookItem } from '../../constants/book'
import UserBookItem from '../../componts/userBookItem/userBookItem';
import { AtButton } from 'taro-ui';

type PageStateProps = {
  books: IUserBookItem[]
}

type PageDispatchProps = {
  fetchUserBook: () => any
}

type PageOwnProps = {}

type PageState = {
}

type IProps = PageStateProps & PageDispatchProps & PageOwnProps

@connect(({ user }) => ({
  books: user.books
}), (dispatch) => ({
  fetchUserBook: () => dispatch(fetchUserBook())
}))
class Bookshelf extends Component<IProps, PageState> {

  config: Config = {
    navigationBarTitleText: '书架'
  }

  async componentWillMount () {
    this.props.fetchUserBook()
  }

  render () {
    const { books } = this.props
    return (
      <View className='bookshelf'>
        <View className='bookshelf__list'>
          {
            books.map(book => 
              <UserBookItem
                key={`bookitem-${book.id}`}
                data={book}
              />
            )
          }
          {
            !books.length && <AtButton type='primary' className='bookshelf__gostore' onClick={() => Taro.switchTab({ url: '/pages/home/home' })}>前往书城找书</AtButton>
          }
        </View>
      </View>
    )
  }
}

export default Bookshelf as ComponentClass<PageOwnProps, PageState>
