import { ComponentClass } from 'react'
import Taro, { Component, Config } from '@tarojs/taro'
import { View } from '@tarojs/components'
import { connect } from '@tarojs/redux'
import pick from 'lodash/pick'

import './read.scss'
import { IChaptersData, IChapterItem } from '../../constants/book';
import { fetchBookChapters, fetchBookChapterText } from '../../actions/book';
import { AtList, AtListItem, AtDrawer } from 'taro-ui';

type PageStateProps = {
}

type PageDispatchProps = {
  fetchBookChapters: (bookId: string) => any
  fetchBookChapterText: (link: string) => any
}

type PageOwnProps = {}

type PageState = {
  chaptersData: IChaptersData
  chapter: IChapterItem
  drawShow: boolean
}

type IProps = PageStateProps & PageDispatchProps & PageOwnProps

interface ReadPage {
  props: IProps
  state: PageState
}

@connect(({ book }) => pick(book, []), (dispatch) => ({
  fetchBookChapters: (bookId: string) => dispatch(fetchBookChapters(bookId)),
  fetchBookChapterText: (link: string) => dispatch(fetchBookChapterText(link))
}))
class ReadPage extends Component {

  state: PageState = {
    chaptersData: {
      _id: '',
      book: '',
      chaptersUpdated: '',
      updated: '',
      chapters: []
    },
    chapter: {
      index: 0,
      title: '',
      link: '',
      body: ''
    },
    drawShow: false
  }

  config: Config = {
    navigationBarTitleText: '大锤阅读器'
  }

  async componentWillMount () {
    Taro.showLoading({ title: '正在加载...' })
    const { params } = this.$router
    const { fetchBookChapters } = this.props;
    Taro.setNavigationBarTitle({
      title: params.title
    })
    const { mixToc: chaptersData } = await fetchBookChapters(params.id)
    this.setState({ chaptersData })
    await this.loadChapter(chaptersData.chapters[0], 0)
    Taro.hideLoading()
  }

  loadChapter = async (chapter: IChapterItem, index: number) => {
    const { fetchBookChapterText } = this.props;
    const chapterData = await fetchBookChapterText(chapter.link)
    chapter.body = chapterData.chapter.body;
    chapter.index = index;
    this.setState({ chapter })
  }

  render () {
    const { chaptersData, chapter, drawShow } = this.state;
    console.log(chapter);
    return (
      <View className='read'>
        <AtDrawer
          show={drawShow}
          mask
          items={chaptersData.chapters.map(chapter => chapter.title)}
          onItemClick={(index) => this.loadChapter(chaptersData.chapters[index], index)}
        />
        <View className='at-article'>
          <View className='at-article__h1'>
            {chapter.title}
          </View>
          <View className='at-article__content'>
            <View className='at-article__section'>
              {chapter.body!.split('\n').map((p, i) => 
                <View className='at-article__p' key={`article-${i}`}>{p}</View>
              )}
            </View>
          </View>
        </View>
      </View>
    )
  }
}

export default ReadPage as ComponentClass<PageOwnProps, PageState>
