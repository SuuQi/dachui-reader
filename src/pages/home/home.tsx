import { ComponentClass } from 'react'
import Taro, { Component, Config } from '@tarojs/taro'
import { View } from '@tarojs/components'
import { connect } from '@tarojs/redux'

import './home.scss'
import { IBookItem } from '../../constants/book'
import BookItem from '../../componts/bookItem/bookItem';
import { AtSearchBar } from 'taro-ui';
import { fuzzySearch, clearFuzzySearch } from '../../actions/book';

type PageStateProps = {
  hotList: IBookItem[]
  cats: any
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
  hotList: book.hotList,
  cats: book.cats,
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

  componentDidHide () {
    this.setState({
      searchString: ''
    })
  }

  handleSearchStringChange = (searchString) => {
    this.setState({
      searchString
    })
  }

  handleSearchClick = () => {
    const { searchString } = this.state
    this.props.clearFuzzySearch()
    this.props.fuzzySearch(searchString)
    Taro.navigateTo({ url: `/pages/booksearch/booksearch?searchString=${searchString}` })
  }

  render () {
    const { hotList, cats } = this.props
    const { searchString } = this.state
    return (
      <View className='home'>
        <AtSearchBar
          value={searchString}
          onChange={this.handleSearchStringChange}
          onConfirm={this.handleSearchClick}
          onActionClick={this.handleSearchClick}
        />
        {
          hotList.map(book => 
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

export default Bookstore as ComponentClass<PageOwnProps, PageState>
