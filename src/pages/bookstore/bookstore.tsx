import { ComponentClass } from 'react'
import Taro, { Component, Config } from '@tarojs/taro'
import { View } from '@tarojs/components'
import { connect } from '@tarojs/redux'
import { AtSearchBar, AtList, AtListItem } from 'taro-ui'

import './bookstore.scss'
import { fuzzySearch, clearFuzzySearch } from '../../actions/book'
import { SERVER_STATICS_ROOT } from '../../constants'
import { IBookItem } from '../../constants/book'

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
        <AtList>
          {
            searchList.slice(0, 20).map(book => 
              <AtListItem
                key={`bookitem-${book.id}`}
                title={book.title}
                note={book.shortIntro}
                extraText='查看'
                arrow='right'
                thumb={`${SERVER_STATICS_ROOT}${book.cover}`}
                onClick={() => this.handleBookItemClick(book)}
              />
            )
          }
        </AtList>
      </View>
    )
  }
}

export default Bookstore as ComponentClass<PageOwnProps, PageState>
