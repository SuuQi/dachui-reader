import { ComponentClass } from 'react'
import Taro, { Component, Config } from '@tarojs/taro'
import { View, Button } from '@tarojs/components'
import { connect } from '@tarojs/redux'

import './bookshelf.scss'
import { fetchUserBook } from '../../actions/user';
import { IUserBookItem } from '../../constants/book';
import { AtList, AtListItem } from 'taro-ui';
import { SERVER_STATICS_ROOT } from '../../constants';

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

  handleBookItemClick = (book: IUserBookItem) => {
    // Taro.navigateTo({ url: `/pages/read/read?id=${book.id}&title=${book.title}` })
    Taro.navigateTo({ url: `/pages/read/read?id=${book.book}&title=${''}` })
  }

  render () {
    const { books } = this.props
    return (
      <View className='bookshelf'>
        <View>Hello, 书架</View>
        <AtList>
          {
            books.slice(0, 20).map(book => 
              <AtListItem
                key={`bookitem-${book.id}`}
                // title={book.title}
                // note={book.shortIntro}
                extraText='查看'
                arrow='right'
                // thumb={`${SERVER_STATICS_ROOT}${book.cover}`}
                onClick={() => this.handleBookItemClick(book)}
              />
            )
          }
        </AtList>
      </View>
    )
  }
}

export default Bookshelf as ComponentClass<PageOwnProps, PageState>
