import { ComponentClass } from 'react'
import Taro, { Component, Config } from '@tarojs/taro'
import { View } from '@tarojs/components'
import { connect } from '@tarojs/redux'
import { AtSearchBar } from 'taro-ui'

import './bookstore.scss'
import { fuzzySearch, clearFuzzySearch } from '../../actions/book'
import { IBookItem } from '../../constants/book'
import BookItem from '../../componts/bookItem/bookItem';

type PageStateProps = {
  searchList: IBookItem[]
  searchListCount: number
}

type PageDispatchProps = {
  fuzzySearch: (query: string) => any
  clearFuzzySearch: () => any
}

type PageOwnProps = {}

type PageState = {
  searchString: string
}

type IProps = PageStateProps & PageDispatchProps & PageOwnProps

@connect(({ book }) => ({
  ...book
}), (dispatch) => ({
  fuzzySearch: (query: string) => dispatch(fuzzySearch(query)),
  clearFuzzySearch: () => dispatch(clearFuzzySearch())
}))
class Bookstore extends Component<IProps, PageState> {
  state = {
    searchString: ''
  }
  config: Config = {
    navigationBarTitleText: '书城'
  }
  componentWillUnmount () {
    this.props.clearFuzzySearch()
  }

  handleSearchStringChange = (searchString) => {
    this.setState({
      searchString
    })
  }

  handleSearchClick = ()  => {
    this.props.clearFuzzySearch()
    this.props.fuzzySearch(this.state.searchString)
  }

  handleSearchClear = () => {
    this.props.clearFuzzySearch()
  }

  handleBookItemClick = (book: IBookItem) => {
    Taro.navigateTo({ url: `/pages/read/read?id=${book.id}&title=${book.title}` })
  }

  render () {
    const { searchString } = this.state
    const { searchList } = this.props
    return (
      <View className='bookstore'>
        <AtSearchBar
          fixed
          value={searchString}
          onChange={this.handleSearchStringChange}
          onConfirm={this.handleSearchClick}
          onActionClick={this.handleSearchClick}
        />
        {
          searchList.slice(0, 20).map(book => 
            <BookItem
              key={`bookitem-${book.id}`}
              data={book}
              onClick={this.handleBookItemClick}
            />
          )
        }
      </View>
    )
  }
}

export default Bookstore as ComponentClass<PageOwnProps, PageState>
