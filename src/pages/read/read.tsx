import { ComponentClass } from 'react'
import Taro, { Component, Config } from '@tarojs/taro'
import { View } from '@tarojs/components'
import { connect } from '@tarojs/redux'
import pick from 'lodash/pick'

import './read.scss'
import { IChaptersData } from '../../constants/book';
import { fetchBookChapters } from '../../actions/book';
import { AtList, AtListItem } from 'taro-ui';

type PageStateProps = {
  chaptersData: IChaptersData
}

type PageDispatchProps = {
  fetchBookChapters: (bookId: string) => any
}

type PageOwnProps = {}

type PageState = {
}

type IProps = PageStateProps & PageDispatchProps & PageOwnProps

interface ReadPage {
  props: IProps
  state: PageState
}

@connect(({ book }) => pick(book, ['chaptersData']), (dispatch) => ({
  fetchBookChapters: (bookId: string) => dispatch(fetchBookChapters(bookId))
}))
class ReadPage extends Component {

  config: Config = {
    navigationBarTitleText: '大锤阅读器'
  }

  async componentWillMount () {
    const { params } = this.$router
    const { fetchBookChapters } = this.props;
    Taro.setNavigationBarTitle({
      title: params.title
    })
    const chaptersData = await fetchBookChapters(params.id)
    console.log(chaptersData);
  }

  componentDidShow () { }

  componentDidHide () { }

  render () {
    const { chaptersData } = this.props;
    return (
      <View className='read'>
      <AtList>
        {
          chaptersData.chapters.map((chapter, i) => 
            <AtListItem
              key={`chapter-${chaptersData._id}-${i}`}
              title={chapter.title}
            />
          )
        }
      </AtList>
      </View>
    )
  }
}

export default ReadPage as ComponentClass<PageOwnProps, PageState>
