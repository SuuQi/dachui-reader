import { ComponentClass } from 'react'
import Taro, { Component, Config } from '@tarojs/taro'
import { View } from '@tarojs/components'
import { connect } from '@tarojs/redux'

import './booksearch.scss'
import { IBookItem } from '../../constants/book'
import BookItem from '../../componts/bookItem/bookItem';
import { clearFuzzySearch } from '../../actions/book';

type PageStateProps = {
  searchList: IBookItem[]
  searchListCount: number
}

type PageDispatchProps = {
  clearFuzzySearch: () => any
}

type PageOwnProps = {}

type PageState = {
}

type IProps = PageStateProps & PageDispatchProps & PageOwnProps

@connect(({ book }) => ({
  searchList: book.searchList,
  searchListCount: book.searchListCount
}), (dispatch) => ({
  clearFuzzySearch: () => dispatch(clearFuzzySearch())
}))
class Booksearch extends Component<IProps, PageState> {

  componentWillMount () {
    const { params } = this.$router
    Taro.setNavigationBarTitle({
      title: `跟”${params.searchString}“相关的书籍`
    })
  }

  componentWillUnmount () {
    this.props.clearFuzzySearch()
  }

  render () {
    const { searchList } = this.props
    return (
      <View className='booksearch'>
        {
          searchList.map(book => 
            <BookItem
              key={`bookitem-${book.id}`}
              data={book}
            />
          )
        }
      </View>
    )
  }
}

export default Booksearch as ComponentClass<PageOwnProps, PageState>
