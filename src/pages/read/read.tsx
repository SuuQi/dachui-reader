import { ComponentClass } from 'react'
import Taro, { Component, Config } from '@tarojs/taro'
import { View, Button } from '@tarojs/components'
import { connect } from '@tarojs/redux'
import pick from 'lodash/pick'

import './read.scss'
import { IChaptersData, IChapterItem, IChapterOrigin } from '../../constants/book';
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
    await this.loadChapter(0, chaptersData.chapters[0])
    Taro.hideLoading()
  }

  loadChapter = async (index: number, originChapter?: IChapterOrigin ) => {
    Taro.showLoading({ title: '正在加载...' })
    const { fetchBookChapterText } = this.props;
    const chapter = (originChapter || this.state.chaptersData.chapters[index]) as IChapterItem;
    const chapterData = await fetchBookChapterText(chapter.link)
    chapter.body = chapterData.chapter.body
    chapter.index = index
    this.setState({ chapter }, () => {
      Taro.pageScrollTo({ scrollTop: 0, duration: 0 })
      Taro.hideLoading()
    })
  }

  render () {
    const { chaptersData, chapter, drawShow } = this.state;
    return (
      <View className='read'>
        <AtDrawer
          show={drawShow}
          mask
          items={chaptersData.chapters.slice(0, 20).map(chapter => chapter.title)}
          onClose={() => this.setState({ drawShow: false })}
          onItemClick={(index) => this.loadChapter(index)}
        />
        <Button onClick={() => this.setState({ drawShow: true })}>目录</Button>
        <View className='at-article'>
          <View className='at-article__h2'>
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
        <Button onClick={() => this.loadChapter(chapter.index + 1)}>下一章</Button>
      </View>
    )
  }
}

export default ReadPage as ComponentClass<PageOwnProps, PageState>
